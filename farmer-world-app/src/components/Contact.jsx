import React from 'react'

export default function Contact() {
  return (
    <section id="contact" className="contact section">
      <div className="container contact-inner">
        <div className="contact-card">
          <h2>Contact</h2>
          <p>Questions or feedback? We’d love to hear from you.</p>
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-row">
              <input type="text" placeholder="Your name" required />
              <input type="email" placeholder="Email address" required />
            </div>
            <textarea rows="5" placeholder="Message" required></textarea>
            <button className="btn btn-primary" type="submit">Send Message</button>
          </form>
        </div>
        <div className="contact-illustration" aria-hidden="true">
          <img className="contact-img" src="/social1.jpg" alt="Contact illustration" referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.src = '/placeholder.svg' }} />
        </div>
      </div>
    </section>
  )
}


