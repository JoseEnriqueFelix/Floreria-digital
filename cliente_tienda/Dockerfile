#Descarga la imagen de node
FROM node:22.14.0 AS build
#Crea un directorio de trabajo
WORKDIR /app
#Copia el package.json y package-lock.json
COPY package.json ./
COPY package-lock.json ./
#Instala las dependencias
RUN npm install
#Copia el resto de los archivos
COPY . .
#crea el directorio de salida de nuestro proyecto
RUN npm run build

#Descarga la imagen de nginx que es un servidor web
FROM nginx:1.25.2
COPY --from=build /app/dist /usr/share/nginx/html
# Copiar configuración personalizada de nginx para SPA (fallback a index.html)
COPY nginx.conf /etc/nginx/conf.d/default.conf
#Expone el puerto 80
EXPOSE 80
#Ejecuta el servidor nginx
CMD ["nginx", "-g", "daemon off;"]