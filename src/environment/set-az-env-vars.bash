# Set bash environment variables for Azure CLI
# In bash shell, run: source src/environment/az-env-vars.bash
# NOTE: . is an alias for source
# Therefore, in bash shell, run: . src/environment/set-az-env-vars.bash
# NOTE: this script is idempotent; therefore, it can be run multiple times (change the values and rerun)
# Review resources by searching like "printenv | grep demo"
export RESOURCE_GROUP="demo-apps"
export LOCATION="canadacentral"
export ENVIRONMENT="env-demo-apps"
export API_NAME="demo5-api"
export UI_NAME="demo5-ui"
export GITHUB_USER="abcox"
export ACR_NAME="vorbademoacr1" # Azure Container Registry (ACR) name
export API_BASE_URL=""

az containerapp create --name $UI_NAME --resource-group $RESOURCE_GROUP --environment $ENVIRONMENT --image $ACR_NAME.azurecr.io/demoapp-ui --target-port 3000 --env-vars API_BASE_URL=https://$API_BASE_URL --ingress 'external' --registry-server $ACR_NAME.azurecr.io --query properties.configuration.ingress.fqdn
