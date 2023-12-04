import { PrismaClient } from "@prisma/client";
import type { Settings } from "~/types/settings";
import k8s from "@kubernetes/client-node";

const prisma = new PrismaClient();

export async function getKubeConfig(): Promise<Settings | null> {
    return prisma.settings.findUnique({
        where: { name: "kubeconfig" },
    });
}

export async function getSetting(name: string): Promise<Settings | null> {
    return prisma.settings.findUnique({ where: { name } });
}

export async function updateSetting(
    SettingName: string,
    settings: string,
): Promise<Settings> {
    return prisma.settings.update({
        where: { name: SettingName },
        data: settings,
    });
}

export async function deleteSetting(SettingName: string): Promise<Settings> {
    return prisma.settings.delete({ where: { name: SettingName } });
}
