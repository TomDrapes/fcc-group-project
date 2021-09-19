const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json()); // this is needed for fetch calls from app
app.use(express.urlencoded({ extended: true })); // don't know if extended needs to be true

const port = process.env.PORT || 9000;

//Socket.io
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let clients = [];

const handleAnswer = (answer) => {

}
io.on("connection", function (socket) {
  console.log("a user connected");
  socket.on("test", function (msg) {
    console.log("working: ", msg);
    socket.broadcast.emit('click', 'yo')
  });
  socket.on("answer", (answer) => {
    console.log("Player answered correctly: ", answer)
    socket.broadcast.emit("playerGuess", answer ? "This player is smart" : "This player needs to go back to school")
  })
});


app.get("/", (req, res) => {
  res.send("Hello World!");
});

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "../fcc/build")));

  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../fcc/build", "index.html"));
  });
}
http.listen(process.env.PORT || port, () =>
  console.log(`server is running on ${port}`)
);
