import { useSupabaseClient, useSupabaseUser, useState, navigateTo } from '#imports'
import { ref, computed } from 'vue'

export const useSupabaseAuth = () => {
    const supabase = useSupabaseClient()
    const user = useSupabaseUser()

    // Estado global compartido para el perfil
    const userProfile = useState('user-profile', () => null)

    const loading = ref(false)
    const error = ref<string | null>(null)

    const isLoggedIn = computed(() => !!user.value)

    // Obtener perfil del usuario
    const fetchProfile = async () => {
        if (!user.value) return

        const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.value.id)
            .single()

        if (data) userProfile.value = data
    }

    // 1. Enviar Código OTP (Sirve para Login y Registro)
    const sendOtp = async (email: string) => {
        loading.value = true
        error.value = null

        try {
            const { error: authError } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    shouldCreateUser: true // Permite registro implícito
                }
            })

            if (authError) throw authError
            return true
        } catch (e: any) {
            error.value = e.message
            return false
        } finally {
            loading.value = false
        }
    }

    // 2. Verificar Código OTP
    const verifyOtp = async (email: string, token: string) => {
        loading.value = true
        error.value = null

        try {
            const { data, error: authError } = await supabase.auth.verifyOtp({
                email,
                token,
                type: 'email'
            })

            if (authError) throw authError

            // Si funciona, traemos el perfil
            if (data.user) {
                user.value = data.user
                await fetchProfile()
            }

            return true
        } catch (e: any) {
            error.value = e.message
            return false
        } finally {
            loading.value = false
        }
    }

    const logout = async (redirectUrl = '/login') => {
        await supabase.auth.signOut()
        userProfile.value = null
        user.value = null
        // Navegar al login
        return navigateTo(redirectUrl)
    }

    const isAdmin = computed(() => userProfile.value?.role === 'admin')

    return {
        user,
        userProfile,
        isLoggedIn,
        isAdmin,
        loading,
        error,
        sendOtp,
        verifyOtp,
        logout,
        fetchProfile
    }
}
