#!/bin/bash
set -e

echo "🚀 Iniciando despliegue..."

# 1. Instalar dependencias PHP
echo "📦 Instalando dependencias PHP..."
composer install --no-dev --optimize-autoloader

# 2. Instalar dependencias de Node
echo "📦 Instalando dependencias de Node..."
npm install

# 3. Aumentar límite de memoria de Node para evitar OOM en build
export NODE_OPTIONS="--max_old_space_size=1024"

# 4. Compilar assets con Vite
echo "🧱 Compilando frontend con Vite (memoria aumentada)..."
npm run build

# 5. Ejecutar migraciones
echo "📄 Ejecutando migraciones..."
php artisan migrate --force

# 6. Lanzar seeders (ignora errores de duplicados)
echo "🌱 Lanzando seeders..."
php artisan db:seed --force || echo "✋ Seeders ya aplicados, continúo..."

# 7. Crear enlace simbólico para storage
echo "🔗 Creando enlace simbólico para storage..."
php artisan storage:link

# 8. Iniciar servidor en el puerto que asigna Railway
echo "🌐 Iniciando servidor Laravel en el puerto $PORT..."
php artisan serve --host=0.0.0.0 --port="$PORT"
