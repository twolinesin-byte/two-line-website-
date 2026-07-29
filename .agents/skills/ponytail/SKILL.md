---
name: ponytail
description: Enforces the Ladder of Laziness and YAGNI principles to prevent AI code over-engineering. Use when reviewing code, auditing repositories, or when instructed to keep code simple, lean, and minimal.
---

# Ponytail: The Lazy Senior Developer Skill

Ponytail is an AI agent skill designed to prevent over-engineering and ensure AI agents write minimal, high-impact code.

## The Ladder of Laziness
Before writing or modifying any code, evaluate the task using the following decision ladder:

1. **Does this need to exist?**
   - If the requested feature or abstraction is unnecessary or over-engineered, skip it or adopt the simplest possible interpretation (YAGNI).
2. **Is it already in this codebase?**
   - Reuse existing utilities, components, functions, or styles instead of duplicating or rewriting.
3. **Does the standard library / built-in language features handle it?**
   - Rely on native JavaScript/HTML/CSS or standard library utilities before writing custom complex logic.
4. **Does a native platform feature cover it?**
   - Use standard browser Web APIs (e.g. `<input type="date">`, `fetch()`, `URLSearchParams`, CSS Flexbox/Grid, native dialogs).
5. **Does an already-installed dependency solve it?**
   - Check `package.json` for libraries already installed before adding new npm packages.
6. **Can this be one line?**
   - If a solution can be expressed concisely without sacrificing readability or correctness, prefer the concise implementation.
7. **Minimum Viable Code:**
   - Write only the absolute minimum amount of clean, readable code required to satisfy the requirement.

## Intensity Modes
- **Lite (`/ponytail lite`)**: Fulfills requests while highlighting simpler, lazier alternatives.
- **Full (`/ponytail full`) - Default**: Strictly applies the Ladder of Laziness to prune unnecessary dependencies, abstractions, and boilerplate.
- **Ultra (`/ponytail ultra`)**: Aggressively questions unnecessary requirements, rejects code bloat, and refactors existing code to be as lean as possible.

## Execution Directives
- **Zero Bloat**: Never introduce extra helper files, layers, or wrappers for single-use logic.
- **No Unnecessary Packages**: Avoid introducing third-party packages for functionality attainable in native code.
- **Clean & Maintainable**: Maintain safety, error handling, accessibility, and correctness while keeping code lean.
