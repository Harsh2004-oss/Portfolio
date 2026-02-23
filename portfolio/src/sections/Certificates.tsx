import { useEffect, useState } from "react";
import { api } from "../api";

interface Certificate {
  id: string;
  title: string;
  description: string;
  file_url: string;
}

const Certificates = () => {
  const [certs, setCerts] = useState<Certificate[]>([]);

  useEffect(() => {
    api.get("/certificates").then(res => setCerts(res.data));
  }, []);

  const viewCertificate = (certId: string, title: string) => {
    // Open the backend streaming URL in a new tab
    const url = `${import.meta.env.VITE_API_BASE_URL}/certificates/view/${certId}`;
    window.open(url, "_blank"); // Opens inline for PDF, inline for images
  };

  return (
    <section id="certificates" className="section">
      <h2>Certificates & Badges</h2>
      <div className="cert-grid">
        {certs.map((c) => (
          <div className="cert-card" key={c.id}>
            <h3>{c.title}</h3>
            <p>{c.description}</p>
            <button
              onClick={() => viewCertificate(c.id, c.title)}
              className="btn-view"
            >
              View
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certificates;