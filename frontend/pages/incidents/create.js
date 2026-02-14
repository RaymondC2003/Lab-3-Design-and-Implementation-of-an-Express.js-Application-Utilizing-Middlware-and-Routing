import { useState } from "react";
import { useRouter } from "next/router";

export default function CreateIncident() {
  const router = useRouter();
  const API = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "IT",
    severity: "LOW"
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch(`${API}/api/incidents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        return;
      }

      router.push("/incidents");
    } catch {
      alert("Failed to create incident");
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Create Incident</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          required
        />

        <br />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          required
        />

        <br />

        <select name="category" onChange={handleChange}>
          <option value="IT">IT</option>
          <option value="SAFETY">SAFETY</option>
          <option value="FACILITIES">FACILITIES</option>
          <option value="OTHER">OTHER</option>
        </select>

        <br />

        <select name="severity" onChange={handleChange}>
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>

        <br /><br />

        <button type="submit">Create</button>
      </form>
    </div>
  );
}
