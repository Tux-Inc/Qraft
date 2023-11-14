<script lang="ts" setup>
import { ref, computed } from "vue";

const width = ref(window.innerWidth);
const height = ref(window.innerHeight);

const cellSize = computed(() => `${Math.max(width.value / 20, 30)}px`);
const rows = computed(
    () => Math.floor(height.value / parseInt(cellSize.value)) + 1,
);
const columns = computed(() =>
    Math.floor(width.value / parseInt(cellSize.value)),
);

window.addEventListener("resize", () => {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
});

const opacities = ref<number[]>([]);

const randomizeOpacity = () => {
    const totalCells = rows.value * columns.value;
    for (let i = 0; i < totalCells; i++) {
        opacities.value[i] = Math.random();
    }
};

randomizeOpacity();
setInterval(randomizeOpacity, 500);
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
