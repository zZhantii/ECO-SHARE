#!/bin/bash

echo "🚀 Iniciando despliegue..."

# Instalar dependencias de PHP
echo "📦 Instalando dependencias PHP..."
composer install --no-dev --optimize-autoloader

# Instalar dependencias de Node y compilar assets
echo "🧱 Compilando frontend con Vite..."
npm install && npm run build

# Generar clave de aplicación si no existe
if [ ! -f ".env" ]; then
  echo "🛠️  Generando archivo .env desde .env.example..."
  cp .env.example .env
fi

if ! grep -q "APP_KEY=base64" .env; then
  echo "🔑 Generando clave de aplicación..."
  php artisan key:generate
fi

# Ejecutar migraciones y seeders en producción
echo "🗃️ Ejecutando migraciones y seeders..."
php artisan migrate --force --seed

# Iniciar el servidor
echo "🌐 Iniciando servidor Laravel en el puerto $PORT..."
php artisan serve --host=0.0.0.0 --port=$PORT
