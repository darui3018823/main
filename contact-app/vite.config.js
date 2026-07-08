import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const configDir = dirname(fileURLToPath(import.meta.url));

const copyContactEntryToNestedRoutes = () => ({
    name: 'copy-contact-entry-to-nested-routes',
    closeBundle() {
        const outDir = resolve(configDir, '../contact');
        const entry = resolve(outDir, 'index.html');
        const privacyPolicyDir = resolve(outDir, 'privacy-policy');
        const privacyPolicyHtml = readFileSync(entry, 'utf8')
            .replace('<title>Contact | daruks.com</title>', '<title>Privacy Policy | daruks.com</title>')
            .replace('content="Contact - daruks.com"', 'content="Privacy Policy - daruks.com"')
            .replace('content="Contact page of daruks.com"', 'content="daruks.com お問い合わせフォームにおけるプライバシーポリシー"')
            .replace('content="https://daruks.com/contact"', 'content="https://daruks.com/contact/privacy-policy/"');

        mkdirSync(privacyPolicyDir, { recursive: true });
        writeFileSync(resolve(privacyPolicyDir, 'index.html'), privacyPolicyHtml);
    },
});

export default defineConfig({
    plugins: [react(), copyContactEntryToNestedRoutes()],
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
