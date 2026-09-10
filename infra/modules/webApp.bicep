@description('Web App name (becomes <name>.azurewebsites.net).')
param webAppName string

@description('Azure region for the Web App.')
param location string

@description('Resource ID of the App Service Plan hosting this app.')
param appServicePlanId string

@description('Linux runtime stack, e.g. "DOTNETCORE|10.0" or "NODE|24-lts".')
param linuxFxVersion string

@description('Optional startup command, e.g. "node server.js" for a Next.js standalone build. Leave empty for defaults (e.g. the .NET API).')
param appCommandLine string = ''

@description('App settings for this Web App as a name/value map. May include secrets — treated as sensitive.')
@secure()
param appSettings object

resource webApp 'Microsoft.Web/sites@2023-12-01' = {
  name: webAppName
  location: location
  properties: {
    serverFarmId: appServicePlanId
    httpsOnly: true
    siteConfig: {
      linuxFxVersion: linuxFxVersion
      appCommandLine: appCommandLine
      appSettings: [for setting in items(appSettings): {
        name: setting.key
        value: setting.value
      }]
    }
  }
}

output webAppName string = webApp.name
output defaultHostName string = webApp.properties.defaultHostName
