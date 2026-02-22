import React, { useState } from "react";
import { api } from "../api";

const UploadResume: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const res = await api.post("/admin/upload_resume", formData);
    alert(res.data.message);
  };

  return (
    <div>
      <h2>Upload Resume</h2>
      <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadResume;