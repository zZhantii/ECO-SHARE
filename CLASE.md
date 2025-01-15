# Clase1: Modeldata

pas1: Generar migració. php artisan make:migration create_notes_table
      Importancia de respectar la convenció i fer les migracions en plural (notes).

pas2: Omplir taula amb valors.

pas3: Migrar taula. php artisan migrate.
      Només migra el que està pendent.
      Comprovar a la BBDD

pas4: Crear model php artisan make:model Note
      Al respectar la convenció de noms laravel ja sap que el model Note es correspon amb la migració create_notes_table

pas5: Especificar els valors de cada camp (guarded, fillable, etc)

pas6: Crear migració i model alhora: php artisan make:model Author --migration

# Clase2: Controladors

pas1: Aprofitarem la migració i model Author.
      Omplim els valors de la migració i el model
      executem php artisan migrate.

pas2: Creem el controlador php artisan make:controller AuthorController
      Nomnclatura. Screaming CamelCase

pas3: Dins AuthorController creem la primera funció index amb un helloworld

pas4: Importem el controlador al dispatcher de rutes web.php

pas5: Establim una ruta get indicant la url ('/') i un array amb el nom del controlador i el nom de la funció que el governa







