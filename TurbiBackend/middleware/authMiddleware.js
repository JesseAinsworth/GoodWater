const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ mensaje: 'No se proporcionó un token. Acceso denegado.' });
  }

  try {
    const decoded = jwt.verify(token, 'secreto'); // La misma clave secreta que se usa para firmar los JWT
    const usuario = await Usuario.findById(decoded.id);

    if (!usuario) {
      return res.status(401).json({ mensaje: 'Token inválido. Usuario no encontrado.' });
    }

    req.usuario = usuario;
    next();
  } catch (err) {
    console.error('Error al verificar el token:', err.message);
    return res.status(401).json({ mensaje: 'Token inválido.' });
  }
};

module.exports = authMiddleware;
