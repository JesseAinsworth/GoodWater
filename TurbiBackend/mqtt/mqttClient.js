// mqttConfig.js
const mqtt = require('mqtt');
require("dotenv").config();

const username = process.env.MQTT_USERNAME;
const password = process.env.MQTT_PASSWORD;

const client = mqtt.connect({
    hostname: process.env.MQTT_HOST,
    port: process.env.MQTT_PORT,
    protocol: 'mqtts',
    username: username,
    password: password
});

let datosPh = null;
let datosTurbidity = null;

const socketClients = []; // Array para almacenar los clientes WebSocket conectados

function setupMQTT(io) {
    client.on('connect', function () {
        console.log('Conexión establecida con HiveMQ');
        client.subscribe("sensores/ph", { qos: 0 }, function (err) {
            if (!err) {
                console.log('Suscripción exitosa al tema sensores/ph');
            } else {
                console.error('Error al suscribirse a sensores/ph:', err);
            }
        });
        
        client.subscribe("sensores/turbidity", { qos: 0 }, function (err) {
            if (!err) {
                console.log('Suscripción exitosa al tema sensores/turbidity');
            } else {
                console.error('Error al suscribirse a sensores/turbidity:', err);
            }
        });
    });

    client.on('message', function (topic, message) {
        console.log(`Mensaje recibido en ${topic}: ${message.toString()}`);
        if (topic === "sensores/ph") {
            datosPh = message.toString();
            sendPhDataToClients();
        } else if (topic === "sensores/turbidity") {
            datosTurbidity = message.toString();
            sendTurbidityDataToClients();
        }
    });

    client.on('error', function (err) {
        console.error('Error en cliente MQTT:', err);
    });

    client.on('close', function () {
        console.log('Conexión MQTT cerrada');
    });
}

function sendPhDataToClients() {
    socketClients.forEach(client => {
        client.emit('datosPh', datosPh); // Emitir evento 'datosPh' con los datos del pH
    });
}

function sendTurbidityDataToClients() {
    socketClients.forEach(client => {
        client.emit('datosTurbidity', datosTurbidity); // Emitir evento 'datosTurbidity' con los datos de turbidez
    });
}



function addSocketClient(socket) {
    socketClients.push(socket);
}

function removeSocketClient(socket) {
    const index = socketClients.indexOf(socket);
    if (index !== -1) {
        socketClients.splice(index, 1);
    }
}

module.exports = { setupMQTT, addSocketClient, removeSocketClient };
