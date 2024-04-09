const { MongoClient, ServerApiVersion } = require("mongodb");

// Obtener la URL de conexión desde la variable de entorno
const uri = process.env.MONGODB_URI;

// Crear un MongoClient con un objeto MongoClientOptions para establecer la versión de la API estable
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Conectar a la base de datos una vez al inicio del servidor
async function connectToDatabase() {
  try {
    await client.connect();
    console.log("¡Conexión a MongoDB establecida!");
  } catch (err) {
    console.error("Error al conectar a MongoDB:", err);
  }
}

// Middleware para conectar la base de datos antes de manejar las solicitudes
async function databaseMiddleware(req, res, next) {
  if (!client.topology || !client.topology.isConnected()) {
    await connectToDatabase();
  }
  next();
}

module.exports = { client, databaseMiddleware };
