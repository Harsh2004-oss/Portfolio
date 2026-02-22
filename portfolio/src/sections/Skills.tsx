const stackItems = [
    { icon: "🍃", name: "MongoDB" },
    { icon: "⚡", name: "Express.js" },
    { icon: "⚛️", name: "React" },
    { icon: "🟢", name: "Node.js" },
];

const skillTags = [
    "TypeScript",
    "Python",
    "REST APIs",
    "Git & GitHub",
    "MongoDB",
    "Express.js",
    "React",
    "Node.js",
    "JavaScript",
    "HTML & CSS",
    "JWT Authentication",
];

const Skills = () => {
    return (
        <section id="skills" className="skills-section">
            <div className="skills-container">
                <div className="skills-header">
                    <h2 className="section-title">
                        Mastering the <span className="accent">MERN</span> Stack
                    </h2>
                    <p className="section-subtitle">
                        My core toolkit for building high-performance, modern web applications.
                    </p>
                </div>

                <div className="skills-stack">
                    {stackItems.map((item) => (
                        <div className="stack-card" key={item.name}>
                            <div className="stack-icon">{item.icon}</div>
                            <span className="stack-name">{item.name}</span>
                        </div>
                    ))}
                </div>

                <div className="skills-tags">
                    {skillTags.map((tag) => (
                        <span className="skill-tag" key={tag}>
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
