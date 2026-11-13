// Vite = the tool that runs your dev server and builds the final site.
// The React plugin teaches Vite how to understand JSX.
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
