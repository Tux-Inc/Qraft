/*
 * File Name: [name].get.ts
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
const kc: KubeConfig = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sCRDApi: k8s.CustomObjectsApi = kc.makeApiClient(k8s.CustomObjectsApi);

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const name: string | undefined = getRouterParam(event, "name");

    if (!name) {
        throw createError({
            statusCode: 400,
            statusMessage: "Bad request",
            message: "Missing ProxyFleet name",
        });
    }

    const response = await k8sCRDApi.getNamespacedCustomObject(
        "shulkermc.io",
        "v1alpha1",
        config.namespace,
        "proxyfleets",
        name,
    );

    const proxyFleet: ProxyFleet = {
        name: response.body.metadata.name,
        clusterRefName: response.body.spec.clusterRef.name,
        channel: response.body.spec.template.spec.version.channel,
        version: response.body.spec.template.spec.version.name,
        config: response.body.spec.template.spec.config,
        status: response.body.status,
    };

    return proxyFleet;
});
