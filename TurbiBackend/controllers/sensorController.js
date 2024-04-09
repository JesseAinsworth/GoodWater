const Sensor = require('../models/Sensor');
const MongoClient = require('mongodb').MongoClient;
require("dotenv").config();

// Función para conectar a la base de datos
async function conectarDB() {
  const uri = process.env.MONGODB_URI;
  const cliente = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await cliente.connect();
    console.log('Conexión a la base de datos establecida');
    return cliente.db('turbitracker').collection('sensores'); // Retorna la colección 'sensores'
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
}

// Controlador para obtener todos los sensores
exports.obtenerSensores = async (req, res) => {
  try {
    const sensoresCollection = await conectarDB();
    const sensores = await sensoresCollection.find().toArray();
    res.status(200).json(sensores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener los sensores' });
  }
};

// Controlador para crear un nuevo sensor
exports.crearSensor = async (req, res) => {
  try {
    const sensoresCollection = await conectarDB();
    const nuevoSensor = await sensoresCollection.insertOne(req.body);
    res.status(201).json({ mensaje: 'Sensor creado exitosamente', sensor: nuevoSensor.ops[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear el sensor' });
  }
};

// Controlador para obtener un sensor por su ID
exports.obtenerSensorPorId = async (req, res) => {
  try {
    const sensoresCollection = await conectarDB();
    const sensor = await sensoresCollection.findOne({ _id: req.params.id });
    if (!sensor) {
      return res.status(404).json({ mensaje: 'Sensor no encontrado' });
    }
    res.status(200).json(sensor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener el sensor' });
  }
};

// Controlador para actualizar un sensor
exports.actualizarSensor = async (req, res) => {
  try {
    const sensoresCollection = await conectarDB();
    const sensor = await sensoresCollection.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { returnOriginal: false }
    );
    if (!sensor.value) {
      return res.status(404).json({ mensaje: 'Sensor no encontrado' });
    }
    res.status(200).json({ mensaje: 'Sensor actualizado exitosamente', sensor: sensor.value });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar el sensor' });
  }
};

// Controlador para eliminar un sensor
exports.eliminarSensor = async (req, res) => {
  try {
    const sensoresCollection = await conectarDB();
    const resultado = await sensoresCollection.deleteOne({ _id: req.params.id });
    if (resultado.deletedCount === 0) {
      return res.status(404).json({ mensaje: 'Sensor no encontrado' });
    }
    res.status(200).json({ mensaje: 'Sensor eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar el sensor' });
  }
};
