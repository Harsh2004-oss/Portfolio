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

    return (
        <section id="education" className="education-section">
            <div className="education-container">
                <div className="education-grid">
                    {/* Education Column */}
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

                    {/* Certifications Column - Fetched from backend */}
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
                            certs.map((cert, i) => (
                                <a
                                    href={`${api.defaults.baseURL}/${cert.file_url}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    key={i}
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
                            <>
                                <div className="cert-card">
                                    <div className="cert-icon">☁️</div>
                                    <div className="cert-info">
                                        <h4>AWS Certified Cloud Practitioner</h4>
                                        <span>Amazon Web Services</span>
                                    </div>
                                </div>
                                <div className="cert-card">
                                    <div className="cert-icon">🌐</div>
                                    <div className="cert-info">
                                        <h4>Full-Stack Web Development</h4>
                                        <span>Udemy & Coursera</span>
                                    </div>
                                </div>
                                <div className="cert-card">
                                    <div className="cert-icon">🏆</div>
                                    <div className="cert-info">
                                        <h4>Advanced React Patterns</h4>
                                        <span>Frontend Masters</span>
                                    </div>
                                </div>
                                <div className="cert-card">
                                    <div className="cert-icon">🔐</div>
                                    <div className="cert-info">
                                        <h4>Cybersecurity Fundamentals</h4>
                                        <span>Cisco Networking Academy</span>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Education;