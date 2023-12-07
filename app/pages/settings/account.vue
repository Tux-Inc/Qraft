<!--
  - File Name: account.vue
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
import type { ChangePassword, UserWithoutPassword } from "~/types/user";

const { logout } = useAuth();

const toast = useToast();
definePageMeta({
    layout: "settings",
});
const formState = ref<ChangePassword>({
    oldPassword: "",
    newPassword: "",
});
const submit = async () => {
    try {
        await $fetch<UserWithoutPassword>("/api/auth/change-password", {
            method: "POST",
            body: JSON.stringify(formState.value),
        });
        toast.add({
            title: "Password changed",
            icon: "i-heroicons-check-circle",
            description: "Your password has been changed",
            color: "green",
        });
        await logout();
    } catch (error: any) {
        console.log(error);
        console.log(error.data);
        toast.add({
            title: "Password change failed",
            icon: "i-heroicons-x-circle",
            description: error.data.message,
            color: "red",
        });
    }
};
</script>

<template>
    <div class="flex flex-col gap-4 w-full">
        <div>
            <h1 class="text-3xl font-bold">Manage your account</h1>
            <span class="text-sm text-gray-500">
                Update your account details
            </span>
        </div>
        <div class="flex flex-col gap-4 w-full">
            <div class="flex flex-row items-center justify-between">
                <span class="text-xl font-bold">Change password</span>
            </div>
            <UForm
                class="flex flex-col gap-4"
                :state="formState"
                @submit="submit"
            >
                <UFormGroup
                    label="Old password"
                    description="Your old password"
                    name="oldPassword"
                    required
                >
                    <UInput
                        id="oldPassword"
                        v-model="formState.oldPassword"
                        type="password"
                        autocomplete="on"
                        placeholder="Old password"
                    />
                </UFormGroup>
                <UFormGroup
                    label="New password"
                    description="Your new password"
                    name="newPassword"
                    required
                >
                    <UInput
                        id="newPassword"
                        v-model="formState.newPassword"
                        type="password"
                        autocomplete="on"
                        placeholder="New password"
                    />
                </UFormGroup>
                <span class="text-sm text-gray-500">
                    By changing your password, you will be logged out of all
                    your devices. You will have to log in again.
                </span>
                <div class="flex flex-row items-center justify-end gap-4">
                    <UButton type="submit" color="primary">
                        Change password
                    </UButton>
                </div>
            </UForm>
        </div>
    </div>
</template>
