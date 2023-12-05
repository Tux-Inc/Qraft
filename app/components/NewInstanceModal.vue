<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";

const formState = ref({
    name: undefined,
    enabled: false,
});

async function submit(event: FormSubmitEvent<any>) {
    console.log(event);
}
</script>

<template>
    <div class="p-4">
        <div class="flex flex-row items-center justify-start gap-2">
            <UIcon
                name="i-heroicons-cube-transparent"
                class="text-lg font-bold"
            />
            <span class="text-lg font-bold">New instance</span>
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
                label="Enabled"
                description="Whether your instance is enabled or not"
                name="enabled"
                required
            >
                <URadio
                    id="enabled"
                    v-model="formState.enabled"
                    placeholder="My instance"
                />
            </UFormGroup>
            <div class="flex flex-row items-center justify-end gap-4">
                <UButton type="submit" color="primary">Create instance</UButton>
            </div>
        </UForm>
    </div>
</template>
