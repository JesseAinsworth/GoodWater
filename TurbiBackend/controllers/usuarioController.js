const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
require("dotenv").config();
const MongoClient = require('mongodb').MongoClient;

// Función para conectar a la base de datos
async function conectarDB() {
  const uri = process.env.MONGODB_URI; // URI de conexión a la base de datos obtenida del archivo .env
  const cliente = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await cliente.connect();
    console.log('Conexión a la base de datos establecida');
    return cliente.db('turbitracker').collection('usuarios'); // Retorna la colección 'usuarios'
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
}

// Controlador para registrar un nuevo usuario
exports.registrarUsuario = async (req, res) => {
  try {
    const usuariosCollection = await conectarDB();
    
    // Verificar si el usuario ya existe
    const usuarioExistente = await usuariosCollection.findOne({ correoElectronico: req.body.correoElectronico });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El usuario ya existe' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(req.body.contraseña, 10);

    // Crear un nuevo usuario
    const nuevoUsuario = {
      correoElectronico: req.body.correoElectronico,
      contraseña: hashedPassword,
      rol: req.body.rol || 'basico' // Rol por defecto: basico
    };

    await usuariosCollection.insertOne(nuevoUsuario);
    res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al registrar usuario' });
  }
};

// Controlador para iniciar sesión
exports.iniciarSesion = async (req, res) => {
  try {
    const usuariosCollection = await conectarDB();
    
    // Verificar si el usuario existe
    const usuario = await usuariosCollection.findOne({ correoElectronico: req.body.correoElectronico });
    if (!usuario) {
      return res.status(400).json({ mensaje: 'Credenciales inválidas' });
    }

    // Verificar la contraseña
    const contraseñaValida = await bcrypt.compare(req.body.contraseña, usuario.contraseña);
    if (!contraseñaValida) {
      return res.status(400).json({ mensaje: 'Credenciales inválidas' });
    }

    // Generar token de autenticación
    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al iniciar sesión' });
  }
};

// Función para recuperar contraseña
exports.recuperarContraseña = async (req, res) => {
  const { correo } = req.body;

  try {
    // Verificar si el usuario con el correo proporcionado existe en la base de datos
    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      return res.status(404).json({ mensaje: 'El correo proporcionado no está registrado.' });
    }

    // Aquí puedes implementar la lógica para generar y enviar un correo electrónico con un enlace temporal para restablecer la contraseña

    return res.status(200).json({ mensaje: 'Se ha enviado un correo electrónico con instrucciones para restablecer la contraseña.' });
  } catch (error) {
    console.error('Error al intentar recuperar la contraseña:', error);
    return res.status(500).json({ mensaje: 'Hubo un error al intentar recuperar la contraseña. Por favor, inténtalo de nuevo más tarde.' });
  }
};

// Controlador para eliminar un usuario
exports.eliminarUsuario = async (req, res) => {
  try {
    const usuariosCollection = await conectarDB();
    
    // Buscar al usuario por su ID y eliminarlo
    const resultado = await usuariosCollection.deleteOne({ _id: req.params.id });
    
    if (resultado.deletedCount === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.status(200).json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar usuario' });
  }
};
  

// Controlador para obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuariosCollection = await conectarDB();
    const usuarios = await usuariosCollection.find().toArray();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener usuarios' });
  }
};

// Controlador para obtener un usuario por su ID
exports.obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuariosCollection = await conectarDB();
    const usuario = await usuariosCollection.findOne({ _id: req.params.id });
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.status(200).json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener usuario por ID' });
  }
};

// Controlador para actualizar información de un usuario
exports.actualizarUsuario = async (req, res) => {
  try {
    const usuariosCollection = await conectarDB();
    const { correoElectronico, rol } = req.body; // Se pueden actualizar estos campos, agregar más según sea necesario

    const resultado = await usuariosCollection.updateOne(
      { _id: req.params.id },
      { $set: { correoElectronico, rol } }
    );

    if (resultado.modifiedCount === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.status(200).json({ mensaje: 'Usuario actualizado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar usuario' });
  }
};
 