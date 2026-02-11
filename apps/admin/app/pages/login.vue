<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
    <UContainer class="max-w-md w-full">
      <div class="text-center mb-6">
        <h1 class="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p class="text-gray-500">Secure Access Portal</p>
      </div>

      <UCard>
        <form @submit.prevent="handleLogin" class="space-y-4">
          <!-- Paso 1: Email -->
          <div v-if="step === 1">
            <UFormGroup label="Admin Email" name="email">
              <UInput v-model="email" type="email" placeholder="admin@nuxcap.com" icon="i-lucide-shield" required />
            </UFormGroup>
            <UButton type="submit" block :loading="loading" color="black" class="mt-4">
              Send Secure Code
            </UButton>
          </div>

          <!-- Paso 2: OTP -->
          <div v-else>
            <UFormGroup label="Verification Code" name="otp">
              <UInput v-model="otp" type="text" placeholder="######" icon="i-lucide-lock" required autocapitalize="off" />
            </UFormGroup>
            
            <UButton type="submit" block :loading="loading" color="green" class="mt-4">
              Unlock Dashboard
            </UButton>
            
            <button type="button" @click="step = 1" class="text-xs text-gray-500 hover:text-gray-900 mt-2 w-full text-center">
              Use a different email
            </button>
          </div>
        </form>
      </UCard>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { useSupabaseAuth } from '../../../../packages/shared/composables/useAuth'

const { sendOtp, verifyOtp, loading, error, isAdmin } = useSupabaseAuth()
const toast = useToast()

const step = ref(1)
const email = ref('')
const otp = ref('')

const handleLogin = async () => {
  if (step.value === 1) {
    if (!email.value) return
    const success = await sendOtp(email.value)
    if (success) {
      step.value = 2
      toast.add({ title: 'Code sent', color: 'green' })
    } else {
      toast.add({ title: 'Error', description: error.value, color: 'red' })
    }
  } else {
    if (!otp.value) return
    const success = await verifyOtp(email.value, otp.value)
    if (success) {
      // Check Admin Role
      // if (!isAdmin.value) { ... handle unauthorized ... }
      toast.add({ title: 'Welcome Admin', color: 'green' })
      return navigateTo('/')
    } else {
      toast.add({ title: 'Invalid Code', description: error.value, color: 'red' })
    }
  }
}
</script>
