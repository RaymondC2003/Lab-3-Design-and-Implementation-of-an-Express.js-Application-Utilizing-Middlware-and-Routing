export const PORT = process.env.PORT || 3001;

export const DATA_FILE = "./data/incidents.json";

export const CATEGORIES = ["IT", "SAFETY", "FACILITIES", "OTHER"];

export const SEVERITIES = ["LOW", "MEDIUM", "HIGH"];

export const STATUSES = [
  "OPEN",
  "INVESTIGATING",
  "RESOLVED",
  "ARCHIVED"
];

export const STATUS_TRANSITIONS = {
  OPEN: ["INVESTIGATING", "ARCHIVED"],
  INVESTIGATING: ["RESOLVED"],
  RESOLVED: ["ARCHIVED"],
  ARCHIVED: ["OPEN"]
};

export const SHOW_ARCHIVED_DEFAULT = false;
