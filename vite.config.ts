import react from '@vitejs/plugin-react';
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
    outDir: 'docs',
    emptyOutDir: true,
    minify: true,
  },
  plugins: [
    react(),
    splitVendorChunkPlugin(),
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
