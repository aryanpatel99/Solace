import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Plus, X, Check } from 'lucide-react';

const MAX_LEN = 22;

function smartLabel(raw: string): { label: string; truncated: boolean } {
  const trimmed = raw.trim();
  try {
    // Only try URL parsing if the string looks URL-like
    if (/^https?:\/\//i.test(trimmed) || trimmed.includes('.') && trimmed.includes('/')) {
      const url = new URL(/^https?:\/\//i.test(trimmed) ? trimmed : 'https://' + trimmed);
      // Use the last meaningful path segment
      const parts = url.pathname.split('/').filter(Boolean);
      if (parts.length > 0) {
        const candidate = parts[parts.length - 1] || parts[parts.length - 2] || url.hostname;
        const label = candidate.length > MAX_LEN ? candidate.slice(0, MAX_LEN) + '…' : candidate;
        return { label, truncated: label !== raw };
      }
      // Fallback to hostname without www
      const host = url.hostname.replace(/^www\./, '');
      return { label: host, truncated: host !== raw };
    }
  } catch {
    // Not a valid URL — fall through to plain truncation
  }
  if (trimmed.length > MAX_LEN) {
    return { label: trimmed.slice(0, MAX_LEN) + '…', truncated: true };
  }
  return { label: trimmed, truncated: false };
}

interface Shortcut {
  id: string;
  name: string;
  url: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.4,
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

export default function ShortcutDock() {
  const [shortcuts, setShortcuts] = useState<Shortcut[]>(() => {
    const saved = localStorage.getItem('solace_shortcuts');
    return saved ? JSON.parse(saved) : [];
  });

  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('solace_shortcuts', JSON.stringify(shortcuts));
  }, [shortcuts]);

  const handleAdd = () => {
    if (!newName.trim() || !newUrl.trim() || shortcuts.length >= 7) return;

    // Auto-add https protocol if missing
    let finalUrl = newUrl.trim();
    if (!/^https?:\/\//i.test(finalUrl)) {
      finalUrl = 'https://' + finalUrl;
    }

    setShortcuts(prev => [...prev, {
      id: crypto.randomUUID(),
      name: newName.trim(),
      url: finalUrl
    }]);

    setNewName('');
    setNewUrl('');
    setIsAdding(false);
  };

  const handleRemove = (idToRemove: string) => {
    setShortcuts(prev => prev.filter(s => s.id !== idToRemove));
  };

  return (
    <motion.div
      className="fixed bottom-8 right-8 flex flex-col items-end gap-3 text-xs text-neutral-500 max-md:hidden"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <AnimatePresence>
        {shortcuts.map((shortcut) => (
          <motion.div
            key={shortcut.id}
            variants={itemVariants}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, x: 10, transition: { duration: 0.2 } }}
            className="flex items-center gap-2 group"
            onMouseEnter={() => setHoveredId(shortcut.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Hover to delete X icon */}
            <AnimatePresence>
              {hoveredId === shortcut.id && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => handleRemove(shortcut.id)}
                  className="text-neutral-700 hover:text-red-500 transition-colors"
                  aria-label="Remove shortcut"
                >
                  <X size={12} strokeWidth={2} />
                </motion.button>
              )}
            </AnimatePresence>
            <a
              href={shortcut.url}
              target="_blank"
              rel="noreferrer"
              title={shortcut.name}
              className="hover:text-neutral-200 transition-colors duration-300 cursor-pointer max-w-[160px] truncate"
            >
              {smartLabel(shortcut.name).label}
            </a>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Add Shortcut Section */}
      {shortcuts.length < 7 && (
        <motion.div variants={itemVariants} className="mt-1 flex items-center justify-end">
          {isAdding ? (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              className="flex items-center gap-2 bg-neutral-900/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-neutral-800 shadow-2xl"
            >
              <input
                type="text"
                placeholder="Name"
                className="bg-transparent border-none outline-none text-neutral-300 w-16 placeholder:text-neutral-600 focus:w-20 transition-all text-xs"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                autoFocus
              />
              <span className="text-neutral-700">/</span>
              <input
                type="text"
                placeholder="URL"
                className="bg-transparent border-none outline-none text-neutral-300 w-24 placeholder:text-neutral-600 focus:w-32 transition-all text-xs"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              />
              <div className="flex bg-neutral-800/50 rounded-md p-0.5 ml-1">
                <button
                  onClick={handleAdd}
                  className="p-1 rounded text-neutral-400 hover:text-green-500 hover:bg-neutral-800 transition-all"
                  aria-label="Confirm add shortcut"
                >
                  <Check size={12} strokeWidth={2.5} />
                </button>
                <button
                  onClick={() => setIsAdding(false)}
                  className="p-1 rounded text-neutral-400 hover:text-red-500 hover:bg-neutral-800 transition-all"
                  aria-label="Cancel add shortcut"
                >
                  <X size={12} strokeWidth={2.5} />
                </button>
              </div>
            </motion.div>
          ) : (
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center justify-center text-neutral-600 hover:text-neutral-200 transition-colors duration-300"
              aria-label="Add new shortcut"
            >
              <Plus size={14} strokeWidth={2} />
            </button>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
