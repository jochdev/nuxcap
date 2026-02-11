<template>
  <div class="min-h-screen bg-gray-50 pb-8">
    <!-- Navbar simplificado -->
    <header class="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
      <div class="font-bold text-lg flex items-center gap-2">
        <UIcon name="i-lucide-layout-dashboard" class="w-5 h-5 text-primary" />
        Admin Portal
      </div>
      <div class="flex items-center gap-4">
        <span class="text-sm text-gray-500 hidden sm:block">{{ user?.email }}</span>
        <UButton
          size="sm"
          color="neutral"
          variant="ghost"
          icon="i-lucide-log-out"
          label="Logout"
          @click="handleLogout"
        />
      </div>
    </header>

    <UContainer class="py-8 space-y-8">
      <!-- Welcome Section -->
      <div>
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        <p class="text-gray-500">Overview of your mobile app performance.</p>
      </div>

      <!-- Metrics Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <UCard v-for="(stat, index) in stats" :key="index">
          <div class="flex items-center gap-4">
            <div :class="`p-2 rounded-lg ${stat.bg} ${stat.text}`">
              <UIcon :name="stat.icon" class="w-6 h-6" />
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">{{ stat.label }}</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stat.value }}</p>
            </div>
          </div>
        </UCard>
      </div>

      <!-- Recent Activity / Content Management -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content Area -->
        <div class="lg:col-span-2 space-y-6">
          <UCard>
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="font-semibold text-gray-900">Recent Users</h3>
                <UButton size="xs" variant="soft" label="View All" />
              </div>
            </template>
            <div class="space-y-4">
              <div v-for="i in 5" :key="i" class="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div class="flex items-center gap-3">
                  <UAvatar :alt="`User ${i}`" size="sm" />
                  <div>
                    <p class="text-sm font-medium">User {{ i }}</p>
                    <p class="text-xs text-gray-500">user{{ i }}@example.com</p>
                  </div>
                </div>
                <UBadge :color="i % 2 === 0 ? 'success' : 'neutral'" variant="subtle" size="xs">
                  {{ i % 2 === 0 ? 'Active' : 'Offline' }}
                </UBadge>
              </div>
            </div>
          </UCard>
        </div>

        <!-- System Status -->
        <div class="space-y-6">
          <UCard>
            <template #header>
              <h3 class="font-semibold text-gray-900">System Health</h3>
            </template>
            <div class="space-y-4">
              <div class="flex justify-between text-sm">
                <span class="text-gray-500">Database</span>
                <span class="text-green-600 font-medium">Connected</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-500">API Latency</span>
                <span class="text-gray-900">45ms</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-500">Version</span>
                <span class="text-gray-900">v1.0.0</span>
              </div>
              <USeparator />
              <div class="pt-2">
                 <UButton block label="System Logs" variant="outline" color="neutral" />
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { useSupabaseAuth } from '../../../../packages/shared/composables/useAuth'

definePageMeta({
  middleware: 'auth'
})

const { user, logout } = useSupabaseAuth()

const handleLogout = async () => {
  await logout('/login')
}

const stats = [
  { label: 'Total Users', value: '1,234', icon: 'i-lucide-users', bg: 'bg-blue-50', text: 'text-blue-600' },
  { label: 'Active Sessions', value: '423', icon: 'i-lucide-activity', bg: 'bg-green-50', text: 'text-green-600' },
  { label: 'New Signups', value: '+12%', icon: 'i-lucide-trending-up', bg: 'bg-purple-50', text: 'text-purple-600' },
  { label: 'Revenue', value: '$12.5k', icon: 'i-lucide-dollar-sign', bg: 'bg-orange-50', text: 'text-orange-600' }
]
</script>
