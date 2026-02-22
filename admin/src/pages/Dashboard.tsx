import React, { useState, useEffect } from "react";
import UploadResume from "./UploadResume";
import UploadCertificate from "./UploadCertificate";
import AddProject from "./AddProject";
import UploadSummary from "./UploadSummary";
import { api } from "../api";

interface Contact {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

const Dashboard: React.FC = () => {
  const [page, setPage] = useState<"resume" | "certificate" | "project" | "summary" | "contacts">("resume");
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    api
      .get("/admin/contacts")
      .then((res) => setContacts(res.data))
      .catch((err) => console.error("Failed to fetch contacts:", err));
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Admin Dashboard</h1>

      <div style={styles.nav}>
        <button onClick={() => setPage("resume")}>Upload Resume</button>
        <button onClick={() => setPage("summary")}>Upload Summary</button>
        <button onClick={() => setPage("certificate")}>Upload Certificate</button>
        <button onClick={() => setPage("project")}>Add Project</button>
        <button onClick={() => setPage("contacts")}>View Contacts</button>
      </div>

      <div style={styles.content}>
        {page === "resume" && <UploadResume />}
        {page === "summary" && <UploadSummary />}
        {page === "certificate" && <UploadCertificate />}
        {page === "project" && <AddProject />}
        {page === "contacts" && (
          <div>
            <h2>Contacts Received</h2>
            {contacts.length === 0 ? (
              <p>No contacts found.</p>
            ) : (
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Message</th>
                    <th>Received At</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr key={contact._id}>
                      <td>{contact.name}</td>
                      <td>{contact.email}</td>
                      <td>{contact.subject}</td>
                      <td>{contact.message}</td>
                      <td>{new Date(contact.created_at).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: "#0f0f14",
    minHeight: "100vh",
    padding: "40px",
    color: "white",
  },
  title: {
    marginBottom: "30px",
  },
  nav: {
    display: "flex",
    gap: "15px",
    marginBottom: "30px",
    flexWrap: "wrap" as const,
  },
  content: {
    background: "#1a1a22",
    padding: "20px",
    borderRadius: "10px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
  },
};

export default Dashboard;