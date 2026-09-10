@description('Globally-unique storage account name (lowercase, no hyphens, 3-24 chars).')
@minLength(3)
@maxLength(24)
param storageAccountName string

@description('Azure region for the storage account.')
param location string

@description('Storage account SKU (replication level).')
param skuName string = 'Standard_LRS'

resource storageAccount 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name: storageAccountName
  location: location
  kind: 'StorageV2'
  sku: {
    name: skuName
  }
  properties: {
    minimumTlsVersion: 'TLS1_2'
    supportsHttpsTrafficOnly: true
    allowBlobPublicAccess: false
  }
}

@description('The storage account resource ID.')
output storageAccountId string = storageAccount.id

@description('The storage account name.')
output storageAccountName string = storageAccount.name

@description('Connection string for the Table service, for use as the app\'s ConnectionStrings__AzureTableStorage setting.')
@secure()
output connectionString string = 'DefaultEndpointsProtocol=https;AccountName=${storageAccount.name};AccountKey=${storageAccount.listKeys().keys[0].value};EndpointSuffix=core.windows.net'
