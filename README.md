# AI-Powered RFP Management System (Assignment)
1.Project Setup

This repo is a complete single-user RFP management web app:
- Backend: Node.js + Express + Prisma (Postgres)
- Frontend: React + Vite
- Email: Gmail SMTP (send) + IMAP (receive, poll)
- AI: Deepseek (used to extract RFPs, parse vendor replies, and compare proposals)

This implementation follows the assignment spec. :contentReference[oaicite:1]{index=1}

## Prerequisites
- Node 18+
- PostgreSQL running (or use Docker)
- Deepseek API key
- Gmail account with **App Passwords** enabled (for SMTP/IMAP). IMAP must be enabled in Gmail settings.

## Setup (backend)
1. `cd backend`
2. `cp .env.example .env` and fill values:
   - `DATABASE_URL`
   - `OPENAI_API_KEY`
   - `SMTP_USER` (your gmail)
   - `SMTP_PASS` (app password)
   - `IMAP_USER`, `IMAP_PASS` (same app password)
3. Install: `npm install`
4. Generate prisma client: `npm run prisma:generate`
5. Run migration: `npm run prisma:migrate`
6. Seed vendors: `npm run seed`
7. Start: `npm run dev`

## Setup (frontend)
1. `cd frontend`
2. `npm install`
3. Create `.env` or run with `VITE_API_URL=http://localhost:4000/api npm run dev`

## How it works
- Create RFP: Use the frontend Create RFP page. Enter natural language; backend uses OpenAI to extract structured RFP and stores it.
- Manage vendors: Vendors page to create vendor master data.
- Send RFPs: Select RFP and vendors, click send — backend emails each vendor via Gmail SMTP. The subject contains `RFP #<id>`.
- Receive proposals: Backend polls Gmail IMAP every minute; when an unseen email is found, it parses the email and attempts to find the vendor and RFP id from subject, then uses OpenAI to parse the proposal and stores it as a Proposal.
- Compare proposals: AI-assisted scoring endpoint gives scores and reasons.

## Important decisions & assumptions
- RFP ID is included in email subject for vendor replies: `RFP #<id>`.
- IMAP polling is used for simplicity; production should use webhooks/inbound parse.
- AI handles parsing and comparisons; prompts are kept simple and can be optimized.
- Single-user app: no auth implemented (out of scope).

## API Quick reference
- `POST /api/rfps` { naturalText } -> creates RFP
- `GET /api/rfps` -> list
- `GET /api/rfps/:id`
- `POST /api/vendors` { name, email, contact }
- `GET /api/vendors`
- `POST /api/proposals/send` { rfpId, vendorIds }
- `GET /api/proposals/rfp/:rfpId`
- `GET /api/proposals/rfp/:rfpId/recommend`

## What to improve / next steps
- Robust email matching (subject + body heuristics)
- Better AI prompting and retries
- Authentication and multi-tenant
- UI polish and accessibility
- Replace polling with webhook-based inbound email



