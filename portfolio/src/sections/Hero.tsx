import profileImg from "../assets/Harsh_profile.jpeg";
import { api } from "../api";

const Hero = () => {
  // Open resume PDF using Google Docs Viewer (works with any URL)
  const handleViewResume = async () => {
    try {
      const res = await api.get("/resume");
      const fileUrl = res.data.file_url;
      if (fileUrl) {
        const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(fileUrl)}&embedded=true`;
        window.open(viewerUrl, "_blank");
      } else {
        alert("No resume uploaded yet.");
      }
    } catch {
      alert("Could not load resume. Please try again.");
    }
  };

  // Download resume PDF directly from Cloudinary
  const handleDownloadResume = async () => {
    try {
      const res = await api.get("/resume");
      const fileUrl = res.data.file_url;
      if (!fileUrl) {
        alert("No resume uploaded yet.");
        return;
      }
      window.open(fileUrl, "_blank");
    } catch (err) {
      console.error("Failed to download resume:", err);
      alert("Could not download resume. Please try again.");
    }
  };

  return (
    <section className="hero" id="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="dot"></span>
            AVAILABLE FOR HIRE
          </div>

          <h1>
            <span className="greeting">Hi, I'm </span>
            <span className="name">Harsh Aerndolkar</span>
          </h1>

          <p className="hero-tagline">
            An aspiring <strong>MERN Stack Developer</strong> crafting scalable,
            high-performance web solutions with modern architecture.
          </p>

          <div className="hero-buttons">
            <a href="#contact" className="btn-primary">
              📩 Contact Me
            </a>
            <button onClick={handleViewResume} className="btn-secondary">
              👀 View Resume
            </button>
            <button onClick={handleDownloadResume} className="btn-secondary">
              📄 Download Resume
            </button>
          </div>
        </div>

        <div className="hero-image">
          <div className="hero-image-wrapper">
            <img
              src={profileImg}
              alt="Harsh Aerndolkar - MERN Stack Developer"
            />
            <div className="hero-float-badge top-left">
              <span className="badge-icon">💻</span>
              Developer
            </div>
            <div className="hero-float-badge bottom-right">
              <span className="badge-icon">🎯</span>
              Problem Solver
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;