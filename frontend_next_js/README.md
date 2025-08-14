This is a [Next.js](https://nextjs.org) project for issuing and verifying medical prescriptions.

Features:
- Doctor login and prescription issuance
- Patient viewing prescriptions
- Pharmacy verification with blockchain status
- Secure login/signup (frontend integrates with backend via env-configured API)
- Modern, light, minimal UI

Quick start:
1. Copy `.env.example` to `.env` and fill values:
   - NEXT_PUBLIC_API_BASE_URL
   - NEXT_PUBLIC_SOLANA_EXPLORER_URL (optional)
   - NEXT_PUBLIC_AUTH_COOKIE_NAME (should match your backend cookie)
2. Install dependencies and run:

```bash
npm install
npm run dev
```

Notes:
- This app is configured for static export by default. Auth guarding is implemented client-side.
- The backend should set an HttpOnly session cookie (name from NEXT_PUBLIC_AUTH_COOKIE_NAME) on login.
- The app will include credentials with every API call (`fetch(..., { credentials: "include" })`).
- If your backend also returns a bearer token, it will be stored in localStorage and attached to requests as Authorization: Bearer.

Main routes:
- `/login` — sign in for doctor/patient/pharmacy
- `/signup` — account creation
- `/dashboard` — role-based dashboard:
  - Doctor: issue prescriptions, view issued list, quick verify
  - Patient: view prescriptions, verify
  - Pharmacy: verification tool with blockchain status
- `/logout` — clear session and go to login

Environment:
- See `.env.example` for required variables.
- Colors are defined in CSS variables (globals.css) using:
  - primary: #2363eb
  - secondary: #1b1b1b
  - accent: #22c55e
