# Utilisez l'image Node.js 16
FROM node:16

# Répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copiez le package.json et le package-lock.json dans le conteneur
COPY package*.json ./

# Installez les dépendances npm
RUN npm install

# Copiez le reste des fichiers dans le conteneur
COPY . .

# Commande par défaut pour exécuter l'application ReactJS
CMD ["npm", "start"]
