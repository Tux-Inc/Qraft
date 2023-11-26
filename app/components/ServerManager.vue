<script setup lang="ts">
import type { McServerTypeInfos } from "@/types/mcServerTypeInfos";
import type { McServerStatusInfos } from "@/types/mcServerStatusInfos";
import type { McServer } from "@/types/mcServer";
const router = useRouter();
const server = ref<McServer>({
    id: "1",
    type: "MinecraftServerFleet",
    version: {
        channel: "Paper",
        name: "1.17.1",
    },
    name: "Server-X",
    status: 1,
    players: {
        max: 20,
        online: 10,
    },
});

function getMcServerTypeInfos(type: string): McServerTypeInfos {
    switch (type) {
        case "ProxyFleet":
            return {
                name: "Minecraft Proxy",
                icon: "i-heroicons-globe-alt",
            };
        case "MinecraftServerFleet":
            return {
                name: "Minecraft Server",
                icon: "i-heroicons-cube",
            };
        default:
            return {
                name: "Unknown",
                icon: "i-heroicons-question-mark-circle-solid",
            };
    }
}

function getMcServerStatusInfos(status: number): McServerStatusInfos {
    switch (status) {
        case 1:
            return {
                name: "Online",
                icon: "i-heroicons-check-circle-solid",
                colorClass: "text-green-500",
            };
        case 0:
            return {
                name: "Offline",
                icon: "i-heroicons-x-circle-solid",
                colorClass: "text-red-500",
            };
        default:
            return {
                name: "Unknown",
                icon: "i-heroicons-question-mark-circle-solid",
                colorClass: "text-gray-500",
            };
    }
}
</script>

<template>
    <div
        class="relative flex rounded-lg p-4 bg-gray-400 border border-gray-700 dark:border-gray-700 dark:bg-gray-800 cursor-pointer hover:bg-opacity-80 hover:dark:bg-opacity-80 transition-all"
        @click.prevent="router.push(`/server/${server.id}`)"
    >
        <div class="flex flex-row w-full gap-2">
            <div>
                <UTooltip :text="getMcServerTypeInfos(server.type).name">
                    <UIcon
                        :name="getMcServerTypeInfos(server.type).icon"
                        class="text-2xl text-gray-200"
                    />
                </UTooltip>
            </div>
            <div class="flex flex-row w-full justify-between items-start">
                <div class="flex flex-col">
                    <div class="flex flex-row gap-2 items-center">
                        <span class="text-xl font-semibold text-gray-200">
                            {{ server.name }}
                        </span>
                        <UTooltip
                            :text="getMcServerStatusInfos(server.status).name"
                        >
                            <UIcon
                                :name="
                                    getMcServerStatusInfos(server.status).icon
                                "
                                :class="
                                    getMcServerStatusInfos(server.status)
                                        .colorClass
                                "
                                class="text-xl"
                            />
                        </UTooltip>
                    </div>
                    <div>
                        <span class="text-sm text-gray-400">
                            {{ server.version.channel }}
                            {{ server.version.name }}
                        </span>
                    </div>
                </div>
                <UTooltip text="Online Players">
                    <div class="flex flex-row gap-2 items-center">
                        <span class="text-sm text-gray-400">
                            {{ server.players.online }}/{{ server.players.max }}
                        </span>
                        <UIcon
                            name="i-heroicons-user-group-solid"
                            class="text-xl text-gray-400"
                        />
                    </div>
                </UTooltip>
            </div>
        </div>
    </div>
</template>
