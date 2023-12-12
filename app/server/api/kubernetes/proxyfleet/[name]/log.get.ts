import k8s from "@kubernetes/client-node";
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
    const podList = await k8sApi.listNamespacedPod(
        namespace,
        undefined,
        undefined,
        undefined,
        undefined,
        labelSelector,
    );
    if (podList.body.items.length === 0) {
        throw createError({
            statusCode: 404,
            statusMessage: "Not Found",
            message: "No pod was found ",
        });
    }

    // Assuming you want logs from the first pod in the list
    const podName: string = podList?.body?.items[0]?.metadata?.name || "";
    // Get logs from the specified pod and container
    const response = await k8sApi.readNamespacedPodLog(
        podName,
        namespace,
        containerName,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        tailLines,
    );

    return response.body;
});
