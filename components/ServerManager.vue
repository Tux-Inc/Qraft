
<script setup lang="ts">
const ServerName = "Server-X";
const ServerStatus = "Online";
const ServerSlot = "500";
const ServerOnlinePlayer = "250";
</script>

<template>
    <UContainer
        class="rounded-xl mx-0 my-4 p-4 border xl:ml-0 bg-dark border-b border-gray-700 bg-opacity-30 dark:border-gray-700 dark:bg-gray-800 dark:bg-opacity-30"
    >
        <div class="flex flex-col justify-center">
            <div class="flex flex-row justify-center">
                <div class="flex-1 text-center">
                    <div class="flex-col">
                        <div>Server Status :</div>
                        <div>{{ ServerStatus }}</div>
                    </div>
                </div>
                <div class="flex-1 flex-col justify-stretch text-center">
                    <u-button
                        icon="i-heroicons-play"
                        size="sm"
                        color="primary"
                        square
                        variant="solid"
                    ></u-button>
                </div>
                <div class="flex-1 text-center">
                    <div class="flex-col">
                        <div>Player Online :</div>
                        <div>{{ ServerOnlinePlayer }} / {{ ServerSlot }}</div>
                    </div>
                </div>
            </div>
        </div>
    </UContainer>
</template>

<style scoped></style>
