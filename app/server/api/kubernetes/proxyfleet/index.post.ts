/*
 * File Name: index.post.ts
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

// Create a new ProxyFleet
export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const body: ProxyFleet = await readBody<ProxyFleet>(event);

    if (!body) {
        throw createError({
            statusCode: 400,
            statusMessage: "Bad request",
            message: "Missing body",
        });
    }

    if (!body.name) {
        throw createError({
            statusCode: 400,
            statusMessage: "Bad request",
            message: "Missing ProxyFleet name",
        });
    }

    const deployment = {
        apiVersion: "shulkermc.io/v1alpha1",
        kind: "ProxyFleet",
        metadata: {
            name: body.name,
        },
        spec: {
            clusterRef: {
                name: body.clusterRefName,
            },
            replicas: 1,
            service: {
                type: "LoadBalancer",
                externalTrafficPolicy: "Local",
                annotations: body.serviceCustomAnnotations
                    ? JSON.parse(body.serviceCustomAnnotations)
                    : {},
            },
            template: {
                spec: {
                    version: {
                        channel: body.channel || "Velocity",
                        name: body.version || "latest",
                    },
                    config: body.config || {},
                },
            },
        },
    };

    const response = await k8sCRDApi.createNamespacedCustomObject(
        "shulkermc.io",
        "v1alpha1",
        config.namespace,
        "proxyfleets",
        deployment,
    );

    return response.body;
});
