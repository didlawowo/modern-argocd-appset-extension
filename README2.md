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
