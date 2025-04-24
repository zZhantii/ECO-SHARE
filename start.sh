#!/bin/bash

echo "🚀 Iniciando despliegue..."

# 1. Instalar dependencias PHP
echo "📦 Instalando dependencias PHP..."
composer install --no-dev --optimize-autoloader

# 2. Instalar y compilar assets con Vite
echo "🧱 Instalando/compilando assets Frontend..."
npm install
npm run build

# 3. Migrar base de datos
echo "📄 Ejecutando migraciones..."
php artisan migrate --force

# 4. (Opcional) Lanzar seeders; ignorar errores de duplicados
echo "🌱 Lanzando seeders..."
php artisan db:seed --force || echo "✋ Algunos seeders ya estaban aplicados, continúo..."

# 5. Crear enlace simbólico para storage
echo "🔗 Creando enlace simbólico a storage..."
php artisan storage:link

# 6. Iniciar servidor en el puerto que asigne Railway
echo "🌐 Iniciando servidor Laravel en el puerto ${PORT:-8080}..."
php artisan serve --host=0.0.0.0 --port=${PORT:-8080}