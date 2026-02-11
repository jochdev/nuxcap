<template>
  <div class="space-y-8 py-8">
    <!-- Hero Section -->
    <UContainer class="text-center space-y-4">
      <h1 class="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
        Nuxt Starter Template
      </h1>
      <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
        A production-ready starter template powered by Nuxt UI. Build beautiful, accessible, and performant applications in minutes.
      </p>
      <div class="flex justify-center gap-4 pt-4">
        <UButton
          label="Get started"
          to="https://ui.nuxt.com"
          target="_blank"
          size="xl"
          trailing-icon="i-lucide-arrow-right"
        />
        <UButton
          label="Use this template"
          to="https://github.com/nuxt-ui-templates/starter"
          target="_blank"
          size="xl"
          color="neutral"
          variant="subtle"
          icon="i-simple-icons-github"
        />
      </div>
    </UContainer>

    <!-- Features Section -->
    <UContainer>
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold tracking-tight">Everything you need</h2>
        <p class="text-muted-foreground mt-2">Start with a solid foundation for your mobile app.</p>
      </div>
      
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <UCard v-for="(feature, index) in features" :key="index">
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon :name="feature.icon" class="w-6 h-6 text-primary" />
              <h3 class="font-semibold">{{ feature.title }}</h3>
            </div>
          </template>
          <p class="text-sm text-muted-foreground">{{ feature.description }}</p>
        </UCard>
      </div>
    </UContainer>

    <!-- CTA Section -->
    <UContainer>
      <UCard class="bg-primary/5 border-primary/20 text-center py-8">
        <template #header>
          <h2 class="text-2xl font-bold">Ready to build your next Nuxt app?</h2>
        </template>
        
        <p class="mb-6 text-muted-foreground">Join thousands of developers building with Nuxt and Nuxt UI.</p>
        
        <div class="flex justify-center gap-4">
          <UButton
            label="Start building"
            to="https://ui.nuxt.com"
            target="_blank"
            trailing-icon="i-lucide-arrow-right"
            color="neutral"
          />
          <UButton
            label="View on GitHub"
            to="https://github.com/nuxt-ui-templates/starter"
            target="_blank"
            icon="i-simple-icons-github"
            color="neutral"
            variant="outline"
          />
        </div>
      </UCard>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const features = [
  {
    icon: 'i-lucide-rocket',
    title: 'Production-ready',
    description: 'Pre-configured with TypeScript, ESLint, Tailwind CSS, and all the best practices.'
  },
  {
    icon: 'i-lucide-palette',
    title: 'Beautiful by default',
    description: 'Leveraging Nuxt UI design system with automatic dark mode and consistent spacing.'
  },
  {
    icon: 'i-lucide-zap',
    title: 'Lightning fast',
    description: 'Optimized for performance with static generation support and edge-ready deployment.'
  },
  {
    icon: 'i-lucide-smartphone',
    title: 'Mobile First',
    description: 'Designed to work perfectly on mobile devices with Capacitor integration.'
  },
  {
    icon: 'i-lucide-code-2',
    title: 'Developer experience',
    description: 'Auto-imports, hot module replacement, and TypeScript support out of the box.'
  },
  {
    icon: 'i-lucide-shield-check',
    title: 'Built for scale',
    description: 'Enterprise-ready architecture with proper error handling and security best practices.'
  }
]
</script>
