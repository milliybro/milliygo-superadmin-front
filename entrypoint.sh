#!/bin/sh
set -e

echo "Current branch: $BRANCH"
if [ "$BRANCH" = "dev" ]; then
    echo "🔧 Running on DEV branch"
    VAULT_ADDR=${VAULT_ADDR:-"http://192.168.10.115:8202"}
    SECRET_PATH=${SECRET_PATH:-"secret/data/superadmin_front"}
elif [ "$BRANCH" = "prod" ]; then
    echo "🚀 Running on PROD branch"
    VAULT_ADDR=${VAULT_ADDR:-"http://172.16.86.21:8202"}
    SECRET_PATH=${SECRET_PATH:-"secret/data/superadmin_front"}
else
    echo "❌ Unknown branch: $BRANCH"
fi


SECRETS=$(curl -s --header "X-Vault-Token: $VAULT_TOKEN" \
  $VAULT_ADDR/v1/$SECRET_PATH | jq -r '.data.data')

NEXUS_USER=$(echo "$SECRETS" | jq -r '.NEXUS_USER')
NEXUS_PASS=$(echo "$SECRETS" | jq -r '.NEXUS_PASS')
NEXUS_URL=$(echo "$SECRETS" | jq -r '.NEXUS_URL')

if [ "$BRANCH" = "dev" ]; then
    cat > ~/.npmrc <<EOF
@myorg:registry=${NEXUS_URL}
registry=https://registry.npmjs.org/
EOF
else
    AUTH=$(echo -n "${NEXUS_USER}:${NEXUS_PASS}" | base64)
    cat > ~/.npmrc <<EOF
@myorg:registry=${NEXUS_URL}
registry=https://registry.npmjs.org/
//$(echo $NEXUS_URL | sed -E 's#^https?://##'):_auth=${AUTH}
//$(echo $NEXUS_URL | sed -E 's#^https?://##'):always-auth=true
EOF
fi

echo ".npmrc configured:"
cat ~/.npmrc

npm install --legacy-peer-deps

exec "$@"
