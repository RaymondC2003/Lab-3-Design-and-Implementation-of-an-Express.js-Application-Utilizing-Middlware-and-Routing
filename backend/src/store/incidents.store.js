import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { randomUUID } from "crypto";
import { DATA_FILE } from "../config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "../../", DATA_FILE);

function readData() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]");
  }
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export function listAll(showArchived = false) {
  const incidents = readData();
  if (showArchived) return incidents;
  return incidents.filter(i => i.status !== "ARCHIVED");
}

export function findById(id) {
  const incidents = readData();
  return incidents.find(i => i.id === id);
}

export function createIncident(data) {
  const incidents = readData();

  const incident = {
    id: randomUUID(),
    ...data,
    status: "OPEN",
    reportedAt: new Date().toISOString()
  };

  incidents.push(incident);
  writeData(incidents);

  return incident;
}

export function updateStatus(id, newStatus) {
  const incidents = readData();
  const index = incidents.findIndex(i => i.id === id);

  if (index === -1) return null;

  incidents[index].status = newStatus;
  writeData(incidents);

  return incidents[index];
}
