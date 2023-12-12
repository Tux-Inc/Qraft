/*
 * File Name: ExternalIP.ts
 * Author: Allan
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

import k8s, { V1LoadBalancerIngress } from "@kubernetes/client-node";
const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
const config = useRuntimeConfig();
const namespace = config.namespace;
const containerName: string = "proxy";
const tailLines: number = 50; // Adjust as needed

export default defineEventHandler(async (event) => {
    const name: string | undefined = getRouterParam(event, "name");

    if (!name) {
        throw createError({
            statusCode: 400,
            statusMessage: "Bad request",
            message: "Missing proxy name",
        });
    }
    const labelSelector = "proxyfleet.shulkermc.io/name=" + name;
    const servicesList = await k8sApi.listNamespacedService(
        namespace,
        undefined,
        undefined,
        undefined,
        undefined,
        labelSelector,
    );
    if (servicesList.body.items.length === 0) {
        throw createError({
            statusCode: 404,
            statusMessage: "Not Found",
            message: "No services was found ",
        });
    }
    //console.log(servicesList);
    // Assuming you want logs from the first pod in the list
    const externalIp =
        servicesList.body?.items[0]?.status?.loadBalancer?.ingress || [];
    const externalPort = servicesList.body?.items[0]?.spec?.ports || [];
    //test.items[0].status.loadBalancer.ingress[0].ip
    return { externalIPs: externalIp, ports: externalPort };
});
