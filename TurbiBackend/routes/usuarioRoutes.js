const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");

// Ruta para registrar un nuevo usuario
router.post("/register", usuarioController.registrarUsuario);

// Ruta para iniciar sesión
router.post("/login", usuarioController.iniciarSesion);

// Ruta para recuperar contraseña
router.post("/recuperar-contraseña", usuarioController.recuperarContraseña);

router.delete("/data/:id", usuarioController.eliminarUsuario); // Endpoint para eliminar usuario
router.get("/all", usuarioController.obtenerUsuarios); // Endpoint para obtener todos los usuarios
router.get("/data/:id", usuarioController.obtenerUsuarioPorId); // Endpoint para obtener un usuario por su ID
router.put("/data/:id",usuarioController.actualizarUsuario); // Endpoint para actualizar un usuario

module.exports = router;
