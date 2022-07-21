npm init -y : crear archivo package.json
npm i express: instalar express
npm i typescript -d: instalar typescript
npx tsc --init: crear tsconfig.json para decirle al compilador como queremos ejecutar el código


Buscamos en tsconfig.json los valores outDir y rootDir, los descomentamos y colocamos un nombre a outDir
Ejemplo: "outDir": "./nombre",
Especificar en rootDir: ./src

luego ingresar el siguiente comando:

npx tsc: se crea la carpeta especificada en outDir previamente.

npm install ts-node-dev -d: para no repetir el npx tsc cada vez que modificamos el index.ts (-d es como desarrollador)

En package.json eliminamos el script test y creamos el dev:
 "scripts": {
    "dev": "ts-node-dev src --respawn src/index.ts"
  },

npm i express morgan cors

Para que express, morgan y cors puedan aceptar typescript:
npm i @types/express -d
npm i @types/morgan -d
npm i @types/cors @types/jsonwebtoken @types/bcryptjs -d

*INSTALAR PRISMA:

npm i prisma -D
npx prisma init

*INSTALAR TYPEORM: seguir la documentación, ya que la instalación puede variar.

npm install typeorm --save
npm install reflect-metadata --save
npm install @types/node --save-dev : autocompletado de node y objetos globales
npm install pg --save: modulo de conexión a la db postgreSQL

Ingresar el siguiente script al package.json para ejecutar tsc
  "build": "tsc"
  "start": "node dist/index.js"

Descomentar en tsconfig:
  "strictPropertyInitialization": false,             /* Check for class properties that are declared but not set in the constructor. */

  "experimentalDecorators": true,                   /* Enable experimental support for TC39 stage 2 draft decorators. */
  "emitDecoratorMetadata": true,


npm run dev: para correr la aplicación como desarrollador

