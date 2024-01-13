---
title: Qraft
description: Qraft is a platform for creating and managing minecraft servers.
date: 20-12-2023
image: /images/qraft-hero.png
---

::Hero
---
src: /images/qraft-hero.png
alt: Qraft
---
::

# Qraft
Qraft is a platform for creating and managing minecraft servers in a simple and scalable way.

## Architecture
Qraft is a dashboard built on top of the [Shulker](https://github.com/jeremylvln/Shulker) system. Shulker is a system that allow to deploy and manage minecraft server, minecraft proxies and servers clusters. For more information about Shulker, please refer to the [Shulker documentation](https://shulker.jeremylvln.fr/).
Thanks to Nuxt 3 and the server capabilities, Qraft is able to communicate with the Kubernetes API to manage the Shulker system.

The figure below shows the architecture of Qraft which pretty simple.

![Qraft architecture](/images/qraft-architecture.png)

## Features
From the dashboard, you can:
- Create a server cluster
- Create a proxy fleet (BungeeCord / Velocity)
- Create a minecraft server (Paper / Spigot)
- Manage your instances (start, stop, restart, delete)
- View the logs of your instances

## Deployment
### Helm chart
Qraft is deployed on a Kubernetes cluster. The deployment is done with the help of Helm. The Helm chart is available on the [Qraft repository](https://github.com/Tux-Inc/Qraft).
### Ansible
The deployment of the Kubernetes cluster is done with the help of Ansible. The Ansible playbook is available on the [Qraft repository](https://github.com/Tux-Inc/Qraft).