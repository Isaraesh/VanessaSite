import { motion } from "motion/react";
import { Instagram, Twitter, Github, Music, Youtube, Coffee } from "lucide-react";

const interests = ["🎮 gaming", "🎵 lo-fi music", "🍵 matcha", "🌸 art"];

const socials = [
  { icon: Instagram, label: "instagram", handle: "@vanessapastel", color: "#E1306C" },
  { icon: Twitter, label: "twitter", handle: "@vanessacreates", color: "#1DA1F2" },
  { icon: Github, label: "github", handle: "vanessa-dev", color: "#7a1a3e" },
  { icon: Music, label: "spotify", handle: "cozy playlist", color: "#1DB954" },
  { icon: Youtube, label: "youtube", handle: "vanessa vlogs", color: "#FF0000" },
  { icon: Coffee, label: "ko-fi", handle: "buy me a matcha", color: "#FF5E5B" },
];

export function Home() {
  return (
    <div className="px-8 py-10 flex flex-col items-center text-center">
      <style>{`
        @keyframes pulse-glow { 0%,100%{box-shadow:0 0 0 0 rgba(247,37,133,0.25)} 50%{box-shadow:0 0 0 18px rgba(247,37,133,0)} }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .avatar-ring { animation: pulse-glow 3s ease-in-out infinite; }
        .sparkle-badge { animation: spin-slow 6s linear infinite; }
      `}</style>

      {/* Avatar */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        className="relative mb-6"
      >
        <div
          className="avatar-ring w-28 h-28 rounded-full flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #ffb3c6, #f72585)" }}
        >
          <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center">
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
              <circle cx="26" cy="19" r="11" fill="white" fillOpacity="0.9" />
              <ellipse cx="26" cy="42" rx="17" ry="11" fill="white" fillOpacity="0.9" />
            </svg>
          </div>
        </div>
        {/* Floating sparkle badge */}
        <div
          className="sparkle-badge absolute -top-1 -right-1 w-9 h-9 rounded-full flex items-center justify-center text-base shadow-md"
          style={{ background: "linear-gradient(135deg, #f72585, #ff85a1)", border: "2px solid white" }}
        >
          🌸
        </div>
      </motion.div>

      {/* Name */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-4xl mb-1"
        style={{ fontFamily: "'Pacifico', cursive", color: "#c2185b" }}
      >
        hi, i&apos;m Vanessa 🌸
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.18 }}
        className="text-xs tracking-widest uppercase mb-5"
        style={{ color: "#f72585", fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}
      >
        dreamer • creator • cozy corner
      </motion.p>

      {/* Bio */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="text-sm leading-relaxed mb-6"
        style={{ color: "#9e4a6e", maxWidth: "320px" }}
      >
        welcome to my tiny pastel corner of the internet! i make cozy things, collect cute stickers, and drink way too much matcha. nice to meet ya! ✨
      </motion.p>

      {/* Interest tags */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.32 }}
        className="flex flex-wrap justify-center gap-2 mb-8"
      >
        {interests.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{
              background: "#fff0f5",
              color: "#c2185b",
              border: "1.5px solid rgba(247,37,133,0.25)",
              fontFamily: "'Quicksand', sans-serif",
            }}
          >
            {tag}
          </span>
        ))}
      </motion.div>

      {/* Social links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.38 }}
        className="w-full flex flex-col gap-2"
      >
        {socials.map(({ icon: Icon, label, handle, color }) => (
          <div
            key={label}
            className="flex items-center justify-between px-4 py-3 rounded-2xl cursor-pointer transition-all duration-200 hover:scale-[1.02]"
            style={{ background: "#fff5f8", border: "1.5px solid rgba(247,37,133,0.12)" }}
          >
            <div className="flex items-center gap-3">
              <Icon size={18} style={{ color }} />
              <span className="text-sm font-semibold" style={{ color: "#7a1a3e" }}>
                {label}
              </span>
            </div>
            <span className="text-xs" style={{ color: "#f72585", fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}>
              {handle}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}