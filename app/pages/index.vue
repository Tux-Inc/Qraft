<!--
  - File Name: index.vue
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
import "~/assets/css/main.css";
definePageMeta({
    title: "Home",
    description: "Home page",
    url: "/",
    image: "/logo-w-text.svg",
    layout: "navigation",
    middleware: ["auth"],
});
const user = useAuthUser().value?.user;
const { $event } = useNuxtApp();
const sendEvent = (event: string, type: string) => $event(event, type);
</script>

<template>
    <div class="flex flex-col gap-8 p-4">
        <div>
            <h1 class="text-4xl font-bold">Home</h1>
            <p class="text-lg">Welcome back, {{ user?.username }}</p>
        </div>
        <!-- <UsageChart /> -->
        <InstanceList
            title="Proxy fleet"
            description="Your Minecraft proxies fleet"
        >
            <template #actions>
                <UButton
                    variant="solid"
                    color="primary"
                    size="md"
                    icon="i-heroicons-plus-circle"
                    label="Create proxy"
                    @click="sendEvent('instance:new', 'proxy')"
                />
            </template>
            <template #elements>
                <InstancePreview />
            </template>
        </InstanceList>
        <InstanceList
            title="Servers fleet"
            description="Your Minecraft servers fleet"
        >
            <template #actions>
                <UButton
                    variant="solid"
                    color="primary"
                    size="md"
                    icon="i-heroicons-plus-circle"
                    label="Create server"
                    @click="sendEvent('instance:new', 'server')"
                />
            </template>
            <template #elements>
                <InstancePreview />
                <InstancePreview />
                <InstancePreview />
            </template>
        </InstanceList>
    </div>
</template>
