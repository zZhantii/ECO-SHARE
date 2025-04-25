#!/usr/bin/env bash
set -e

echo "🚀 Iniciando deploy en Railway..."

echo "📦 Instalando dependencias PHP..."
composer install --no-dev --optimize-autoloader

echo "📄 Ejecutando migraciones..."
php artisan migrate --force

echo "🌱 Lanzando seeders..."
php artisan db:seed --force || echo "✋ Seeders ya aplicados, continúo..."

echo "🔗 Creando enlace simbólico de storage..."
php artisan storage:link

php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan config:cache

echo "🌐 Levantando servidor Laravel en puerto ${PORT}..."
php artisan serve --host=0.0.0.0 --port="${PORT}"
