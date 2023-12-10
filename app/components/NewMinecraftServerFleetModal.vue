<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";
import type { MinecraftCluster } from "~/types/kubernetes/MinecraftCluster";

const toast = useToast();

const formState = ref<MinecraftServerFleet>({
    name: "",
    clusterRefName: "",
    tags: [],
    channel: "Paper",
    version: "1.20.2",
});

const newTag = ref("");

function addTag() {
    if (newTag.value) {
        formState.value.tags?.push(newTag.value);
        newTag.value = "";
    }
}

function removeTag(index: number) {
    formState.value.tags?.splice(index, 1);
}

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

const minecraftClustersNames = ref<string[]>([]);
minecraftClustersNames.value = await getMinecraftClustersNames();
const channelsNames = ref<string[]>(["Paper", "Folia"]);

async function submit(event: FormSubmitEvent<any>) {
    console.log(event);
}
</script>

<template>
    <div class="p-4">
        <div class="flex flex-row items-center justify-start gap-2">
            <UIcon name="i-heroicons-cube" class="text-lg font-bold" />
            <span class="text-lg font-bold">New minecraft server fleet</span>
        </div>
        <UForm
            class="flex flex-col gap-4 mt-4"
            :state="formState"
            @submit="submit"
        >
            <UFormGroup
                label="Name"
                description="The name of your instance"
                name="name"
                required
            >
                <UInput
                    id="name"
                    v-model="formState.name"
                    placeholder="My instance"
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
                    placeholder="My cluster"
                />
            </UFormGroup>
            <UFormGroup
                label="Tags"
                description="Tags to identify your server (lobby and limbo are needed for proxy fleet default fallback)"
                name="tags"
                required
            >
                <UButtonGroup size="md" orientation="horizontal" class="w-full">
                    <UInput
                        id="newTag"
                        v-model="newTag"
                        placeholder="lobby"
                        class="w-full"
                    />
                    <UButton @click="addTag" label="Add tag" />
                </UButtonGroup>
            </UFormGroup>
            <div class="flex flex-row items-center justify-end gap-4">
                <UButton type="submit" color="primary">Create instance</UButton>
            </div>
        </UForm>
    </div>
</template>
