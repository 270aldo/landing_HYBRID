# Repository Guidelines

## Project Structure & Module Organization
This workspace has two active areas:
- `landing/briefs/`: strategy and copy documents (source of truth for messaging).
- `landing/templates/`: static HTML explorations and design variants.
- `ngx-hybrid-web/`: production app (Next.js App Router).
  - `app/page.tsx`: main landing page.
  - `app/layout.tsx`, `app/globals.css`: global layout/styles.
  - `public/`: static assets.
  - `.env.example`: public runtime config keys.

Treat `ngx-hybrid-web/` as the deployable product. Use `landing/templates/` only for experiments and references.

## Build, Test, and Development Commands
Run commands from `ngx-hybrid-web/`:
- `npm install`: install dependencies.
- `npm run dev`: start local development server.
- `npm run lint`: run ESLint checks.
- `npm run build`: production build validation.
- `npm run start`: run the built app locally.

Recommended pre-PR check: `npm run lint && npm run build`.

## Coding Style & Naming Conventions
- Language: TypeScript + React function components.
- Follow existing style in `app/page.tsx`: concise components, typed helpers, clear constants.
- Naming:
  - Components/types: `PascalCase`
  - Variables/functions: `camelCase`
  - Env constants: `UPPER_SNAKE_CASE` (e.g., `NEXT_PUBLIC_APPLY_URL`)
- Keep UX text in Spanish unless the task explicitly requires otherwise.
- Use ESLint output as the baseline style authority.

## Testing Guidelines
There is no automated test suite yet. Until added:
- Validate every change with `npm run lint` and `npm run build`.
- Manually verify critical flows: CTA links, modal open/close, FAQ toggles, responsive behavior, and tracking/webhook triggers.

If tests are introduced, prefer `*.test.ts(x)` naming and colocate near the feature or under `app/__tests__/`.

## Commit & Pull Request Guidelines
Current history is minimal (`Initial commit from Create Next App`), so adopt clear conventional messages:
- `feat(landing): add n8n webhook event payload`
- `fix(ui): resolve mobile nav overlap`

PRs should include:
- Purpose and scope.
- Screenshots/video for UI changes (desktop + mobile).
- Config updates (`.env.example`, new `NEXT_PUBLIC_*` keys).
- Verification notes (`lint`, `build`, manual checks).

## Security & Configuration Tips
- Never commit secrets; only commit placeholders in `.env.example`.
- Keep webhook/CRM keys server-side when possible; use `NEXT_PUBLIC_*` only for non-sensitive client values.
