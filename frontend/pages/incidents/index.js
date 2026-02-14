import { useEffect, useState } from "react";
import Link from "next/link";

export default function IncidentsPage() {
  const [incidents, setIncidents] = useState([]);
  const [showArchived, setShowArchived] = useState(false);

  const API = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    fetchIncidents();
  }, [showArchived]);

  async function fetchIncidents() {
    try {
      const res = await fetch(
        `${API}/api/incidents${showArchived ? "?showArchived=true" : ""}`
      );
      const data = await res.json();
      setIncidents(data);
    } catch (err) {
      alert("Failed to load incidents");
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Incidents</h1>

      <label>
        <input
          type="checkbox"
          checked={showArchived}
          onChange={(e) => setShowArchived(e.target.checked)}
        />
        Show Archived
      </label>

      <br /><br />

      <Link href="/incidents/create">Create Incident</Link>

      <ul>
        {incidents.map((incident) => (
          <li key={incident.id}>
            <Link href={`/incidents/${incident.id}`}>
              {incident.title} - {incident.status}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
