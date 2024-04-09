const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  ubicacion: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    required: true
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario'
  }
});

const Sensor = mongoose.model('Sensor', sensorSchema);

module.exports = Sensor;
