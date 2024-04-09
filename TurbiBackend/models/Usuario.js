const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  correoElectronico: {
    type: String,
    required: true,
    unique: true
  },
  contraseña: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    enum: ['administrador', 'basico'],
    default: 'basico'
  }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
