// import { defineStore } from 'pinia' (Auto-imported)
import { useSupabaseClient, useState } from '#imports'

export const useAppConfigStore = defineStore('app-config', () => {
    const supabase = useSupabaseClient()

    // Estado reactivo global
    const maintenance = useState('maintenance', () => ({ enabled: false, message: '' }))
    const version = useState('version', () => ({ min_version: '1.0.0', latest_version: '1.0.0', force_update: false }))
    const features = useState('features', () => ({ enable_registration: true, show_banners: true }))

    const loading = useState('config-loading', () => true)

    // Cargar configuración desde Supabase
    const fetchConfig = async () => {
        loading.value = true
        try {
            const { data, error } = await supabase.from('app_settings').select('*')

            if (error) throw error

            // Mapear DB a estado local
            if (data) {
                (data as any[]).forEach(item => {
                    if (item.key === 'maintenance_mode') maintenance.value = item.value
                    else if (item.key === 'app_version') version.value = item.value
                    else if (item.key === 'features') features.value = item.value
                })
            }
        } catch (e) {
            console.warn('⚠️ Could not load remote config (using defaults). Check your Supabase credentials.', e)
            // No hacemos throw, dejamos los valores por defecto
        } finally {
            loading.value = false
        }
    }

    return {
        maintenance,
        version,
        features,
        loading,
        fetchConfig
    }
})
