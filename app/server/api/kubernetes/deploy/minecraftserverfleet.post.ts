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
    if (!body.name || !body.clusterRef) {
        throw createError({
            statusCode: 400,
            statusMessage: "Bad request",
            message: "Missing ProxyFleet parameters",
        });
    }
    const name = body.name;
    const clusterRef = body.clusterRef;
    const metadata = new shulker.ShulkerMetadata(name);
    const spec: shulker.MinecraftServerFleetSpec =
        new shulker.MinecraftServerFleetSpec(
            new shulker.ClusterRef(clusterRef),
        );

    const deployMinecraftServerFleet = new shulker.MinecraftServerFleet(
        metadata,
        spec,
    );
    console.log(JSON.stringify(deployMinecraftServerFleet, null, 4));
    const Deployments_Result = await k8sCRDApi.createNamespacedCustomObject(
        "shulkermc.io",
        "v1alpha1",
        deployMinecraftServerFleet.metadata.namespace,
        "minecraftserverfleets",
        deployMinecraftServerFleet,
    );
    return {
        deploy: Deployments_Result,
    };
});
