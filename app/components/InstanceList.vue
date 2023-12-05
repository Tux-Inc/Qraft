<script setup lang="ts">
defineProps({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <div>
        <div
            class="flex flex-row flex-wrap justify-between items-center relative"
        >
            <div class="flex flex-col">
                <span class="text-2xl font-bold">{{ title }}</span>
                <span class="text-sm text-gray-500">{{ description }}</span>
            </div>
            <div class="flex flex-row flex-wrap gap-2">
                <slot name="actions" />
            </div>
        </div>
        <div class="flex flex-col gap-4 mt-4 max-h-96 overflow-y-auto">
            <slot name="elements" />
        </div>
    </div>
</template>
