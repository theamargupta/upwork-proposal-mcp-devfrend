# UI Components Area

Follow root `CLAUDE.md` and `AGENTS.md`.

## ShadCN
- Components in this directory are managed by the ShadCN CLI.
- Add or update primitives with `npx shadcn@latest add ...`.
- Avoid hand-editing generated primitives unless the change is intentional and minimal.
- Keep local product-specific composition outside `components/ui/`.

## Styling
- Respect Tailwind CSS v4 and the existing CSS variable theme.
- Do not create `tailwind.config.*`.
