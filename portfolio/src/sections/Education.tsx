import { useEffect, useState } from "react";
import { api } from "../api";

const educationData = [
  {
    icon: "🎓",
    degree: "B.Tech. Computer Science",
    school: "Sri Aurobindo Institute of Technology",
    year: "2022 – 2026",
  },
];

interface Certificate {
  id: string;
  title: string;
  description: string;
  file_url: string;
}

const Education = () => {
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/certificates")
      .then((res) => {
        setCerts(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // ✅ Backend view route use karenge (NOT direct Cloudinary URL)
  const getViewUrl = (id: string) => {
    return `${import.meta.env.VITE_API__BASE_URL}/certificates/view/${id}`;
  };

  return (
    <section id="education" className="education-section">
      <div className="education-container">
        <div className="education-grid">
          
          {/* 🎓 Education Column */}
          <div className="edu-column">
            <h3>
              <span className="icon">🎓</span> Education
            </h3>
            {educationData.map((edu, i) => (
              <div className="edu-card" key={i}>
                <div className="edu-icon">{edu.icon}</div>
                <div className="edu-info">
                  <h4>{edu.degree}</h4>
                  <p className="edu-school">{edu.school}</p>
                  <span className="edu-year">{edu.year}</span>
                </div>
              </div>
            ))}
          </div>

          {/* 📜 Certifications Column */}
          <div className="cert-column">
            <h3>
              <span className="icon">📜</span> Certifications
            </h3>

            {loading ? (
              <div className="cert-card">
                <div className="cert-icon">⏳</div>
                <div className="cert-info">
                  <h4>Loading certificates...</h4>
                  <span>Fetching from server</span>
                </div>
              </div>
            ) : certs.length > 0 ? (
              certs.map((cert) => (
                <a
                  href={getViewUrl(cert.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={cert.id}
                  className="cert-card-link"
                >
                  <div className="cert-card">
                    <div className="cert-icon">📜</div>
                    <div className="cert-info">
                      <h4>{cert.title}</h4>
                      <span>{cert.description}</span>
                    </div>
                    <span className="cert-view-icon">↗</span>
                  </div>
                </a>
              ))
            ) : (
              <div className="cert-card">
                <div className="cert-icon">📂</div>
                <div className="cert-info">
                  <h4>No certificates uploaded yet</h4>
                  <span>Please upload from admin panel</span>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Education;