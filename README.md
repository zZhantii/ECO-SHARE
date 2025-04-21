# Requisitos
Se recomienda usar Laragon

- ✅ PHP 8.2 o mayor (php -v)
- ✅ Composer (composer -v)
- ✅ Node JS (node -v)



# Características

Ejemplo proyecto Laravel 10 + vue3 PAra DAW

- ✅ Laravel 10
- ✅ Vue 3
- ✅ VueRouter + Pinia
- ✅ PrimeVue
- ✅ Vue i18n Multi Idioma
- ✅ Iniciar sesión
- ✅ Restablecimiento de contraseña
- ✅ Login
- ✅ Panel de administración
- ✅ Gestión de perfiles
- ✅ Gestión de usuarios
- ✅ Gestión de roles
- ✅ Gestión de permisos (Spatie)
- ✅ Cambio de contraseña
- ✅ Verificación de correo electrónico
- ✅ Gestión de Posts
- ✅ Blog de Frontend
- ✅ Boostrap 5


## Como usar


### Clonar Repositorio 

```bash
git clone ....
```

### Instalar vía Composer

Entrar a la carpeta del repositorio
```bash
composer install
```

### Copiar el fichero .env.example  a .env edita las credenciales de la base de datos y la url


### Generar Application Key

```bash
php artisan key:generate
```

### Migrar base de datos

```bash
php artisan migrate
```
### Crear enlace simbólico para la gestión de imágenes

```bash
php artisan storage:link
```

### Lanzar Seeders

```bash
php artisan db:seed
```

### Instalar las dependencias de Node

```bash
npm install
```
### Instalar depdendencias para los mapas de Google

```bash
npm install @fawmi/vue-google-maps

npm run dev
```

### Lanzar servidor

```bash
php artisan serve
```

### Se debe incorporar en .env la clave API de Google para el uso de los maps

```bash
VITE_GOOGLE_MAPS_API_KEY="YOUR-API-KEY"
```
### Lanzar a producción

```bash
npm run build or yarn build
```
