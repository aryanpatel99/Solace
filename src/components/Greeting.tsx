import { useState } from 'react';

function getGreeting(now: Date): string {
  const hour = now.getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function Greeting({ now }: { now: Date }) {
  const [name, setName] = useState<string>(() => localStorage.getItem('solace_name') ?? '');
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');

  const handleStartEdit = () => {
    setDraft(name);
    setEditing(true);
  };

  const handleSave = () => {
    const trimmed = draft.trim();
    if (trimmed) {
      setName(trimmed);
      localStorage.setItem('solace_name', trimmed);
    }
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') setEditing(false);
  };

  if (editing) {
    return (
      <input
        autoFocus
        value={draft}
        onChange={e => setDraft(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleSave}
        className="bg-transparent text-center text-sm text-stone-500 dark:text-neutral-500 outline-none border-b border-stone-300 dark:border-neutral-700 pb-0.5 w-40 placeholder:text-stone-300 dark:placeholder:text-neutral-700"
        placeholder="your name"
        maxLength={30}
      />
    );
  }

  if (!name) {
    return (
      <button
        onClick={handleStartEdit}
        className="text-xs text-stone-300 dark:text-neutral-700 hover:text-stone-500 dark:hover:text-neutral-500 transition-colors duration-300"
      >
        + add your name
      </button>
    );
  }

  return (
    <button
      onClick={handleStartEdit}
      className="text-sm text-stone-400 dark:text-neutral-500 hover:text-stone-600 dark:hover:text-neutral-400 transition-colors duration-300"
      title="Click to edit"
    >
      {getGreeting(now)}, {name}
    </button>
  );
}
