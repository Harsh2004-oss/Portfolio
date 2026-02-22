import { useEffect, useState } from "react";
import { api } from "../api";

const Resume = () => {
  const [resume, setResume] = useState("");

  useEffect(() => {
    api.get("/resume").then(res => setResume(res.data.content));
  }, []);

  return (
    <section id="resume" className="section">
      <h2>Resume Overview</h2>
      <div className="resume-card">
        <pre>{resume || "No resume uploaded yet."}</pre>
      </div>
    </section>
  );
};

export default Resume;