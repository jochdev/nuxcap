<template>
  <div class="flex flex-col items-center justify-center min-h-screen px-4 bg-background">
    <UContainer class="max-w-sm w-full space-y-6">
      <div class="text-center">
        <h1 class="text-2xl font-bold">Welcome Back</h1>
        <p v-if="step === 1" class="text-muted-foreground mt-2">Sign in with OTP</p>
        <p v-else class="text-muted-foreground mt-2">Enter code sent to {{ email }}</p>
      </div>

      <UCard>
        <form @submit.prevent="handleLogin" class="space-y-4">
          <!-- Paso 1: Ingreso de Email -->
          <template v-if="step === 1">
            <UFormField label="Email" name="email">
              <UInput v-model="email" type="email" placeholder="you@example.com" icon="i-lucide-mail" required />
            </UFormField>
            <UButton type="submit" block :loading="loading" :disabled="!email">
              Send Code
            </UButton>
          </template>

          <!-- Paso 2: Ingreso de OTP -->
          <template v-else>
            <UFormField label="OTP Code" name="otp">
              <UInput v-model="otp" type="number" placeholder="123456" icon="i-lucide-key" required />
            </UFormField>
            <div class="flex justify-between items-center text-sm">
              <span class="text-muted-foreground">{{ remainingTime }}s</span>
              <button @click="resendCode" :disabled="remainingTime > 0" class="text-primary hover:underline">
                Resend Code
              </button>
            </div>
            
            <UButton type="submit" block :loading="loading" :disabled="!otp || otp.length < 6">
              Verify & Login
            </UButton>
            
            <UButton variant="ghost" block @click="step = 1" class="mt-2 text-muted-foreground">
              Back
            </UButton>
          </template>
        </form>
      </UCard>

      <p v-if="step === 1" class="text-center text-sm text-muted-foreground">
        Don't have an account? 
        <NuxtLink to="/register" class="text-primary hover:underline">Sign up</NuxtLink>
      </p>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { useSupabaseAuth } from '../../../../packages/shared/composables/useAuth'

const route = useRoute()
const { sendOtp, verifyOtp, loading, error } = useSupabaseAuth()
const toast = useToast()

const step = ref(1)
const email = ref('')
const otp = ref('')
const remainingTime = ref(0)
let timer: any = null

onMounted(() => {
    // Si viene del registro con email precargado, saltar directo a OTP
    if (route.query.email && typeof route.query.email === 'string') {
        email.value = route.query.email
        step.value = 2
        startTimer()
    }
})

const startTimer = () => {
    remainingTime.value = 60
    if (timer) clearInterval(timer)
    timer = setInterval(() => {
        if (remainingTime.value > 0) remainingTime.value--
        else clearInterval(timer)
    }, 1000)
}

const handleLogin = async () => {
    if (step.value === 1) {
        // Enviar OTP
        if (!email.value) return toast.add({ title: 'Error', description: 'Please enter email', color: 'error' })
        
        const success = await sendOtp(email.value)
        if (success) {
            step.value = 2
            startTimer()
            toast.add({ title: 'Code sent!', color: 'success' })
        } else {
            toast.add({ title: 'Error', description: error.value || 'Failed to send OTP', color: 'error' })
        }
    } else {
        // Verificar OTP
        if (!otp.value || otp.value.length < 6) return
        
        const success = await verifyOtp(email.value, otp.value)
        if (success) {
            toast.add({ title: 'Success!', description: 'Logged in successfully', color: 'success' })
            return navigateTo('/')
        } else {
            toast.add({ title: 'Error', description: error.value || 'Invalid code', color: 'error' })
        }
    }
}

const resendCode = async () => {
    if (remainingTime.value > 0) return
    const success = await sendOtp(email.value)
    if (success) {
        startTimer()
        toast.add({ title: 'Code sent!', color: 'success' })
    }
}
</script>
