import { motion } from "motion/react";
import { Heart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";

import img1 from "../../imports/008926.jpg";
import img2 from "../../imports/008927.jpg";
import img3 from "../../imports/008928.jpg";

const collections = [
  { emoji: "🎨", label: "7.8K VIEWS", title: "Digital Illustration", desc: "Chibi art, customized profile pictures, and whimsical custom assets.", images: [img1, img2, img3] },
  { emoji: "📸", label: "12 COLLECTIONS", title: "Pastel Aesthetics", desc: "Chasing sunsets, cozy room setups, and perfect latte art snaps.", images: [img3, img1, img2] },
  { emoji: "⭐", label: "COMING SOON", title: "Sticker Shop Plans", desc: "Designing hand-cut vinyl stickers of cute desserts and sleepy animals!", images: [img2, img3, img1] },
  { emoji: "☕", label: "ACTIVE DAILY", title: "Cozy Gaming Corner", desc: "Curating pastel setups, custom mechanical keyboards, and indie game reviews.", images: [img1, img3, img2] },
];

export function Gallery() {
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
          my little gallery 🐻
        </motion.h1>
        <p className="text-xs tracking-widest uppercase" style={{ color: "#f72585", fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}>
          a visual diary of what makes me smile
        </p>
      </div>

      {/* Collection cards with Carousel Dialog */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        {collections.map((c, i) => (
          <Dialog key={i}>
            <DialogTrigger asChild>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                whileHover={{ y: -3 }}
                className="rounded-2xl p-4 cursor-pointer text-left"
                style={{ background: "#fff5f8", border: "1.5px solid rgba(247,37,133,0.12)" }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-base"
                    style={{ background: "#ffe0ec" }}
                  >
                    {c.emoji}
                  </div>
                  <span className="text-[9px] tracking-widest uppercase font-bold" style={{ color: "#f72585", fontFamily: "'Quicksand', sans-serif" }}>
                    {c.label}
                  </span>
                </div>
                <h3 className="text-sm font-bold mb-1" style={{ color: "#c2185b", fontFamily: "'Quicksand', sans-serif" }}>
                  {c.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "#b05c7a" }}>
                  {c.desc}
                </p>
                <div className="flex justify-end mt-3">
                  <Heart size={12} color="rgba(247,37,133,0.4)" />
                </div>
              </motion.div>
            </DialogTrigger>
            
            <DialogContent className="sm:max-w-md rounded-3xl" style={{ background: "#fff0f5", border: "1.5px solid rgba(247,37,133,0.2)" }}>
              <DialogTitle className="text-center text-xl mb-2" style={{ color: "#c2185b", fontFamily: "'Quicksand', sans-serif" }}>
                {c.emoji} {c.title}
              </DialogTitle>
              <div className="px-8 pb-4">
                <Carousel>
                  <CarouselContent>
                    {c.images.map((img, idx) => (
                      <CarouselItem key={idx}>
                        <img src={img} alt={`${c.title} slide ${idx + 1}`} className="w-full h-auto rounded-xl object-cover shadow-sm aspect-square" />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>

      {/* Spotify embed */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-2xl overflow-hidden"
        style={{ border: "1.5px solid rgba(247,37,133,0.15)" }}
      >
        <div
          className="flex items-center justify-center gap-2 py-2.5 text-xs tracking-widest uppercase font-bold"
          style={{ background: "#fff0f5", color: "#f72585", fontFamily: "'Quicksand', sans-serif" }}
        >
          🎵 cozy soundtrack
        </div>
        <iframe
          style={{ borderRadius: "0 0 1rem 1rem" }}
          src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator&theme=0"
          width="100%"
          height="152"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="Spotify playlist"
        />
      </motion.div>
    </div>
  );
}