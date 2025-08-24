import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { dataHandler } from "./room/dataHandler";
// ...existing imports...
import { addStreamEndpoint } from "./room/dataHandler";
// ...app.listen...
const app = express();
addStreamEndpoint(app);
app.use(cors);
const port = 8080;
const server = http.createServer(app);


const io=new Server(server, {
    cors: { origin: "*" }
});

io.on("connection", (socket) => {
    console.log("a user connected");
     dataHandler(socket);

});


io.of("/stream").on("connection", (socket) => {

        console.log("a user connected to stream namespace");

        dataHandler(socket);

});




server.listen(port, () => {
    console.log(`listening on *:${port}`);
});
