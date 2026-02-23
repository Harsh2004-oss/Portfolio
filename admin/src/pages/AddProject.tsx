import React, { useEffect, useState } from "react";
import { api } from "../api";

interface Project {
  id: string;
  title: string;
  description: string;
  tech_stack: string;
  github_link: string;
  live_link: string;
  image_url?: string;
}

const AddProject: React.FC = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    tech_stack: "",
    github_link: "",
    live_link: "",
  });

  const [projects, setProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [screenshot, setScreenshot] = useState<File | null>(null);

  // Fetch projects
  const fetchProjects = async () => {
    const res = await api.get("/projects");
    setProjects(res.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      tech_stack: "",
      github_link: "",
      live_link: "",
    });
    setScreenshot(null);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("tech_stack", form.tech_stack);
    formData.append("github_link", form.github_link);
    formData.append("live_link", form.live_link);

    if (screenshot) {
      formData.append("screenshot", screenshot);
    }

    if (editingId) {
      await api.put(`/admin/update_project/${editingId}`, formData);
      alert("Project Updated!");
    } else {
      await api.post("/admin/add_project", formData);
      alert("Project Added!");
    }

    resetForm();
    fetchProjects();
  };

  const handleEdit = (project: Project) => {
    setForm({
      title: project.title,
      description: project.description,
      tech_stack: project.tech_stack,
      github_link: project.github_link,
      live_link: project.live_link,
    });
    setEditingId(project.id);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    await api.delete(`/admin/delete_project/${id}`);
    fetchProjects();
  };

  return (
    <div>
      <h2>{editingId ? "Edit Project" : "Add Project"}</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="title"
          placeholder="Project Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Project Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          name="tech_stack"
          placeholder="Tech Stack (comma separated)"
          value={form.tech_stack}
          onChange={handleChange}
        />

        <input
          name="github_link"
          placeholder="GitHub Link"
          value={form.github_link}
          onChange={handleChange}
        />

        <input
          name="live_link"
          placeholder="Live Link"
          value={form.live_link}
          onChange={handleChange}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setScreenshot(e.target.files ? e.target.files[0] : null)
          }
        />

        <button type="submit">
          {editingId ? "Update Project" : "Add Project"}
        </button>

        {editingId && (
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>

      <hr style={{ margin: "40px 0" }} />

      <h2>All Projects</h2>

      {projects.map((p) => (
        <div key={p.id} style={styles.projectCard}>
          <h3>{p.title}</h3>
          <p>{p.description}</p>

          {p.image_url && (
            <img
              src={p.image_url.startsWith("http") ? p.image_url : `${api.defaults.baseURL}/${p.image_url}`}
              alt={p.title}
              style={{ width: 200, marginBottom: 10 }}
            />
          )}

          <div>
            <button onClick={() => handleEdit(p)}>Edit</button>
            <button onClick={() => handleDelete(p.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "15px",
    maxWidth: "500px",
  },
  projectCard: {
    border: "1px solid #444",
    padding: "15px",
    marginBottom: "20px",
  },
};

export default AddProject;