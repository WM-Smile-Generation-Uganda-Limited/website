# WM Smile Generation Uganda Limited - Website

This repository contains the official website for WM Smile Generation Uganda Limited, a non-profit organization dedicated to nurturing minds and growing futures for the children and youth of Uganda.

The website is built with [Astro](https://astro.build) and styled with [Tailwind CSS](https://tailwindcss.com/).

## Features

-   **Astro 4**: A modern web framework for building fast, content-focused websites.
-   **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
-   **Content Collections**: Astro's built-in feature for managing content, used for the blog.
-   **MDX Support**: Blog posts are written in MDX for a rich content experience.
-   **Responsive Design**: Fully responsive layout for all devices.
-   **Static & Dynamic Pages**: Includes static pages (About, Contact, etc.) and a dynamic, paginated blog.

## Getting Started

1.  **Install dependencies:**
    ```powershell
    npm install
    ```
2.  **Start the local development server:**
    (Runs at http://localhost:4321 by default)
    ```powershell
    npm run dev
    ```
3.  **Create a production build:**
    ```powershell
    npm run build
    ```
4.  **Preview the production build locally:**
    ```powershell
    npm run preview
    ```

## Project Structure

```
.
├── design/                 # HTML design mockups
├── public/
│   └── favicon.svg
├── src/
│   ├── components/         # Reusable Astro components
│   │   └── BlogPostCard.astro
│   ├── content/            # Astro Content Collections
│   │   ├── blog/
│   │   │   └── first-library-opening.mdx
│   │   └── config.ts       # Collection schema definitions
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── about.astro
│   │   ├── blog/
│   │   │   ├── [...page].astro   # Paginated blog index
│   │   │   └── [slug].astro      # Dynamic blog post pages
│   │   ├── contact.astro
│   │   ├── donate.astro
│   │   ├── index.astro
│   │   ├── our-mission.astro
│   │   ├── our-partners.astro
│   │   └── partnership.astro
│   └── styles/
├── astro.config.mjs
├── package.json
├── tailwind.config.mjs
├── tsconfig.json
└── README.md
```

Update `astro.config.mjs` with your production domain when ready to deploy. Consult the [Astro docs](https://docs.astro.build) for guides on adding UI frameworks, Markdown content collections, and deployment strategies.