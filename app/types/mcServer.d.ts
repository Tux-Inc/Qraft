interface Version {
    channel: string;
    name: string;
}

interface Players {
    max: number;
    online: number;
}

export interface McServer {
    id: string;
    type: "ProxyFleet" | "MinecraftServerFleet";
    version: Version;
    name: string;
    status: number;
    players: Players;
}
