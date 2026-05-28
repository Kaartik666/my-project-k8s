variable "kubeconfig_path" {
  description = "Path to kubeconfig file"
  type        = string
  default     = "~/.kube/config"
}

variable "helm_chart_path" {
  description = "Path to helm chart"
  type        = string
  default     = "../helm/email-collector"
}

variable "dev_namespace" {
  description = "Dev namespace name"
  type        = string
  default     = "dev"
}

variable "prod_namespace" {
  description = "Prod namespace name"
  type        = string
  default     = "prod"
}
