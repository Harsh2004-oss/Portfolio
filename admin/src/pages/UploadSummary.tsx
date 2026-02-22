import React, { useState } from "react";

const UploadSummary: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    await fetch("http://127.0.0.1:8000/upload-summary", {
      method: "POST",
      body: formData,
    });

    alert("Summary uploaded successfully!");
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