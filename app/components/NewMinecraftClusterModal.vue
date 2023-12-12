<!--
  - File Name: NewClusterModal.vue
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
import type { MinecraftCluster } from "~/types/kubernetes/MinecraftCluster";
const { $event } = useNuxtApp();
const toast = useToast();

const sendEvent = (event: string) => $event(event);

const formState = ref<MinecraftCluster>({
    name: "",
    networkAdmins: [],
});

const newAdmin = ref("");

function addAdmin() {
    if (newAdmin.value) {
        formState.value.networkAdmins?.push(newAdmin.value);
        newAdmin.value = "";
    }
}

function removeAdmin(index: number) {
    formState.value.networkAdmins?.splice(index, 1);
}

async function submit(event: FormSubmitEvent<any>) {
    try {
        await $fetch("/api/kubernetes/minecraftcluster", {
            method: "POST",
            body: JSON.stringify(event.data),
        });
        toast.add({
            title: "Cluster created",
            icon: "i-heroicons-check-circle",
            description: `Cluster has been created`,
            color: "green",
        });
        sendEvent("modal:close");
    } catch (error: any) {
        console.log(error);
        toast.add({
            title: "Cluster creation failed",
            icon: "i-heroicons-x-circle",
            description: error.data,
            color: "red",
        });
        return;
    }
}
</script>

<template>
    <div class="p-4">
        <div class="flex flex-row items-center justify-start gap-2">
            <UIcon name="i-heroicons-server" class="text-lg font-bold" />
            <span class="text-lg font-bold">New Cluster</span>
        </div>
        <UForm
            class="flex flex-col gap-4 mt-4"
            :state="formState"
            @submit="submit"
        >
            <UFormGroup
                label="Name"
                description="The name of your cluster"
                name="name"
                required
            >
                <UInput
                    id="name"
                    v-model="formState.name"
                    placeholder="My cluster"
                />
            </UFormGroup>
            <UFormGroup
                label="Network administrators"
                description="Cluster operators (Note: Players will have admin rights on the whole cluster)"
                name="networkAdmins"
            >
                <UButtonGroup size="md" orientation="horizontal" class="w-full">
                    <UInput
                        id="newAdmin"
                        v-model="newAdmin"
                        placeholder="Minecraft player UUID"
                        class="w-full"
                    />
                    <UButton @click="addAdmin" label="Add Admin" />
                </UButtonGroup>
            </UFormGroup>

            <UBadge
                v-for="(admin, index) in formState.networkAdmins"
                :key="index"
                color="gray"
                class="text-sm text-gray-500 flex justify-between items-center"
            >
                <span class="">{{ admin }}</span>
                <UButton
                    size="sm"
                    color="red"
                    variant="ghost"
                    icon="i-heroicons-x-mark"
                    @click="removeAdmin(index)"
                />
            </UBadge>
            <div class="flex flex-row items-center justify-end gap-4">
                <UButton type="submit" color="primary">Create cluster</UButton>
            </div>
        </UForm>
    </div>
</template>
