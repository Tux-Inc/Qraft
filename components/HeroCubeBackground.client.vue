<script lang="ts" setup>
import { ref, computed } from "vue";

// Detecting window size
const width = ref(window.innerWidth);
const height = ref(window.innerHeight);

// Updating cell size, rows, and columns based on window size
const cellSize = computed(() => `${Math.max(width.value / 20, 30)}px`); // Adjust the divisor for more/less cells
const rows = computed(() =>
    Math.floor(height.value / parseInt(cellSize.value)),
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
const opacities = reactive([]);

// Method to randomly change opacity
const randomizeOpacity = () => {
    const totalCells = rows.value * columns.value;
    for (let i = 0; i < totalCells; i++) {
        opacities[i] = Math.random();
    }
};

// Initial randomization
randomizeOpacity();

// Optional: Re-randomize opacity at regular intervals
setInterval(randomizeOpacity, 200); // Change every 2 seconds
</script>

<style scoped>
.grid-container {
    display: grid;
    grid-template-columns: repeat(var(--columns), var(--cell));
    grid-template-rows: repeat(var(--rows), var(--cell));
    gap: 1px; /* Adjust the gap between cells */
}
.grid-cell {
    width: var(--cell);
    height: var(--cell);
    border: 1px solid #ddd; /* Adjust border style */
    background-color: #f0f0f0; /* Adjust cell background */
}
</style>

<template>
    <div
        class="absolute z-0 inset-0 grid justify-center auto-rows-[--cell] -space-y-px"
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
                    class="absolute inset-0 bg-primary-500/10 hover:bg-primary-500/20 dark:bg-primary-400/5 dark:hover:bg-primary-400/10 transition-opacity will-change-[opacity] duration-1000 cursor-pointer"
                    :style="{ opacity: opacities[(i - 1) * columns + (j - 1)] }"
                ></div>
            </div>
        </div>
    </div>
</template>
