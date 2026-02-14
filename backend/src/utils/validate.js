import { CATEGORIES, SEVERITIES, STATUS_TRANSITIONS } from "../config.js";

export function validateCreateIncident(body) {
  const errors = [];

  if (!body.title || body.title.length < 5)
    errors.push("Title must be at least 5 characters");

  if (!body.description || body.description.length < 10)
    errors.push("Description must be at least 10 characters");

  if (!CATEGORIES.includes(body.category))
    errors.push("Invalid category");

  if (!SEVERITIES.includes(body.severity))
    errors.push("Invalid severity");

  return {
    ok: errors.length === 0,
    errors,
    value: {
      title: body.title,
      description: body.description,
      category: body.category,
      severity: body.severity
    }
  };
}

export function validateStatusChange(current, next) {
  const allowed = STATUS_TRANSITIONS[current] || [];

  if (!allowed.includes(next)) {
    return { ok: false, error: "Invalid status transition" };
  }

  return { ok: true, next };
}
