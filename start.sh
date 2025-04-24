#!/usr/bin/env bash
set -e

echo "🚀 Iniciando deploy en Railway..."

# 1. Instalar dependencias PHP (sólo si no viene cacheado)
echo "📦 Instalando dependencias PHP..."
composer install --no-dev --optimize-autoloader

# 2. Ejecutar migraciones
echo "📄 Ejecutando migraciones..."
php artisan migrate --force

# 3. Ejecutar seeders (ignora errores de existentes)
echo "🌱 Lanzando seeders..."
php artisan db:seed --force || echo "✋ Seeders ya aplicados, continúo..."

# 4. Crear enlace simbólico para /storage
echo "🔗 Creando enlace simbólico de storage..."
php artisan storage:link

# 5. Levantar el servidor en el puerto que asigna Railway
echo "🌐 Levantando servidor Laravel en puerto ${PORT}..."
php artisan serve --host=0.0.0.0 --port="${PORT}"
