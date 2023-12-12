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
const { $listen } = useNuxtApp();
const toast = useToast();
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
const kube = useKubernetes();
const sendEvent = (event: string, type: string) => $event(event, type);

const minecraftClusters = ref<MinecraftCluster[] | null>(null);
const proxiesFleet = ref<ProxyFleet[] | null>(null);
const minecraftServersFleet = ref<MinecraftServerFleet[] | null>(null);

async function refresh() {
    minecraftClusters.value = await kube.getMinecraftClusters();
    proxiesFleet.value = await kube.getProxiesFleets();
    minecraftServersFleet.value = await kube.getMinecraftServersFleet();
}

const minecraftClustersLength = computed(() => minecraftClusters.value?.length);
const proxiesFleetLength = computed(() => proxiesFleet.value?.length);
const minecraftServersFleetLength = computed(
    () => minecraftServersFleet.value?.length,
);

onMounted(async () => {
    await refresh();
});

$listen("modal:close", async () => {
    await refresh();
});
</script>

<template>
    <div class="flex flex-col gap-8">
        <div>
            <h1 class="text-4xl font-bold">Home</h1>
            <p class="text-lg">Welcome back, {{ user?.username }}</p>
        </div>
        <InstanceList
            title="Minecraft cluster"
            description="Your minecraft clusters"
        >
            <template #actions>
                <UButton
                    variant="solid"
                    color="primary"
                    size="md"
                    icon="i-heroicons-plus-circle"
                    label="Create a cluster"
                    @click="sendEvent('modal:open', 'minecraftcluster')"
                />
            </template>
            <template #elements>
                <div v-if="!minecraftClusters" class="flex flex-col gap-2">
                    <USkeleton class="w-full h-[64px]" />
                </div>
                <EmptyList
                    v-if="minecraftClustersLength === 0"
                    title="No minecraft cluster"
                    description="No minecraft cluster, create one to get started"
                />
                <ClusterPreview
                    v-else
                    v-for="minecraftCluster in minecraftClusters"
                    :key="minecraftCluster.name"
                    :cluster="minecraftCluster"
                />
            </template>
        </InstanceList>

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
                    @click="sendEvent('modal:open', 'proxyfleet')"
                />
            </template>
            <template #elements>
                <div v-if="!proxiesFleet" class="flex flex-col gap-2">
                    <USkeleton class="w-full h-[86px]" />
                </div>
                <EmptyList
                    v-if="proxiesFleetLength === 0"
                    title="No proxies fleet"
                    description="No proxies fleet, create one to get started"
                />
                <ProxyFleetPreview
                    v-else
                    v-for="proxyFleet in proxiesFleet"
                    :key="proxyFleet.name"
                    :proxy-fleet="proxyFleet"
                />
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
                    @click="sendEvent('modal:open', 'minecraftserverfleet')"
                />
            </template>
            <template #elements>
                <div v-if="!minecraftServersFleet" class="flex flex-col gap-2">
                    <USkeleton class="w-full h-[86px]" />
                </div>
                <EmptyList
                    v-if="minecraftServersFleetLength === 0"
                    title="No servers fleet"
                    description="No servers fleet, create one to get started"
                />
                <MinecraftServerFleetPreview
                    v-else
                    v-for="minecraftServerFleet in minecraftServersFleet"
                    :key="minecraftServerFleet.name"
                    :minecraft-server-fleet="minecraftServerFleet"
                />
            </template>
        </InstanceList>
    </div>
</template>
