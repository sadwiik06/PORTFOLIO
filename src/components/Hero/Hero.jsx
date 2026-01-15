import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Hero.css";
import profileImg from "../../assets/solar-system-image.png";
const Hero = () => {
  const navigate = useNavigate();
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [showScrollHint, setShowScrollHint] = useState(false);

  const minSwipeDistance = 50;

  useEffect(() => {
    // Show scroll hint after a delay
    const timer = setTimeout(() => {
      setShowScrollHint(true);
    }, 1000);

    // Single-finger scroll detection
    const handleScroll = (e) => {
      if (e.deltaY > 50) { // Increased from just > 0 to > 50 for intentional scroll
        navigate("/work");
      }
    };

    window.addEventListener("wheel", handleScroll, { once: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("wheel", handleScroll);
    };
  }, [navigate]);

  const onTouchStart = (e) => {
    if (e.touches.length === 2) {
      setTouchEnd(null);
      setTouchStart(e.touches[0].clientY);
    }
  };

  const onTouchMove = (e) => {
    if (e.touches.length === 2 && touchStart !== null) {
      setTouchEnd(e.touches[0].clientY);
    }
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isSwipeDown = distance > minSwipeDistance;

    if (isSwipeDown) {
      navigate("/work");
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };



  return (
    <div
      className="hero-page"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* MINIMALIST GRID BACKGROUND */}
      <div className="grid-background" />
      
      <div className="hero-container">
        {/* PROFILE IMAGE */}
        <div className="image-wrapper">
          <div className="profile-frame">
            <img 
              src={profileImg} 
              alt="Sai Sadwiik" 
              className="profile-img" 
              loading="eager"
            />
            <div className="frame-accent" />
          </div>
        </div>

        {/* TEXT CONTENT */}
        <div className="text-wrapper">
          <div className="name-container">
            <h1 className="name">
              <span className="name-line">
                <span className="name-part">Sai</span>
              </span>
              <span className="name-line">
                <span className="name-part">Sadwiik</span>
                <span className="accent-dot">.</span>
              </span>
            </h1>
          </div>
          
          {/* TAGLINE */}
          <div className="tagline-container">
            <p className="tagline">
              <span className="tagline-item">Builder</span>
              <span className="separator">/</span>
              <span className="tagline-item">Strategist</span>
              <span className="separator">/</span>
              <span className="tagline-item">Engineer</span>
            </p>
            <div className="tagline-underline" />
          </div>

          {/* LOCATION */}
          <p className="location">
            Based in <span className="location-accent">India</span>
          </p>
        </div>
      </div>

      {/* CLEAR SCROLL INDICATOR (Arrow instead of line) */}
      <div 
        className="scroll-indicator"
        onClick={() => navigate("/work")}
        aria-label="Scroll down or click to view work"
      >
        <div className="arrow-container">
          <div className="arrow-down">↓</div>
          <span className="scroll-hint">click to view work</span>
        </div>
      </div>

      {/* CORNER ACCENTS */}
      <div className="corner corner-tl" />
      <div className="corner corner-tr" />
      <div className="corner corner-bl" />
      <div className="corner corner-br" />
    </div>
  );
};

export default Hero;