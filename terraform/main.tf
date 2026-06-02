terraform {
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.0"
    }
  }
}

provider "kubernetes" {
  config_path = var.kubeconfig_path
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

resource "kubernetes_namespace" "uat" {
  metadata {
    name = var.uat_namespace
  }
}