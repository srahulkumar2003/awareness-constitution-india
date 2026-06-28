# Deploy: GitHub + Vercel (frontend) + Render (backend)

## 1. Push the project to GitHub

```bash
cd awareness-constitution-india
git init
git add .
git commit -m "Updated Constitution Awareness Platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/awareness-constitution-india.git
git push -u origin main
```

If you get an authentication error, create a Personal Access Token on GitHub
(Settings → Developer settings → Personal access tokens) and use it as the
password when prompted, or set up the GitHub CLI (`gh auth login`).

## 2. Deploy the backend first (Render)

The frontend needs a live backend URL before it can be deployed, so do this step first.

1. Go to https://render.com → New → Web Service → connect your GitHub repo.
2. Settings:
   - **Root directory:** `backend`
   - **Runtime:** Docker (it will pick up `backend/Dockerfile` automatically) — or
     Build command `mvn clean package -DskipTests`, Start command
     `java -jar target/awareness-1.0.0.jar`
3. Environment variables (Render → Environment):
   ```
   DB_URL=jdbc:mysql://HOST:PORT/DB_NAME?useSSL=true&allowPublicKeyRetrieval=true&serverTimezone=UTC
   DB_USERNAME=your_db_user
   DB_PASSWORD=your_db_password
   GEMINI_API_KEY=your_gemini_key        # optional — leave blank to use the offline tutor fallback
   GEMINI_MODEL=gemini-2.5-flash
   CORS_ALLOWED_ORIGINS=https://YOUR-PROJECT.vercel.app
   ```
   You can get a free MySQL database from Railway, Aiven, or Clever Cloud —
   copy its connection details into `DB_URL`/`DB_USERNAME`/`DB_PASSWORD`.
4. Deploy. Once live, copy the Render URL, e.g. `https://constitution-backend.onrender.com`.
5. Test it: open `https://constitution-backend.onrender.com/api/health` in your browser.

> Render's free tier sleeps after inactivity — the first request after a while
> can take 30-60s to "wake up". This is normal.

## 3. Deploy the frontend (Vercel)

1. Go to https://vercel.com → Add New → Project → import the same GitHub repo.
2. Settings:
   - **Root directory:** `frontend`
   - **Framework preset:** Vite
   - **Build command:** `npm run build` (default)
   - **Output directory:** `dist` (default)
3. Environment variable:
   ```
   VITE_API_URL=https://constitution-backend.onrender.com/api
   ```
   (use the Render URL from step 2, with `/api` at the end)
4. Deploy. Vercel will give you a URL like `https://awareness-constitution-india.vercel.app`.

## 4. Connect the two (CORS)

Go back to Render → your backend service → Environment → update
`CORS_ALLOWED_ORIGINS` to your actual Vercel URL from step 3, then redeploy
the backend. Without this step the browser will block API calls with a CORS
error even though both services are "live".

## 5. Verify everything end-to-end

- `https://your-backend.onrender.com/api/health` → should return `OK`/status JSON.
- `https://your-project.vercel.app` → site loads, intro video plays.
- Open the floating Constitution Agent widget (bottom-right) on the live site
  and ask a question — it should reply, with either "● Live AI" (if you set
  `GEMINI_API_KEY`) or "○ Offline Tutor" (if you didn't).
- Submit the Survey page — should show "Survey submitted successfully."

## 6. Every future update

```bash
git add .
git commit -m "Describe your change"
git push
```

Both Vercel and Render auto-redeploy on every push to `main`.
