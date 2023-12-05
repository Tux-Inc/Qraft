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
class ProxyFleetSpecClusterRef {
    constructor(public name: string) {}
}
class ProxyFleetSpec {
    constructor(
        public clusterRef: ProxyFleetSpecClusterRef,
        public replicas: number = 1,
        public services: ProxyFleetSpecService = new ProxyFleetSpecService(),
        public template: ProxyFleetSpecTemplate = new ProxyFleetSpecTemplate(),
    ) {
        // Initialize other properties if needed
    }
}

class ProxyFleetStatus {
    constructor(public replicas?: number | null) {
        // Initialize other properties if needed
    }
}

class ProxyFleet {
    constructor(
        public metadata: ShulkerMetadata,
        public spec: ProxyFleetSpec,
        public apiVersion: string = "shulkermc.io/v1alpha1",
        public kind: string = "ProxyFleet",
        public status?: ProxyFleetStatus,
    ) {}
}

// MinecraftServer classes
class MinecraftServerSpec {
    constructor(public replicas?: number | null) {
        // Initialize other properties if needed
    }
}

class MinecraftServerStatus {
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
        public status?: MinecraftServerStatus,
    ) {}
}

// MinecraftServerFleet classes
class MinecraftServerFleetSpec {
    constructor(public replicas?: number | null) {
        // Initialize other properties if needed
    }
}

class MinecraftServerFleetStatus {
    constructor(public replicas?: number | null) {
        // Initialize other properties if needed
    }
}

class MinecraftServerFleet {
    constructor(
        public metadata: ShulkerMetadata,
        public apiVersion: string = "shulkermc.io/v1alpha1",
        public kind: string = "MinecraftServerFleet",
        public spec?: MinecraftServerFleetSpec,
        public status?: MinecraftServerFleetStatus,
    ) {}
}

// MinecraftCluster classes
class MinecraftClusterSpec {
    constructor(public networkAdmins?: string[] | null) {
        // Initialize other properties if needed
    }
}

class MinecraftClusterStatus {}

class MinecraftCluster {
    constructor(
        public metadata: ShulkerMetadata,
        public apiVersion: string = "shulkermc.io/v1alpha1",
        public kind: string = "MinecraftCluster",
        public spec: MinecraftClusterSpec = {},
        public status?: MinecraftClusterStatus,
    ) {}
}

export {
    ShulkerMetadata,
    ProxyFleet,
    ProxyFleetSpec,
    ProxyFleetSpecClusterRef,
    ProxyFleetStatus,
    MinecraftServer,
    MinecraftServerSpec,
    MinecraftServerStatus,
    MinecraftServerFleet,
    MinecraftServerFleetSpec,
    MinecraftServerFleetStatus,
    MinecraftCluster,
    MinecraftClusterSpec,
    MinecraftClusterStatus,
};
