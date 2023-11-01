<script setup lang="ts">
const { data: healthCheckData, refresh } = await useFetch("/api/healthz");
import '~/assets/css/main.css'
</script>

<template>
    <div>
        <h1>Homepage</h1>
        <p>Health check: {{ healthCheckData }}</p>
        <UButton @click="refresh">Refresh</UButton>
        <Console />
    </div>
</template>
