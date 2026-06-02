variable "kubeconfig_path" {
  description = "Path to kubeconfig file"
  type        = string
  default     = "~/.kube/config"
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

variable "uat_namespace" {
  description = "UAT namespace name"
  type        = string
  default     = "uat"
}