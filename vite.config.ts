import dotenv from 'dotenv';
import { fileURLToPath, URL } from "url";
import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [mkcert()],
    server: {
        proxy: {
            '/stream-api': {
                target: process?.env?.URL_API_PROXY,
                changeOrigin: true,
                secure: true,
                ws: true,
                // rewrite: (path) => path.replace(/^\/stream-api/, ''),
            },
        },
    },
    resolve: {
        alias: [
            {
                find: "_",
                replacement: fileURLToPath(new URL("./src", import.meta.url)),
            },
        ],
    },
});
