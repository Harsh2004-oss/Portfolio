const About = () => {
  return (
    <section id="about" className="about">
      <div className="about-container">
        <div className="about-header">
          <h2 className="section-title">
            <span className="icon">👤</span> About <span className="accent">Me</span>
          </h2>
        </div>

        <div className="about-grid">
          <div className="about-text">
      <p>
  I am a passionate <strong>Computer Science</strong> student and aspiring full-stack developer with hands-on experience in building dynamic, user-focused web applications. My journey began with a curiosity about how websites function, and it has grown into creating scalable, efficient, and modern digital solutions.
</p>
<p>
  I specialize in developing interactive applications using technologies like <strong>MERN stack</strong> and integrating AI features to enhance user experience. My goal is to deliver clean, maintainable code and polished interfaces while continuously exploring emerging technologies to stay ahead in the ever-evolving world of web development.
</p>

            <div className="about-stats">
              <div className="about-stat">
                <span className="stat-icon">💻</span>
                <div className="stat-info">
                  <h4>5+</h4>
                  <span>Projects</span>
                </div>
              </div>
              <div className="about-stat">
                <span className="stat-icon">🤖</span>
                <div className="stat-info">
                  <h4>AI</h4>
                  <span>Enthusiast</span>
                </div>
              </div>
            </div>
          </div>

          <div className="about-perks">
            <h3>
              <span className="icon">⚡</span> Technical Perks
            </h3>
            <ul className="perk-list">
              <li className="perk-item">
                <span className="perk-icon">🌐</span>
                <span className="perk-text">Frontend: HTML, CSS, JavaScript & Optimization,</span>
              </li>
               <li className="perk-item">
                <span className="perk-icon">🌐</span>
                <span className="perk-text">Framworks: React.JS</span>
              </li>
              <li className="perk-item">
                <span className="perk-icon">🗄️</span>
                <span className="perk-text">DataBase - MongoDB for efficient data storage</span>
              </li>
              <li className="perk-item">
                <span className="perk-icon">⚙️</span>
                <span className="perk-text">API Development & Scalability</span>
              </li>
              <li className="perk-item">
                <span className="perk-icon">🔐</span>
                <span className="perk-text">MERN Projects & Modern Architecture</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;