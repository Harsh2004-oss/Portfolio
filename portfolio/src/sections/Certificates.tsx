import { useEffect, useState } from "react";
import { api } from "../api";

const Certificates = () => {
  const [certs, setCerts] = useState<any[]>([]);

  useEffect(() => {
    api.get("/certificates").then(res => setCerts(res.data));
  }, []);

  return (
    <section id="certificates" className="section">
      <h2>Certificates & Badges</h2>
      <div className="cert-grid">
        {certs.map((c) => (
          <div className="cert-card" key={c.file_url}>
            <h3>{c.title}</h3>
            <p>{c.description}</p>
            <a href={c.file_url} target="_blank">
              View
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certificates;