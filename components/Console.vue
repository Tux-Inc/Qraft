<script lang="ts" setup>
const commandPrompt = ref<string>("");
const log =
    "[2023-11-01 10:00:00] INFO: Démarrage du serveur Minecraft\n" +
    "[2023-11-01 10:01:00] INFO: Chargement de la carte\n" +
    "[2023-11-01 10:05:00] INFO: Génération du monde en cours\n" +
    "[2023-11-01 10:10:00] INFO: Le joueur Steve s'est connecté\n" +
    "[2023-11-01 10:15:00] INFO: Le joueur Alex a rejoint la partie\n" +
    "[2023-11-01 10:20:00] INFO: Le joueur Herobrine a quitté le jeu\n" +
    "[2023-11-01 10:25:00] INFO: Nouveau donjon généré aux coordonnées (X: 100, Y: 65, Z: 200)\n" +
    "[2023-11-01 10:30:00] INFO: Le joueur Steve a vaincu l'Ender Dragon\n" +
    "[2023-11-01 10:35:00] INFO: Pluie de météorites détectée\n" +
    "[2023-11-01 10:40:00] INFO: Le joueur Alex a trouvé un village\n" +
    "[2023-11-01 10:45:00] INFO: Explosion massive près de la base de Steve\n" +
    "[2023-11-01 10:50:00] INFO: Nouvelle recette d'enchantement découverte\n" +
    "[2023-11-01 10:55:00] INFO: Le joueur Notch a rejoint la partie\n" +
    "[2023-11-01 11:00:00] INFO: Un trésor caché a été découvert\n" +
    "[2023-11-01 11:05:00] INFO: Récolte de ressources en cours\n" +
    "[2023-11-01 11:10:00] INFO: Incendie de forêt près de la base d'Alex\n" +
    "[2023-11-01 11:15:00] INFO: Récolte de minerais dans les profondeurs\n" +
    "[2023-11-01 11:20:00] INFO: Éruption du volcan sur l'île voisine\n" +
    "[2023-11-01 11:25:00] INFO: Nouvelle mise à jour du serveur appliquée\n" +
    "[2023-11-01 11:30:00] INFO: Le joueur Steve a construit un gigantesque château\n" +
    "[2023-11-01 11:35:00] INFO: Le joueur Alex a découvert un temple sous-marin\n" +
    "[2023-11-01 11:40:00] INFO: Début de la construction du chemin de fer\n" +
    "[2023-11-01 11:45:00] INFO: Exploration de la caverne géante\n" +
    "[2023-11-01 11:50:00] INFO: Le joueur Notch a créé un nouvel objet légendaire\n" +
    "[2023-11-01 11:55:00] INFO: Le joueur Steve a battu le Wither\n" +
    "[2023-11-01 12:00:00] INFO: Le joueur Alex a organisé un tournoi PvP\n" +
    "[2023-11-01 12:05:00] INFO: Villageois en grève pour de meilleurs tarifs\n" +
    "[2023-11-01 12:10:00] INFO: Un joueur inconnu a rejoint la partie\n" +
    "[2023-11-01 12:15:00] INFO: Nouvelle zone de PvP créée\n" +
    "[2023-11-01 12:20:00] INFO: Steve a été tué par un Creeper\n" +
    "[2023-11-01 12:25:00] INFO: Le joueur Notch a trouvé un portail vers le Nether\n" +
    "[2023-11-01 12:30:00] INFO: Les joueurs se lancent dans une quête épique\n" +
    "[2023-11-01 12:35:00] INFO: Construction de la ferme automatisée en cours\n" +
    "[2023-11-01 12:40:00] INFO: Alex a capturé un loup apprivoisé\n" +
    "[2023-11-01 12:45:00] INFO: De nouvelles alliances se forment\n" +
    "[2023-11-01 12:50:00] INFO: Un troupeau de moutons roses découvert\n" +
    "[2023-11-01 12:55:00] INFO: Le joueur Notch a lancé un feu d'artifice\n" +
    "[2023-11-01 13:00:00] INFO: Steve a fabriqué une épée en diamant\n" +
    "[2023-11-01 13:05:00] INFO: Une inondation menace la base d'Alex\n" +
    "[2023-11-01 13:10:00] INFO: Envoi de secours en cours\n" +
    "[2023-11-01 13:15:00] INFO: Le joueur Notch a construit une arène de combat\n" +
    "[2023-11-01 13:20:00] INFO: Tournoi PvP épique en cours\n" +
    "[2023-11-01 13:25:00] INFO: Nouvelle mise à jour des plugins\n" +
    "[2023-11-01 13:30:00] INFO: Steve a créé une statue en hommage à Herobrine\n" +
    "[2023-11-01 13:35:00] INFO: Exploration des fonds marins\n" +
    "[2023-11-01 13:40:00] INFO: Alex a planté une forêt d'arbres géants\n" +
    "[2023-11-01 13:45:00] INFO: Le joueur Notch a construit un circuit redstone\n" +
    "[2023-11-01 13:50:00] INFO: Nouvelle quête disponible\n" +
    "[2023-11-01 13:55:00] INFO: Steve a atteint le niveau 100\n" +
    "[2023-11-01 14:00:00] INFO: Alex a découvert un village abandonné\n" +
    "[2023-11-01 14:05:00] INFO: Les joueurs préparent une expédition\n" +
    "[2023-11-01 14:10:00] INFO: Steve a lancé un feu d'artifice spectaculaire\n" +
    "[2023-11-01 14:15:00] INFO: Combat aérien contre les ghasts dans le Nether\n" +
    "[2023-11-01 14:20:00] INFO: Alex a trouvé un donjon rempli de trésors\n" +
    "[2023-11-01 14:25:00] INFO: Nouvelle construction épique en cours\n" +
    "[2023-11-01 14:30:00] INFO: Notch a été élu maire du village\n" +
    "[2023-11-01 14:35:00] INFO: Steve a échangé des ressources avec les villageois\n" +
    "[2023-11-01 14:40:00] INFO: Les joueurs préparent une expédition vers l'End\n" +
    "[2023-11-01 14:45:00] INFO: Enchantement d'objets puissants en cours\n" +
    "[2023-11-01 14:50:00] INFO: Attaque surprise de pillards\n" +
    "[2023-11-01 14:55:00] INFO: Alex a atteint le niveau 50\n" +
    "[2023-11-01 15:00:00] INFO: Préparation d'une course de bateaux\n" +
    "[2023-11-01 15:05:00] INFO: Le joueur Notch a découvert un biome rare\n" +
    "[2023-11-01 15:10:00] INFO: Steve a établi une ligne de téléportation rapide\n" +
    "[2023-11-01 15:15:00] INFO: Exploration de l'End en cours\n" +
    "[2023-11-01 15:20:00] INFO: Le joueur Alex a créé une ferme automatisée\n" +
    "[2023-11-01 15:25:00] INFO: Découverte d'une citadelle perdue\n" +
    "[2023-11-01 15:30:00] INFO: Steve a créé un parcours d'obstacles\n" +
    "[2023-11-01 15:35:00] INFO: Alex a organisé une foire communautaire\n" +
    "[2023-11-01 15:40:00] INFO: Préparation de la chasse au trésor\n" +
    "[2023-11-01 15:45:00] INFO: Steve a échangé des ressources précieuses avec Alex\n" +
    "[2023-11-01 15:50:00] INFO: Le joueur Notch a lancé une émeute de poulets\n" +
    "[2023-11-01 15:55:00] INFO: Exploration de l'océan profond en cours\n" +
    "[2023-11-01 16:00:00] INFO: Nouvelle mise à jour du serveur Minecraft\n" +
    "[2023-11-01 16:05:00] INFO: Le joueur Steve a construit une cité sous-marine\n" +
    "[2023-11-01 16:10:00] INFO: La base d'Alex est attaquée par des mobs hostiles\n" +
    "[2023-11-01 16:15:00] INFO: Nouveau portail vers l'End découvert\n" +
    "[2023-11-01 16:20:00] INFO: Notch a obtenu une épée légendaire\n" +
    "[2023-11-01 16:25:00] INFO: Alex a organisé une course de chevaux\n" +
    "[2023-11-01 16:30:00] INFO: Un événement spécial prévu pour demain\n" +
    "[2023-11-01 16:35:00] INFO: Steve a établi une ligne de chemin de fer entre les bases\n" +
    "[2023-11-01 16:40:00] INFO: Construction d'un nouvel arbre géant par Alex\n" +
    "[2023-11-01 16:45:00] INFO: Notch a créé un circuit redstone complexe\n" +
    "[2023-11-01 16:50:00] INFO: Préparation d'un tournoi de PvP en équipes\n" +
    "[2023-11-01 16:55:00] INFO: Les joueurs organisent une course d'élaboration\n" +
    "[2023-11-01 17:00:00] INFO: Steve a atteint le niveau 200\n" +
    "[2023-11-01 17:05:00] INFO: Nouvelle quête épique en préparation\n" +
    "[2023-11-01 17:10:00] INFO: Alex a construit un phare pour guider les navires\n" +
    "[2023-11-01 17:15:00] INFO: Notch a découvert un mystérieux portail dimensionnel\n" +
    "[2023-11-01 17:20:00] INFO: Préparation d'un tournoi d'archerie\n" +
    "[2023-11-01 17:25:00] INFO: Les joueurs se lancent dans une quête pour le Nether\n" +
    "[2023-11-01 17:30:00] INFO: Construction d'une nouvelle arène PvP en cours\n" +
    "[2023-11-01 17:35:00] INFO: Exploration d'une île mystérieuse\n" +
    "[2023-11-01 17:40:00] INFO: Les joueurs s'apprêtent à affronter le dragon de l'End\n" +
    "[2023-11-01 17:45:00] INFO: Steve a lancé un feu d'artifice spectaculaire\n" +
    "[2023-11-01 17:50:00] INFO: Alex a construit une base sous-marine\n" +
    "[2023-11-01 17:55:00] INFO: Notch a organisé un grand banquet\n" +
    "[2023-11-01 18:00:00] INFO: Préparation de l'expédition vers le Nether\n" +
    "[2023-11-01 18:05:00] INFO: Les joueurs ont obtenu des armures en diamant\n" +
    "[2023-11-01 18:10:00] INFO: Alex a découvert une mine d'émeraudes\n" +
    "[2023-11-01 18:15:00] INFO: Steve a construit un réseau de chemins\n" +
    "[2023-11-01 18:20:00] INFO: Attaque surprise de zombies en armure\n" +
    "[2023-11-01 18:25:00] INFO: Le joueur Notch a créé une machine à XP\n" +
    "[2023-11-01 18:30:00] INFO: Les joueurs se préparent à affronter le Wither\n" +
    "[2023-11-01 18:35:00] INFO: Steve a fabriqué des potions puissantes\n" +
    "[2023-11-01 18:40:00] INFO: Alex a organisé un tournoi de pêche\n" +
    "[2023-11-01 18:45:00] INFO: Notch a créé une ferme à champignons géante\n" +
    "[2023-11-01 18:50:00] INFO: Steve a créé un parc d'attractions\n" +
    "[2023-11-01 18:55:00] INFO: Nouvelle épreuve de saut à cheval organisée par Alex\n" +
    "[2023-11-01 19:00:00] INFO: Les joueurs ont lancé une course en bateau";
</script>

<template>
    <div
        class="flex flex-col rounded-xl mx-0 my-4 border xl:ml-0 bg-dark border-b border-gray-700 bg-opacity-30 dark:border-gray-700 dark:bg-gray-800 dark:bg-opacity-30 appearance-none max-h-[500px] overflow-hidden"
    >
        <div class="flex text-green-400 text-xs">
            <div
                class="mt-2 border-t border-b border-t-transparent border-b-green-400 px-4 py-1 flex items-center">
                Console
            </div>
            <div class="relative flex-auto flex pt-2 rounded-tr-xl">
                <div
                    class="flex-auto -mr-px border border-slate-500/30 rounded-tl"
                >
                    <div
                        class="absolute -bottom-1 right-0 h-8 flex items-center pr-3"
                    >
                        <div class="relative flex -mr-2">
                            <UButton
                                :padded=false
                                color="gray"
                                variant="link"
                                icon="i-heroicons-x-mark-20-solid"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="p-2 overflow-auto">
            <pre
                class="text-sm flex"
            ><code class="flex-none">{{log}}</code></pre>
        </div>
        <div>
            <UInput v-model="commandPrompt" placeholder="/ Command there !" />
        </div>
    </div>
</template>

<style scoped></style>
