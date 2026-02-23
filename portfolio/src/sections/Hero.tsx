import profileImg from "../assets/Harsh_profile.jpeg";
import { api } from "../api";

const Hero = () => {
  // Open resume PDF in a new browser tab
  const handleViewResume = async () => {
    try {
      const res = await api.get("/resume");
      const fileUrl = res.data.file_url;
      if (!fileUrl) { alert("No resume uploaded yet."); return; }

      const pdfRes = await fetch(fileUrl);
      const blob = await pdfRes.blob();
      const blobUrl = URL.createObjectURL(new Blob([blob], { type: "application/pdf" }));
      window.open(blobUrl, "_blank");
    } catch {
      alert("Could not load resume. Please try again.");
    }
  };

  // Download resume PDF
  const handleDownloadResume = async () => {
    try {
      const res = await api.get("/resume");
      const fileUrl = res.data.file_url;
      const filename = res.data.filename || "Harsh_Aerndolkar_Resume.pdf";
      if (!fileUrl) { alert("No resume uploaded yet."); return; }

      const pdfRes = await fetch(fileUrl);
      const blob = await pdfRes.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch {
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