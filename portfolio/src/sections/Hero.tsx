import profileImg from "../assets/Harsh_profile.jpeg";
import { api } from "../api";

const Hero = () => {
  // Open resume PDF in a new browser tab
  const handleViewResume = () => {
    window.open(`${api.defaults.baseURL}/resume/view`, "_blank");
  };

  // Download resume PDF
  const handleDownloadResume = async () => {
    try {
      const response = await fetch(`${api.defaults.baseURL}/resume/download`);
      if (!response.ok) throw new Error("Failed to fetch resume PDF");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;

      const disposition = response.headers.get("Content-Disposition");
      let filename = "Harsh_Aerndolkar_Resume.pdf";
      if (disposition && disposition.includes("filename=")) {
        filename = disposition.split("filename=")[1].replace(/"/g, "");
      }

      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to download resume:", err);
      alert("Could not download resume. Make sure the backend server is running.");
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