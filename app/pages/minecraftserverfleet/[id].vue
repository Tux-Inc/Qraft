<script setup lang="ts">
definePageMeta({
    title: "Home",
    description: "Home page",
    url: "/",
    image: "/logo-w-text.svg",
    layout: "navigation",
    middleware: ["auth"],
});
const route = useRoute();
const serverFleetId = route.params.id;
const instanceEditItems = [
    [
        {
            label: "Edit",
            icon: "i-heroicons-pencil",
        },
        {
            label: "Clone",
            icon: "i-heroicons-document-duplicate",
        },
        {
            label: "Delete",
            icon: "i-heroicons-trash",
        },
    ],
];
</script>
<template>
    <div class="flex flex-col gap-4">
        <div class="flex flex-row flex-wrap justify-between items-center">
            <div>
                <div class="flex flex-row items-center justify-start gap-2">
                    <UIcon
                        name="i-heroicons-cube-transparent"
                        class="text-3xl font-bold"
                    />
                    <span class="text-3xl font-bold">Server-X</span>
                    <UTooltip text="Online">
                        <UIcon
                            name="i-heroicons-check-circle-solid"
                            class="text-3xl font-bold text-green-500"
                        />
                    </UTooltip>
                </div>
                <span class="text-sm text-gray-500">Server Fleet</span>
            </div>
            <div class="flex flex-row flex-wrap gap-2 items-center justify-end">
                <UDropdown
                    :items="instanceEditItems"
                    :popper="{ placement: 'bottom-end' }"
                >
                    <UButton
                        color="primary"
                        size="md"
                        icon="i-heroicons-adjustments-vertical"
                        label="Manage"
                        trailing-icon="i-heroicons-chevron-down-20-solid"
                    />
                </UDropdown>
            </div>
        </div>
        <server-infos />
        <usage-chart />
        <console />
    </div>
</template>
