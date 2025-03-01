import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react-swc';
import * as z from 'zod';
import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';

/**
 * Fixes issue with "__dirname is not defined in ES module scope"
 * https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/
 *
 * This is only necessary when using vite with `--configLoader runner`.
 * We use this option to allow for importing TS files from monorepos.
 * https://vite.dev/config/#configuring-vite
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Since vite is only used during development, we can assume the structure
 * will resemble a URL such as: http://localhost:3035
 */
const envSchema = z.object({
  PUBLIC_WEB_URL: z.preprocess(
    (val) => (val === undefined ? 'http://localhost:3035' : val),
    z.string().url(),
  ),
});
const env = envSchema.parse(process.env);
const webUrl = new URL(env.PUBLIC_WEB_URL);
const WEB_HOST = webUrl.hostname;
const WEB_PORT = parseInt(webUrl.port, 10);

export default defineConfig({
  plugins: [
    TanStackRouterVite({
      routeToken: 'layout',
    }),
    tailwindcss(),
    react(),
    visualizer({ open: true, filename: 'bundle-visualization.html' }),
  ],
  envPrefix: 'PUBLIC_',
  server: {
    host: WEB_HOST,
    port: WEB_PORT,
    strictPort: true,
  },
  build: {
    rollupOptions: {
      treeshake: true,
    },
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
