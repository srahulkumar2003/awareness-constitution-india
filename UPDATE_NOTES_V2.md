# Update Notes — V2

This update was made on top of the existing "final black tricolor" build.

## New features
1. **Landmark Judgments Timeline** (`/judgments`) — a new, scroll-animated page
   walking through 6 landmark Supreme Court cases (Kesavananda Bharati, Maneka
   Gandhi, Minerva Mills, Indra Sawhney, S. R. Bommai, Vishaka), each linked back
   to its related Explorer topic. New nav link added.
2. **Constitution Agent — floating AI chat widget**, visible on every page
   (bottom-right), inspired by the SmartApply Agent project's chat pattern:
   - Calls the existing `/api/ai/ask` endpoint.
   - Backend (`GeminiService`) now has a curated, rule-based offline fallback
     (same idea as SmartApply's `AiService.ruleBasedReply`) so it always gives a
     useful answer even with no `GEMINI_API_KEY` configured, or if the live
     call fails.
   - Every reply reports `aiApiUsed` so the widget can show a
     "● Live AI" vs "○ Offline Tutor" badge.
   - If the backend itself is unreachable (not deployed yet, no network), the
     widget falls back to a small local keyword-matched reply so it's never
     just an error message.
3. **Scroll-reveal animations** (`ScrollReveal.jsx`, framer-motion `whileInView`)
   applied to Home, Explorer and About page sections, plus the new Judgments
   timeline.
4. **Dashboard chart colors fixed** — Doughnut/Bar charts had no color
   configuration and rendered as plain gray/transparent on the dark theme.
   Added a tricolor-leaning palette and themed axis/legend text colors.
5. **Bug fix**: several pages (`About`, `AskAI`, `ConstitutionExplorer`, `Quiz`,
   `Survey`) had an empty `<p className="eyebrow"></p>` left over from a
   previous edit — filled in with contextual labels.

## Backend changes
- `AiRequest` gained an optional `context` field (current page/topic).
- `AiResponse` gained an `aiApiUsed` boolean.
- `GeminiService.ask()` now returns a `Reply(answer, aiApiUsed)` record and
  has a `curatedReply()` fallback covering Rights, Duties, DPSP, Judiciary,
  Preamble and Reservations.
- `AiController` updated to match the new service signature.

## Not changed
- Database schema, CORS config, and the existing Explorer/Survey/Quiz/Dashboard
  data models were left as-is — they were already solid.
