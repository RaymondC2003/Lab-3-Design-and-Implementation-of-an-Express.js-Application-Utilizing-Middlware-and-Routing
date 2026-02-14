import app from "./src/app.js";
import { PORT } from "./src/config.js";

app.listen(PORT, () => {
  console.log(`IncidentTracker API running on http://localhost:${PORT}`);
});
