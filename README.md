# 🚀 Modern ArgoCD ApplicationSet Extension

Une extension moderne pour ArgoCD qui permet de visualiser et gérer facilement les applications générées par un ApplicationSet.

![ArgoCD Logo](https://argo-cd.readthedocs.io/en/stable/assets/logo.png)

## 📋 Présentation

Ce projet est une refonte moderne de l'extension [argocd-applicationset-extension](https://github.com/speedfl/argocd-applicationset-extension), conçue pour fonctionner avec les versions récentes d'ArgoCD (v2.7+). L'extension améliore l'interface utilisateur d'ArgoCD en fournissant une vue consolidée des applications générées par un ApplicationSet, facilitant ainsi leur gestion et leur surveillance.

### ✨ Fonctionnalités principales

- **Vue consolidée** : Affiche toutes les applications générées par un ApplicationSet dans une vue unifiée
- **Statistiques en temps réel** : Visualisation de l'état de santé global des applications
- **Actions groupées** : Possibilité d'effectuer des actions (sync, refresh) sur toutes les applications d'un ApplicationSet
- **Filtres avancés** : Filtrage des applications par statut, cluster, namespace, etc.
- **Détection des dérives** : Identification rapide des applications qui ont dérivé de leur configuration cible

## 🔧 Technologies

- **TypeScript** avec mode strict activé
- **React 18** pour l'interface utilisateur
- **Module ESM** pour une meilleure compatibilité
- **Jest** pour les tests unitaires
- **Rollup** pour le bundling
- **Méthode d'installation moderne** via argocd-extension-installer

## 📥 Installation

L'extension s'installe en utilisant l'approche moderne d'init-container recommandée pour ArgoCD.

### Pré-requis

- ArgoCD v2.7 ou supérieur
- Kubernetes v1.22 ou supérieur
- Helm v3 (si installation via Helm)

### Installation via Helm

```bash
helm repo add modern-argocd-extensions https://my-chart-repo.example.com
helm install argocd-appset-extension modern-argocd-extensions/modern-argocd-appset-extension -n argocd
```

### Installation manuelle

1. Appliquez le manifeste d'extension :

```bash
kubectl apply -f https://raw.githubusercontent.com/your-username/modern-argocd-appset-extension/main/manifests/install.yaml -n argocd
```

2. Mettez à jour le déploiement argocd-server pour inclure l'init-container :

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: argocd-server
spec:
  template:
    spec:
      initContainers:
      - name: appset-extension
        image: ghcr.io/your-username/argocd-appset-extension-installer:latest
        env:
        - name: EXTENSION_URL
          value: "https://github.com/your-username/modern-argocd-appset-extension/releases/download/v1.0.0/extension.tar"
        volumeMounts:
        - name: extensions
          mountPath: /tmp/extensions/
        securityContext:
          runAsUser: 1000
          allowPrivilegeEscalation: false
      containers:
      - name: argocd-server
        volumeMounts:
        - name: extensions
          mountPath: /tmp/extensions/
      volumes:
      - name: extensions
        emptyDir: {}
```

3. Redémarrez le déploiement argocd-server :

```bash
kubectl rollout restart deployment argocd-server -n argocd
```

## 🖥️ Utilisation

Une fois installée, l'extension ajoute un nouvel onglet "ApplicationSets" dans l'interface utilisateur d'ArgoCD. Vous pouvez :

1. Visualiser tous les ApplicationSets dans un tableau récapitulatif
2. Cliquer sur un ApplicationSet pour voir toutes les applications générées
3. Effectuer des actions groupées sur les applications
4. Filtrer les applications selon différents critères
5. Surveiller l'état de santé global des applications

## 🛠️ Développement

### Configuration de l'environnement

```bash
# Cloner le dépôt
git clone https://github.com/your-username/modern-argocd-appset-extension.git
cd modern-argocd-appset-extension

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

### Structure du projet

```
modern-argocd-appset-extension/
├── src/                      # Code source
│   ├── components/           # Composants React
│   ├── hooks/                # Hooks personnalisés
│   ├── services/             # Services et API
│   ├── types/                # Définitions TypeScript
│   ├── utils/                # Utilitaires
│   └── index.tsx             # Point d'entrée
├── tests/                    # Tests
├── manifests/                # Manifestes Kubernetes
├── docs/                     # Documentation
├── rollup.config.js          # Configuration Rollup
├── tsconfig.json             # Configuration TypeScript
└── package.json              # Dépendances et scripts
```

### Construire l'extension

```bash
npm run build
```

Cela générera un fichier `extension.js` dans le dossier `dist/`.

## 🧪 Tests

```bash
# Exécuter les tests unitaires
npm test

# Vérifier la couverture des tests
npm run test:coverage
```

## 📝 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🤝 Contribution

Les contributions sont les bienvenues ! Veuillez consulter [CONTRIBUTING.md](CONTRIBUTING.md) pour les directives.

## 🙏 Remerciements

- [ArgoCD](https://argoproj.github.io/cd/) pour leur excellent outil GitOps
- [speedfl](https://github.com/speedfl) pour l'idée originale de l'extension ApplicationSet

---

⚠️ **Note :** Ce projet est en développement actif. Veuillez signaler tout problème ou suggestion dans les issues GitHub.