"use client"

import type React from "react"

import { motion, AnimatePresence, useSpring } from "framer-motion"
import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const flavors = [
  {
    id: 1,
    name: "Lemon Lime",
    tagline: "Citrus Shock",
    description: "A zesty explosion of natural lemon and lime that wakes you up instantly.",
    image: "/images/drink2.png",
    bgColor: "from-[#84cc16]/20 via-[#84cc16]/10 to-transparent",
    accentColor: "#84cc16",
  },
  {
    id: 2,
    name: "Pineapple Coconut",
    tagline: "Tropical Rush",
    description: "Island vibes with every sip. Transport yourself to paradise.",
    image: "/images/drink1.png",
    bgColor: "from-[#f59e0b]/20 via-[#f59e0b]/10 to-transparent",
    accentColor: "#f59e0b",
  },
  {
    id: 3,
    name: "Mystery",
    tagline: "Coming Soon",
    description: "Something epic is brewing... Stay tuned.",
    image: "/mystery-energy-drink-can-silhouette.jpg",
    bgColor: "from-[#FF1493]/20 via-[#FF1493]/5 to-transparent",
    accentColor: "#FF1493",
    mystery: true,
  },
]

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
    rotateY: direction > 0 ? 15 : -15,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
    scale: 0.9,
    rotateY: direction > 0 ? -15 : 15,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  }),
}

export function FlavorCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [[page, direction], setPage] = useState([0, 0])
  const currentFlavor = flavors[currentIndex]

  const rotateX = useSpring(0, { stiffness: 150, damping: 20 })
  const rotateY = useSpring(0, { stiffness: 150, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const x = (e.clientX - centerX) / (rect.width / 2)
    const y = (e.clientY - centerY) / (rect.height / 2)
    rotateY.set(x * 5)
    rotateX.set(-y * 5)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  const paginate = (newDirection: number) => {
    const newIndex = (currentIndex + newDirection + flavors.length) % flavors.length
    setCurrentIndex(newIndex)
    setPage([page + newDirection, newDirection])
  }

  const nextFlavor = () => paginate(1)
  const prevFlavor = () => paginate(-1)

  return (
    <section id="flavours" className="relative py-16 bg-white overflow-hidden">
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${currentFlavor.bgColor}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        key={currentFlavor.id}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center mb-10"
        >
          <motion.span
            className="font-mono text-[#121212]/60 text-xs tracking-widest"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            OUR FLAVOURS
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-black text-[#121212] tracking-tighter mt-2 overflow-hidden">
            <motion.span
              className="inline-block"
              initial={{ y: 80 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            >
              CHOOSE YOUR{" "}
            </motion.span>
            <motion.span
              className="inline-block"
              style={{ color: currentFlavor.accentColor }}
              initial={{ y: 80 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1], delay: 0.1 }}
            >
              FUEL
            </motion.span>
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div className="flex items-center justify-center gap-6">
            <motion.button
              onClick={prevFlavor}
              className="hidden md:flex w-12 h-12 rounded-full border-2 border-[#121212] items-center justify-center hover:bg-[#121212] hover:text-white transition-colors"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentFlavor.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="relative w-full max-w-3xl"
                style={{ perspective: 1000 }}
              >
                <motion.div
                  className={`bg-white rounded-3xl p-6 md:p-8 border-2 border-[#121212]/10 shadow-xl ${currentFlavor.mystery ? "relative overflow-hidden" : ""}`}
                  style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  {currentFlavor.mystery && (
                    <motion.div
                      className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%270 0 100 100%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noise%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noise)%27/%3E%3C/svg%3E')] opacity-10 pointer-events-none"
                      animate={{ opacity: [0.05, 0.15, 0.05] }}
                      transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
                    />
                  )}

                  <div className="grid md:grid-cols-2 gap-6 items-center">
                    <motion.div
                      className="relative aspect-[3/4] flex items-center justify-center"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <Image
                        src={currentFlavor.image || "/placeholder.svg"}
                        alt={currentFlavor.name}
                        fill
                        className={`object-contain ${currentFlavor.mystery ? "blur-sm grayscale" : ""}`}
                      />
                      {currentFlavor.mystery && (
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center"
                          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        >
                          <span className="text-7xl font-black text-[#121212]/20">?</span>
                        </motion.div>
                      )}
                    </motion.div>

                    <div className="space-y-4">
                      <div>
                        <motion.span
                          className="font-mono text-xs tracking-widest"
                          style={{ color: currentFlavor.accentColor }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          {currentFlavor.tagline}
                        </motion.span>
                        <motion.h3
                          className="text-3xl md:text-4xl font-black text-[#121212] tracking-tighter mt-1"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                        >
                          {currentFlavor.name}
                        </motion.h3>
                      </div>

                      <motion.p
                        className="text-sm text-[#121212]/60 font-mono"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        {currentFlavor.description}
                      </motion.p>

                      {!currentFlavor.mystery && (
                        <motion.div
                          className="flex flex-wrap gap-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          {["Zero Sugar", "Metabolism Boost", "Natural Flavours", "Vitamin Rich"].map((badge) => (
                            <span
                              key={badge}
                              className="px-2 py-1 bg-[#121212]/5 rounded-full text-xs font-mono text-[#121212]/60"
                            >
                              {badge}
                            </span>
                          ))}
                        </motion.div>
                      )}

                      {!currentFlavor.mystery && (
                        <motion.button
                          className="px-6 py-3 rounded-full font-bold text-sm tracking-wide w-full md:w-auto relative overflow-hidden"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                          style={{ backgroundColor: currentFlavor.accentColor, color: "#121212" }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <motion.span
                            className="absolute inset-0 bg-white/20"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "100%" }}
                            transition={{ duration: 0.5 }}
                          />
                          <span className="relative z-10">Add to Cart</span>
                        </motion.button>
                      )}

                      {currentFlavor.mystery && (
                        <motion.div
                          className="flex items-center gap-3"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          <motion.div
                            className="w-2 h-2 bg-[#FF1493] rounded-full"
                            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                          />
                          <span className="font-mono text-xs text-[#121212]/60">Dropping soon...</span>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            <motion.button
              onClick={nextFlavor}
              className="hidden md:flex w-12 h-12 rounded-full border-2 border-[#121212] items-center justify-center hover:bg-[#121212] hover:text-white transition-colors"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>

          <div className="flex md:hidden justify-center gap-4 mt-6">
            <motion.button
              onClick={prevFlavor}
              className="w-10 h-10 rounded-full border-2 border-[#121212] flex items-center justify-center"
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>
            <motion.button
              onClick={nextFlavor}
              className="w-10 h-10 rounded-full border-2 border-[#121212] flex items-center justify-center"
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {flavors.map((flavor, index) => (
              <motion.button
                key={flavor.id}
                onClick={() => {
                  const newDirection = index > currentIndex ? 1 : -1
                  setCurrentIndex(index)
                  setPage([index, newDirection])
                }}
                className="h-2 rounded-full transition-all"
                style={{
                  backgroundColor: index === currentIndex ? flavor.accentColor : "#12121220",
                }}
                animate={{
                  width: index === currentIndex ? 28 : 10,
                }}
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
