import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Reorder, useDragControls } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Plus, X, Check, Download, Upload, GripVertical } from 'lucide-react';

const MAX_LEN = 22;

function smartLabel(raw: string): string {
  const trimmed = raw.trim();
  try {
    if (/^https?:\/\//i.test(trimmed) || (trimmed.includes('.') && trimmed.includes('/'))) {
      const url = new URL(/^https?:\/\//i.test(trimmed) ? trimmed : 'https://' + trimmed);
      const parts = url.pathname.split('/').filter(Boolean);
      if (parts.length > 0) {
        const candidate = parts[parts.length - 1] || url.hostname;
        return candidate.length > MAX_LEN ? candidate.slice(0, MAX_LEN) + '…' : candidate;
      }
      const host = url.hostname.replace(/^www\./, '');
      return host;
    }
  } catch {
    // fall through
  }
  return trimmed.length > MAX_LEN ? trimmed.slice(0, MAX_LEN) + '…' : trimmed;
}

interface Shortcut {
  id: string;
  name: string;
  url: string;
}

interface ShortcutItemProps {
  shortcut: Shortcut;
  onRemove: (id: string) => void;
}

function ShortcutItem({ shortcut, onRemove }: ShortcutItemProps) {
  const controls = useDragControls();

  return (
    <Reorder.Item
      value={shortcut}
      dragListener={false}
      dragControls={controls}
      as="div"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.2 } }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      className="flex items-center gap-2 group"
    >
      <span
        onPointerDown={e => controls.start(e)}
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-neutral-300 dark:text-neutral-700 cursor-grab active:cursor-grabbing touch-none"
      >
        <GripVertical size={13} strokeWidth={2} color='grey' />
      </span>
      <button
        onClick={() => onRemove(shortcut.id)}
        className="opacity-0 group-hover:opacity-100 transition-all duration-200 text-neutral-400 dark:text-neutral-700 hover:text-red-500"
        aria-label="Remove shortcut"
      >
        <X size={14} strokeWidth={2} />
      </button>
      <a
        href={shortcut.url}
        // target="_blank"
        rel="noreferrer"
        title={shortcut.name}
        className="text-neutral-400 dark:text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors duration-200 cursor-pointer max-w-40 truncate text-xs"
      >
        {smartLabel(shortcut.name)}
      </a>
    </Reorder.Item>
  );
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.4 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

export default function ShortcutDock() {
  const [shortcuts, setShortcuts] = useState<Shortcut[]>(() => {
    const saved = localStorage.getItem('solace_shortcuts');
    return saved ? JSON.parse(saved) : [];
  });

  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newUrl, setNewUrl] = useState('');

  useEffect(() => {
    localStorage.setItem('solace_shortcuts', JSON.stringify(shortcuts));
  }, [shortcuts]);

  const handleAdd = () => {
    if (!newName.trim() || !newUrl.trim() || shortcuts.length >= 7) return;
    let finalUrl = newUrl.trim();
    if (!/^https?:\/\//i.test(finalUrl)) finalUrl = 'https://' + finalUrl;
    setShortcuts(prev => [...prev, { id: crypto.randomUUID(), name: newName.trim(), url: finalUrl }]);
    setNewName('');
    setNewUrl('');
    setIsAdding(false);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setNewName('');
    setNewUrl('');
  };

  const handleRemove = (id: string) => {
    setShortcuts(prev => prev.filter(s => s.id !== id));
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(shortcuts, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'solace-shortcuts.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const parsed = JSON.parse(ev.target?.result as string);
        if (Array.isArray(parsed)) setShortcuts(parsed.slice(0, 7));
      } catch { /* ignore malformed JSON */ }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <motion.div
      className="fixed bottom-8 right-8 flex flex-col items-end gap-3 max-md:hidden"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <Reorder.Group
        axis="y"
        values={shortcuts}
        onReorder={setShortcuts}
        as="div"
        className="flex flex-col items-end gap-3"
      >
        <AnimatePresence>
          {shortcuts.map(shortcut => (
            <ShortcutItem key={shortcut.id} shortcut={shortcut} onRemove={handleRemove} />
          ))}
        </AnimatePresence>
      </Reorder.Group>

      {/* Bottom controls: export, import, add */}
      <motion.div variants={itemVariants} className="flex items-center gap-2 mt-1">
        {!isAdding && shortcuts.length > 0 && (
          <>
            <button
              onClick={handleExport}
              className="text-neutral-400 dark:text-neutral-600 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors duration-300"
              aria-label="Export shortcuts"
            >
              <Download size={12} strokeWidth={2} />
            </button>
            <label
              className="text-neutral-400 dark:text-neutral-600 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors duration-300 cursor-pointer"
              aria-label="Import shortcuts"
            >
              <Upload size={12} strokeWidth={2} />
              <input type="file" accept=".json" className="hidden" onChange={handleImport} />
            </label>
          </>
        )}

        {shortcuts.length < 7 && (
          isAdding ? (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              className="flex items-center gap-2 bg-white/80 dark:bg-neutral-900/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-stone-200 dark:border-neutral-800 shadow-2xl"
            >
              <input
                type="text"
                placeholder="Name"
                className="bg-transparent border-none outline-none text-stone-700 dark:text-neutral-300 w-16 placeholder:text-stone-300 dark:placeholder:text-neutral-600 focus:w-20 transition-all text-xs"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                autoFocus
              />
              <span className="text-stone-300 dark:text-neutral-700">/</span>
              <input
                type="text"
                placeholder="URL"
                className="bg-transparent border-none outline-none text-stone-700 dark:text-neutral-300 w-24 placeholder:text-stone-300 dark:placeholder:text-neutral-600 focus:w-32 transition-all text-xs"
                value={newUrl}
                onChange={e => setNewUrl(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAdd()}
              />
              <div className="flex bg-stone-100 dark:bg-neutral-800/50 rounded-md p-0.5 ml-1">
                <button
                  onClick={handleAdd}
                  className="p-1 rounded text-stone-500 dark:text-neutral-400 hover:text-green-600 dark:hover:text-green-500 hover:bg-stone-200 dark:hover:bg-neutral-800 transition-all"
                  aria-label="Confirm add shortcut"
                >
                  <Check size={12} strokeWidth={2.5} />
                </button>
                <button
                  onClick={handleCancel}
                  className="p-1 rounded text-stone-500 dark:text-neutral-400 hover:text-red-500 hover:bg-stone-200 dark:hover:bg-neutral-800 transition-all"
                  aria-label="Cancel add shortcut"
                >
                  <X size={12} strokeWidth={2.5} />
                </button>
              </div>
            </motion.div>
          ) : (
            <button
              onClick={() => setIsAdding(true)}
              className="text-neutral-400 dark:text-neutral-600 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors duration-300"
              aria-label="Add new shortcut"
            >
              <Plus size={14} strokeWidth={2} />
            </button>
          )
        )}
      </motion.div>
    </motion.div>
  );
}
