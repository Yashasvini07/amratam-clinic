# Infrastructure as Code

Bicep templates for the Azure resources this app runs on: a Storage Account (used for Azure Table Storage), a Linux App Service Plan, and two Web Apps (the .NET API and the Next.js frontend) sharing that plan.

This provisions the **resource shells only** — it does not build or deploy application code. After running this, you still deploy the API (`dotnet publish` + `az webapp deploy`) and the frontend (`npm run build` + `az webapp deploy`) exactly as before.

## Layout

```
infra/
  main.bicep                    # orchestrator
  modules/
    storageAccount.bicep
    appServicePlan.bicep
    webApp.bicep                # generic — used once for the API, once for the frontend
  parameters/
    prod.parameters.json        # matches the live amratam-rg resources
    test.parameters.json        # matches the live amratam-rg-test resources
  deploy.sh
```

## Prerequisites

- Azure CLI, logged in: `az login`
- The Bicep CLI (one-time): `az bicep install`
- The target subscription selected: `az account set --subscription "<name-or-id>"`

No subscription ID is hardcoded anywhere — whatever subscription is active in your `az` session is what gets deployed to. This is what makes moving to a different subscription later just a matter of `az account set` + running the script again.

## Usage

```bash
ADMIN_INITIAL_PASSWORD='choose-a-strong-password' ./infra/deploy.sh prod
ADMIN_INITIAL_PASSWORD='choose-a-strong-password' ./infra/deploy.sh test
```

`ADMIN_INITIAL_PASSWORD` is required and intentionally never stored in a parameters file — the script fails immediately if it's missing. This becomes the API's seeded admin login password on first run (see `TableStorageSeeder` in the backend).

Deployments are idempotent: running the script again against already-provisioned resources reconciles them to match the template rather than duplicating anything.

### Deploying to a brand-new subscription

1. `az login` and `az account set --subscription "<the-new-subscription>"`.
2. Copy `parameters/prod.parameters.json` to something like `parameters/new-client.parameters.json` and adjust `namePrefix`, `corsAllowedOrigin`, and (optionally) `storageAccountName` — or just delete the `storageAccountName` line entirely and let `main.bicep`'s default expression derive a unique name automatically.
3. `ADMIN_INITIAL_PASSWORD=... ./infra/deploy.sh <env> <resource-group-name> <location>` — pass the environment name matching whichever parameters file you want deploy.sh to use (edit the script's file lookup, or just point `PARAMS_FILE` at your new file directly for a one-off run).

## What this does not do

- Deploy application code (see the main project README for the build/deploy steps).
- Provision Azure Communication Services / email resources — that's a separate, not-yet-built feature.
- Import the already-running `amratam-rg` / `amratam-rg-test` resources into managed Bicep/ARM deployment state. Running `deploy.sh` against those resource groups will update them in place to match the template (they already do, since the parameters files mirror their current configuration) but Azure doesn't retroactively "adopt" resource history — this is a forward-looking tool for recreating the same setup elsewhere, not a migration.

## Verifying changes before applying them

```bash
az bicep build --file infra/main.bicep          # confirms the template compiles
az deployment group validate \
  --resource-group amratam-rg-test \
  --template-file infra/main.bicep \
  --parameters @infra/parameters/test.parameters.json \
  --parameters adminInitialPassword='placeholder-for-validation-only'
```

`validate` (or `--what-if` on `az deployment group create`) checks the template against Azure without actually changing anything — useful for confirming a template edit does what you expect before it touches real resources.
