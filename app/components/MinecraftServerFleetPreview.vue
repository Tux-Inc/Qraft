<!--
  - File Name: MinecraftServerFleetPreview.vue
  - Author: neptos
  - Creation Date: 2023
  -
  - Copyright (c) 2023 Tux Inc. (Qraft)
  -
  - Permission is hereby granted, free of charge, to any person obtaining a copy
  - of this software and associated documentation files (the "Software"), to deal
  - in the Software without restriction, including without limitation the rights
  - to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  - copies of the Software, and to permit persons to whom the Software is
  - furnished to do so, subject to the following conditions:
  -
  - The above copyright notice and this permission notice shall be included in
  - all copies or substantial portions of the Software.
  -
  - THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  - IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  - FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  - AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  - LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  - OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  - THE SOFTWARE.
  -->

<script setup lang="ts">
const router = useRouter();
const props = defineProps<{ minecraftServerFleet: MinecraftServerFleet }>();

function getMinecraftServerFleetStatusIcon(status: PodStatus | undefined) {
    if (!status) {
        return {
            icon: "i-heroicons-question-mark-circle",
            colorClass: "text-gray-400",
        };
    }

    switch (status.conditions[0].status) {
        case "True":
            return {
                icon: "i-heroicons-check-circle-solid",
                colorClass: "text-green-400",
            };
        case "False":
            return {
                icon: "i-heroicons-x-circle-solid",
                colorClass: "text-red-400",
            };
        default:
            return {
                icon: "i-heroicons-question-mark-circle",
                colorClass: "text-gray-400",
            };
    }
}
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
                router.push(
                    `/minecraftserverfleet/${props.minecraftServerFleet.name}`,
                )
            "
        >
            <div class="flex flex-row w-full gap-2">
                <div>
                    <UTooltip text="Minecraft server fleet">
                        <UIcon
                            name="i-heroicons-cube"
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
                                {{ props.minecraftServerFleet.name }}
                            </span>
                            <UTooltip
                                :text="
                                    props.minecraftServerFleet.status
                                        ?.conditions[0].message || 'Unknown'
                                "
                            >
                                <UIcon
                                    :name="
                                        getMinecraftServerFleetStatusIcon(
                                            props.minecraftServerFleet.status,
                                        ).icon
                                    "
                                    :class="
                                        getMinecraftServerFleetStatusIcon(
                                            props.minecraftServerFleet.status,
                                        ).colorClass
                                    "
                                    class="text-xl"
                                />
                            </UTooltip>
                        </div>
                        <div>
                            <span class="text-sm text-gray-400"
                                >{{ props.minecraftServerFleet.channel }} -
                                {{ props.minecraftServerFleet.version }}</span
                            >
                        </div>
                    </div>
                    <UTooltip text="Online Players">
                        <div class="flex flex-row gap-2 items-center">
                            <span class="text-sm text-gray-400"
                                >?/{{
                                    props.minecraftServerFleet.config.maxPlayers
                                }}
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
        <div class="gradient-fade"></div>
    </div>
</template>
