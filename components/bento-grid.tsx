"use client"

import type React from "react"

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { Zap, Flame, Brain, Sparkles } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "75mg",
    subtitle: "Natural Caffeine",
    description: "Clean energy without the crash",
    accent: "#FF1493",
  },
  {
    icon: Flame,
    title: "Zero",
    subtitle: "Sugar Added",
    description: "All the taste, none of the guilt",
    accent: "#FF6B35",
  },
  {
    icon: Brain,
    title: "100%",
    subtitle: "Mental Clarity",
    description: "Enhanced focus & concentration",
    accent: "#00D4FF",
  },
  {
    icon: Sparkles,
    title: "B12",
    subtitle: "Vitamin Complex",
    description: "Essential nutrients for energy",
    accent: "#FF1493",
  },
]

function FeatureCard({ feature, index }: { feature: (typeof features)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    x.set(mouseX / width - 0.5)
    y.set(mouseY / height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative group cursor-pointer"
    >
      {/* Animated border glow */}
      <motion.div
        className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${feature.accent}40, transparent, ${feature.accent}40)`,
          filter: "blur(8px)",
        }}
      />

      {/* Card */}
      <div className="relative bg-[#1a1a1a] rounded-2xl p-5 border border-white/10 overflow-hidden h-full">
        {/* Shine effect on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100"
          initial={false}
          animate={
            isHovered
              ? {
                  background: [
                    "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.03) 25%, transparent 30%)",
                    "linear-gradient(105deg, transparent 70%, rgba(255,255,255,0.03) 75%, transparent 80%)",
                  ],
                }
              : {}
          }
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full min-h-[140px]">
          {/* Icon with pulse animation */}
          <motion.div
            className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 relative"
            style={{ backgroundColor: `${feature.accent}20` }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <motion.div
              className="absolute inset-0 rounded-xl"
              style={{ backgroundColor: feature.accent }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isHovered ? { opacity: [0.2, 0.4, 0.2], scale: [1, 1.2, 1] } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            />
            <feature.icon className="w-5 h-5 relative z-10" style={{ color: feature.accent }} />
          </motion.div>

          {/* Title with count-up feel */}
          <div className="flex-1">
            <motion.div
              className="text-3xl font-black tracking-tight text-white"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 + index * 0.1 }}
            >
              <span style={{ color: feature.accent }}>{feature.title}</span>
            </motion.div>
            <h3 className="text-sm font-semibold text-white mt-1">{feature.subtitle}</h3>
            <p className="text-xs text-white/50 mt-1 font-mono">{feature.description}</p>
          </div>

          {/* Bottom accent line */}
          <motion.div
            className="h-[2px] rounded-full mt-4"
            style={{ backgroundColor: feature.accent }}
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 + index * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
          />
        </div>
      </div>
    </motion.div>
  )
}

export function BentoGrid() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <section id="formula" className="relative py-16 bg-[#121212] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-[#0a0a0a] to-[#121212]" />

      <div ref={ref} className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <motion.span
            className="inline-block font-mono text-[#FF1493] text-[10px] tracking-[0.3em] uppercase"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: 0.1 }}
          >
            What's Inside
          </motion.span>

          <div className="overflow-hidden mt-2">
            <motion.h2
              className="text-3xl md:text-4xl font-black text-white tracking-tight"
              initial={{ y: 60 }}
              animate={isInView ? { y: 0 } : { y: 60 }}
              transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1], delay: 0.15 }}
            >
              Formula & Benefits
            </motion.h2>
          </div>

          {/* Animated underline */}
          <motion.div
            className="h-[2px] w-12 bg-[#FF1493] mx-auto mt-3 rounded-full"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
          />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
