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
