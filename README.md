# Caridad Culinary Training — Dropout Risk & Support Platform

🏆 **Hack Arizona 2025 — Champion Project**

**Southern Arizona Social Innovation Track · Challenge 1**
*Improving Workforce Training Completion for Individuals Facing Barriers to Employment*

**Partner:** Community Food Bank of Southern Arizona
**Challenge Sponsor:** University of Arizona, Center for the Philosophy of Freedom

---

## The Problem We're Solving

The Community Food Bank of Southern Arizona's culinary training program has graduated over 250 participants since 2011 — yet roughly **one-third never finish**. Dropout rarely happens because of skill gaps. It happens because of transportation failures the night before class, a childcare arrangement that collapses mid-cohort, a financial shock that kills motivation. These signals exist in the data. Until now, no one was watching for them in real time.

Our platform closes that gap.

---

## What We Built

A full-stack web application that combines **gamified participant learning**, **real-time dropout risk scoring**, and a **coordinator intervention dashboard** — all connected to a live MongoDB Atlas database.

### Three integrated layers:

| Layer | What it does |
|---|---|
| **Participant App** | Duolingo-style coursework, streak tracking, XP, leaderboard — keeps participants engaged between in-person sessions |
| **Risk Model (Model 1)** | Logistic regression + SHAP running on FastAPI — scores every participant weekly using attendance, SMS check-in responses, housing stability, and motivation signals |
| **Coordinator Dashboard** | Real-time watchlist sorted by dropout probability, intervention panel, one-click outreach with phone numbers pulled directly from the database |

---

## How We Meet the Challenge Requirements

### ✅ Early-warning systems to identify at-risk participants
Model 1 computes a dropout risk score (0–100%) for every participant every week using seven behavioral signals: consecutive absences, SMS non-response streaks, housing instability delta, financial stress spikes, motivation drops, childcare load changes, and transport barriers. Scores update automatically. Coordinators see who is drifting before they drop.

### ✅ Behavioral nudges and peer support structures
Model 2 is a Claude-powered AI chatbot (Anthropic claude-sonnet-4-6) embedded in the participant app. It detects distress keywords in real time — "I can't do this," "I lost my ride," "no childcare" — and responds with personalized encouragement anchored to each participant's stated goal from their baseline assessment. It does not replace the coordinator; it extends their reach to 10pm on a Tuesday.

### ✅ Interventions during the program lifecycle, not just at intake
The coordinator dashboard surfaces unresolved risk events — specific triggers like a childcare load change or a financial stress spike — and maps each one to a concrete action: SMS nudge, resource card, phone call, or referral. Every intervention is timestamped and traceable back to its triggering event.

### ✅ Low-cost and scalable for a nonprofit setting
- Built on Node.js + MongoDB Atlas (free tier covers program scale)
- Python risk model runs locally or on a $5/month VPS
- AI chatbot uses pay-per-token API — negligible cost per participant interaction
- No proprietary software or licensing fees

### ✅ Dignity, privacy, and individual autonomy
- Participants log in with their own account and see only their own data
- Coordinators cannot see participant chat history — the chatbot is private
- Role-based access control: `participant` accounts are blocked from the coordinator dashboard at both the route and UI level
- No data is shared outside the application

---

## How It Fits the Food Bank's Mission

The Food Bank's culinary program exists to create **economic mobility** for people navigating unemployment, reentry, housing instability, and long-term workforce absence. Our platform directly serves that mission by:

- **Keeping people in the program** — the single most important lever for graduation rates
- **Reducing coordinator overhead** — one dashboard replaces manual tracking across spreadsheets and gut instinct
- **Respecting participants as whole people** — the chatbot anchors every interaction to the participant's own stated goal, not a generic script
- **Building institutional memory** — every check-in, risk score, and intervention is stored and queryable, enabling the Food Bank to improve the program cohort over cohort

---

## Tech Stack

```
Frontend      Node.js · Express · EJS · CSS
Database      MongoDB Atlas (cloud)
Auth          Passport.js (local strategy) · bcrypt · express-session
Risk Model    Python · FastAPI · scikit-learn · SHAP · joblib (port 7000)
AI Chatbot    Python · FastAPI · Anthropic SDK · claude-sonnet-4-6 (port 7001)
Data          11 collections — participants, risk_scores, weekly_checkins,
              interventions, attendance, and more
```

---
