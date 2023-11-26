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
- [Helm](https://helm.sh/docs/intro/install/)
- [Helmfile](https://github.com/helmfile/helmfile)
- [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
## Using Helmfile
```shell
cd helm
helmfile sync
```
## Uninstall
```shell
cd helm
helmfile destroy
```