provider "azurerm" {
  features {}
}


resource "azurerm_resource_group" "rg" {
  name     = "rg_holi_todo"
  location = var.location

  tags = {
    owner = "leon"
  }
}

resource "azurerm_cosmosdb_account" "db-account" {
  name                = "holi-todo-app-db"
  location            = var.location
  resource_group_name = azurerm_resource_group.rg.name
  offer_type          = "Standard"
  kind                = "GlobalDocumentDB"

  consistency_policy {
    consistency_level = "Session"
  }

  capabilities {
    name = "EnableServerless"
  }

  geo_location {
    location          = azurerm_resource_group.rg.location
    failover_priority = 0
  }

  tags = {
    CosmosAccountType       = "Non-Production"
    defaultExperience       = "Core (SQL)"
    hidden-cosmos-mmspecial = ""
    owner                   = "leon"
  }
}

resource "azurerm_cosmosdb_sql_database" "db" {
  name                = "todo-cosmos-sql-db"
  resource_group_name = azurerm_cosmosdb_account.db-account.resource_group_name
  account_name        = azurerm_cosmosdb_account.db-account.name
}

resource "azurerm_cosmosdb_sql_container" "db-container" {
  name                  = "todo-tasks"
  resource_group_name   = azurerm_cosmosdb_account.db-account.resource_group_name
  account_name          = azurerm_cosmosdb_account.db-account.name
  database_name         = azurerm_cosmosdb_sql_database.db.name
}

resource "azurerm_storage_account" "storage-account" {
  name                     = "holitodo"
  resource_group_name      = azurerm_resource_group.rg.name
  location                 = var.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  account_kind             = "StorageV2"
  min_tls_version          = "TLS1_2"

  static_website {
    index_document = "index.html"
    error_404_document = "404.html"
  }

  tags = {
    owner = "leon"
  }
}

resource "azurerm_app_service_plan" "service-plan" {
  name                = "holi-todo-service-plan"
  location            = var.location
  resource_group_name = azurerm_resource_group.rg.name
  kind                = "FunctionApp"
  reserved            = true //Use Linux OS

  sku {
    tier = "Dynamic"
    size = "Y1"
  }

  tags = {
    owner = "leon"
  }
}

resource "azurerm_function_app" "function-app" {
  name                       = "holi-todo"
  location                   = var.location
  resource_group_name        = azurerm_resource_group.rg.name
  app_service_plan_id        = azurerm_app_service_plan.service-plan.id
  storage_account_name       = azurerm_storage_account.storage-account.name
  storage_account_access_key = azurerm_storage_account.storage-account.primary_access_key
  https_only                 = true
  version                    = "~3"
  os_type                    = "linux"

  site_config {
    always_on                 = false
    linux_fx_version          = "NODE|14-lts"
    use_32_bit_worker_process = false
  }

  app_settings = {
    holitodoappdb_DOCUMENTDB = azurerm_cosmosdb_account.db-account.connection_strings[0]
    "STATIC_WEBSITE_URL" = azurerm_storage_account.storage-account.primary_web_host,
  }

  tags = {
    owner = "leon"
  }

  lifecycle {
    ignore_changes = [
      app_settings["WEBSITE_RUN_FROM_PACKAGE"]
    ]
  }
}
