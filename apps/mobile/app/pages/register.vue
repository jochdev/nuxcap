<template>
  <div class="flex flex-col items-center justify-center min-h-screen px-4 bg-background">
    <UContainer class="max-w-sm w-full space-y-6">
      <div class="text-center">
        <h1 class="text-2xl font-bold">Create Account</h1>
        <p class="text-muted-foreground mt-2">Enter your email to receive a login code</p>
      </div>

      <UCard>
        <form @submit.prevent="handleRegister" class="space-y-4">
          <UFormField label="Email" name="email">
            <UInput v-model="email" type="email" placeholder="you@example.com" icon="i-lucide-mail" required />
          </UFormField>

          <UButton type="submit" block :loading="loading" :disabled="!email">
            Send Code
          </UButton>
        </form>
      </UCard>

      <p class="text-center text-sm text-muted-foreground">
        Already have an account? 
        <NuxtLink to="/login" class="text-primary hover:underline">Log in</NuxtLink>
      </p>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { useSupabaseAuth } from '../../../../packages/shared/composables/useAuth'

const email = ref('')
const { sendOtp, loading, error } = useSupabaseAuth()
const toast = useToast()

const handleRegister = async () => {
    if (!email.value) return

    const success = await sendOtp(email.value)

    if (success) {
        toast.add({ title: 'Code sent!', description: 'Please check your email.', color: 'success' })
        // Redirigir al login con el email en query param
        return navigateTo({ path: '/login', query: { email: email.value } })
    } else {
        toast.add({ title: 'Error', description: error.value || 'Failed to send OTP', color: 'error' })
    }
}
</script>
