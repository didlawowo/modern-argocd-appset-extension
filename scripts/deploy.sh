#!/bin/bash
set -e

# Vérifie que les fichiers de build existent
if [ ! -f "dist/extension.js" ] || [ ! -f "dist/extension.css" ]; then
  echo "❌ Erreur: Les fichiers d'extension n'existent pas. Exécutez d'abord 'task build'."
  exit 1
fi

# Crée un répertoire temporaire
TMP_DIR=$(mktemp -d)
trap 'rm -rf "$TMP_DIR"' EXIT

# Lit le contenu des fichiers compilés
EXTENSION_JS=$(cat dist/extension.js | sed 's/\\/\\\\/g' | sed 's/$/\\n/' | tr -d '\n')
EXTENSION_CSS=$(cat dist/extension.css | sed 's/\\/\\\\/g' | sed 's/$/\\n/' | tr -d '\n')

# Remplace les variables dans le fichier de manifeste
cat manifests/install.yaml | \
  sed "s/\${CM_EXTENSION_JS}/$EXTENSION_JS/g" | \
  sed "s/\${CM_EXTENSION_CSS}/$EXTENSION_CSS/g" > "$TMP_DIR/install.yaml"

# Applique le manifeste mis à jour
kubectl apply -f "$TMP_DIR/install.yaml"

echo "✅ Extension déployée avec succès dans le cluster Kubernetes!"
echo "📝 Note: Assurez-vous que votre ArgoCD est configuré pour prendre en charge les extensions."
echo "   Pour vérifier, le déploiement argocd-server doit avoir le flag: '--enable-extensibility'"
