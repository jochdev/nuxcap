// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    srcDir: 'app',
    extends: ['../../packages/shared'],
    modules: [
        '@nuxt/eslint',
        '@nuxt/ui'
    ],

    nitro: {
        preset: 'netlify'
    },

    devtools: {
        enabled: true
    },

    css: ['~/assets/css/main.css'],

    compatibilityDate: '2026-02-10',

    eslint: {
        config: {
            stylistic: {
                commaDangle: 'never',
                braceStyle: '1tbs'
            }
        }
    }
})
