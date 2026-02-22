import React, { useState } from "react";
import { api } from "../api";

const UploadCertificate: React.FC = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", desc);
    formData.append("file", file);
    const res = await api.post("/admin/upload_certificate", formData);
    alert(res.data.message);
  };

  return (
    <div>
      <h2>Upload Certificate</h2>
      <input type="text" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} /><br/>
      <textarea placeholder="Description" value={desc} onChange={e=>setDesc(e.target.value)}></textarea><br/>
      <input type="file" onChange={e=>setFile(e.target.files?.[0] || null)} /><br/>
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadCertificate;