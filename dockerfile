# Usa una imagen base de Node.js
FROM node:latest

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia el archivo package.json y el archivo package-lock.json (si existe)
COPY package*.json ./

# Instala todas las dependencias (tanto de producción como de desarrollo)
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Exponer el puerto en el que la aplicación se ejecuta (si es necesario)
# EXPOSE 3000

# Comando por defecto para iniciar el contenedor, pero no inicia la aplicación
CMD [ "tail", "-f", "/dev/null" ]
