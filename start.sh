#!/bin/bash
set -e

echo "🚀 Iniciando despliegue..."

# 1. Instalar dependencias PHP
echo "📦 Instalando dependencias PHP..."
composer install --no-dev --optimize-autoloader

# 2. Instalar y compilar assets con Vite
echo "🧱 Instalando y compilando assets Frontend..."
npm install
npm run build

# 3. Ejecutar migraciones
echo "📄 Ejecutando migraciones..."
php artisan migrate --force

# 4. Ejecutar seeders (ignora errores de duplicados)
echo "🌱 Lanzando seeders..."
php artisan db:seed --force || echo "✋ Seeders ya aplicados, continúo..."

# 5. Crear enlace simbólico para storage
echo "🔗 Creando enlace simbólico para storage..."
php artisan storage:link

# 6. Iniciar servidor en el puerto que asigna Railway
echo "🌐 Iniciando servidor Laravel en el puerto $PORT..."
php artisan serve --host=0.0.0.0 --port="$PORT"
