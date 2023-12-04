# Automatic Installation Guide using Ansible
Qraft is a collection of Ansible roles that can be installed using Ansible playbook.
## Prerequisites
- [Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html)

## Using Ansible playbook
```shell
cd ansible
ansible-playbook -i inventory/hosts site.yml
```

# Manual Installation Guide for Kubernetes
Qraft is a collection of Helm charts that can be installed using Helmfile.
## Prerequisites
- [Kubernetes](https://kubernetes.io/docs/setup/)
- [Helm](https://helm.sh/docs/intro/install/)
- [Helmfile](https://github.com/helmfile/helmfile)
## Install required manifests
- Namespaces
```shell
kubectl apply -f init/base/qraft-namespace.yaml
kubectl apply -f init/base/shulker-system-namespace.yaml
```
- Cert-manager
```shell
kubectl apply -f init/cert-manager/cert-manager.yaml
```
- metallb
```shell
kubectl apply -f init/metallb/metallb-native.yaml
kubectl apply -f init/metallb/metallb-config-crd.yaml
```
## Install Qraft & Shulker operator using Helmfile
```shell
cd helm
helmfile sync
```
## Uninstall
```shell
cd helm
helmfile destroy
```