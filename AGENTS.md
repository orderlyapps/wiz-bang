<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.

<!--VITE PLUS END-->

## Code Style Guidelines

### File and Folder Naming

- **Folders**: Use `kebab-case` (e.g., `src/routes/pages/home`, `src/ui/form-inputs`)
- **Component files**: Use `PascalCase` (e.g., `HomePage.tsx`, `FormInput.tsx`)
- **TypeScript files**: Use `camelCase` (e.g., `apiClient.ts`, `utilityHelpers.ts`)

### Object Properties

- **All object properties**: Use `snake_case` (e.g., `user_id`, `first_name`, `is_active`)
- **All functions**: Use `camelCase` (e.g., `fetchUserData()`, `calculateTotal()`, `handleFormSubmit()`)
