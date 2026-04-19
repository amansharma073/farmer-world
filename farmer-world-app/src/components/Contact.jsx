import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, User, MessageSquare, Send, Clock, Phone, MapPin } from 'lucide-react'
import { toast } from 'react-hot-toast'

function Field({ icon: Icon, error, ...props }) {
  return (
    <div className="relative">
      <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      <input
        {...props}
        className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm bg-white dark:bg-gray-800 dark:text-gray-200 outline-none transition-all duration-200
          focus:ring-2 focus:ring-green-100 dark:focus:ring-green-900 focus:border-green-500
          ${error ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'}`}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length) { setErrors(e2); return }
    setErrors({})
    setForm({ name: '', email: '', message: '' })
    toast.success('Message sent! We\'ll reply within 24 hours.', {
      icon: '✉️',
      style: { borderRadius: '12px', fontSize: '14px' },
      duration: 4000,
    })
  }

  return (
    <section id="contact" className="py-20 w-full bg-gradient-to-br from-green-50 to-white dark:from-gray-900 dark:to-gray-900">
      <div className="w-full px-4 sm:px-6 xl:px-16">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white m-0">Get in Touch</h2>
          <div className="mt-2 h-1 w-10 rounded-full bg-green-500" />
          <p className="mt-3 text-gray-500 dark:text-gray-400 text-sm">We'd love to hear from you. Send us a message and we'll respond promptly.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Form — 3 cols */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-3xl p-7 shadow-[0_8px_40px_rgba(0,0,0,0.07)] border border-gray-100 dark:border-gray-700">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field icon={User} type="text" placeholder="Your name" value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))} error={errors.name} />
                <Field icon={Mail} type="email" placeholder="Email address" value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))} error={errors.email} />
              </div>
              <div className="relative">
                <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
                <textarea
                  rows={5}
                  placeholder="Your message..."
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm bg-white dark:bg-gray-800 dark:text-gray-200 outline-none resize-y transition-all duration-200 focus:ring-2 focus:ring-green-100 dark:focus:ring-green-900 focus:border-green-500 ${errors.message ? 'border-red-400' : 'border-gray-200 dark:border-gray-700'}`}
                />
                {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
              </div>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <p className="text-xs text-gray-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> Typical response within 24 hours
                </p>
                <button type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-sm border-0 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 shadow-[0_4px_14px_rgba(47,160,106,0.4)] active:translate-y-0">
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </div>
            </form>
          </motion.div>

          {/* Info — 2 cols */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="lg:col-span-2 flex flex-col gap-5">
            {/* Image */}
            <div className="relative rounded-3xl overflow-hidden h-52 shadow-lg">
              <img src="/TractorFarm1.webp" alt="Farm" className="w-full h-full object-cover"
                onError={e => { e.currentTarget.src = '/placeholder.svg' }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="font-bold text-base m-0">We're here to help</p>
                <p className="text-white/70 text-xs m-0">Reach out anytime</p>
              </div>
            </div>

            {/* Contact info cards */}
            {[
              { icon: Mail, label: 'Email', value: 'hello@farmerworld.in' },
              { icon: Phone, label: 'Phone', value: '+91 98765 43210' },
              { icon: MapPin, label: 'Location', value: 'Mumbai, Maharashtra' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 m-0">{label}</p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 m-0">{value}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
