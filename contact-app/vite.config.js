import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [react()],
    // 本番は https://daruks.com/contact/ 配下で配信される
    base: '/contact/',
    build: {
        // ビルド成果物をリポジトリの contact/ に出力し、そのまま GitHub Pages で配信する
        outDir: '../contact',
        emptyOutDir: true,
    },
    server: {
        // dev 時はサイト共通アセット(/styles.css 等)をローカルの Go サーバーから取得する
        proxy: {
            '/dist': 'http://localhost:8080',
            '/styles.css': 'http://localhost:8080',
            '/script.js': 'http://localhost:8080',
            '/images': 'http://localhost:8080',
            '/legal': 'http://localhost:8080',
        },
    },
});
