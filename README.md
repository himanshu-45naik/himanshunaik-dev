# himanshunaik.dev

My portfolio. React + Vite + plain CSS.

## Run it

```bash
npm install      # once
npm run dev      # http://localhost:5173
npm run build    # final site in dist/
```

## Where things are

- `src/data.js`: all the text (projects, work, stack, links)
- `src/App.jsx`: page layout and keyboard shortcuts
- `src/components/`: Header, ThemeToggle, Intro, Tile, Activity, Footer
- `api/`: Vercel serverless functions that fetch GitHub and LeetCode activity
  for the heatmaps (`npm run dev` runs them too, see `vite.config.js`)
- `src/index.css`: all the styles (dark/light theme variables at the top)
- `public/assets/`: images
- `old-site/`: the first plain HTML/CSS version, kept for comparison
- `notes/`: frontend learning notes (PPTX + PDF)

Deployed on Vercel. `vercel.json` tells it to build with Vite.
