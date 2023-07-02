const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;


// Need this because socket server can be directly linked to socketv servers


const http = require('http');
const httpServer = http.createServer(app); // App is used to create the httpServer
const { Server } = require("socket.io"); // Import server from socke.io
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // CLient side
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
}); // Link the socket server to our http server // Socket server

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + '/index.html'); // make backend tunnel
// });

const sockets_bioler_plate = (socket) => {
    
  socket.on('send-message', ({message, roomID}) => {
    console.log("Typing started")
    socket.broadcast.to(roomID).emit('message-from-server', message);
  });

  socket.on('start-typing', ({roomID}) => {
    let logMessage = "Typing began: " + roomID;
    console.log(logMessage);
    socket.broadcast.to(roomID).emit('typing-started-from-server', logMessage);
  });

  socket.on('end-typing', ({roomID}) => {
    let logMessage = "Typing stopped: " + roomID;
    socket.broadcast.to(roomID).emit('typing-ended-from-server', logMessage);
  });

  socket.on("join-room", ({roomID}) => {
    socket.join(roomID);
  });

  socket.on("disconnect", (socket) => {
    console.log("User left");
  });
}

io.on("connection", sockets_bioler_plate);






app.use(cors());
app.use(express.json());

const dbUri = process.env.ATLAS_URI;
mongoose.connect(dbUri);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection established");
});

// //define routers
const emailAuthRouter = require("./routes/emailAuth.routes");
const userDetailsRouter = require("./routes/userDetails.routes");
const loginRouter = require("./routes/login.routes");
const usersRouter = require("./routes/users");
const interestRouter = require("./routes/interests");
const userEventsRouter = require("./routes/userEvents");
const chatRouter = require("./routes/room.chat.routes");
app.use("/api", chatRouter);
// //connect routers
app.use("/email-auth", emailAuthRouter);
app.use("/user-details", userDetailsRouter);
app.use("/api", interestRouter);
app.use("/login", loginRouter);
app.use("/api", usersRouter);
app.use("/api", userEventsRouter);
// /* 
//     - If more API_End_Point files (routes) have been added in the routes folder, only need to make changes in this section
//     - Currently, routers for only two routes have been set up
//     - In the routers below, need to give path to the js file containing the routes/API_End_Points
// */

// //
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

httpServer.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
