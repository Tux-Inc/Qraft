/*
 * File Name: index.get.ts
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

import k8s from "@kubernetes/client-node";
const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sCRDApi = kc.makeApiClient(k8s.CustomObjectsApi);

// Get all MinecraftServerFleets
export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const response = await k8sCRDApi.listNamespacedCustomObject(
        "shulkermc.io",
        "v1alpha1",
        config.namespace,
        "minecraftserverfleets",
    );

    const minecraftServerFleets: MinecraftServerFleet[] =
        response.body.items.map((item: any) => {
            return {
                name: item.metadata.name,
                clusterRefName: item.spec.clusterRef.name,
                channel: item.spec.template.spec.version.channel,
                version: item.spec.template.spec.version.name,
                config: item.spec.template.spec.config,
                status: item.status,
            };
        });

    return minecraftServerFleets;
});