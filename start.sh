#!/bin/bash

echo "🚀 Iniciando despliegue..."

# Entrar a la carpeta del proyecto (si estás fuera)
# cd /path/to/your/project

# 1. Instalar dependencias de PHP
echo "📦 Instalando dependencias PHP con Composer..."
composer install --no-dev --optimize-autoloader

# 2. Crear archivo .env si no existe
if [ ! -f ".env" ]; then
  echo "🛠️  Copiando .env.example a .env..."
  cp .env.example .env
fi

# 3. Reemplazar la clave de Google Maps si tienes la variable
if [ ! -z "$VITE_GOOGLE_MAPS_API_KEY" ]; then
  echo "🗺️  Estableciendo clave de Google Maps en .env..."
  sed -i "s|^VITE_GOOGLE_MAPS_API_KEY=.*|VITE_GOOGLE_MAPS_API_KEY=${VITE_GOOGLE_MAPS_API_KEY}|" .env || echo "VITE_GOOGLE_MAPS_API_KEY=${VITE_GOOGLE_MAPS_API_KEY}" >> .env
fi

# 4. Generar clave de aplicación si no existe
if ! grep -q "^APP_KEY=base64" .env; then
  echo "🔑 Generando clave de aplicación..."
  php artisan key:generate --ansi
fi

# 5. Migrar la base de datos
echo "📄 Ejecutando migraciones..."
php artisan migrate --force

# 6. Lanzar seeders
echo "🌱 Lanzando seeders..."
php artisan db:seed --force

# 7. Crear enlace simbólico a /storage
echo "🔗 Creando enlace simbólico a storage..."
php artisan storage:link

# 8. Instalar dependencias de Node
echo "📦 Instalando dependencias de Node.js..."
npm install

# 9. Instalar plugin de Google Maps
echo "🗺️ Instalando plugin de Google Maps para Vue..."
npm install @fawmi/vue-google-maps

# 10. Compilar assets para producción
echo "🧱 Compilando frontend con Vite..."
npm run build

# 11. Iniciar servidor Laravel
echo "🌐 Iniciando servidor Laravel en el puerto ${PORT:-8080}..."
php artisan serve --host=0.0.0.0 --port=${PORT:-8080}
