## 1. Descargar la imagen de MongoDB

Si aún no has descargado la imagen de MongoDB en tu máquina, sigue estos pasos:

- Abre una terminal de comandos (PowerShell o Command Prompt).
- Ejecuta el siguiente comando para descargar la imagen de MongoDB desde Docker Hub:

```bash
docker pull mongo
```

Este comando descargará la última versión de la imagen de MongoDB disponible en Docker Hub a tu máquina local.

## 2. Configurar y ejecutar un contenedor de MongoDB

Abre una terminal de comandos (PowerShell o Command Prompt) y ejecuta el siguiente comando para descargar la imagen de MongoDB y ejecutar un contenedor llamado mongo_container:

```bash
docker run -d --name mongo_container -p 27017:27017 mongo
```

Este comando hará lo siguiente:

- `-d` ejecuta el contenedor en segundo plano (desatendido).
- `--name mongo_container` asigna el nombre mongo_container al contenedor.
- `-p 27017:27017` mapea el puerto 27017 del contenedor al puerto 27017 de tu máquina host.
- `mongo` es el nombre de la imagen que Docker descargará desde Docker Hub.

Verifica que el contenedor esté funcionando correctamente con el siguiente comando:

```bash
docker ps
```

Deberías ver una lista de contenedores en ejecución, incluido mongo_container.

## 3. Preparar el archivo JSON para importación

Guarda el contenido del JSON en un archivo llamado `Student.json` en tu sistema de archivos.

## 4. Importar el archivo JSON a MongoDB

Primero, asegúrate de tener `mongoimport` disponible. Si tienes Docker, puedes usarlo sin necesidad de instalar MongoDB localmente.

Usa el siguiente comando para copiar el archivo `Student.json` al contenedor de MongoDB:

```bash
docker cp path/to/Student.json mongo_container:/Student.json
```

Asegúrate de reemplazar `path/to/Student.json` con la ruta real donde guardaste el archivo.

Luego, ingresa al contenedor de MongoDB para ejecutar el comando `mongoimport`:

```bash
docker exec -it mongo_container bash
```

Una vez dentro del contenedor, ejecuta el siguiente comando para importar el archivo JSON:

```bash
mongoimport --db test --collection students --file /Student.json
```

Este comando importará el archivo JSON en la base de datos `test` y la colección `students`.

Sal del contenedor escribiendo `exit`.

## 5. Prueba del funcionamiento de MongoDB con JavaScript

Una vez que hayas importado exitosamente el archivo JSON a MongoDB, puedes probar la conexión y realizar consultas utilizando JavaScript. Aquí hay un ejemplo básico para comenzar:

1. **Instalación de MongoDB Node.js Driver**:

   Asegúrate de tener instalado el controlador de MongoDB para Node.js en tu proyecto. Puedes instalarlo usando npm:

   ```bash
   npm install mongodb
   ```

2. **Crear un archivo JavaScript**:

   Crea un nuevo archivo JavaScript, por ejemplo, `checkMongoDB.js`, y escribe el siguiente código:

   ```javascript
   const { MongoClient } = require('mongodb');

    // URL de conexión a la base de datos MongoDB
    const uri = 'mongodb://localhost:27017';

    // Nombre de la base de datos y colección
    const dbName = 'test';
    const collectionName = 'students';

    // Función para conectar a la base de datos y mostrar la información de los documentos
    async function showMongoDBData() {
    // Conectarse al cliente de MongoDB
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        // Conectar al servidor MongoDB
        await client.connect();

        // Seleccionar la base de datos
        const database = client.db(dbName);

        // Seleccionar la colección
        const collection = database.collection(collectionName);

        // Realizar una consulta para obtener todos los documentos en la colección
        const documents = await collection.find({}).toArray();
        
        // Mostrar la información de los documentos
        console.log(`Información de los documentos en la colección "${collectionName}":`);
        documents.forEach((doc, index) => {
        console.log(`Documento ${index + 1}:`);
        console.log(doc);
        });

        // Cerrar la conexión
        await client.close();
    } catch (error) {
        console.error('Error:', error);
    }
    }

    // Llamar a la función para mostrar la información de los documentos en MongoDB
    showMongoDBData();

   ```

3. **Ejecutar el script**:

   Ejecuta el script desde la línea de comandos utilizando Node.js:

   ```bash
   node checkMongoDB.js
   ```

   Esto conectará tu script a la base de datos MongoDB y mostrará los documentos encontrados en la consola ademas de un listado de la informacion presente.
