# Task:
# Add two input variables:
# - project_name (string)
# - environment (string, default "dev")
# Then create a local value that combines them like "<project_name>-<environment>".

variable "project_name" {
  type = string
}

variable "environment" {
  type    = string
  default = "dev"
}

locals {
  project_env = "${var.project_name}-${var.environment}"
}
