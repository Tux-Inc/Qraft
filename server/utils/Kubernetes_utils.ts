import k8s from "@kubernetes/client-node";
import { integer } from "vscode-languageserver-types";

const config = useRuntimeConfig();

export class ProxyService extends k8s.V1Service {
    constructor(
        name: string,
        namespace: string,
        containerName: string,
        ports: [k8s.V1ServicePort],
        type: string,
    ) {
        super();

        this.kind = "Service";
        this.apiVersion = "v1";
        const metadata = new k8s.V1ObjectMeta();
        metadata.namespace = config.deployment_namespace;
        metadata.name = "svc-" + (name || "proxyqraft");
        this.metadata = metadata;

        const spec = new k8s.V1ServiceSpec();
        spec.selector = { app: (containerName || "proxyqraft") + "-cont" };
        const defaultports = new k8s.V1ServicePort();
        defaultports.protocol = "TCP";
        defaultports.port = 25577;
        defaultports.targetPort = 25565;
        spec.ports = ports || [defaultports];
        spec.type = type || "LoadBalancer";

        this.spec = spec;
    }
}

export class ProxyDeployment extends k8s.V1Deployment {
    constructor(
        name: string,
        namespace: string,
        containerName: string,
        ports?: [k8s.V1ContainerPort],
        replicas?: integer,
        type?: string,
        env?: [],
    ) {
        super();

        // Create metadata
        const metadata = new k8s.V1ObjectMeta();
        metadata.namespace = config.deployment_namespace;
        metadata.name = name;

        // Create container
        const container = new k8s.V1Container();
        container.name = containerName;
        container.image = config.proxy_image || "itzg/bungeecord";
        container.ports = ports || [
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
            labels: { app: containerName },
        };
        template.spec = new k8s.V1PodSpec();
        template.spec.containers = [container];

        const selector = new k8s.V1LabelSelector();
        selector.matchLabels = {
            app: containerName,
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
export class ServerDeployment extends k8s.V1Deployment {
    constructor(
        name: string,
        namespace: string,
        containerName: string,
        volumes?: [k8s.V1Volume],
        volumeMounts?: [k8s.V1VolumeMount],
        ports?: [k8s.V1ContainerPort],
        replicas?: integer,
        type?: string,
        env?: [],
    ) {
        super();

        // Create metadata
        const metadata = new k8s.V1ObjectMeta();
        metadata.namespace = config.deployment_namespace;
        metadata.name = name;

        // Create container
        const container = new k8s.V1Container();
        container.name = containerName;
        container.image = config.server_image || "itzg/minecraft-server";
        container.ports = ports || [
            { containerPort: 25565, hostPort: 25565, protocol: "TCP" },
        ];
        container.env = env || [{ name: "EULA", value: "true" }];
        const defaultvolumeMounts = new k8s.V1VolumeMount();
        defaultvolumeMounts.name = container + "-minecraft-data";
        defaultvolumeMounts.mountPath = "/data";
        container.volumeMounts = volumeMounts || [defaultvolumeMounts];

        const defaultVolume = new k8s.V1Volume();
        defaultVolume.name = container + "-minecraft-data";
        const defaultVolumePersistentVolumeClaimSource =
            new k8s.V1PersistentVolumeClaimVolumeSource();
        defaultVolumePersistentVolumeClaimSource.claimName =
            containerName + "-pvc";
        defaultVolume.persistentVolumeClaim =
            defaultVolumePersistentVolumeClaimSource;

        // Create pod template
        const template = new k8s.V1PodTemplateSpec();
        template.metadata = new k8s.V1ObjectMeta();
        template.metadata = {
            labels: { app: containerName },
        };
        template.spec = new k8s.V1PodSpec();
        template.spec.containers = [container];
        template.spec.volumes = volumes || [defaultVolume];
        const selector = new k8s.V1LabelSelector();
        selector.matchLabels = {
            app: containerName,
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
