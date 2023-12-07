const config = useRuntimeConfig();
// ProxyFleet classes

class ShulkerMetadata {
    constructor(
        public name: string,
        public namespace: string = config.deployment_namespace,
    ) {}
}
class ProxyFleetSpecTemplateSpec {
    constructor(
        public version: object = { channel: "Velocity", name: "latest" },
        public config: object = {},
    ) {}
}
class ProxyFleetSpecTemplate {
    constructor(
        public spec: ProxyFleetSpecTemplateSpec = new ProxyFleetSpecTemplateSpec(),
    ) {}
}
class ProxyFleetSpecService {
    constructor(
        public type: string = "LoadBalancer",
        public externalTrafficPolicy: string = "Local",
    ) {}
}
class ClusterRef {
    constructor(public name: string) {}
}
class ProxyFleetSpec {
    constructor(
        public clusterRef: ClusterRef,
        public service: ProxyFleetSpecService = new ProxyFleetSpecService(),
        public template: ProxyFleetSpecTemplate = new ProxyFleetSpecTemplate(),
        public replicas: number = 1,
    ) {
        // Initialize other properties if needed
    }
}

class ProxyFleet {
    constructor(
        public metadata: ShulkerMetadata,
        public spec: ProxyFleetSpec,
        public apiVersion: string = "shulkermc.io/v1alpha1",
        public kind: string = "ProxyFleet",
    ) {}
}

// MinecraftServer classes
class MinecraftServerSpec {
    constructor(public replicas?: number | null) {
        // Initialize other properties if needed
    }
}

class MinecraftServer {
    constructor(
        public metadata: ShulkerMetadata,
        public apiVersion: string = "shulkermc.io/v1alpha1",
        public kind: string = "MinecraftServer",
        public spec?: MinecraftServerSpec,
    ) {}
}
class MinecraftServerFleetSpecTemplateSpecVersion {
    constructor(
        public channel: string = "Paper",
        public name: string = "1.20.2",
    ) {}
}

class MinecraftServerFleetSpecTemplateSpec {
    constructor(
        public clusterRef: ClusterRef,
        public tags: [] = [],
        public version: MinecraftServerFleetSpecTemplateSpecVersion = new MinecraftServerFleetSpecTemplateSpecVersion(),
        public config: object = {},
    ) {}
}

class MinecraftServerFleetSpecTemplate {
    constructor(public spec: MinecraftServerFleetSpecTemplateSpec) {}
}

// MinecraftServerFleet classes
class MinecraftServerFleetSpec {
    constructor(
        public clusterRef: ClusterRef,
        public template: MinecraftServerFleetSpecTemplate = new MinecraftServerFleetSpecTemplate(
            new MinecraftServerFleetSpecTemplateSpec(clusterRef),
        ),
        public replicas: number = 1,
    ) {
        // Initialize other properties if needed
    }
}

class MinecraftServerFleet {
    constructor(
        public metadata: ShulkerMetadata,
        public spec: MinecraftServerFleetSpec,
        public apiVersion: string = "shulkermc.io/v1alpha1",
        public kind: string = "MinecraftServerFleet",
    ) {}
}

// MinecraftCluster classes
class MinecraftClusterSpec {
    constructor(public networkAdmins?: string[] | null) {
        // Initialize other properties if needed
    }
}

class MinecraftCluster {
    constructor(
        public metadata: ShulkerMetadata,
        public spec: MinecraftClusterSpec = {},
        public apiVersion: string = "shulkermc.io/v1alpha1",
        public kind: string = "MinecraftCluster",
    ) {}
}

export {
    ShulkerMetadata,
    ProxyFleet,
    ProxyFleetSpec,
    ClusterRef,
    ProxyFleetSpecService,
    ProxyFleetSpecTemplateSpec,
    ProxyFleetSpecTemplate,
    MinecraftServer,
    MinecraftServerSpec,
    MinecraftServerFleet,
    MinecraftServerFleetSpecTemplate,
    MinecraftServerFleetSpecTemplateSpec,
    MinecraftServerFleetSpecTemplateSpecVersion,
    MinecraftServerFleetSpec,
    MinecraftCluster,
    MinecraftClusterSpec,
};
