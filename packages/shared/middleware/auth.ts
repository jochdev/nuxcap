export default defineNuxtRouteMiddleware((to) => {
    const user = useSupabaseUser()

    // Si no hay usuario y no vamos al login/register, redirigir
    if (!user.value && to.path !== '/login' && to.path !== '/register') {
        return navigateTo('/login')
    }
})
