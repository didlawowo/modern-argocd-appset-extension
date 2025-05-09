# 👁️ Guide de visualisation de l'extension

Ce guide explique comment visualiser votre extension ArgoCD pour ApplicationSet une fois qu'elle a été construite.

## 📋 Prérequis

- ArgoCD installé (localement ou dans un cluster Kubernetes)
- kubectl configuré pour accéder à votre cluster
- Node.js et npm installés (pour le développement local)

## 🚀 Méthodes de visualisation

### 1. Visualisation locale (sans Kubernetes)

Cette méthode est idéale pour le développement et les tests rapides.

```bash
# Construire l'extension
task build

# Déployer localement
task deploy-local
```

L'extension sera copiée dans `~/.argocd/extensions/modern-argocd-appset-extension/`. Si vous avez ArgoCD configuré pour charger les extensions depuis ce répertoire, elle sera visible à votre prochaine connexion.

### 2. Visualisation avec Docker (sans ArgoCD)

Cette méthode permet de visualiser l'extension dans un conteneur nginx sans avoir besoin d'ArgoCD.

```bash
# Construire et lancer le conteneur
task docker-run
```

Accédez à http://localhost:8080/extensions/modern-argocd-appset-extension/ dans votre navigateur. 
**Note**: Cette méthode ne montre que les fichiers statiques sans les fonctionnalités réelles d'ArgoCD.

### 3. Visualisation dans un cluster Kubernetes

Cette méthode déploie l'extension dans un cluster Kubernetes avec ArgoCD.

```bash
# Construire et déployer dans Kubernetes
task build
task deploy-k8s
```

#### 3.1 Configuration d'ArgoCD pour utiliser l'extension

Pour qu'ArgoCD utilise l'extension, assurez-vous que le serveur ArgoCD est configuré avec le flag `--enable-extensibility`.

```bash
# Vérifiez que le déploiement argocd-server a le flag
kubectl get deployment argocd-server -n argocd -o yaml | grep enable-extensibility

# Si ce n'est pas le cas, ajoutez-le
kubectl patch deployment argocd-server -n argocd --type='json' -p='[{"op": "add", "path": "/spec/template/spec/containers/0/command/-", "value": "--enable-extensibility"}]'
```

#### 3.2 Accès à l'interface ArgoCD

```bash
# Port-forward pour accéder à l'interface
kubectl port-forward svc/argocd-server -n argocd 8080:443
```

Accédez à https://localhost:8080 dans votre navigateur (acceptez l'avertissement de certificat). Utilisez vos identifiants ArgoCD pour vous connecter.

## 🔍 Où trouver l'extension dans l'interface

L'extension sera visible:

1. Dans la page de détails d'un ApplicationSet
2. Elle ajoutera un nouvel onglet ou une section supplémentaire montrant les applications générées
3. La section affichera les statistiques et la liste des applications avec leurs statuts

Pour y accéder:
- Allez dans "Applications" → "Application Sets"
- Cliquez sur un ApplicationSet spécifique
- L'extension devrait ajouter une section ou un onglet à la page de détails

## 🐞 Dépannage

Si l'extension n'apparaît pas:

1. **Vérifiez les logs du serveur ArgoCD**:
   ```bash
   kubectl logs -n argocd -l app.kubernetes.io/name=argocd-server
   ```
   Recherchez les messages relatifs aux extensions.

2. **Vérifiez que l'extension est correctement chargée**:
   ```bash
   kubectl get configmap -n argocd modern-argocd-appset-extension
   kubectl get secret -n argocd modern-argocd-appset-extension-deployment
   ```

3. **Redémarrez le serveur ArgoCD**:
   ```bash
   kubectl rollout restart deployment argocd-server -n argocd
   ```

4. **Vérifiez que le flag `--enable-extensibility` est présent**

5. **Vérifiez la console du navigateur** pour voir s'il y a des erreurs JavaScript

## 🎨 Modifications et rechargement

Pour appliquer des modifications:

1. Modifiez le code source
2. Exécutez `task build` pour recompiler
3. Exécutez `task deploy-local` ou `task deploy-k8s` selon votre méthode
4. Rafraîchissez la page ArgoCD dans votre navigateur (un rechargement complet peut être nécessaire)

## 📱 Test avec un ApplicationSet réel

Pour tester avec un ApplicationSet réel:

1. Créez un ApplicationSet de test dans ArgoCD
2. Accédez à la page de détails de cet ApplicationSet
3. Vérifiez que votre extension affiche les applications générées

Exemple de ApplicationSet minimal pour tester:

```yaml
apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata:
  name: test-appset
  namespace: argocd
spec:
  generators:
  - list:
      elements:
      - name: dev
        namespace: dev
      - name: staging
        namespace: staging
  template:
    metadata:
      name: '{{name}}-app'
    spec:
      project: default
      source:
        repoURL: https://github.com/argoproj/argocd-example-apps.git
        targetRevision: HEAD
        path: guestbook
      destination:
        server: https://kubernetes.default.svc
        namespace: '{{namespace}}'
```

Appliquez-le avec `kubectl apply -f test-appset.yaml -n argocd`.
