import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Truck, Leaf, ArrowRight } from 'lucide-react'

const trustBadges = [
  { icon: Leaf, label: '100% Organic' },
  { icon: Truck, label: 'Fast Delivery' },
  { icon: ShieldCheck, label: 'Quality Assured' },
]

const fadeUp = { hidden: { opacity: 0, y: 28 }, show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.5, ease: 'easeOut' } }) }

export default function Hero() {
  return (
    <section className="relative w-full min-h-[92vh] flex items-center overflow-hidden">
      {/* Background image */}
      <img
        src="/Farm2.jpg"
        alt="Farm"
        className="absolute inset-0 w-full h-full object-cover object-center"
        onError={e => { e.currentTarget.src = '/farm%20image.jpg' }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full px-6 xl:px-16 py-20">
        <div className="max-w-2xl">
          <motion.span custom={0} variants={fadeUp} initial="hidden" animate="show"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/20 border border-green-400/40 text-green-300 text-sm font-semibold mb-5 backdrop-blur-sm">
            <Leaf className="w-3.5 h-3.5" /> Farm Fresh · Organic · Sustainable
          </motion.span>

          <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="show"
            className="text-[clamp(36px,6vw,72px)] font-extrabold text-white leading-[1.05] mb-5 tracking-tight">
            From the Farm,<br />
            <span className="text-green-400">Straight to You</span>
          </motion.h1>

          <motion.p custom={2} variants={fadeUp} initial="hidden" animate="show"
            className="text-white/75 text-lg leading-relaxed mb-8 max-w-lg">
            Discover fresh seeds, fruits, vegetables, tools, and nuts — grown by local farmers with love and care.
          </motion.p>

          <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show" className="flex gap-4 flex-wrap mb-12">
            <a href="#seeds"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-green-500 hover:bg-green-400 text-white font-bold text-base no-underline shadow-[0_8px_30px_rgba(74,222,128,0.4)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(74,222,128,0.5)] active:translate-y-0">
              Shop Now <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl border-2 border-white/30 text-white font-bold text-base no-underline backdrop-blur-sm hover:bg-white/10 hover:border-white/50 transition-all duration-200 hover:-translate-y-1 active:translate-y-0">
              Learn More
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show" className="flex flex-wrap gap-3">
            {trustBadges.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm text-white text-sm font-medium">
                <Icon className="w-4 h-4 text-green-400" />
                {label}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Stats bar */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.5 }}
        className="absolute bottom-0 left-0 right-0 bg-white/10 dark:bg-black/20 backdrop-blur-md border-t border-white/10">
        <div className="w-full px-6 xl:px-16 py-4 flex flex-wrap justify-center sm:justify-start gap-8 sm:gap-16">
          {[['500+', 'Products'], ['50+', 'Local Farmers'], ['10k+', 'Happy Customers'], ['100%', 'Organic']].map(([num, label]) => (
            <div key={label} className="text-center sm:text-left">
              <div className="text-xl font-extrabold text-white">{num}</div>
              <div className="text-xs text-white/60">{label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
