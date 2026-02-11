<template>
  <UContainer class="py-10">
    <UCard>
      <template #header>
        <div class="flex justify-between items-center">
          <h1 class="text-xl font-bold">Admin Dashboard</h1>
          <UButton label="Logout" color="gray" variant="ghost" icon="i-lucide-log-out" />
        </div>
      </template>

      <div class="space-y-4">
        <p class="text-gray-500">Welcome to the Admin Dashboard. Select an option from the menu.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <UCard>
            <div class="flex items-center gap-2 mb-2">
              <UIcon name="i-lucide-users" class="w-5 h-5" />
              <span class="font-medium">Users</span>
            </div>
            <p class="text-2xl font-bold">1,234</p>
          </UCard>
          
          <UCard>
            <div class="flex items-center gap-2 mb-2">
              <UIcon name="i-lucide-activity" class="w-5 h-5" />
              <span class="font-medium">Active Now</span>
            </div>
            <p class="text-2xl font-bold">56</p>
          </UCard>
          
          <UCard>
            <div class="flex items-center gap-2 mb-2">
              <UIcon name="i-lucide-dollar-sign" class="w-5 h-5" />
              <span class="font-medium">Revenue</span>
            </div>
            <p class="text-2xl font-bold">$12,450</p>
          </UCard>
        </div>
      </div>
    </UCard>
  </UContainer>
</template>
