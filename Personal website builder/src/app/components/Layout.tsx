import { NavLink, Outlet, useLocation } from "react-router";
import { Home, Image, BookOpen } from "lucide-react";
import { motion } from "motion/react";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/gallery", label: "Gallery", icon: Image },
  { to: "/guestbook", label: "Guestbook", icon: BookOpen },
];

export function Layout() {
  const location = useLocation();

  return (
    <div
      className="min-h-screen flex flex-col items-center py-10 px-4"
      style={{ fontFamily: "'Nunito', sans-serif", background: "linear-gradient(135deg, #fff0f5 0%, #ffe8f0 50%, #ffd6e7 100%)" }}
    >
      {/* Floating decorative blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[8%] left-[5%] w-40 h-40 rounded-full opacity-20" style={{ background: "#f72585", filter: "blur(60px)", animation: "float1 8s ease-in-out infinite" }} />
        <div className="absolute top-[60%] right-[5%] w-56 h-56 rounded-full opacity-15" style={{ background: "#ff85a1", filter: "blur(80px)", animation: "float2 10s ease-in-out infinite" }} />
        <div className="absolute bottom-[10%] left-[15%] w-32 h-32 rounded-full opacity-20" style={{ background: "#ffb3c6", filter: "blur(50px)", animation: "float3 7s ease-in-out infinite" }} />
      </div>

      <style>{`
        @keyframes float1 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-20px)} }
        @keyframes float2 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(18px)} }
        @keyframes float3 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-14px)} }
        @keyframes sparkle { 0%,100%{opacity:0;transform:scale(0.5) rotate(0deg)} 50%{opacity:1;transform:scale(1) rotate(180deg)} }
        .nav-pill { transition: background 0.25s, color 0.25s, box-shadow 0.25s; }
        .nav-pill:hover { background: #ffe0ec; }
        .page-card { box-shadow: 0 8px 40px rgba(247,37,133,0.10), 0 2px 8px rgba(247,37,133,0.06); }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Nav pill */}
      <nav className="relative z-10 mb-8">
        <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm rounded-full px-2 py-2 shadow-lg" style={{ border: "1.5px solid rgba(247,37,133,0.18)" }}>
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} end={to === "/"}>
              {({ isActive }) => (
                <span
                  className="nav-pill flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold"
                  style={{
                    fontFamily: "'Quicksand', sans-serif",
                    background: isActive ? "#f72585" : "transparent",
                    color: isActive ? "#fff" : "#b05c7a",
                    boxShadow: isActive ? "0 4px 15px rgba(247,37,133,0.35)" : "none",
                  }}
                >
                  <Icon size={14} />
                  {label}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Page content card */}
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg bg-white/90 backdrop-blur-sm rounded-3xl page-card overflow-hidden"
        style={{ border: "1.5px solid rgba(247,37,133,0.12)" }}
      >
        <Outlet />
      </motion.main>

      {/* Footer */}
      <p className="relative z-10 mt-6 text-xs" style={{ color: "#c47a98", fontFamily: "'Quicksand', sans-serif" }}>
        made with ♥ &amp; sparkles • © 2026
      </p>
    </div>
  );
}
