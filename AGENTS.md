# Repository Guidelines

## Project Structure & Module Organization

This repository currently has no source code, tests, assets, or build configuration. Keep new files organized by purpose as the project grows: place application code in `src/`, automated tests in `tests/`, and static assets in `assets/` when those directories become necessary. Put project-wide configuration and contributor documentation at the repository root. Update this guide when the actual layout is established.

## Build, Test, and Development Commands

There is no build system or local run command yet. Do not assume `npm`, `make`, or another tool is configured. Before committing, run `git status` to review changed files and `git diff --check` to catch whitespace errors. When adding a toolchain, document its setup, run, build, and test commands in the root README and keep this section aligned with them.

## Coding Style & Naming Conventions

No language-specific formatter or linter is configured. Follow the conventions of the language and framework you introduce, and add a formatter configuration before the codebase grows. Use descriptive, consistent names; match test file names to the modules they cover (for example, `src/parser.ts` and `tests/parser.test.ts`). Keep Markdown headings clear and use fenced code blocks with a language tag for commands or examples.

## Testing Guidelines

No test framework or coverage threshold exists yet. Add tests alongside the first functional code and choose one test command that contributors can run locally. Cover expected behavior and meaningful failure cases. Document the framework, test command, and any coverage target once they are configured; avoid claiming coverage that has not been measured.

## Commit & Pull Request Guidelines

There is no Git history from which to infer a commit convention. Use short, imperative commit subjects that describe the change, such as `Add parser tests`. Keep each commit focused. In pull requests, explain what changed and why, list the checks run, and link relevant issues. Include screenshots when a change affects a visible interface.
