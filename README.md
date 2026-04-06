# Nexus Science Club Site

Vite + React site configured for GitHub Pages deployment.

## Run locally

1. Install dependencies:
   `npm install`
2. Start development server:
   `npm run dev`

## Build locally

`npm run build`

## Deploy from GitHub (recommended)

This repository includes a workflow at `.github/workflows/deploy.yml` that deploys automatically to GitHub Pages on push to `main`.

1. Push this project to GitHub.
2. In GitHub, open `Settings -> Pages`.
3. Under `Source`, select `GitHub Actions`.
4. Push to `main` (or run the workflow manually from the Actions tab).

Your site will be published by the workflow from the `dist` artifact.
