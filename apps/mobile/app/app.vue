<script setup lang="ts">
import { useAppConfigStore } from '../../../packages/shared/composables/useAppConfig'

const appConfig = useAppConfigStore()
const { maintenance } = storeToRefs(appConfig)

onMounted(() => {
  appConfig.fetchConfig()
})
</script>

<template>
  <div class="fixed inset-0 flex flex-col bg-background text-foreground">
    <!-- Maintenance Overlay -->
    <div v-if="maintenance.enabled" class="z-50 absolute inset-0 bg-background flex flex-col items-center justify-center p-6 text-center">
      <UIcon name="i-lucide-wrench" class="w-16 h-16 text-primary mb-4" />
      <h1 class="text-2xl font-bold mb-2">Under Maintenance</h1>
      <p class="text-muted-foreground">{{ maintenance.message || 'We are improving the app. Please check back later.' }}</p>
    </div>

    <!-- Header simulado -->
    <header class="flex items-center justify-between px-4 py-3 border-b border-border">
      <div class="font-bold text-lg">Nuxcap</div>
      <UButton icon="i-lucide-menu" color="neutral" variant="ghost" />
    </header>

    <!-- Contenido principal -->
    <main class="flex-1 overflow-auto p-4">
      <NuxtPage />
    </main>

    <!-- Footer simulado (Bottom Navigation) -->
    <nav class="flex justify-around items-center border-t border-border py-2 bg-background/80 backdrop-blur safe-area-bottom">
      <UButton to="/" icon="i-lucide-home" label="Home" variant="ghost" color="neutral" class="flex-col gap-1 text-xs" :ui="{ leadingIcon: 'w-6 h-6' }" />
      <UButton to="/explore" icon="i-lucide-search" label="Explore" variant="ghost" color="neutral" class="flex-col gap-1 text-xs" :ui="{ leadingIcon: 'w-6 h-6' }" />
      <UButton to="/profile" icon="i-lucide-user" label="Profile" variant="ghost" color="neutral" class="flex-col gap-1 text-xs" :ui="{ leadingIcon: 'w-6 h-6' }" />
    </nav>
  </div>
</template>

<style>
.safe-area-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
