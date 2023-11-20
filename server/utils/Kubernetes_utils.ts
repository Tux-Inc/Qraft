import k8s, {
    V1LabelSelector,
    V1LabelSelectorRequirement,
} from "@kubernetes/client-node";
import { integer } from "vscode-languageserver-types";

const config = useRuntimeConfig();

export class ProxyDeployment extends k8s.V1Deployment {
    constructor(
        name: string,
        namespace?: string,
        replicas?: integer,
        containerName?: string,
        port?: integer,
        type?: string,
        env?: [],
    ) {
        super();

        // Create metadata
        const metadata = new k8s.V1ObjectMeta();
        metadata.namespace = config.deployment_namespace;
        metadata.name = name || "proxyqraft";

        // Create container
        const container = new k8s.V1Container();
        container.name = (containerName || "proxyqraft") + "-cont";
        container.image = config.proxy_image || "itzg/bungeecord";
        container.ports = [
            { containerPort: 25577, hostPort: 25577, protocol: "TCP" },
        ];
        container.env = env || [
            { name: "EULA", value: "true" },
            { name: "TYPE", value: type || "BUNGEECORD" },
        ];

        // Create pod template
        const template = new k8s.V1PodTemplateSpec();
        template.metadata = new k8s.V1ObjectMeta();
        template.metadata = {
            labels: { app: (containerName || "proxyqraft") + "-cont" },
        };
        template.spec = new k8s.V1PodSpec();
        template.spec.containers = [container];

        const selector = new V1LabelSelector();
        selector.matchLabels = {
            app: (containerName || "proxyqraft") + "-cont",
        };

        // Create deployment spec
        const spec = new k8s.V1DeploymentSpec();
        spec.replicas = replicas || 1;
        spec.template = template;
        spec.selector = selector;

        // Set metadata and spec in the deployment
        this.metadata = metadata;
        this.spec = spec;
        this.apiVersion = "apps/v1";
        this.kind = "Deployment";
    }
}
