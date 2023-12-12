<!--
  - File Name: [name].vue
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
definePageMeta({
    layout: "navigation",
    middleware: ["auth"],
});

const kube = useKubernetes();
const route = useRoute();
const minecraftClusterName = route.params.name;
const breadCrumbsItems = [
    {
        label: "Home",
        to: "/",
        icon: "i-heroicons-home",
    },
    {
        label: "Minecraft Cluster",
        to: "/minecraftcluster",
        icon: "i-heroicons-server",
    },
    {
        label: minecraftClusterName,
        to: `/minecraftcluster/${minecraftClusterName}`,
        icon: "i-heroicons-server",
    },
];

const instanceEditItems = [
    [
        {
            label: "Edit",
            icon: "i-heroicons-pencil",
        },
        {
            label: "Clone",
            icon: "i-heroicons-document-duplicate",
        },
        {
            label: "Delete",
            icon: "i-heroicons-trash",
            click: () =>
                kube.deleteMinecraftCluster(minecraftClusterName as string),
        },
    ],
];

const minecraftCluster = ref<MinecraftCluster | null>();
onMounted(async () => {
    minecraftCluster.value = await kube.getMinecraftCluster(
        minecraftClusterName as string,
    );
});
</script>

<template>
    <div class="flex flex-col gap-4">
        <UBreadcrumb :links="breadCrumbsItems" class="mb-4" />
        <div class="flex flex-row flex-wrap justify-between items-center">
            <div>
                <div class="flex flex-row items-center justify-start gap-2">
                    <UIcon
                        name="i-heroicons-server"
                        class="text-3xl font-bold"
                    />
                    <USkeleton v-if="!minecraftCluster" class="h-4 w-[150px]" />
                    <span v-else class="text-3xl font-bold">{{
                        minecraftCluster.name
                    }}</span>
                </div>
                <span class="text-sm text-gray-500">Minecraft Cluster</span>
            </div>
            <div class="flex flex-row flex-wrap gap-2 items-center justify-end">
                <UDropdown
                    :items="instanceEditItems"
                    :popper="{ placement: 'bottom-end' }"
                >
                    <UButton
                        color="gray"
                        size="md"
                        icon="i-heroicons-ellipsis-vertical"
                    />
                </UDropdown>
            </div>
        </div>
    </div>
</template>
