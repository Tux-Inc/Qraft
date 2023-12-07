import k8s from "@kubernetes/client-node";
import * as shulker from "~/server/utils/Shulker_utils";
const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sCRDApi = kc.makeApiClient(k8s.CustomObjectsApi);
export default defineEventHandler(async (event) => {
    const body = await readBody(event);
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
            message: "Missing MinecraftCluster name",
        });
    }

    const name = body.name;
    const spec: shulker.MinecraftClusterSpec =
        body.spec || new shulker.MinecraftClusterSpec();
    const metadata = new shulker.ShulkerMetadata(name);

    const Deploy_MinecraftCluster = new shulker.MinecraftCluster(
        metadata,
        spec,
    );
    console.log(JSON.stringify(Deploy_MinecraftCluster, null, 4));
    const Deployments_Result = await k8sCRDApi.createNamespacedCustomObject(
        "shulkermc.io",
        "v1alpha1",
        Deploy_MinecraftCluster.metadata.namespace,
        "minecraftclusters",
        Deploy_MinecraftCluster,
    );
    return {
        deploy: Deployments_Result,
    };
});