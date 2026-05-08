"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const lifestyleImages = [
  { src: "/energy-drink-lifestyle-gym-workout.jpg", aspect: "portrait" },
  { src: "/content-creator-streaming-setup-neon.jpg", aspect: "landscape" },
  { src: "/skateboarder-urban-street-sunset.jpg", aspect: "square" },
  { src: "/student-studying-library-late-night.jpg", aspect: "landscape" },
  { src: "/entrepreneur-startup-office-meeting.jpg", aspect: "portrait" },
  { src: "/athlete-fitness-morning-routine.jpg", aspect: "square" },
]

const socialPosts = [
  { handle: "@creativekatie", text: "NIVI got me through my entire album production. No cap 🔥", likes: "2.4k" },
  { handle: "@fitnessjay", text: "Zero sugar but 100% energy. This is the one.", likes: "1.8k" },
  { handle: "@techbro_sam", text: "Finally an energy drink that doesn't taste like chemicals", likes: "956" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
}

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
}

export function LifestyleSection() {
  const gridRef = useRef(null)
  const cardsRef = useRef(null)
  const isGridInView = useInView(gridRef, { once: true, margin: "-50px" })
  const isCardsInView = useInView(cardsRef, { once: true, margin: "-50px" })

  return (
    <section className="relative py-32 bg-[#121212] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center mb-16"
        >
          <motion.span
            className="font-mono text-[#FF1493] text-sm tracking-widest inline-block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            COMMUNITY
          </motion.span>
          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter mt-4 overflow-hidden">
            <motion.span
              className="inline-block"
              initial={{ y: 100 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1], delay: 0.15 }}
            >
              NIVI ON THE{" "}
            </motion.span>
            <motion.span
              className="text-[#FF1493] inline-block"
              initial={{ y: 100 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1], delay: 0.25 }}
            >
              GRIND
            </motion.span>
          </h2>
        </motion.div>

        <motion.div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate={isGridInView ? "visible" : "hidden"}
        >
          {lifestyleImages.map((img, index) => (
            <motion.div
              key={index}
              variants={imageVariants}
              whileHover={{
                scale: 1.03,
                zIndex: 10,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
              className={`relative overflow-hidden rounded-2xl bg-white/5 ${
                img.aspect === "portrait" ? "row-span-2" : ""
              } ${img.aspect === "landscape" ? "col-span-2" : ""}`}
            >
              <div
                className={`${img.aspect === "portrait" ? "aspect-[3/4]" : img.aspect === "landscape" ? "aspect-[16/9]" : "aspect-square"} relative group`}
              >
                <motion.img
                  src={img.src}
                  alt={`NIVI Instagram post ${index + 1}`}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
                <motion.div
                  className="absolute inset-0 bg-[#FF1493]/0 group-hover:bg-[#FF1493]/20"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-6 mt-16"
          variants={containerVariants}
          initial="hidden"
          animate={isCardsInView ? "visible" : "hidden"}
        >
          {socialPosts.map((post, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { type: "spring", stiffness: 400, damping: 17 },
              }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  className="w-10 h-10 rounded-full bg-[#FF1493]/20 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <span className="text-[#FF1493] font-bold text-sm">{post.handle.charAt(1).toUpperCase()}</span>
                </motion.div>
                <span className="font-mono text-white/60 text-sm">{post.handle}</span>
              </div>
              <p className="text-white text-lg leading-relaxed">{post.text}</p>
              <motion.div
                className="flex items-center gap-2 mt-4 text-white/40 font-mono text-sm"
                whileHover={{ color: "#FF1493" }}
                transition={{ duration: 0.2 }}
              >
                <motion.svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </motion.svg>
                {post.likes}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
