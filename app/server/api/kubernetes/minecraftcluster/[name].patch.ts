/*
 * File Name: [name].put.ts
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

import k8s, { KubeConfig } from "@kubernetes/client-node";
import { NitroRuntimeConfig } from "nitropack";
const kc: KubeConfig = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sCRDApi: k8s.CustomObjectsApi = kc.makeApiClient(k8s.CustomObjectsApi);

// Update a MinecraftCluster
export default defineEventHandler(async (event) => {
    const config: NitroRuntimeConfig = useRuntimeConfig();
    const name: string | undefined = getRouterParam(event, "name");
    const body: MinecraftCluster = await readBody<MinecraftCluster>(event);
    if (!body) {
        throw createError({
            statusCode: 400,
            statusMessage: "Bad request",
            message: "Missing body",
        });
    }
    if (!name) {
        throw createError({
            statusCode: 400,
            statusMessage: "Bad request",
            message: "Missing MinecraftCluster name",
        });
    }

    const deployment = {
        apiVersion: "shulkermc.io/v1alpha1",
        kind: "MinecraftCluster",
        metadata: {
            name: name,
        },
        spec: {
            networkAdmins: body.networkAdmins,
        },
    };

    const response = await k8sCRDApi.patchNamespacedCustomObject(
        "shulkermc.io",
        "v1alpha1",
        config.namespace,
        "minecraftclusters",
        name,
        deployment,
    );

    return response.body;
});
