import k8s from "@kubernetes/client-node";

const config = useRuntimeConfig();

const kc = new k8s.KubeConfig();
kc.loadFromOptions(config.KubeConfig);
const k8sApi = kc.makeApiClient(k8s.AppsV1Api);
const deployment_namespace = "qraft";
const deployment_body: k8s.V1Deployment = {
    kind: "Deployment",
    apiVersion: "apps/v1",
    metadata: {
        name: "mc",
        labels: {
            "io.kompose.service": "mc",
        },
        annotations: {
            "kompose.cmd": "kompose convert --json",
            "kompose.version": "1.31.2 (a92241f79)",
        },
    },
    spec: {
        replicas: 1,
        selector: {
            matchLabels: {
                "io.kompose.service": "mc",
            },
        },
        template: {
            metadata: {
                labels: {
                    "io.kompose.network/mc-default": "true",
                    "io.kompose.service": "mc",
                },
                annotations: {
                    "kompose.cmd": "kompose convert --json",
                    "kompose.version": "1.31.2 (a92241f79)",
                },
            },
            spec: {
                volumes: [
                    {
                        name: "mc-claim0",
                        persistentVolumeClaim: {
                            claimName: "mc-claim0",
                        },
                    },
                ],
                containers: [
                    {
                        name: "mc",
                        image: "itzg/minecraft-server",
                        ports: [
                            {
                                hostPort: 25565,
                                containerPort: 25565,
                                protocol: "TCP",
                            },
                        ],
                        env: [
                            {
                                name: "EULA",
                                value: "TRUE",
                            },
                        ],
                        resources: {},
                        volumeMounts: [
                            {
                                name: "mc-claim0",
                                mountPath: "/data",
                            },
                        ],
                        stdin: true,
                        tty: true,
                    },
                ],
                restartPolicy: "Always",
            },
        },
        strategy: {
            type: "Recreate",
        },
    },
    status: {},
};
export default defineEventHandler(async (event) => {
    const Deployments_Result = await k8sApi.createNamespacedDeployment(
        deployment_namespace,
        deployment_body,
    );

    return {
        deploy: Deployments_Result,
    };
});
