# BulkUp — weight gain & muscle tracker

A React + Vite site for people trying to gain weight and build muscle. It has two parts:

- **Landing page** (`src/Landing.jsx`) — the public-facing page at the root URL,
  with a hero, feature overview, "how it works" steps, and an FAQ, plus a
  "Use our tracker" button.
- **Tracker** (`src/Tracker.jsx`) — the actual app: onboarding, calorie/macro
  targets, a 7-day push/pull/legs gym schedule, a meal planner with recipes, a
  water tracker, and a progress/profile page. Opens at the `#app` URL when
  someone clicks the button.

Data is stored in each user's own browser (localStorage) — no backend, no
accounts yet.

## Deploy it for free on Vercel (no terminal needed)

1. Create a free account at https://github.com if you don't have one.
2. Create a new repository (e.g. "bulkup"), and upload every file in this folder
   to it (GitHub's web UI lets you drag-and-drop files directly — use "Add file" →
   "Upload files").
3. Create a free account at https://vercel.com — sign up with your GitHub account,
   it's the smoothest option.
4. In Vercel, click "Add New" → "Project", then select the "bulkup" repo you just
   created.
5. Vercel will auto-detect this is a Vite project. Leave all settings as default
   and click "Deploy".
6. After a minute or two, you'll get a live URL like "bulkup-yourname.vercel.app"
   that anyone can visit.

From now on, any time you push a change to the GitHub repo, Vercel automatically
rebuilds and redeploys the live site — no extra steps needed.

## Running it locally (optional, if you want to test changes first)

```
npm install
npm run dev
```

Then open the local URL it prints (usually http://localhost:5173).

## Known limitations of this version

- No user accounts — each visitor's data lives only in their own browser. If they
  clear their browser data or switch devices, their progress is gone.
- Exercise "videos" are links to a YouTube search, not embedded video.
- Calorie/macro targets are estimates from standard formulas, not personalized
  medical advice.
- The landing page doesn't include testimonials yet — add real ones to
  `src/Landing.jsx` once you have actual user feedback. Avoid fake quotes;
  they're misleading to visitors and can create legal exposure (FTC rules
  cover fake reviews/testimonials).
