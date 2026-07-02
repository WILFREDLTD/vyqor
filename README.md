Got it! Here’s the full all-in-one DEVS_README.md that you can copy and paste directly:

# 🛠 QuantEdge Website - Developer Guide

Welcome to the **QuantEdge Website** project! This guide explains the **project structure**, dependencies, and development workflow so you can start contributing efficiently.  

Repository: [https://github.com/QuantEdge-Limited/company-website](https://github.com/QuantEdge-Limited/company-website.git)

---

## 1️⃣ Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/QuantEdge-Limited/company-website.git
cd company-website


Install pnpm

pnpm --version  # check if installed
npm install -g pnpm  # if not installed


Install project dependencies

pnpm install


Run the development server

pnpm dev


Open http://localhost:3000
 in your browser.

2️⃣ Project Structure
company-website/
├─ app/                  # Next.js App Router pages & layouts
│  ├─ layout.tsx         # Root layout
│  ├─ page.tsx           # Home page
│  ├─ api/               # Serverless API routes
│  └─ dashboard/         # Example route: /dashboard
│     ├─ page.tsx
│     └─ layout.tsx
├─ components/           # Reusable UI components
├─ public/               # Static assets (images, fonts, favicon)
├─ styles/               # Global CSS / Tailwind setup
├─ prisma/               # Database schema (if used)
├─ package.json
├─ pnpm-lock.yaml        # Project lock file (do not remove)
├─ tsconfig.json         # TypeScript config (if TS project)
├─ next.config.js
└─ README.md


Notes:

Shared components go in components/.

Each route has its own folder in app/.

node_modules/ is managed by pnpm and should not be committed.

3️⃣ Branching Workflow

Create a feature branch locally from your department branch:

git checkout -b home-section frontend


(Replace frontend with backend if needed)

Push the branch

git push origin home-section


Open a Pull Request (PR) targeting your department branch (frontend or backend).

Do not PR directly to devs or main.

Keep PRs focused on a single feature.

After approval, your feature branch merges into the department branch.

Department branches later merge into devs → main.

4️⃣ Best Practices

Always pull the latest changes before starting a new feature:

git checkout frontend
git pull origin frontend
git checkout -b new-feature


Use pnpm commands exclusively (pnpm install, pnpm dev, pnpm add <package>).# vyqor
