import { useState } from "react";

export default function BulkUpload() {
  const API = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  async function handleUpload() {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(
        `${API}/api/incidents/bulk-upload`,
        {
          method: "POST",
          body: formData
        }
      );

      const data = await res.json();
      setResult(data);
    } catch {
      alert("Upload failed");
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Bulk Upload</h1>

      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={handleUpload}>Upload</button>

      {result && (
        <div>
          <p>Total Rows: {result.totalRows}</p>
          <p>Created: {result.created}</p>
          <p>Skipped: {result.skipped}</p>
        </div>
      )}
    </div>
  );
}
