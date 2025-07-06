# frontend/Dockerfile
FROM node:20

WORKDIR /app

# Copie uniquement les fichiers nécessaires pour installer les deps
COPY package*.json ./

RUN npm install

# Ajoute les dépendances si tu utilises React Router ou MUI
# RUN npm install react-router-dom @mui/material

# Le code sera monté en volume : pas besoin de copier ici

EXPOSE 3000

CMD ["npm", "start"]
