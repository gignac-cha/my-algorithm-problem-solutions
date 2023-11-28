import react from '@vitejs/plugin-react';
import { copyFile } from 'fs/promises';
import { IncomingMessage, ServerResponse } from 'http';
import {
  Connect,
  ViteDevServer,
  defineConfig,
  splitVendorChunkPlugin,
} from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  build: {
    outDir: '_site',
    emptyOutDir: true,
    minify: true,
  },
  plugins: [
    react(),
    splitVendorChunkPlugin(),
    {
      name: 'close-bundle',
      closeBundle: async () => {
        await copyFile('_site/index.html', '_site/404.html');
      },
    },
    {
      name: 'rewrite-all',
      configureServer: (server: ViteDevServer) => () => {
        server.middlewares.use(
          (
            req: Connect.IncomingMessage,
            res: ServerResponse<IncomingMessage>,
            next: Connect.NextFunction,
          ) => {
            req.url = '/index.html';
            next();
          },
        );
      },
    },
  ],
});
