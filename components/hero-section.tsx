"use client"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
}

const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      delay: 0.3,
    },
  },
}

export function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const rawY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const y = useSpring(rawY, springConfig)

  const rawTextX1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const textX1 = useSpring(rawTextX1, springConfig)

  const rawTextX2 = useTransform(scrollYProgress, [0, 1], [0, 100])
  const textX2 = useSpring(rawTextX2, springConfig)

  const rawScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])
  const scale = useSpring(rawScale, springConfig)

  const rawOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const opacity = useSpring(rawOpacity, springConfig)

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white noise-overlay"
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#FF1493]/5 to-white" />

      <motion.div
        className="absolute top-20 left-10 w-24 h-24 rounded-full bg-[#FF1493]/20 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-40 right-20 w-32 h-32 rounded-full bg-[#FF1493]/10 blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-12">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <motion.div style={{ opacity }} className="space-y-5">
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              custom={0}
              className="inline-flex items-center gap-2 bg-[#121212] text-white px-3 py-1.5 rounded-full text-xs font-mono tracking-wider"
            >
              <motion.span
                className="w-2 h-2 bg-[#FF1493] rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
              BETTER-FOR-YOU ENERGY DRINK
            </motion.div>

            <div className="space-y-1 overflow-hidden">
              <motion.h1
                style={{ x: textX1 }}
                className="text-5xl md:text-7xl font-black tracking-tighter text-[#121212] leading-[0.9]"
              >
                <motion.span
                  variants={fadeUpVariants}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                  className="inline-block"
                >
                  FUEL YOUR
                </motion.span>
              </motion.h1>
              <motion.h1
                style={{ x: textX2 }}
                className="text-5xl md:text-7xl font-black tracking-tighter text-[#121212] leading-[0.9]"
              >
                <motion.span
                  variants={fadeUpVariants}
                  initial="hidden"
                  animate="visible"
                  custom={2}
                  className="inline-block text-[#FF1493]"
                >
                  AMBITION
                </motion.span>
              </motion.h1>
              <motion.p
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                custom={3}
                className="text-lg md:text-xl font-mono text-[#121212]/60 tracking-tight pt-2 max-w-md"
              >
                Zero sugar. Natural flavors. Clean energy that hits different.
              </motion.p>
            </div>

            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              custom={4}
              className="flex flex-wrap gap-3 pt-2"
            >
              <motion.button
                className="bg-[#FF1493] text-white px-6 py-3 rounded-full font-bold text-sm tracking-wide flex items-center gap-2 group relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
                  whileHover={{ x: "200%" }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10">Sign Up & Save 25%</span>
                <motion.svg
                  className="w-4 h-4 relative z-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  initial={{ x: 0 }}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </motion.button>
              <motion.button
                className="border-2 border-[#121212] text-[#121212] px-6 py-3 rounded-full font-bold text-sm tracking-wide relative overflow-hidden"
                whileHover={{ scale: 1.02, backgroundColor: "#121212", color: "#fff" }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                Explore Flavours
              </motion.button>
            </motion.div>

            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              custom={5}
              className="flex flex-wrap gap-4 pt-2"
            >
              {["Zero Sugar", "75mg Caffeine", "Natural Flavours", "Vitamin B Rich"].map((benefit, i) => (
                <motion.div
                  key={benefit}
                  className="flex items-center gap-2 text-xs font-mono text-[#121212]/60"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                >
                  <div className="w-1.5 h-1.5 bg-[#FF1493] rounded-full" />
                  {benefit}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div style={{ y, scale }} className="relative flex justify-center">
            <motion.div variants={scaleInVariants} initial="hidden" animate="visible" className="relative">
              <motion.div
                className="absolute inset-0 bg-[#84cc16]/30 blur-[80px] rounded-full scale-75"
                animate={{
                  scale: [0.75, 0.85, 0.75],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />

              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 2, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src="/images/drink2.png"
                  alt="NIVI Energy Drink - Lemon Lime Flavour"
                  width={350}
                  height={630}
                  className="relative z-10 drop-shadow-2xl"
                  priority
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <div className="w-5 h-8 border-2 border-[#121212]/30 rounded-full flex justify-center pt-1.5">
              <motion.div
                className="w-1 h-2 bg-[#121212]/30 rounded-full"
                animate={{ y: [0, 6, 0], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
