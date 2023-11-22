/*
 * File Name: nuxt.config.ts
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

export default defineNuxtConfig({
    app: {
        head: {
            title: "Qraft - Minecraft Server Manager",
        },
    },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    css: ["~/assets/css/main.css"],
    runtimeConfig: {
        version: "0.0.1",
        deployment_namespace: "qraft",
        proxy_image: "itzg/bungeecord",
        server_image: "itzg/minecraft-server",
        KubeConfig: {
            clusters: [
                {
                    name: "microk8s-cluster",
                    cluster: {
                        server: "https://192.168.0.101:16443",
                        "certificate-authority-data": "redacted",
                    },
                },
            ],
            users: [
                {
                    name: "admin",
                    user: {
                        token: "redacted",
                    },
                },
            ],
            contexts: [
                {
                    name: "microk8s",
                    context: {
                        cluster: "microk8s-cluster",
                        user: "admin",
                    },
                },
            ],
            currentContext: "microk8s",
        },
    },
    typescript: {
        shim: false,
    },
    modules: ["@nuxt/ui", "@nuxt/image"],
    devtools: { enabled: true },
});
