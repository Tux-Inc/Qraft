<!--
  - File Name: Navbar.vue
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
import type { UserWithoutPassword } from "~/types/user";

const user: UserWithoutPassword | undefined = useAuthUser().value?.user;
const { logout } = useAuth();

const userItems = [
    [
        {
            label: user?.username ?? "Loading...",
            slot: "account",
            disabled: true,
        },
    ],
    [
        {
            label: "Settings",
            icon: "i-heroicons-cog-8-tooth",
            to: "/settings",
        },
    ],
    [
        {
            label: "Documentation",
            icon: "i-heroicons-book-open",
        },
        {
            label: "Changelog",
            icon: "i-heroicons-megaphone",
        },
    ],
    [
        {
            label: "Sign out",
            icon: "i-heroicons-arrow-left-on-rectangle",
            click: () => logout(),
        },
    ],
];
</script>

<template>
    <div
        class="z-50 sticky top-0 w-full px-8 py-4 bg-dark backdrop-filter backdrop-blur-lg bg-opacity-30 border-b border-primary-200/75 dark:border-primary-900/75 dark:bg-gray-800 dark:bg-opacity-30"
    >
        <UContainer class="flex justify-between items-center">
            <NuxtImg
                src="/logo-w-text.svg"
                alt="Qraft logo"
                width="100"
                height="100"
                @click="useRouter().push('/')"
                class="cursor-pointer"
            />
            <div class="flex items-center gap-2">
                <UButton
                    variant="ghost"
                    color="primary"
                    size="md"
                    icon="i-heroicons-home"
                    label="Home"
                    to="/"
                />
                <UButton
                    variant="ghost"
                    color="primary"
                    size="md"
                    icon="i-heroicons-server-stack"
                    label="Cluster"
                    to="/minecraftcluster"
                />
                <UButton
                    variant="ghost"
                    color="primary"
                    size="md"
                    icon="i-heroicons-cube-transparent"
                    label="Proxy Fleet"
                    to="/proxyfleet"
                />
                <UButton
                    variant="ghost"
                    color="primary"
                    size="md"
                    icon="i-heroicons-cube"
                    label="Server Fleet"
                    to="/minecraftserverfleet"
                />
            </div>
            <div class="flex items-center gap-2">
                <UDropdown
                    :items="userItems"
                    :popper="{ placement: 'bottom-end' }"
                >
                    <UButton
                        variant="ghost"
                        color="primary"
                        size="md"
                        icon="i-heroicons-user-circle"
                        :label="user?.username ?? 'Loading...'"
                        trailing-icon="i-heroicons-chevron-down-20-solid"
                    />
                </UDropdown>
            </div>
        </UContainer>
    </div>
</template>
