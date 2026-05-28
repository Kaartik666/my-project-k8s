terraform {
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.0"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.0"
    }
  }
}

provider "kubernetes" {
  config_path = var.kubeconfig_path
}

provider "helm" {
  kubernetes {
    config_path = var.kubeconfig_path
  }
}

resource "kubernetes_namespace" "dev" {
  metadata {
    name = var.dev_namespace
  }
}

resource "kubernetes_namespace" "prod" {
  metadata {
    name = var.prod_namespace
  }
}

resource "helm_release" "dev" {
  name       = "email-collector-dev"
  namespace  = var.dev_namespace
  chart      = var.helm_chart_path
  values     = [file("${var.helm_chart_path}/values-dev.yaml")]
  depends_on = [kubernetes_namespace.dev]
}

resource "helm_release" "prod" {
  name       = "email-collector-prod"
  namespace  = var.prod_namespace
  chart      = var.helm_chart_path
  values     = [file("${var.helm_chart_path}/values-prod.yaml")]
  depends_on = [kubernetes_namespace.prod]
}
