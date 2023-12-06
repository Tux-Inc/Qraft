<script setup lang="ts"></script>

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
            class="relative flex rounded-lg p-4 border dark:border-gray-700 dark:bg-gray-800 transition-all border-gray-200 bg-white"
        >
            <div class="grid grid-cols-4 gap-4 w-full">
                <div class="flex flex-col">
                    <span
                        class="text-md uppercase font-bold text-gray-700 dark:text-white"
                        >IP Address</span
                    >
                    <span
                        class="text-sm font-semibold text-gray-700 dark:text-white"
                        >192.168.1.102</span
                    >
                </div>
                <div class="flex flex-col">
                    <span
                        class="text-md uppercase font-bold text-gray-700 dark:text-white"
                        >Port</span
                    >
                    <span
                        class="text-sm font-semibold text-gray-700 dark:text-white"
                        >25565</span
                    >
                </div>
                <div class="flex flex-col">
                    <span
                        class="text-md uppercase font-bold text-gray-700 dark:text-white"
                        >Channel
                    </span>
                    <span
                        class="text-sm font-semibold text-gray-700 dark:text-white"
                        >Paper</span
                    >
                </div>
                <div class="flex flex-col">
                    <span
                        class="text-md uppercase font-bold text-gray-700 dark:text-white"
                        >Version</span
                    >
                    <span
                        class="text-sm font-semibold text-gray-700 dark:text-white"
                        >1.20.3</span
                    >
                </div>
            </div>
        </div>
        <div class="gradient-fade"></div>
    </div>
</template>
