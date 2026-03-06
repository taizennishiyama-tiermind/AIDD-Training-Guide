import { motion } from 'framer-motion'

export function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(212, 118, 78, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212, 118, 78, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Gradient orbs */}
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -20, 10, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(212, 118, 78, 0.15) 0%, transparent 70%)',
        }}
      />
      <motion.div
        animate={{
          x: [0, -20, 30, 0],
          y: [0, 20, -10, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(192, 106, 68, 0.12) 0%, transparent 70%)',
        }}
      />

      {/* Floating particles */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4 + i * 1.5,
            repeat: Infinity,
            delay: i * 0.8,
            ease: 'easeInOut',
          }}
          className="absolute w-1.5 h-1.5 rounded-full bg-primary-400"
          style={{
            top: `${15 + i * 14}%`,
            left: `${10 + i * 15}%`,
          }}
        />
      ))}
    </div>
  )
}
