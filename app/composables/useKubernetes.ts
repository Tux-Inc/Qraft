/*
 * File Name: useKubernetes.ts
 * Author: neptos
 * Creation Date: 2023
 *
 * Copyright (c) 2023 Tux Inc. (Qraft)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

export const useKubernetes = () => {
    const toast = useToast();
    const getMinecraftClusters = async (): Promise<MinecraftCluster[]> => {
        try {
            return $fetch<MinecraftCluster[]>(
                "/api/kubernetes/minecraftcluster",
            );
        } catch (error) {
            console.log(error);
            toast.add({
                title: "Minecraft servers fleet",
                icon: "i-heroicons-x-circle",
                description: "Cannot get infos, is Kubernetes down ?",
                color: "red",
            });
            return [];
        }
    };

    const getMinecraftCluster = async (
        name: string,
    ): Promise<MinecraftCluster | null> => {
        try {
            return $fetch<MinecraftCluster>(
                `/api/kubernetes/minecraftcluster/${name}`,
            );
        } catch (error) {
            console.log(error);
            toast.add({
                title: "Minecraft servers fleet",
                icon: "i-heroicons-x-circle",
                description: "Cannot get infos, is Kubernetes down ?",
                color: "red",
            });
            return null;
        }
    };

    const deleteMinecraftCluster = async (
        name: string,
    ): Promise<MinecraftCluster | null> => {
        try {
            return $fetch<MinecraftCluster>(
                `/api/kubernetes/minecraftcluster/${name}`,
                {
                    method: "DELETE",
                },
            );
        } catch (error) {
            console.log(error);
            toast.add({
                title: "Minecraft servers fleet",
                icon: "i-heroicons-x-circle",
                description: "Cannot delete cluster, is Kubernetes down ?",
                color: "red",
            });
            return null;
        }
    };

    const getProxiesFleets = async (): Promise<ProxyFleet[]> => {
        try {
            return $fetch<ProxyFleet[]>("/api/kubernetes/proxyfleet");
        } catch (error) {
            console.log(error);
            toast.add({
                title: "Minecraft servers fleet",
                icon: "i-heroicons-x-circle",
                description: "Cannot get infos, is Kubernetes down ?",
                color: "red",
            });
            return [];
        }
    };

    const getProxyFleet = async (name: string): Promise<ProxyFleet | null> => {
        try {
            return $fetch<ProxyFleet>(`/api/kubernetes/proxyfleet/${name}`);
        } catch (error) {
            console.log(error);
            toast.add({
                title: "Minecraft servers fleet",
                icon: "i-heroicons-x-circle",
                description: "Cannot get infos, is Kubernetes down ?",
                color: "red",
            });
            return null;
        }
    };

    const getProxyFleetLogs = async (name: string): Promise<string | null> => {
        try {
            return $fetch<string>(`/api/kubernetes/proxyfleet/${name}/log`);
        } catch (error) {
            console.log(error);
            toast.add({
                title: "Minecraft servers fleet",
                icon: "i-heroicons-x-circle",
                description: "Cannot get infos, is Kubernetes down ?",
                color: "red",
            });
            return null;
        }
    };

    const getProxyFleetLoadBalancerInfos = async (
        name: string,
    ): Promise<LoadBalancerInfos | null> => {
        try {
            return $fetch<LoadBalancerInfos>(
                `/api/kubernetes/proxyfleet/${name}/externalIP`,
            );
        } catch (error) {
            console.log(error);
            toast.add({
                title: "Minecraft servers fleet",
                icon: "i-heroicons-x-circle",
                description: "Cannot get infos, is Kubernetes down ?",
                color: "red",
            });
            return null;
        }
    };

    const deleteProxyFleet = async (
        name: string,
    ): Promise<ProxyFleet | null> => {
        try {
            return $fetch<ProxyFleet>(`/api/kubernetes/proxyfleet/${name}`, {
                method: "DELETE",
            });
        } catch (error) {
            console.log(error);
            toast.add({
                title: "Minecraft servers fleet",
                icon: "i-heroicons-x-circle",
                description: "Cannot delete cluster, is Kubernetes down ?",
                color: "red",
            });
            return null;
        }
    };

    const getMinecraftServersFleet = async (): Promise<
        MinecraftServerFleet[]
    > => {
        try {
            return $fetch<MinecraftServerFleet[]>(
                "/api/kubernetes/minecraftserverfleet",
            );
        } catch (error) {
            console.log(error);
            toast.add({
                title: "Minecraft servers fleet",
                icon: "i-heroicons-x-circle",
                description: "Cannot get infos, is Kubernetes down ?",
                color: "red",
            });
            return [];
        }
    };

    const getMinecraftServerFleet = async (
        name: string,
    ): Promise<MinecraftServerFleet | null> => {
        try {
            return $fetch<MinecraftServerFleet>(
                `/api/kubernetes/minecraftserverfleet/${name}`,
            );
        } catch (error) {
            console.log(error);
            toast.add({
                title: "Minecraft servers fleet",
                icon: "i-heroicons-x-circle",
                description: "Cannot get infos, is Kubernetes down ?",
                color: "red",
            });
            return null;
        }
    };

    const getMinecraftServerFleetLogs = async (
        name: string,
    ): Promise<string | null> => {
        try {
            return $fetch<string>(
                `/api/kubernetes/minecraftserverfleet/${name}/log`,
            );
        } catch (error) {
            console.log(error);
            toast.add({
                title: "Minecraft servers fleet",
                icon: "i-heroicons-x-circle",
                description: "Cannot get infos, is Kubernetes down ?",
                color: "red",
            });
            return null;
        }
    };

    const deleteMinecraftServerFleet = async (
        name: string,
    ): Promise<MinecraftServerFleet | null> => {
        try {
            return $fetch<MinecraftServerFleet>(
                `/api/kubernetes/minecraftserverfleet/${name}`,
                {
                    method: "DELETE",
                },
            );
        } catch (error) {
            console.log(error);
            toast.add({
                title: "Minecraft servers fleet",
                icon: "i-heroicons-x-circle",
                description: "Cannot delete cluster, is Kubernetes down ?",
                color: "red",
            });
            return null;
        }
    };

    return {
        getMinecraftClusters,
        getMinecraftCluster,
        deleteMinecraftCluster,
        getProxiesFleets,
        getProxyFleet,
        getProxyFleetLogs,
        getProxyFleetLoadBalancerInfos,
        deleteProxyFleet,
        getMinecraftServersFleet,
        getMinecraftServerFleet,
        getMinecraftServerFleetLogs,
        deleteMinecraftServerFleet,
    };
};
