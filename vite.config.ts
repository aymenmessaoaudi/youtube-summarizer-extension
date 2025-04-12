import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');

export default defineConfig({
    plugins: [react()],
    build: {
        rollupOptions: {
            input: {
                content: resolve(__dirname, 'src/content.ts'),
                background: resolve(__dirname, 'src/background.ts'),
                sidebar: resolve(__dirname, 'src/sidebar/index.html'), // ✅ Doit correspondre
            }
            ,
            output: {
                entryFileNames: '[name].js',        // ✅ pas de hash
                chunkFileNames: '[name].js',
                assetFileNames: '[name].[ext]',
            },
        },
        outDir: 'dist',
        emptyOutDir: true,
    },
});
