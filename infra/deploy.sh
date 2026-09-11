#!/usr/bin/env bash
# Provisions (or updates) the Azure infrastructure for the Amratam Clinic app.
#
# Usage:
#   ADMIN_INITIAL_PASSWORD=<secret> ./deploy.sh <prod|test> [resource-group-name] [location]
#
# Requires: az CLI logged in (`az login`) with the target subscription selected
# (`az account set --subscription <id-or-name>`) — this script never embeds a
# subscription ID, so it works against whatever subscription is currently active.
set -euo pipefail

usage() {
  echo "Usage: ADMIN_INITIAL_PASSWORD=<secret> $0 <prod|test> [resource-group-name] [location]" >&2
  exit 1
}

ENVIRONMENT="${1:-}"
if [[ "$ENVIRONMENT" != "prod" && "$ENVIRONMENT" != "test" ]]; then
  usage
fi

if [[ -z "${ADMIN_INITIAL_PASSWORD:-}" ]]; then
  echo "ERROR: ADMIN_INITIAL_PASSWORD environment variable is required (the API's seeded admin password)." >&2
  echo "        This is intentionally never stored in a parameters file." >&2
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PARAMS_FILE="$SCRIPT_DIR/parameters/${ENVIRONMENT}.parameters.json"

if [[ ! -f "$PARAMS_FILE" ]]; then
  echo "ERROR: no parameters file found at $PARAMS_FILE" >&2
  exit 1
fi

DEFAULT_RG="amratam-rg"
if [[ "$ENVIRONMENT" == "test" ]]; then
  DEFAULT_RG="amratam-rg-test"
fi
RESOURCE_GROUP="${2:-$DEFAULT_RG}"
LOCATION="${3:-centralindia}"

echo "==> Subscription in use:"
az account show --query "{name:name, id:id}" -o table

echo "==> Ensuring resource group '$RESOURCE_GROUP' exists in $LOCATION..."
az group create --name "$RESOURCE_GROUP" --location "$LOCATION" --output none

echo "==> Deploying infrastructure (environment: $ENVIRONMENT) to resource group '$RESOURCE_GROUP'..."
az deployment group create \
  --resource-group "$RESOURCE_GROUP" \
  --template-file "$SCRIPT_DIR/main.bicep" \
  --parameters "@$PARAMS_FILE" \
  --parameters adminInitialPassword="$ADMIN_INITIAL_PASSWORD" \
  --output table

echo "==> Done. Outputs (API/web URLs, storage account name) are printed above."
