import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import emailjs from '@emailjs/browser'; // ADD THIS IMPORT
import "./Contact.css";

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Contact methods
  const contactMethods = [
    {
      type: "Email",
      value: "saisadwiikkatam@gmail.com",
      icon: "✉️",
      color: "#EA4335",
      action: "mailto:saisadwiikkatam@gmail.com",
      description: "For direct inquiries and conversations"
    },
    {
      type: "LinkedIn",
      value: "linkedin.com/in/saisadwiik",
      icon: "💼",
      color: "#0A66C2",
      action: "https://www.linkedin.com/in/sai-sadwiik-katam-3937a52ab/",
      description: "Professional network and messaging"
    },
    {
      type: "GitHub",
      value: "github.com/sadwiik06",
      icon: "💻",
      color: "#181717",
      action: "https://github.com/sadwiik06",
      description: "Code repositories and projects"
    },
  ];

  useEffect(() => {
    // Simple wheel navigation
    const handleScroll = (e) => {
      if (e.deltaY < -50) {
        navigate("/about");
      }
    };

    window.addEventListener("wheel", handleScroll, { once: true });

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const stateKey = name === 'from_name' ? 'name' : name === 'from_email' ? 'email' : name;
    setFormData(prev => ({
      ...prev,
      [stateKey]: value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitStatus(null);

  try {
    const response = await fetch("https://formspree.io/f/mkoongvb", {
      method: "POST",
      headers: {
        "Accept": "application/json"
      },
      body: new FormData(e.target)
    });

    if (response.ok) {
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } else {
      setSubmitStatus("error");
    }
  } catch (err) {
    console.error(err);
    setSubmitStatus("error");
  } finally {
    setIsSubmitting(false);
  }
};


  const handleContactClick = (action) => {
    if (action.startsWith('mailto:') || action.startsWith('tel:')) {
      window.location.href = action;
    } else {
      window.open(action, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="contact-page">
      {/* ANIMATED BACKGROUND DOTS */}
      <div className="contact-dots">
        {[...Array(50)].map((_, i) => (
          <div 
            key={i} 
            className="contact-dot"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <main className="contact-container">
        {/* HEADER */}
        <header className="contact-header">
          <button 
            className="back-button"
            onClick={() => navigate("/about")}
            aria-label="Back to about"
          >
            <span className="back-arrow">←</span>
            <span className="back-text">About</span>
          </button>
          
          <div className="header-content">
            <h1 className="contact-title">
              Contact<span className="accent-dot">.</span>
            </h1>
            <p className="contact-subtitle">
              Let's build something meaningful together
            </p>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <div className="contact-content">
          {/* LEFT: CONTACT METHODS */}
          <div className="contact-left">
            {/* PRIMARY CONTACT METHODS */}
            <div className="contact-methods">
              <h2 className="methods-title">Get in Touch</h2>
              <p className="methods-subtitle">
                Choose your preferred way to connect
              </p>
              
              <div className="methods-grid">
                {contactMethods.map((method) => (
                  <div
                    key={method.type}
                    className="method-card"
                    style={{ '--method-color': method.color }}
                    onClick={() => handleContactClick(method.action)}
                  >
                    <div className="method-icon" style={{ backgroundColor: method.color + '20' }}>
                      <span className="icon-emoji">{method.icon}</span>
                    </div>
                    
                    <div className="method-info">
                      <h3 className="method-type">{method.type}</h3>
                      <p className="method-value">{method.value}</p>
                      <p className="method-description">{method.description}</p>
                    </div>
                    
                    <div className="method-action">
                      <span className="action-text">
                        {method.type === 'Email' ? 'Send Email →' : 'Visit →'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: CONTACT FORM */}
          <div className="contact-right">
            <div className="contact-form-container">
              <div className="form-header">
                <h2 className="form-title">Send a Message</h2>
                <p className="form-subtitle">
                  Have a project in mind? Let's discuss it.
                </p>
              </div>

              {/* CONTACT FORM */}
              <form className="contact-form" onSubmit={handleSubmit}>
                {/* Hidden field to set recipient email */}
                <input type="hidden" name="to_email" value="saisadwiikkatam@gmail.com" />

                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="from_name" // EmailJS expects "from_name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="from_email" // EmailJS expects "from_email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message" // EmailJS expects "message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="form-textarea"
                    placeholder="Tell me about your project..."
                    rows="5"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="submit-spinner"></span>
                      Sending...
                    </>
                  ) : (
                    "Send Message →"
                  )}
                </button>

                {/* SUCCESS MESSAGE */}
                {submitStatus === "success" && (
                  <div className="success-message">
                    ✅ Message sent successfully! I'll get back to you soon.
                  </div>
                )}

                {/* ERROR MESSAGE */}
                {submitStatus === "error" && (
                  <div className="error-message">
                    ❌ Failed to send message. Please try again or email me directly.
                  </div>
                )}
              </form>

              {/* FORM NOTE */}
              <div className="form-note">
                <p>
                  <span className="note-accent">Note:</span> This form sends messages 
                  directly to my email. For urgent matters, consider using LinkedIn for faster response.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER NAVIGATION */}
        <footer className="contact-footer">
          <div className="nav-section">
            <div className="nav-group">
              <button 
                className="nav-button about-btn"
                onClick={() => navigate("/about")}
                aria-label="Back to about"
              >
                <div className="nav-icon">↑</div>
                <div className="nav-label">About</div>
              </button>
              
              <div className="nav-divider" />
              
              <button 
                className="nav-button home-btn"
                onClick={() => navigate("/")}
                aria-label="Back to home"
              >
                <div className="nav-icon">🏠</div>
                <div className="nav-label">Home</div>
              </button>
            </div>
            
            <div className="nav-hint">
              <span className="hint-text">Final page — return to start</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Contact;