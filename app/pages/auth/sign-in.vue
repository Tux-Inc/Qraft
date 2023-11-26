<!--
  - File Name: sign-in.vue
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
import type { FormError, FormSubmitEvent } from "#ui/types";
definePageMeta({
    title: "Sign In",
    description: "Sign in to your Qraft account",
    url: "/auth/sign-in",
    image: "/logo-w-text.svg",
});

const toast = useToast();
const router = useRouter();

const state = reactive({
    username: undefined,
    password: undefined,
    isLoading: false,
});

const validate = (state: any): FormError[] => {
    const errors = [];
    if (!state.username) errors.push({ path: "username", message: "Required" });
    if (!state.password) errors.push({ path: "password", message: "Required" });
    return errors;
};

async function onSubmit(event: FormSubmitEvent<any>) {
    state.isLoading = true;
    const { data, error } = await useFetch("/api/auth/sign-in", {
        method: "POST",
        body: JSON.stringify(event.data),
    });
    if (error.value) {
        toast.add({
            title: "Authentication failed",
            icon: "i-heroicons-x-circle",
            description: error.value?.message,
            color: "red",
        });
    } else {
        toast.add({
            title: "Authentication successful",
            icon: "i-heroicons-check-circle",
            description: `Welcome back, ${data.value?.user.username}!`,
            color: "green",
        });
        await router.push("/");
    }
    state.isLoading = false;
}
</script>
<template>
    <div>
        <HeroCubeBackground class="absolute" />
        <UContainer class="flex flex-col items-center justify-center h-screen">
            <div
                class="flex z-10 flex-col gap-4 items-center justify-center bg-white rounded-lg dark:bg-gray-800 p-8"
            >
                <div class="flex flex-col items-center justify-center">
                    <NuxtImg
                        src="/logo-w-text.svg"
                        alt="Qraft logo"
                        width="150"
                        height="150"
                    />
                </div>
                <div>
                    <UForm
                        :validate="validate"
                        :state="state"
                        class="space-y-4"
                        @submit="onSubmit"
                    >
                        <UFormGroup label="Username" name="username">
                            <UInput
                                v-model="state.username"
                                type="username"
                                placeholder="Username"
                                icon="i-heroicons-user"
                            />
                        </UFormGroup>
                        <UFormGroup label="Password" name="password">
                            <UInput
                                v-model="state.password"
                                type="password"
                                placeholder="Password"
                                icon="i-heroicons-lock-closed"
                                autocomplete="true"
                            />
                        </UFormGroup>
                        <UButton
                            type="submit"
                            icon="i-heroicons-arrow-right-on-rectangle"
                            :loading="state.isLoading"
                        >
                            Sign In
                        </UButton>
                    </UForm>
                </div>
            </div>
            <div class="mt-4 z-10">
                <span
                    class="text-gray-500 dark:text-gray-400 flex items-center"
                >
                    <UIcon name="i-heroicons-information-circle" class="mr-1" />
                    Need help? Check out our&nbsp;
                    <ULink href="#" class="text-primary">help center </ULink>
                </span>
            </div>
        </UContainer>
    </div>
</template>
