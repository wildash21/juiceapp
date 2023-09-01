import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import eslint from 'vite-plugin-eslint'
import checker from 'vite-plugin-checker'

import { createHtmlPlugin } from 'vite-plugin-html'

import './environment.d.ts'

// https://vitejs.dev/config/

export default ({ mode }) => {
    // Load app-level env vars to node-level env vars.
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

    return defineConfig({
        plugins: [
            react(),
            tsconfigPaths(),
            eslint(),
            checker({
                typescript: true,
            }),
            createHtmlPlugin({
                minify: true,
                inject: {
                    data: {
                        title: process.env.VITE_TITLE,
                        description: process.env.VITE_DESCRIPTION,
                        env: process.env.NODE_ENV,
                    },
                },
            }),
        ],
        css: {
            modules: {
                generateScopedName: process.env.NODE_ENV === 'development' ? '[path][name]__[local]--[hash]' : '[hash]',
            },
        },
        server: {
            host: process.env.VITE_HOST,
            port: process.env.VITE_PORT,
        },
    })
}
