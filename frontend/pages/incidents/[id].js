import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function IncidentDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [incident, setIncident] = useState(null);
  const [status, setStatus] = useState("");

  const API = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    if (id) fetchIncident();
  }, [id]);

  async function fetchIncident() {
    try {
      const res = await fetch(`${API}/api/incidents/${id}`);
      const data = await res.json();
      setIncident(data);
      setStatus(data.status);
    } catch {
      alert("Failed to load incident");
    }
  }

  async function updateStatus() {
    try {
      const res = await fetch(
        `${API}/api/incidents/${id}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        return;
      }

      setIncident(data);
      alert("Status updated");
    } catch {
      alert("Failed to update status");
    }
  }

  if (!incident) return <div>Loading...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{incident.title}</h1>
      <p>{incident.description}</p>
      <p>Category: {incident.category}</p>
      <p>Severity: {incident.severity}</p>
      <p>Reported At: {incident.reportedAt}</p>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="OPEN">OPEN</option>
        <option value="INVESTIGATING">INVESTIGATING</option>
        <option value="RESOLVED">RESOLVED</option>
        <option value="ARCHIVED">ARCHIVED</option>
      </select>

      <button onClick={updateStatus}>Update Status</button>
    </div>
  );
}
