<script lang="ts" setup>
import { ref, computed } from "vue";

// Detecting window size
const width = ref(window.innerWidth);
const height = ref(window.innerHeight);

// Updating cell size, rows, and columns based on window size
const cellSize = computed(() => `${Math.max(width.value / 20, 30)}px`); // Adjust the divisor for more/less cells
const rows = computed(
    () => Math.floor(height.value / parseInt(cellSize.value)) + 1,
);
const columns = computed(() =>
    Math.floor(width.value / parseInt(cellSize.value)),
);

// Update on window resize
window.addEventListener("resize", () => {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
});

// New: Array to hold opacity values for each cell
const opacities = ref<number[]>([]);

// Method to randomly change opacity
const randomizeOpacity = () => {
    const totalCells = rows.value * columns.value;
    for (let i = 0; i < totalCells; i++) {
        opacities.value[i] = Math.random();
    }
};

// Initial randomization
randomizeOpacity();

// Optional: Re-randomize opacity at regular intervals
setInterval(randomizeOpacity, 500); // Change every 2 seconds
</script>

<template>
    <div
        class="absolute z-0 inset-0 grid justify-center auto-rows-[--cell] -space-y-px opacity-25 overflow-hidden"
        :style="{ '--cell': cellSize, '--rows': rows, '--columns': columns }"
    >
        <div
            v-for="i in rows"
            :key="i"
            class="grid grid-flow-col auto-cols-[--cell] flex-1 -space-x-px"
        >
            <div
                v-for="j in columns"
                :key="j"
                class="relative border border-primary-200/50 dark:border-primary-900/25"
            >
                <div
                    class="absolute inset-0 bg-primary-500/10 dark:bg-primary-400/5 transition-opacity will-change-[opacity] duration-1000"
                    :class="{
                        'opacity-0': opacities[i * j] < 0.5,
                        'opacity-100': opacities[i * j] >= 0.5,
                    }"
                ></div>
            </div>
        </div>
    </div>
</template>
