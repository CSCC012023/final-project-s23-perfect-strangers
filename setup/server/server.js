const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

require("dotenv").config();


/*
  - Create an HTTP server using app
  - Need an HTTP server as socket server can only be connected to this
*/
const http = require('http'); 
const httpServer = http.createServer(app);

/*
  - Import socket server
  - Link socket server to HTTP server
*/
const { Server } = require("socket.io"); 
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Client side
    allowedHeaders: ["my-custom-header"], credentials: true
  }
}); 

/*
  Boiler plate code to respond to socket events sent from client
    - send-message || start-typing || end-typing || join-room || disconnect
*/ 
const sockets_bioler_plate = (socket) => {
  socket.on('send-message', ({message, roomID}) => {
    // console.log("Message received by server") // console.log(message)
    socket.broadcast.to(roomID).emit('message-from-server', message);
  });

  socket.on('start-typing', ({roomID}) => {
    let logMessage = "Typing began: " + roomID;
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

/* Start the socket server using boiler place configurations */
io.on("connection", sockets_bioler_plate);

/* Boiler plate code to connect to mongoDB */
app.use(cors());
app.use(express.json());


/* Need this as part of Multer Configuration */
const bodyParser = require('body-parser');
app.use(
  bodyParser .urlencoded({ 
    extended: true,
  })
);

// Connect to MongoDB
const dbUri = process.env.ATLAS_URI;
mongoose.connect(dbUri);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection established");
});

// define routers
const emailAuthRouter = require("./routes/emailAuth.routes");
const userDetailsRouter = require("./routes/userDetails.routes");
const loginRouter = require("./routes/login.routes");
const usersRouter = require("./routes/users");
const interestRouter = require("./routes/interests");
const userEventsRouter = require("./routes/userEvents");
const chatRouter = require("./routes/room.chat.routes");
const requestsRouter = require("./routes/request.routes");
const eventLinkRouter = require("./routes/eventLink.routes");

// connect routers
app.use("/api", chatRouter);
app.use("/email-auth", emailAuthRouter);
app.use("/user-details", userDetailsRouter);
app.use("/api", interestRouter);
app.use("/login", loginRouter);
app.use("/api", usersRouter);
app.use("/api", userEventsRouter);
app.use("/requests", requestsRouter);
app.use("/api", eventLinkRouter);
/* 
    - If more API_End_Point files (routes) have been added in the routes folder, only need to make changes in this section
    - Currently, routers for only two routes have been set up
    - In the routers below, need to give path to the js file containing the routes/API_End_Points
*/
app.use("/api", chatRouter);

/* Listen on port 5000 */
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