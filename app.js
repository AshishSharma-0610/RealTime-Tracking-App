const express = require("express");
const app = express();

const http = require("http");
const path = require("path");

const PORT = process.env.PORT || 3000;

const socketio = require("socket.io")
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function (socket) {
    socket.on("send-location", function (data) {
        io.emit("receive-location", { id: socket.id, ...data });
    });
    console.log("connected");
    socket.on("disconnect", function () {
        io.emit("user-diconnected", socket.id);
    });
})

app.get("/", function (req, res) {
    res.render("index");
})

server.listen(PORT); 
