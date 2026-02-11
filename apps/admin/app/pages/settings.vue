<template>
  <div class="min-h-screen bg-gray-50 pb-8">
    <header class="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
      <div class="font-bold text-lg">App Configuration</div>
      <UButton to="/" variant="ghost" icon="i-lucide-arrow-left" label="Back to Dashboard" />
    </header>

    <UContainer class="py-8 space-y-6">
      <UCard>
        <template #header>
          <div class="flex justify-between items-center">
            <h3 class="font-semibold text-lg">Global App Settings</h3>
            <UButton v-if="hasChanges" @click="saveSettings" :loading="loading" color="success">Save Changes</UButton>
          </div>
        </template>

        <div v-if="loading" class="py-8 text-center">
          <UIcon name="i-lucide-loader-2" class="animate-spin w-8 h-8 mx-auto" />
        </div>

        <div v-else class="space-y-6">
          <!-- Maintenance Mode -->
          <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p class="font-medium text-gray-900">Maintenance Mode</p>
              <p class="text-sm text-gray-500">Enable to block access to the mobile app.</p>
            </div>
            <USwitch v-model="config.maintenance.enabled" color="error" />
          </div>
          <UFormField label="Maintenance Message" v-if="config.maintenance.enabled">
            <UInput v-model="config.maintenance.message" />
          </UFormField>

          <USeparator />

          <!-- App Version -->
          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Minimum Version" description="Older versions will be forced to update">
              <UInput v-model="config.version.min_version" placeholder="1.0.0" />
            </UFormField>
            <UFormField label="Latest Version" description="Current store version">
              <UInput v-model="config.version.latest_version" placeholder="1.0.1" />
            </UFormField>
          </div>
          
          <UCheckbox v-model="config.version.force_update" label="Force Update Alert" />

          <USeparator />

          <!-- Feature Flags -->
          <h4 class="font-medium text-gray-900 pt-2">Features</h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <UCheckbox v-model="config.features.enable_registration" label="Enable Registration" />
            <UCheckbox v-model="config.features.show_banners" label="Show Promo Banners" />
          </div>
        </div>
      </UCard>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'

definePageMeta({
  middleware: 'auth' // Debe ser admin
})

const supabase = useSupabaseClient()
const toast = useToast()
const loading = ref(true)
const hasChanges = ref(false)

// Estado local reactivo
const config = reactive({
  maintenance: { enabled: false, message: '' },
  version: { min_version: '', latest_version: '', force_update: false },
  features: { enable_registration: true, show_banners: true }
})

// Cargar configuración desde Supabase
const fetchSettings = async () => {
  loading.value = true
  try {
    const { data, error } = await supabase.from('app_settings').select('*')
    if (error) throw error
    
    // Mapear DB a estado local
    (data as any[]).forEach(item => {
      if (item.key === 'maintenance_mode') config.maintenance = item.value
      else if (item.key === 'app_version') config.version = item.value
      else if (item.key === 'features') config.features = item.value
    })
  } catch (e: any) {
    toast.add({ title: 'Error loading settings', description: e.message, color: 'error' })
  } finally {
    loading.value = false
  }
}

const saveSettings = async () => {
  loading.value = true
  try {
    // Guardar Maintenance
    await supabase.from('app_settings').upsert({ key: 'maintenance_mode', value: config.maintenance } as any)
    // Guardar Version
    await supabase.from('app_settings').upsert({ key: 'app_version', value: config.version } as any)
    // Guardar Features
    await supabase.from('app_settings').upsert({ key: 'features', value: config.features } as any)

    toast.add({ title: 'Settings saved', color: 'success' })
    hasChanges.value = false
  } catch (e: any) {
    toast.add({ title: 'Error saving', description: e.message, color: 'error' })
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchSettings()
})

// Detectar cambios
watch(config, () => {
  if (!loading.value) hasChanges.value = true
}, { deep: true })

</script>
