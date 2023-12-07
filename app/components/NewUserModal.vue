<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";
import type { UserWithoutDates } from "~/types/user";

const toast = useToast();

const formState = ref<UserWithoutDates>({
    username: "",
    password: "",
    role: "USER",
});

async function submit(event: FormSubmitEvent<any>) {
    try {
        await $fetch("/api/user", {
            method: "POST",
            body: JSON.stringify(event.data),
        });
        toast.add({
            title: "User created",
            icon: "i-heroicons-check-circle",
            description: `The user ${event.data.user.username} has been created`,
            color: "green",
        });
    } catch (error: any) {
        toast.add({
            title: "User creation failed",
            icon: "i-heroicons-x-circle",
            description: error.data.message,
            color: "red",
        });
        return;
    }
}
</script>

<template>
    <div class="p-4">
        <div class="flex flex-row items-center justify-start gap-2">
            <UIcon name="i-heroicons-user" class="text-lg font-bold" />
            <span class="text-lg font-bold">Create new user</span>
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
                    id="username"
                    v-model="formState.username"
                    placeholder="Username"
                />
            </UFormGroup>
            <UFormGroup
                label="Password"
                description="The password of the user (can be changed later)"
                name="password"
                required
            >
                <UInput
                    id="password"
                    v-model="formState.password"
                    type="password"
                    placeholder="Password"
                />
            </UFormGroup>
            <UFormGroup
                label="Role"
                description="The role of the user"
                name="role"
                required
            >
                <USelect
                    id="role"
                    v-model="formState.role"
                    :options="[
                        { label: 'User', value: 'USER' },
                        { label: 'Admin', value: 'ADMIN' },
                    ]"
                />
            </UFormGroup>
            <div class="flex flex-row items-center justify-end gap-4">
                <UButton type="submit" color="primary"> Create user </UButton>
            </div>
        </UForm>
    </div>
</template>
