<script setup lang="ts">
import type { MinecraftCluster } from "~/types/kubernetes/MinecraftCluster";
const router = useRouter();
const props = defineProps<{ cluster: MinecraftCluster }>();
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
    <div class="relative main-div">
        <div
            class="relative flex rounded-lg p-4 border dark:border-gray-700 dark:bg-gray-800 cursor-pointer hover:bg-opacity-80 hover:dark:bg-opacity-80 transition-all border-gray-200 bg-white"
            @click.prevent="
                router.push(`/minecraftcluster/${props.cluster.name}`)
            "
        >
            <div class="flex flex-row w-full gap-2">
                <div>
                    <UTooltip text="Minecraft Cluster">
                        <UIcon
                            name="i-heroicons-server"
                            class="text-2xl text-gray-700 dark:text-white"
                        />
                    </UTooltip>
                </div>
                <div class="flex flex-row w-full justify-between items-start">
                    <div class="flex flex-col">
                        <div class="flex flex-row gap-2 items-center">
                            <span
                                class="text-xl font-semibold text-gray-700 dark:text-white"
                            >
                                {{ props.cluster.name }}
                            </span>
                        </div>
                        <div>
                            <span class="text-sm text-gray-400"> </span>
                        </div>
                    </div>
                    <UTooltip text="Online Players">
                        <div class="flex flex-row gap-2 items-center">
                            <span class="text-sm text-gray-400"> </span>
                        </div>
                    </UTooltip>
                </div>
            </div>
        </div>
        <div class="gradient-fade"></div>
    </div>
</template>
