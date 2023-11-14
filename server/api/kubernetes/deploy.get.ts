import k8s from "@kubernetes/client-node";

const cluster = {
    name: process.env.CLUSTER_NAME || "local",
    server: process.env.CLUSTER_SERVER || "http://127.0.0.1/",
};

const user = {
    user: {
        "auth-provider": {
            config: { "access-token": process.env.CLUSTER_PASSWORD || "token" },
        },
    },
};

const context = {
    name: "my-context",
    user: user.name,
    cluster: cluster.name,
};

const kc = new k8s.KubeConfig();
kc.loadFromOptions({
    clusters: [cluster],
    users: [user],
    contexts: [context],
    currentContext: context.name,
});
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

export default defineEventHandler(async (event) => {
    const podsRes = await k8sApi.listNamespacedPod("default");
    console.log(podsRes.body);

    return {
        pods: podsRes,
    };
});
