import { useState } from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { api } from "../api";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponseMsg("");

    try {
      const res = await api.post("/contact", formData);
      if (res.status === 200 || res.status === 201) {
        setResponseMsg("✅ Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setResponseMsg("❌ Failed to send message.");
      }
    } catch (error) {
      setResponseMsg("❌ Server error. Try again later.");
    }

    setLoading(false);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        {/* Header */}
        <div className="contact-header">
          <h2 className="section-title">
            Let's <span className="accent">Collaborate</span>
          </h2>
          <p className="section-subtitle">
            I'm currently looking for new opportunities as a MERN Stack Developer.
            Whether you have a question or just want to say hi, my inbox is always open!
          </p>

          {/* Social Links */}
          <div className="social-links">
            <a
              href="https://www.linkedin.com/in/harsh-aerndolkar-723596262"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link linkedin"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/harsh2004-oss"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link github"
            >
              <FaGithub />
            </a>
            <a
              href="mailto:harshaerndolkar4@gmail.com"
              className="social-link mail"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Subject</label>
            <input
              type="text"
              name="subject"
              placeholder="How can I help you?"
              value={formData.subject}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea
              name="message"
              placeholder="Write your message here..."
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>

          {responseMsg && <p className="response-msg">{responseMsg}</p>}
        </form>
      </div>
    </section>
  );
};

export default Contact;