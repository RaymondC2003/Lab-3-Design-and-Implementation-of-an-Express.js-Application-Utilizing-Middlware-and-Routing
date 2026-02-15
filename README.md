# IncidentTracker – Lab 3

## Setup Instructions

### Backend Setup

1. Open a terminal.
2. Navigate to the backend folder:

   cd backend

3. Install dependencies:

   npm install

4. Start the server:

   node server.js

The backend runs at:

   http://localhost:3001

You can test the health endpoint:

   http://localhost:3001/health


------------------------------------------------------------

### Frontend Setup

1. Navigate to the frontend folder:

   cd frontend

2. Create a file named:

   .env.local

3. Add the following line inside the file:

   NEXT_PUBLIC_API_BASE_URL=http://localhost:3001

4. Install dependencies:

   npm install

5. Start the frontend:

   npm run dev

The frontend runs at:

   http://localhost:3000


------------------------------------------------------------

## API Endpoint List

Health Check
GET /health

Get All Incidents
GET /api/incidents

Get All Incidents (including archived)
GET /api/incidents?showArchived=true

Get Incident By ID
GET /api/incidents/:id

Create Incident
POST /api/incidents

Request Body Example:
{
  "title": "Network outage",
  "description": "Main office network is down",
  "category": "IT",
  "severity": "HIGH"
}

Update Incident Status
PATCH /api/incidents/:id/status

Request Body Example:
{
  "status": "RESOLVED"
}

Bulk Upload Incidents
POST /api/incidents/bulk-upload

Accepts multipart/form-data with a CSV file.


------------------------------------------------------------

## Sample CSV Format

Required CSV headers:

title,description,category,severity

Example CSV:

title,description,category,severity
Network outage,Main office network down,IT,HIGH
Fire drill,Evacuation test,SAFETY,LOW
