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

    const clusterRef = new shulker.ClusterRef(body.clusterRef);
    const metadata = new shulker.ShulkerMetadata(body.name);

    const service: shulker.ProxyFleetSpecService =
        body.services || new shulker.ProxyFleetSpecService();
    const templateSpec: shulker.ProxyFleetSpecTemplateSpec =
        new shulker.ProxyFleetSpecTemplateSpec(body.version);
    const template: shulker.ProxyFleetSpecTemplate =
        new shulker.ProxyFleetSpecTemplate(templateSpec);

    const spec: shulker.ProxyFleetSpec = new shulker.ProxyFleetSpec(
        clusterRef,
        service,
        template,
    );

    const Deploy_ProxyFleet = new shulker.ProxyFleet(metadata, spec);
    //console.log(JSON.stringify(body, null, 4));
    //console.log(JSON.stringify(Deploy_ProxyFleet, null, 4));
    const Deployments_Result = await k8sCRDApi.createNamespacedCustomObject(
        "shulkermc.io",
        "v1alpha1",
        Deploy_ProxyFleet.metadata.namespace,
        "proxyfleets",
        Deploy_ProxyFleet,
    );
    return {
        deploy: Deployments_Result,
    };
});
