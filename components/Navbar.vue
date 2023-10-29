<script setup lang="ts">
const instancesItems = [
  [{
    label: 'New instance',
    icon: 'i-heroicons-plus',
    to: '/instances/new',
  }],
  [{
    label: 'Manage instances',
    icon: 'i-heroicons-cube',
    to: '/instances',
  }],
  [{
    label: 'Manage templates',
    icon: 'i-heroicons-cube-transparent',
    to: '/instances/templates',
  }],
]

const userItems = [
  [{
    label: 'ben@example.com',
    slot: 'account',
    disabled: true
  }], [{
    label: 'Settings',
    icon: 'i-heroicons-cog-8-tooth'
  }], [{
    label: 'Documentation',
    icon: 'i-heroicons-book-open'
  }, {
    label: 'Changelog',
    icon: 'i-heroicons-megaphone'
  }], [{
    label: 'Sign out',
    icon: 'i-heroicons-arrow-left-on-rectangle'
  }]
]
</script>

<template>
  <div class="fixed w-full px-8 py-4 bg-dark flex justify-between items-center backdrop-filter backdrop-blur-lg bg-opacity-30">
    <NuxtImg src="/logo-w-text.svg" alt="Qraft logo" width="100" height="100" />
    <div class="flex items-center gap-2">
      <UDropdown :items="instancesItems" :popper="{placement: 'bottom-start'}">
        <UButton variant="ghost" color="primary" size="md" icon="i-heroicons-cube" label="Instances" trailing-icon="i-heroicons-chevron-down-20-solid" />
      </UDropdown>
    </div>
    <div class="flex items-center gap-2">
      <UDropdown :items="userItems" :popper="{placement: 'bottom-end'}">
        <UButton variant="ghost" color="primary" size="md" icon="i-heroicons-user-circle" label="User" trailing-icon="i-heroicons-chevron-down-20-solid" />
      </UDropdown>
    </div>
  </div>
</template>