import { useState, useEffect } from "react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <a href="#" className="header-logo">
        <div className="logo-icon">HA</div>
        Harsh Aerndolkar<span>PORTFOLIO</span>
      </a>

      <button
        className="mobile-toggle"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle navigation"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav className={`header-nav ${mobileOpen ? "open" : ""}`}>
        <a href="#about" onClick={handleNavClick}>About</a>
        <a href="#skills" onClick={handleNavClick}>Skills</a>
        <a href="#projects" onClick={handleNavClick}>Projects</a>
        <a href="#education" onClick={handleNavClick}>Education</a>
        <a href="#contact" className="hire-btn" onClick={handleNavClick}>
          Hire Me
        </a>
      </nav>
    </header>
  );
};

export default Header;