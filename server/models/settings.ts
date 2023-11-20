import { PrismaClient } from "@prisma/client";
import type { Settings } from "~/types/settings";
import k8s, { KubeConfig } from "@kubernetes/client-node";

const prisma = new PrismaClient();

export async function getKubeConfig(): Promise<k8s.KubeConfig> {
    return (
        (prisma.settings.findUnique({
            where: { name: "kubeconfig" },
        }) as KubeConfig) || new KubeConfig()
    );
}

export async function getSetting(name: string): Promise<Settings | null> {
    return prisma.settings.findUnique({ where: { name } });
}

export async function updateSetting(
    name: string,
    settings: Settings,
): Promise<Settings> {
    return prisma.settings.update({ where: { name }, data: settings });
}

export async function deleteSetting(name: String): Promise<boolean> {
    return prisma.settings.delete({ where: { name } });
}
