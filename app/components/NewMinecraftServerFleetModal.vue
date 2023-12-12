<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";
const { $event } = useNuxtApp();

const sendEvent = (event: string) => $event(event);
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

async function getFoliaVersions() {
    try {
        const response = await $fetch<any>(
            "https://api.papermc.io/v2/projects/folia/",
        );
        return response.versions;
    } catch (error: any) {
        console.log(error);
        toast.add({
            title: "Folia versions",
            icon: "i-heroicons-x-circle",
            description: "Cannot get infos, is PaperMC API down ?",
            color: "red",
        });
        return [];
    }
}

async function getPaperVersions() {
    try {
        const response = await $fetch<any>(
            "https://api.papermc.io/v2/projects/paper/",
        );
        return response.versions;
    } catch (error: any) {
        console.log(error);
        toast.add({
            title: "Paper versions",
            icon: "i-heroicons-x-circle",
            description: "Cannot get infos, is PaperMC API down ?",
            color: "red",
        });
        return [];
    }
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

const channelsNames = ref<string[]>(["Paper", "Folia"]);
const foliaVersions = ref<string[]>([]);
const paperVersions = ref<string[]>([]);
const minecraftClustersNames = ref<string[]>([]);

onMounted(async () => {
    channelsNames.value = ["Paper", "Folia"];
    foliaVersions.value = await getFoliaVersions();
    paperVersions.value = await getPaperVersions();
    minecraftClustersNames.value = await getMinecraftClustersNames();
});

async function submit(event: FormSubmitEvent<any>) {
    try {
        await $fetch("/api/kubernetes/minecraftserverfleet", {
            method: "POST",
            body: JSON.stringify(event.data),
        });
        toast.add({
            title: "Minecraft server fleet created",
            icon: "i-heroicons-check-circle",
            description: `Minecraft server fleet has been created`,
            color: "green",
        });
        sendEvent("modal:close");
    } catch (error: any) {
        console.log(error);
        toast.add({
            title: "Minecraft server fleet",
            icon: "i-heroicons-x-circle",
            description:
                "Cannot create Minecraft server fleet, is Kubernetes down ?",
            color: "red",
        });
    }
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
                    placeholder="Select a Minecraft cluster"
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
                <div class="flex gap-2 flex-wrap items-center my-2">
                    <UBadge
                        v-for="(tag, index) in formState.tags"
                        :key="index"
                        color="gray"
                        class="text-sm text-gray-500"
                    >
                        <span class="">{{ tag }}</span>
                        <UButton
                            size="sm"
                            color="red"
                            variant="ghost"
                            icon="i-heroicons-x-mark"
                            @click="removeTag(index)"
                        />
                    </UBadge>
                </div>
            </UFormGroup>
            <UFormGroup
                label="Channel"
                description="The channel to use for this instance"
                name="channel"
                required
            >
                <USelect
                    id="channel"
                    v-model="formState.channel"
                    :options="channelsNames"
                />
            </UFormGroup>
            <UFormGroup
                label="Version"
                description="The version to use for this instance"
                name="version"
                required
            >
                <USelect
                    id="version"
                    v-model="formState.version"
                    :options="
                        formState.channel === 'Paper'
                            ? paperVersions
                            : foliaVersions
                    "
                />
            </UFormGroup>
            <div class="flex flex-row items-center justify-end gap-4">
                <UButton type="submit" color="primary">Create instance</UButton>
            </div>
        </UForm>
    </div>
</template>
