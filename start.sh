#!/usr/bin/env bash
set -e

echo "🚀 Iniciando deploy en Railway..."

# 1. Instalar dependencias PHP (si aún no está cacheado en build)
echo "📦 Instalando dependencias PHP..."
composer install --no-dev --optimize-autoloader

# 2. Ejecutar migraciones
echo "📄 Ejecutando migraciones..."
php artisan migrate --force

# 3. Ejecutar seeders (ignora error si ya existen)
echo "🌱 Lanzando seeders..."
php artisan db:seed --force || echo "✋ Seeders ya aplicados, continuo..."

# 4. Enlace simbólico para /storage
echo "🔗 Creando enlace simbólico de storage..."
php artisan storage:link

# 5. Arrancar el servidor en el puerto que asigna Railway
echo "🌐 Levantando servidor Laravel en puerto ${PORT}..."
php artisan serve --host=0.0.0.0 --port="${PORT}"
