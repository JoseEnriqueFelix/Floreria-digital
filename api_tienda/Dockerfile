#Dockerfile
#Descarga la imagen de nodeJS
FROM node:22.14.0
#Establece el directorio de trabajo
WORKDIR /app
#Copia el archivo package.json y package-lock.json
COPY package*.json ./
#Instala las dependencias
RUN npm install
#Copia el resto de la aplicación
COPY . .
#Compilar TypeScript a JavaScript
RUN npm run tsc
#Expone el puerto 3000
EXPOSE 3000
#Ejecuta la aplicación
CMD [ "npm", "run", "start" ]
