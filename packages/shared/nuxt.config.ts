// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/supabase',
        '@nuxt/ui',
        '@nuxt/fonts',
        '@pinia/nuxt',
        'pinia-plugin-persistedstate/nuxt'
    ],
    fonts: {
        families: [
            { name: 'Inter', provider: 'google' }
        ]
    },
    supabase: {
        redirect: false
    },
    compatibilityDate: '2026-02-10'
})
