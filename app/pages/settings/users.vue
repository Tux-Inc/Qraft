<script setup lang="ts">
import type { UserWithoutPassword } from "~/types/user";
const { $event } = useNuxtApp();
const toast = useToast();
const sendEvent = (event: string) => $event(event);
definePageMeta({
    layout: "settings",
    middleware: ["auth"],
});
const authUser = useAuthUser();
const sort = ref({
    column: "name",
    direction: "desc",
});

const people = ref<UserWithoutPassword[] | undefined>([]);

const columns = [
    {
        key: "id",
        label: "ID",
    },
    {
        key: "username",
        label: "Username",
        sortable: true,
    },
    {
        key: "createdAt",
        label: "Created at",
        sortable: true,
    },
    {
        key: "updatedAt",
        label: "Updated at",
        sortable: true,
    },
    {
        key: "role",
        label: "Role",
        sortable: true,
        direction: "desc",
    },
    {
        key: "actions",
    },
];

const items = (row: { id: any }) => [
    [
        {
            label: "Edit",
            icon: "i-heroicons-pencil-square-20-solid",
            click: () => console.log("Edit", row.id),
        },
        {
            label: "Duplicate",
            icon: "i-heroicons-document-duplicate-20-solid",
            click: () => console.log("Duplicate", row.id),
        },
    ],
    [
        {
            label: "Delete",
            icon: "i-heroicons-trash-20-solid",
            click: () => deleteUser(row.id),
        },
    ],
];

async function getUsers() {
    try {
        return await $fetch<UserWithoutPassword[]>("/api/user");
    } catch (error: any) {
        toast.add({
            title: "Failed to get users",
            icon: "i-heroicons-x-circle",
            description: error.data.message,
            color: "red",
        });
    }
}

async function deleteUser(id: string) {
    try {
        await $fetch(`/api/user/${id}`, {
            method: "DELETE",
        });
        toast.add({
            title: "User deleted",
            icon: "i-heroicons-check-circle",
            description: "The user has been deleted",
            color: "green",
        });
        people.value = await getUsers();
    } catch (error: any) {
        toast.add({
            title: "Failed to delete user",
            icon: "i-heroicons-x-circle",
            description: error.data.message,
            color: "red",
        });
    }
}

onMounted(async () => {
    people.value = await getUsers();
});
</script>

<template>
    <div class="flex flex-col gap-4 w-full">
        <div>
            <h1 class="text-3xl font-bold">Manage users</h1>
            <span class="text-sm text-gray-500">
                Manage users and their roles.
            </span>
        </div>
        <div class="flex flex-col gap-4 w-full">
            <div class="flex flex-row items-center justify-between">
                <span class="text-xl font-bold">Users</span>
                <UButton
                    color="primary"
                    variant="solid"
                    label="Add user"
                    icon="i-heroicons-plus"
                    @click="sendEvent('users:new')"
                />
            </div>
            <UTable v-model:sort="sort" :columns="columns" :rows="people">
                <template #empty-state>
                    <div
                        class="flex flex-col items-center justify-center py-6 gap-3"
                    >
                        <span class="italic text-sm">No one here!</span>
                        <UButton
                            label="Add people"
                            @click="sendEvent('users:new')"
                        />
                    </div>
                </template>
                <template #actions-data="{ row }">
                    <UDropdown :items="items(row)">
                        <UButton
                            color="gray"
                            variant="ghost"
                            icon="i-heroicons-ellipsis-horizontal-20-solid"
                        />
                    </UDropdown>
                </template>
            </UTable>
        </div>
    </div>
</template>
