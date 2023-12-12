<script lang="ts" setup>
const commandPrompt = ref<string>("");
const accordionItems = [
    {
        label: "Console",
        icon: "i-heroicons-command-line",
        defaultOpen: true,
        slot: "console",
        color: "gray",
        variant: "ghost",
    },
];
</script>
<style scoped>
.gradient-fade {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    pointer-events: none;
    opacity: 0.8;
    transition: opacity 0.2s ease-in-out;
}

@media (prefers-color-scheme: dark) {
    .gradient-fade {
        background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0),
            rgba(17, 24, 39, 100) 110%
        );
    }
}
</style>
<template>
    <div>
        <UAccordion :items="accordionItems">
            <div class="relative">
                <div
                    class="flex flex-col justify-between bg-gray-100 dark:bg-gray-800 rounded-xl p-4 min-h-[500px] max-h-[500px] overflow-hidden border dark:border-gray-700"
                >
                    <span class="text-sm font-bold text-dark dark:text-light"
                        >Live trace</span
                    >
                    <div class="overflow-y-auto mt-2 overflow-x-hidden">
                        <slot name="logs" />
                    </div>
                    <div class="flex flex-row gap-2 mt-2">
                        <UInput
                            v-model="commandPrompt"
                            name="commandPrompt"
                            placeholder="Enter a command..."
                            icon="i-heroicons-chevron-right"
                            autocomplete="off"
                            :ui="{ icon: { trailing: { pointer: '' } } }"
                            class="flex-grow"
                        >
                            <template #trailing>
                                <UButton
                                    v-show="commandPrompt !== ''"
                                    color="gray"
                                    variant="link"
                                    icon="i-heroicons-x-mark-20-solid"
                                    :padded="false"
                                    @click="commandPrompt = ''"
                                />
                            </template>
                        </UInput>
                        <UButton
                            color="gray"
                            variant="link"
                            icon="i-heroicons-play-solid"
                            :padded="false"
                        />
                        <UButton
                            color="gray"
                            variant="link"
                            icon="i-heroicons-refresh-20-solid"
                            :padded="false"
                        />
                    </div>
                </div>
                <div class="gradient-fade"></div>
            </div>
        </UAccordion>
    </div>
</template>

<style scoped></style>
