<!--
  - File Name: HeroCubeBackground.client.vue
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
