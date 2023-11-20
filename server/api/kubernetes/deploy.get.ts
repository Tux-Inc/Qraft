import k8s from "@kubernetes/client-node";
import { ProxyDeployment } from "~/server/utils/Kubernetes_utils";

const config = useRuntimeConfig();

const kc = new k8s.KubeConfig();
const KubeConfig = JSON.parse(JSON.stringify(config.KubeConfig));
kc.loadFromOptions(KubeConfig);
const k8sAppsApi = kc.makeApiClient(k8s.AppsV1Api);
const k8sCoreApi = kc.makeApiClient(k8s.CoreV1Api);

const Proxy_Deployer = new ProxyDeployment("proxytest");

console.log(JSON.stringify(Proxy_Deployer, null, 4));
export default defineEventHandler(async (event) => {
    const Deployments_Result = await k8sAppsApi.createNamespacedDeployment(
        config.deployment_namespace,
        Proxy_Deployer,
    );
    return {
        deploy: Deployments_Result,
        deployed_stack: Proxy_Deployer,
    };
});
