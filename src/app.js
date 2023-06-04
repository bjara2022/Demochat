import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import viewsRouter from "./routers/views.router.js"
const app = express ()
const messages = [];

app.use(express.json())
app.use(express.urlencoded({extended: true}));

// set handlebars

app.engine("handlebars", handlebars.engine());
app.set("views", "views/");
app.set("view engine", "handlebars");

// set carpeta estatica
app.use(express.static("public"));

// Iporto rutas

app.use("/", viewsRouter);

// inicializo servidor 

const webServer = app.listen (8080, () =>{
    console.log ("Escuchando puerto 8080");
})

// Inicializo web Socket io

const io = new Server(webServer); 

// Eventos de socket.io
io.on('connection', (socket) => {
	// Envio los mensajes al cliente que se conectó
	socket.emit('messages', messages);

	// Escucho los mensajes enviado por el cliente y se los propago a todos
	socket.on('message', (message) => {
		console.log(message);
		// Agrego el mensaje al array de mensajes
		messages.push(message);
		// Propago el evento a todos los clientes conectados
		io.emit('messages', messages);
	});

	socket.on('sayhello', (data) => {
		socket.broadcast.emit('connected', data);
	});
});