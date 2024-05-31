# Base image olarak Node.js resmi imajını kullan
FROM node:20

# Çalışma dizinini oluştur
WORKDIR /app

# Puppeteer ve gerekli bağımlılıkları yükle

# package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install && npx puppeteer browsers install chrome && apt update -y && apt install -y libnss3-dev libgdk-pixbuf2.0-dev libgtk-3-dev libxss-dev libasound2

# Uygulama kodunu kopyala
COPY . .

EXPOSE 4607

# Uygulamayı çalıştır
CMD ["npm", "start"]
