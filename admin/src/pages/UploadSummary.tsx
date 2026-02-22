import React, { useState } from "react";
import { api } from "../api";

const UploadSummary: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await api.post("/upload-summary", formData);
    alert(res.data.message || "Summary uploaded successfully!");
  };

  return (
    <div>
      <h2>Upload Personal Summary</h2>
      <input
        type="file"
        accept=".pdf,.docx,.txt"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadSummary;