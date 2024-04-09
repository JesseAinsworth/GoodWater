const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");
const {
  setupMQTT,
  addSocketClient,
  removeSocketClient,
} = require("./mqtt/mqttClient");
const winston = require("winston");
const usuarioRoutes = require("./routes/usuarioRoutes");
const sensorRoutes = require("./routes/sensorRoutes");


const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

// Configuración de Winston para el registro
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

app.use(bodyParser.json());
app.use(cors());

// Rutas
app.get("/sensores/ph", (req, res) => {
  res.json({ datosPh: getDatosPh() });
});

app.get("/sensores/turbidity", (req, res) => {
  res.json({ datosTurbidity: getDatosTurbidity() });
});

app.use("/usuario", usuarioRoutes);
app.use("/sensor", sensorRoutes);

app.get("/test", async (req, res) => {
  try {
    await connectToDatabase();
    res.send("Conexión exitosa a la base de datos MongoDB.");
  } catch (error) {
    logger.error(`Error al probar la conexión a la base de datos: ${error}`);
    res.status(500).send("Error al probar la conexión a la base de datos.");
  }
});

app.get("/", (req, res) => {
  res.send("Bienvenido a TurbiTracker API");
});

// WebSocket
io.on("connection", (socket) => {
  console.log("Cliente conectado al WebSocket");
  addSocketClient(socket);

  socket.on("disconnect", () => {
    console.log("Cliente desconectado del WebSocket");
    removeSocketClient(socket);
  });
});

// Configura MQTT
setupMQTT(io);

// Manejador de errores global
app.use((err, req, res, next) => {
  logger.error(`Error en la aplicación: ${err.stack}`);
  res.status(500).send("Algo salió mal en el servidor.");
});

server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
