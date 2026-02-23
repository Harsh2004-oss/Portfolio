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

  const getViewUrl = (cert: Certificate) => {
    // Link to your backend endpoint instead of raw Cloudinary URL
    return `/certificates/view/${cert.id}`;
  };

  return (
    <section id="certificates" className="section">
      <h2>Certificates & Badges</h2>
      <div className="cert-grid">
        {certs.map((c) => {
          // Detect if file is PDF for inline viewing
          const isPdf = c.file_url.toLowerCase().endsWith(".pdf");

          return (
            <div className="cert-card" key={c.id}>
              <h3>{c.title}</h3>
              <p>{c.description}</p>

              {isPdf ? (
                <a
                  href={getViewUrl(c)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View PDF
                </a>
              ) : (
                <a
                  href={getViewUrl(c)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Image
                </a>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Certificates;