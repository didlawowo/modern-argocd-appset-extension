FROM node:22-alpine as builder

# Définition du répertoire de travail
WORKDIR /app

# Copie des fichiers de dépendances
COPY package*.json ./

# Installation des dépendances
RUN npm ci

# Copie des sources
COPY . .

# Construction de l'extension
RUN npm run build

# Image finale légère
FROM nginx:alpine

# Copie des fichiers de build
COPY --from=builder /app/dist /usr/share/nginx/html/extensions/modern-argocd-appset-extension

# Copie de la configuration nginx (si nécessaire)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposition du port
EXPOSE 80

# Commande par défaut
CMD ["nginx", "-g", "daemon off;"]
