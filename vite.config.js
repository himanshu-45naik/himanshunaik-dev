// Vite = the tool that runs your dev server and builds the final site.
// The React plugin teaches Vite how to understand JSX.
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

// On Vercel, each file in api/ becomes a serverless function
// (api/github.js → /api/github). `npm run dev` doesn't know about them,
// so this small plugin runs the same files locally.
function localApi() {
  return {
    name: "local-api",
    configureServer(server) {
      server.middlewares.use("/api", async (req, res, next) => {
        const name = req.url.split("?")[0].replace(/^\//, "");
        const file = resolve(server.config.root, "api", `${name}.js`);
        if (!/^[\w-]+$/.test(name) || !existsSync(file)) return next();

        try {
          // ?t= skips Node's import cache, so edits show up without a restart
          const { GET } = await import(`${pathToFileURL(file).href}?t=${Date.now()}`);
          const response = await GET(new Request(new URL(req.url, "http://localhost")));
          res.statusCode = response.status;
          response.headers.forEach((value, key) => res.setHeader(key, value));
          res.end(await response.text());
        } catch (error) {
          next(error);
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), localApi()],
});
