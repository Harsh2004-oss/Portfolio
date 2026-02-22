import React, { useEffect, useState } from "react";

interface Project {
    id: string;
    title: string;
    description: string;
    tech_stack: string;
    github_link: string;
    live_link: string;
    image_url?: string;
}

const Projects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/projects")
            .then((res) => res.json())
            .then((data) => {
                setProjects(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching projects:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <section className="projects-section">
                <p style={{ textAlign: "center" }}>Loading projects...</p>
            </section>
        );
    }

    return (
        <section id="projects" className="projects-section">
            <div className="projects-container">
                <div className="projects-header">
                    <div className="projects-header-text">
                        <h2 className="section-title">
                            <span className="icon">🚀</span> Featured{" "}
                            <span className="accent">Projects</span>
                        </h2>
                        <p className="section-subtitle">
                            Highlighted and personal projects to showcase my skills.
                        </p>
                    </div>
                </div>

                <div className="projects-grid">
                    {projects.map((project) => (
                        <div className="project-card" key={project.id}>
                            
                            {/* 🔥 Project Image */}
                            <div className="project-image">
                                {project.image_url ? (
                                    <img
                                        src={`http://127.0.0.1:8000${project.image_url}`}
                                        alt={project.title}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover"
                                        }}
                                    />
                                ) : (
                                    <div
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            background:
                                                "linear-gradient(135deg, #3b82f622 0%, #8b5cf644 50%, #06b6d422 100%)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "3rem",
                                            opacity: 0.7,
                                        }}
                                    >
                                        🚀
                                    </div>
                                )}
                                <div className="project-image-overlay"></div>
                            </div>

                            <div className="project-body">
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-desc">{project.description}</p>

                                <div className="project-tags">
                                    {project.tech_stack
                                        ?.split(",")
                                        .map((tag) => (
                                            <span
                                                className="project-tag"
                                                key={tag.trim()}
                                            >
                                                {tag.trim()}
                                            </span>
                                        ))}
                                </div>

                                <div className="project-links">
                                    {project.live_link && (
                                        <a
                                            href={project.live_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-link"
                                        >
                                            🔗 Live Demo
                                        </a>
                                    )}

                                    {project.github_link && (
                                        <a
                                            href={project.github_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-link"
                                        >
                                            💻 Source Code
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;