terraform {
  backend "azurerm" {
    resource_group_name  = "rg-shared"
    storage_account_name = "playgroundtfstates"
    container_name       = "tfstate"
    key                  = "sample-todo-app.tfstate"
  }
}