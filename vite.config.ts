import { fileURLToPath, URL } from "url";
import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [mkcert()],
    server: {
        proxy: {
            '/stream-api': {
                target: 'http://10.120.161.255:9080',
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
