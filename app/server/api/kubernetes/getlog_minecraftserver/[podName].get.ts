import k8s from "@kubernetes/client-node";
const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
const config = useRuntimeConfig();
export default defineEventHandler(async (event) => {
    const podName = getRouterParam(event, "podName") || "Qraft-Proxyfleet";
    const namespace = config.deployment_namespace;
    const containerName: string = "minecraft-server";
    const tailLines: tailLines = 100; // Adjust as needed

    // Get logs from the specified pod and container
    const response = await k8sApi.readNamespacedPodLog(
        podName,
        namespace,
        containerName,
        tailLines,
    );

    console.log("Container logs:", response);

    return {
        logs: response,
    };
});
