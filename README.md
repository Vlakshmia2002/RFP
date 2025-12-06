README.md — AI-Powered RFP Management System
1. Project Setup
a. Prerequisites (Node version, DB, API keys)

To run this project, ensure the following tools and services are installed/configured:

Node.js v18+

PostgreSQL installed locally (or via Docker)

Prisma CLI (npm install -g prisma)

DeepSeek API Key (or OpenAI API key)

Gmail account with App Password enabled

Required for SMTP (sending emails)

Required for IMAP (receiving vendor responses)

Git

VS Code (recommended editor)

Frontend Framework: React + Vite

Backend Framework: Node.js + Express

b. Install steps (frontend & backend)
1. Clone the repository
git clone https://github.com/VLakshmia2002/RFP.git
cd RFP

2. Install frontend dependencies
cd frontend
npm install

3. Install backend dependencies
cd ../backend
npm install

c. How to configure email sending/receiving
Configure SMTP (sending emails)

Add to backend/.env:

SMTP_EMAIL=your-email@gmail.com
SMTP_PASSWORD=your-gmail-apppassword
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465

Configure IMAP (receiving emails)

Add:

IMAP_EMAIL=your-email@gmail.com
IMAP_PASSWORD=your-gmail-apppassword
IMAP_HOST=imap.gmail.com
IMAP_PORT=993


⚠️ Gmail App Password is mandatory — Gmail will block normal passwords.

d. How to run everything locally
1. Setup PostgreSQL database

Create a database named:

rfp


Configure .env:

DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/rfp"

2. Run Prisma migrations
npx prisma migrate dev

3. Start backend
cd backend
npm start

4. Start frontend
cd frontend
npm run dev


Frontend runs at:
👉 http://localhost:5173

Backend runs at:
👉 http://localhost:5000

e. Seed data or initial scripts

No automatic seed script included

Vendors can be added manually through the UI

Prisma schema initializes the DB structure

2. Tech Stack
a. Frontend, backend, DB, AI provider, email solution, and key libraries
Frontend

React

Vite

Axios

Tailwind CSS (optional)

Backend

Node.js

Express.js

Prisma ORM

Nodemailer (SMTP sending)

IMAP Client (email receiving)

Database

PostgreSQL

AI Provider

DeepSeek API (for RFP extraction, proposal parsing, and evaluation)

Email Solution

Gmail SMTP → send RFP emails

Gmail IMAP → receive vendor replies

Key Libraries

express

prisma

nodemailer

imap-simple

axios

3. API Documentation
a. Main endpoints (method + path + examples)
🔹 RFP Creation
POST /api/rfp/create

Convert natural-language text → structured RFP using AI.

Request Body

{
  "text": "We need cloud hosting with 99.9% uptime and a monthly budget of $5000."
}


Success Response

{
  "title": "Cloud Hosting Services",
  "budget": 5000,
  "requirements": ["99.9% uptime", "24/7 support"],
  "timeline": "Immediate",
  "status": "Created"
}

🔹 Vendor Management
POST /api/vendors

Add new vendor.

{
  "name": "Azure Cloud",
  "email": "azure@example.com"
}

GET /api/vendors

Fetch vendor list.

🔹 Sending RFP Emails
POST /api/vendors/send-rfp
{
  "rfpId": 1,
  "vendorIds": [1, 2, 3]
}

🔹 Proposal Parsing
POST /api/proposals/parse

AI parses vendor email into structured proposal.

🔹 Proposal Evaluation
POST /api/proposals/evaluate

Compares proposals using AI and gives recommendation.

Example Response

{
  "scores": {
    "Vendor A": 8.7,
    "Vendor B": 7.4
  },
  "recommendation": "Vendor A is the best match based on pricing and uptime guarantees."
}

4. Decisions & Assumptions
a. Key design decisions

Prisma ORM chosen for strong typing and easy migrations

DeepSeek AI used for structured extraction & evaluation

Email sending uses SMTP, receiving uses IMAP listener

RFP, Vendor, Proposal models created based on real procurement processes

Tracking IDs included inside emails to map replies correctly

b. Assumptions

Vendors reply in plain text (no PDF parsing)

IMAP polling runs periodically

AI may miss some fields; user can edit manually

Gmail App Password is used

Evaluation scoring based on:

Requirements match

Pricing

Timeline

SLA/guarantees

5. AI Tools Usage
a. Which AI tools you used

ChatGPT

GitHub Copilot

DeepSeek AI

b. What they helped with

Generating boilerplate code

Designing backend endpoints

Debugging errors

Writing Prisma schema

Crafting AI prompts for extraction & evaluation

Improving email parsing logic

c. Notable prompts/approaches

“Extract structured RFP fields from this text”

“Parse vendor proposal into pricing, features, and timeline”

“Compare proposals and generate a recommendation”

“Fix IMAP connection errors in Node.js”

d. What you learned / improvements

Prompt engineering greatly affects AI consistency

DeepSeek works well for structured JSON extraction

Email automation requires careful error handling

AI can accelerate development but still needs validation
