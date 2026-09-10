@description('App Service Plan name.')
param appServicePlanName string

@description('Azure region for the plan.')
param location string

@description('SKU name, e.g. B1 (Basic).')
param skuName string = 'B1'

resource appServicePlan 'Microsoft.Web/serverfarms@2023-12-01' = {
  name: appServicePlanName
  location: location
  kind: 'linux'
  sku: {
    name: skuName
  }
  properties: {
    reserved: true // required for Linux plans
  }
}

output appServicePlanId string = appServicePlan.id
