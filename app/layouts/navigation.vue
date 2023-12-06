<!--
  - File Name: default.vue
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
const { $listen } = useNuxtApp();
const isNewInstanceModalOpen = ref(false);
$listen("instance:new", (type: any) => {
    console.log(`New instance of type ${type} created!`);
    isNewInstanceModalOpen.value = true;
});
</script>

<template>
    <div class="flex flex-col justify-between relative h-screen">
        <div>
            <Navbar />
            <UContainer
                class="py-4 w-full justify-self-start place-content-start"
            >
                <slot />
            </UContainer>
        </div>
        <Footer />
        <UModal v-model="isNewInstanceModalOpen">
            <NewInstanceModal />
        </UModal>
    </div>
</template>
