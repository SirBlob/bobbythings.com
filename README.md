# bobbythings.com

Personal portfolio and technical notebook for Bobby Liu, built with Next.js, TypeScript, and plain CSS.

## Getting started

Install dependencies and start the local development server:

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Project structure

- `app/` contains pages, shared layout, metadata, and global styles.
- `components/` contains reusable interface components and their CSS modules.
- `public/` contains static files such as the favicon.

The first version uses anchored homepage sections for Home, Work, Notes, and About. These can become separate App Router pages as their content grows.
