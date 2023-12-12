<script setup lang="ts">
definePageMeta({
    layout: "navigation",
    middleware: ["auth"],
});

const kube = useKubernetes();
const route = useRoute();
const proxyFleetName = route.params.name;
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
            click: () => kube.deleteProxyFleet(proxyFleetName as string),
        },
    ],
];
const breadCrumbsItems = [
    {
        label: "Home",
        to: "/",
        icon: "i-heroicons-home",
    },
    {
        label: "Proxy Fleet",
        to: "/proxyfleet",
        icon: "i-heroicons-cube-transparent",
    },
    {
        label: proxyFleetName,
        to: `/proxyfleet/${proxyFleetName}`,
        icon: "i-heroicons-cube-transparent",
    },
];

function getProxyFleetStatusIcon(status: PodStatus | undefined) {
    if (!status) {
        return {
            icon: "i-heroicons-question-mark-circle",
            colorClass: "text-gray-400",
        };
    }

    switch (status.conditions[0].status) {
        case "True":
            return {
                icon: "i-heroicons-check-circle-solid",
                colorClass: "text-green-400",
            };
        case "False":
            return {
                icon: "i-heroicons-x-circle-solid",
                colorClass: "text-red-400",
            };
        default:
            return {
                icon: "i-heroicons-question-mark-circle",
                colorClass: "text-gray-400",
            };
    }
}

const proxyFleet = ref<ProxyFleet | null>();
const proxyFleetLogs = ref<string | null>();
const proxyFleetLoadBalancerInfos = ref<LoadBalancerInfos | null>(null);
onMounted(async () => {
    proxyFleet.value = await kube.getProxyFleet(proxyFleetName as string);
    proxyFleetLogs.value = await kube.getProxyFleetLogs(
        proxyFleetName as string,
    );
    proxyFleetLoadBalancerInfos.value =
        await kube.getProxyFleetLoadBalancerInfos(proxyFleetName as string);
});
</script>

<style scoped>
.gradient-fade {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    pointer-events: none;
    opacity: 0.8;
    transition: opacity 0.2s ease-in-out;
}

@media (prefers-color-scheme: dark) {
    .gradient-fade {
        background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0),
            rgba(17, 24, 39, 100) 110%
        );
    }
}
</style>

<template>
    <div class="flex flex-col gap-4">
        <UBreadcrumb :links="breadCrumbsItems" class="mb-4" />
        <div class="flex flex-row flex-wrap justify-between items-center">
            <div>
                <div class="flex flex-row items-center justify-start gap-2">
                    <UIcon
                        name="i-heroicons-cube-transparent"
                        class="text-3xl font-bold"
                    />
                    <USkeleton v-if="!proxyFleet" class="h-5 w-[150px]" />
                    <span v-else class="text-3xl font-bold">{{
                        proxyFleet.name
                    }}</span>
                    <USkeleton
                        v-if="!proxyFleet"
                        class="h-5 w-5 rounded-full"
                    />
                    <UTooltip
                        v-else
                        :text="
                            proxyFleet.status?.conditions[0].message ||
                            'Unknown'
                        "
                    >
                        <UIcon
                            :name="
                                getProxyFleetStatusIcon(proxyFleet.status).icon
                            "
                            :class="
                                getProxyFleetStatusIcon(proxyFleet.status)
                                    .colorClass
                            "
                            class="text-xl"
                        />
                    </UTooltip>
                </div>
                <span class="text-sm text-gray-500">Proxy Fleet</span>
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
        <div class="relative main-div">
            <div
                class="relative flex rounded-lg p-4 border dark:border-gray-700 dark:bg-gray-800 transition-all border-gray-200 bg-white"
            >
                <div class="grid grid-cols-4 gap-4 w-full">
                    <div class="flex flex-col">
                        <span
                            class="text-md uppercase font-bold text-gray-700 dark:text-white"
                            >IP Address</span
                        >
                        <USkeleton
                            v-if="!proxyFleetLoadBalancerInfos"
                            :ui="{ background: 'bg-gray-300 dark:bg-gray-500' }"
                            class="h-5 w-36"
                        />
                        <span
                            v-else
                            class="text-sm font-semibold text-gray-700 dark:text-white"
                            >{{
                                proxyFleetLoadBalancerInfos.externalIPs[0].ip
                            }}</span
                        >
                    </div>
                    <div class="flex flex-col">
                        <span
                            class="text-md uppercase font-bold text-gray-700 dark:text-white"
                            >Port</span
                        >
                        <USkeleton
                            v-if="!proxyFleetLoadBalancerInfos"
                            :ui="{ background: 'bg-gray-300 dark:bg-gray-500' }"
                            class="h-5 w-10"
                        />
                        <span
                            v-else
                            class="text-sm font-semibold text-gray-700 dark:text-white"
                            >{{
                                proxyFleetLoadBalancerInfos.ports[0].port
                            }}</span
                        >
                    </div>
                    <div class="flex flex-col">
                        <span
                            class="text-md uppercase font-bold text-gray-700 dark:text-white"
                            >Channel</span
                        >
                        <USkeleton
                            v-if="!proxyFleet"
                            :ui="{ background: 'bg-gray-300 dark:bg-gray-500' }"
                            class="h-5 w-10"
                        />
                        <span
                            v-else
                            class="text-sm font-semibold text-gray-700 dark:text-white"
                            >{{ proxyFleet.channel }}
                        </span>
                    </div>
                    <div class="flex flex-col">
                        <span
                            class="text-md uppercase font-bold text-gray-700 dark:text-white"
                            >Version</span
                        >
                        <USkeleton
                            v-if="!proxyFleet"
                            :ui="{ background: 'bg-gray-300 dark:bg-gray-500' }"
                            class="h-5 w-10"
                        />
                        <span
                            v-else
                            class="text-sm font-semibold text-gray-700 dark:text-white"
                            >{{ proxyFleet.version }}</span
                        >
                    </div>
                </div>
            </div>
            <div class="gradient-fade"></div>
        </div>
        <usage-chart />
        <Console :logs="proxyFleetLogs">
            <template #logs>
                <pre
                    class="text-xs dark:text-gray-400 text-gray-600 font-mono whitespace-pre-line"
                ><code class="flex-none">{{ proxyFleetLogs }}</code></pre>
            </template>
        </Console>
    </div>
</template>
