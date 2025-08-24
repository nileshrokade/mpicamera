import { Socket } from "socket.io";
import fs from "fs";
import path from "path";
import { Express } from "express";

export const dataHandler = (socket: Socket) => {
    console.log("roomHandler initialized");

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
    socket.on("join-room", () => {
        console.log("join-room event received");
    });
    socket.on("create-room", () => {
        console.log("create-room event received");
    });

    socket.on('stream', (data) => {
        console.log("stream event received " +data.length);

        // Save data to a file
        const filePath = path.join(__dirname, '../../data/data.txt');
        fs.appendFile(filePath, data + "\n", (err) => {
            if (err) {
                console.error("Error saving stream data:", err);
            }
        });

        socket.broadcast.emit('stream', data);
    });

}

export const addStreamEndpoint = (app: Express) => {
  app.get("/api/stream", (req, res) => {


    console.log("GET /api/stream called " + req.method);

    res.writeHead(200, {
      "Cache-Control": "no-cache",
      "Connection": "close",
      "Content-Type": "multipart/x-mixed-replace; boundary=frame",
    });

    const filePath = path.join(__dirname, "../../data/data.txt");
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end("Error reading stream data");
        return;
      }

      const frames = data.split("\n").filter(Boolean);

      let i = 0;
      const interval = setInterval(() => {
        const frame = frames[i];
        if (!frame) {
          clearInterval(interval);
          return res.end();
        }

        // Convert data URL → raw base64 → Buffer
        const base64 = frame.replace(/^data:image\/\w+;base64,/, "");
        const img = Buffer.from(base64, "base64");

        res.write(`--frame\r\n`);
        res.write("Content-Type: image/jpeg\r\n\r\n");
        res.write(img);
        res.write("\r\n");

        i = (i + 1) % frames.length; // loop playback
      }, 100); // ~10 fps
    });
  });
};