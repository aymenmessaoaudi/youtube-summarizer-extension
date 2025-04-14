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
                sidebar: resolve(__dirname, 'src/sidebar/index.html'),
                styles: resolve(__dirname, 'src/styles/summary.css'),
            },
            output: {
                entryFileNames: '[name].js',
                chunkFileNames: '[name].js',
                assetFileNames: (assetInfo) => {
                    // Vérification plus stricte du type
                    if (assetInfo && assetInfo.name && assetInfo.name.endsWith('.css')) {
                        return 'styles/[name][extname]';
                    }
                    return '[name].[ext]';
                },
            },
        },
        outDir: 'dist',
        emptyOutDir: true,
        cssCodeSplit: true,
        assetsInlineLimit: 0,
    },
});
