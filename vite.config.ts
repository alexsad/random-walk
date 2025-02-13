import { fileURLToPath, URL } from "url";
import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';
import dotenv from 'dotenv';

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
                // rewrite: (path) => path.replace(/^\/medai/, ''),
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
