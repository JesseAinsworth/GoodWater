

const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorController');

// Rutas para la gestión de sensores
router.get('/', sensorController.obtenerSensores);
router.post('/', sensorController.crearSensor);
router.get('/:id', sensorController.obtenerSensorPorId);
router.put('/:id', sensorController.actualizarSensor);
router.delete('/:id', sensorController.eliminarSensor);

module.exports = router;
