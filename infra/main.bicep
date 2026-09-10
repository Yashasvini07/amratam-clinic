// Amratam Clinic — resource-group-scoped infrastructure.
// Deploy with: az deployment group create --resource-group <rg> --template-file main.bicep --parameters @parameters/<env>.parameters.json ...
targetScope = 'resourceGroup'

@description('Short name prefix for all resources, e.g. "amratam".')
param namePrefix string

@description('Environment suffix appended to resource names, e.g. "" for production or "-test" for the test environment.')
param environmentSuffix string = ''

@description('Azure region for all resources.')
param location string = resourceGroup().location

@description('Storage account SKU.')
param storageSkuName string = 'Standard_LRS'

@description('App Service Plan SKU.')
param appServicePlanSkuName string = 'B1'

@description('.NET API runtime stack.')
param apiLinuxFxVersion string = 'DOTNETCORE|10.0'

@description('Frontend runtime stack.')
param webLinuxFxVersion string = 'NODE|24-lts'

@description('Admin username seeded into the API on first run.')
param adminUsername string = 'admin'

@description('Admin password seeded into the API on first run. Pass via deploy.sh, never commit a real value in a parameters file.')
@secure()
param adminInitialPassword string

@description('Allowed CORS origin for the API (the frontend\'s public URL).')
param corsAllowedOrigin string

@description('Globally-unique storage account name (lowercase, no hyphens, <=24 chars). Defaults to a name derived from the resource group if not supplied.')
param storageAccountName string = toLower('${namePrefix}${replace(environmentSuffix, '-', '')}${uniqueString(resourceGroup().id)}')

var apiAppName = '${namePrefix}-api${environmentSuffix}'
var webAppName = '${namePrefix}-web${environmentSuffix}'
var planName = '${namePrefix}-plan${environmentSuffix}'

module storage 'modules/storageAccount.bicep' = {
  name: 'storageAccount'
  params: {
    storageAccountName: storageAccountName
    location: location
    skuName: storageSkuName
  }
}

module plan 'modules/appServicePlan.bicep' = {
  name: 'appServicePlan'
  params: {
    appServicePlanName: planName
    location: location
    skuName: appServicePlanSkuName
  }
}

module api 'modules/webApp.bicep' = {
  name: 'apiWebApp'
  params: {
    webAppName: apiAppName
    location: location
    appServicePlanId: plan.outputs.appServicePlanId
    linuxFxVersion: apiLinuxFxVersion
    appSettings: {
      ConnectionStrings__AzureTableStorage: storage.outputs.connectionString
      Admin__Username: adminUsername
      Admin__InitialPassword: adminInitialPassword
      Cors__AllowedOrigin: corsAllowedOrigin
    }
  }
}

module web 'modules/webApp.bicep' = {
  name: 'frontendWebApp'
  params: {
    webAppName: webAppName
    location: location
    appServicePlanId: plan.outputs.appServicePlanId
    linuxFxVersion: webLinuxFxVersion
    appCommandLine: 'node server.js'
    appSettings: {
      SCM_DO_BUILD_DURING_DEPLOYMENT: 'false'
      WEBSITE_NODE_DEFAULT_VERSION: '~24'
    }
  }
}

output apiUrl string = 'https://${api.outputs.defaultHostName}'
output webUrl string = 'https://${web.outputs.defaultHostName}'
output storageAccountName string = storage.outputs.storageAccountName
