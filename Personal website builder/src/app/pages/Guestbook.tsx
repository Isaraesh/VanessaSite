import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Calendar } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL ?? "";

interface Entry {
  id: number;
  name: string;
  message: string;
  color: string;
  sticker: string;
  date: string;
}

const COLORS: { key: string; bg: string; border: string }[] = [
  { key: "pink", bg: "#ffe0ec", border: "#f72585" },
  { key: "lavender", bg: "#ede0ff", border: "#9b59b6" },
  { key: "peach", bg: "#ffe8d6", border: "#e07c3d" },
  { key: "yellow", bg: "#fff9cc", border: "#e6c800" },
  { key: "mint", bg: "#d4f5d4", border: "#2ecc71" },
  { key: "blue", bg: "#c8e6fa", border: "#3498db" },
  { key: "rose", bg: "#fadce6", border: "#e84393" },
];

const STICKERS = ["🌸", "🎀", "🧸", "🩰", "🍓", "✨", "💄", "💅", "👛", "🧚‍♀️"];

const SEED: Entry[] = [
  { id: 1, name: "@emma 🐇", message: "this space is so cozy and cute! i love the stickers so much! 💕", color: "pink", sticker: "🌸", date: "July 14, 2026" },
  { id: 2, name: "@lucas 🎮", message: "the new clickable photo galleries are awesome. awesome aesthetic!", color: "lavender", sticker: "🧸", date: "July 16, 2026" },
  { id: 3, name: "@sophie 🍰", message: "your sticker shop plans sound amazing. sign me up to get a dozen as soon as they open!", color: "yellow", sticker: "🎀", date: "July 17, 2026" },
];

function colorConfig(key: string) {
  return COLORS.find((c) => c.key === key) ?? COLORS[0];
}

export function Guestbook() {
  const [entries, setEntries] = useState<Entry[]>(SEED);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("pink");
  const [sticker, setSticker] = useState("🌸");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!API_URL) return;
    fetch(`${API_URL}/api/guestbook`)
      .then((r) => r.json())
      .then((data: Entry[]) => setEntries(data))
      .catch(() => {});
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setSubmitting(true);

    const newEntry: Entry = {
      id: Date.now(),
      name: name.trim(),
      message: message.trim(),
      color,
      sticker,
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    };

    if (API_URL) {
      try {
        const res = await fetch(`${API_URL}/api/guestbook`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newEntry),
        });
        const saved: Entry = await res.json();
        setEntries((prev) => [saved, ...prev]);
      } catch {
        setEntries((prev) => [newEntry, ...prev]);
      }
    } else {
      setEntries((prev) => [newEntry, ...prev]);
    }

    setName("");
    setMessage("");
    setSubmitting(false);
  }

  return (
    <div className="px-6 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl mb-1"
          style={{ fontFamily: "'Pacifico', cursive", color: "#c2185b" }}
        >
          guestbook 🎀
        </motion.h1>
        <p className="text-xs tracking-widest uppercase" style={{ color: "#f72585", fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}>
          leave a virtual sticky note on my cozy wall!
        </p>
      </div>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleSubmit}
        className="rounded-2xl p-5 mb-8"
        style={{ background: "#fff5f8", border: "1.5px solid rgba(247,37,133,0.15)" }}
      >
        <p className="text-xs font-bold tracking-widest uppercase mb-4 flex items-center gap-1.5" style={{ color: "#f72585", fontFamily: "'Quicksand', sans-serif" }}>
          <span>+</span> scribble a note
        </p>

        <input
          type="text"
          placeholder="your name/nickname"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={40}
          className="w-full rounded-xl px-4 py-2.5 text-sm mb-3 outline-none transition-all focus:ring-2"
          style={{
            background: "white",
            border: "1.5px solid rgba(247,37,133,0.2)",
            color: "#7a1a3e",
            fontFamily: "'Nunito', sans-serif",
          }}
        />

        <textarea
          placeholder="write something sweet..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={200}
          rows={3}
          className="w-full rounded-xl px-4 py-2.5 text-sm mb-4 outline-none resize-none transition-all focus:ring-2"
          style={{
            background: "white",
            border: "1.5px solid rgba(247,37,133,0.2)",
            color: "#7a1a3e",
            fontFamily: "'Nunito', sans-serif",
          }}
        />

        {/* Color picker */}
        <div className="mb-3">
          <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "#b05c7a", fontFamily: "'Quicksand', sans-serif" }}>
            note style:
          </p>
          <div className="flex gap-2 flex-wrap">
            {COLORS.map((c) => (
              <button
                key={c.key}
                type="button"
                onClick={() => setColor(c.key)}
                className="w-7 h-7 rounded-full transition-transform hover:scale-110"
                style={{
                  background: c.bg,
                  border: color === c.key ? `2.5px solid ${c.border}` : "2px solid rgba(0,0,0,0.1)",
                  boxShadow: color === c.key ? `0 0 0 2px white, 0 0 0 4px ${c.border}` : "none",
                  transform: color === c.key ? "scale(1.15)" : "scale(1)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Sticker picker */}
        <div className="mb-5">
          <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "#b05c7a", fontFamily: "'Quicksand', sans-serif" }}>
            add sticker:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {STICKERS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSticker(s)}
                className="w-9 h-9 rounded-xl text-lg flex items-center justify-center transition-all hover:scale-110"
                style={{
                  background: sticker === s ? "#ffe0ec" : "white",
                  border: sticker === s ? "2px solid #f72585" : "1.5px solid rgba(247,37,133,0.15)",
                  transform: sticker === s ? "scale(1.18)" : "scale(1)",
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
          style={{
            background: "linear-gradient(135deg, #f72585, #ff85a1)",
            color: "white",
            fontFamily: "'Quicksand', sans-serif",
            boxShadow: "0 6px 20px rgba(247,37,133,0.35)",
          }}
        >
          <span>✨</span>
          {submitting ? "pinning..." : "pin to wall!"}
          <Send size={13} />
        </button>
      </motion.form>

      {/* Sticky notes wall */}
      <div>
        <p className="text-[10px] font-bold tracking-widest uppercase mb-4 flex items-center gap-2" style={{ color: "#b05c7a", fontFamily: "'Quicksand', sans-serif" }}>
          <span>virtual sticky wall</span>
          <span
            className="rounded-full px-2 py-0.5 text-[9px]"
            style={{ background: "#f72585", color: "white" }}
          >
            {entries.length}
          </span>
        </p>

        <div className="flex flex-col gap-3">
          <AnimatePresence>
            {entries.map((entry, i) => {
              const c = colorConfig(entry.color);
              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: -12, rotate: -2 }}
                  animate={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? 0.5 : -0.5 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.04, type: "spring", stiffness: 260, damping: 22 }}
                  whileHover={{ rotate: 0, scale: 1.02 }}
                  className="rounded-2xl p-4 relative"
                  style={{ background: c.bg, border: `1.5px solid ${c.border}30` }}
                >
                  {/* Sticker badge */}
                  <div
                    className="absolute -top-2.5 -right-1 w-8 h-8 rounded-full flex items-center justify-center text-base shadow-sm"
                    style={{ background: "white", border: `1.5px solid ${c.border}40` }}
                  >
                    {entry.sticker}
                  </div>

                  <p className="text-xs font-bold mb-2" style={{ color: "#c2185b", fontFamily: "'Quicksand', sans-serif" }}>
                    {entry.name}
                  </p>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: "#7a1a3e" }}>
                    &ldquo;{entry.message}&rdquo;
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[10px]" style={{ color: "#b05c7a" }}>
                      <Calendar size={10} />
                      {entry.date}
                    </div>
                    <span className="text-xs" style={{ color: `${c.border}` }}>♥</span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}