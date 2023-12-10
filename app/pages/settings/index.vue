<script setup lang="ts">
definePageMeta({
    layout: "settings",
    middleware: ["auth"],
});
</script>

<template>
    <div class="flex flex-col gap-4">
        <h1 class="text-3xl font-bold">Global settings</h1>
    </div>
</template>
