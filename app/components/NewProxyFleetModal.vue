<!--
  - File Name: NewProxyFleetModal.vue
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
import type { FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";
const { $event } = useNuxtApp();
const toast = useToast();

const sendEvent = (event: string) => $event(event);

const formState = ref<ProxyFleet>({
    name: "",
    clusterRefName: "",
    config: {
        maxPlayers: 100,
        motd: "A minecraft cluster by Qraft",
        proxyProtocol: false,
    },
});

const minecraftClustersNames = ref<string[]>([]);

async function getMinecraftClustersNames(): Promise<string[]> {
    try {
        const clusters = await $fetch<MinecraftCluster[]>(
            "/api/kubernetes/minecraftcluster",
        );
        return clusters.map((cluster) => cluster.name);
    } catch (error: any) {
        console.log(error);
        toast.add({
            title: "Minecraft clusters",
            icon: "i-heroicons-x-circle",
            description: "Cannot get infos, is Kubernetes down ?",
            color: "red",
        });
        return [];
    }
}

onMounted(async () => {
    minecraftClustersNames.value = await getMinecraftClustersNames();
});

async function submit(event: FormSubmitEvent<any>) {
    try {
        await $fetch("/api/kubernetes/proxyfleet", {
            method: "POST",
            body: JSON.stringify(event.data),
        });
        toast.add({
            title: "Proxy fleet created",
            icon: "i-heroicons-check-circle",
            description: `Proxy fleet has been created`,
            color: "green",
        });
        sendEvent("modal:close");
    } catch (error: any) {
        console.log(error);
        toast.add({
            title: "Proxy fleet",
            icon: "i-heroicons-x-circle",
            description: "Cannot create proxy fleet, is Kubernetes down ?",
            color: "red",
        });
    }
}
</script>

<template>
    <div class="p-4">
        <div class="flex flex-row items-center justify-start gap-2">
            <UIcon
                name="i-heroicons-cube-transparent"
                class="text-lg font-bold"
            />
            <span class="text-lg font-bold">New proxy fleet</span>
        </div>
        <UForm
            class="flex flex-col gap-4 mt-4"
            :state="formState"
            @submit="submit"
        >
            <UFormGroup
                label="Name"
                description="The name of your proxy fleet"
                name="name"
                required
            >
                <UInput
                    id="name"
                    v-model="formState.name"
                    placeholder="My proxy fleet"
                />
            </UFormGroup>
            <UFormGroup
                label="Minecraft cluster reference"
                description="The name of the Minecraft cluster to link to this proxy fleet"
                name="clusterRefName"
                required
            >
                <USelect
                    id="clusterRefName"
                    v-model="formState.clusterRefName"
                    :options="minecraftClustersNames"
                    placeholder="Select a Minecraft cluster"
                />
            </UFormGroup>
            <UFormGroup
                label="Max players"
                description="The maximum number of players on this proxy fleet"
                name="maxPlayers"
                required
            >
                <UInput
                    id="maxPlayers"
                    v-model="formState.config.maxPlayers"
                    placeholder="100"
                    type="number"
                />
            </UFormGroup>
            <UFormGroup
                label="Motd"
                description="The message of the day of this proxy fleet"
                name="motd"
                required
            >
                <UInput
                    id="motd"
                    v-model="formState.config.motd"
                    placeholder="My proxy fleet"
                />
            </UFormGroup>
            <UFormGroup
                label="Proxy protocol"
                description="The Proxy Protocol is a protocol that allows the load balancer to send the real IP address of the client to the underlying service, here the proxy. It is supported by most cloud providers."
                name="version"
                required
            >
                <UToggle
                    id="proxyProtocol"
                    v-model="formState.config.proxyProtocol"
                />
            </UFormGroup>
            <UFormGroup
                v-if="formState.config.proxyProtocol"
                label="Custom annotations"
                description="Custom annotations to add to the service (required for some cloud providers) in JSON format"
                name="annotations"
            >
                <UTextarea
                    id="annotations"
                    v-model="formState.serviceCustomAnnotations"
                    placeholder="{}"
                />
            </UFormGroup>
            <div class="flex flex-row items-center justify-end gap-4">
                <UButton type="submit" color="primary"
                    >Create proxy fleet</UButton
                >
            </div>
        </UForm>
    </div>
</template>
