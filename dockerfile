# Usar una imagen base de Node.js 18
FROM node:18

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar el archivo package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el esquema de Prisma y generar el cliente
COPY prisma ./prisma
RUN npx prisma generate

# Copiar el resto de los archivos de la aplicación
COPY . .

# Exponer el puerto en el que la aplicación escucha
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "index.js"]