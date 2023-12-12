#!/bin/bash

# Function to display the help message
show_help() {
    echo "Usage: $(basename "$0") [--install-metallb]"
    echo
    echo "Options:"
    echo "  --install-metallb    Install MetalLB on your system."
    echo "  -h, --help           Display this help message and exit."
}

get_arch_kernel() {
  kernel_name=$(uname -s)
  machine_hw_name=$(uname -m)
  full_name="${kernel_name}_${machine_hw_name}"
  full_name=$(echo "$full_name" | tr '[:upper:]' '[:lower:]')
  return "$full_name"
}


install_base() {
  printf "Installing basic namespace\n"
  kubectl apply -f init/base/qraft-namespace.yaml
  kubectl apply -f init/base/shulker-system-namespace.yaml
}

install_cert_manager() {
    printf "Installing cert-manager\n"
    kubectl apply -f init/cert-manager/cert-manager.yaml
}

install_metallb() {
    printf "Installing MetalLB\n"
    kubectl apply -f init/metallb/metallb-native.yaml
    kubectl wait --namespace metallb-system \
                    --for=condition=ready pod \
                    --selector=component=controller \
                    --timeout=90s
    kubectl apply -f init/metallb/metallb-config-crd.yaml
}

install_helm() {
  if ! command -v helm &> /dev/null
  then
      printf "Helm could not be found, installing...\n"
      curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
  fi
}

install_helmfile() {
  if ! command -v helmfile &> /dev/null
  then
      printf "Helmfile could not be found, installing...\n"
      arch_kernel=$(get_arch_kernel)
      curl -L https://github.com/helmfile/helmfile/releases/download/v0.159.0/helmfile_0.159.0_"${arch_kernel}".tar.gz | tar xz
      mv helmfile /usr/local/bin/helmfile
  fi
}

install_apps() {
  printf "Installing apps\n"
  cd helm && helmfile sync
}

if [ "$#" -eq 0 ]; then
    install_base
    install_cert_manager
    install_helm
    install_helmfile
    install_apps
    exit 1
fi

# Process the arguments
while [ $# -gt 0 ]; do
    case "$1" in
        --install-metallb)
            install_base
            install_cert_manager
            install_metallb
            install_helm
            install_helmfile
            install_apps
            ;;
        -h|--help)
            show_help
            exit 0
            ;;
        *)
            echo "Error: Invalid argument '$1'"
            show_help
            exit 1
            ;;
    esac
    shift
done
