<script setup lang="ts">
import ServerManager from "~/components/ServerManager.vue";

const { data: healthCheckData, refresh } = await useFetch("/api/healthz");
import '~/assets/css/main.css'
</script>

<template>
    <div>
        <h1>Homepage</h1>
        <p>Health check: {{ healthCheckData }}</p>
        <UButton @click="refresh">Refresh</UButton>
        <Console />
        <ServerManager />
    </div>
</template>
