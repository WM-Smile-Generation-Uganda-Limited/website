# Website

This repository contains a base [Astro](https://astro.build) project scaffolded for Smile Generation Uganda. It includes:

- Astro 4 with TypeScript strict mode
- A clean `BaseLayout` component and a styled landing page
- Node-friendly `.gitignore`, favicon, and project metadata

## Getting started

1. Install dependencies:
	```powershell
	npm install
	```
2. Start the local dev server (runs at http://localhost:4321 by default):
	```powershell
	npm run dev
	```
3. Create a production build:
	```powershell
	npm run build
	```
4. Preview the production build locally:
	```powershell
	npm run preview
	```

## Project structure

```
├── public/
│   └── favicon.svg
├── src/
│   ├── env.d.ts
│   ├── layouts/
│   │   └── BaseLayout.astro
│   └── pages/
│       └── index.astro
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── README.md
```

Update `astro.config.mjs` with your production domain when ready to deploy. Consult the [Astro docs](https://docs.astro.build) for guides on adding UI frameworks, Markdown content collections, and deployment strategies.