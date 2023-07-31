const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const passport = require("passport");

require("dotenv").config();

/* Boiler plate code to for cross origin applications */
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

/* Setup passport server */ // DEV-CGP-6
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, done) { done(null, user); });
passport.deserializeUser(function(user, done) { done(null, user); });

/*********************************************************************/
/* DEV-CGP-6 */
/* Setup passport-facebook */ // DEV-CGP-6
const FacebookStrategy = require("passport-facebook").Strategy;
let EmailAuthModel = require("./models/emailAuth.model");
let UserDetailModel = require("./models/userDetails.model");
const jwt = require("jsonwebtoken");
passport.authorize('facebook', { scope : ['email'] })
passport.use(
  new FacebookStrategy ({
    clientID: process.env.FB_APP_ID,
    clientSecret: process.env.FB_APP_SECRET,
    callbackURL: "http://localhost:5000/auth/facebook/callback",
    profileFields: ['email', 'id', 'first_name', 'gender', 'last_name']
    },
  async function(accessToken, refreshToken, profile, cb){

    // Find or create here

    const emailAuth = await EmailAuthModel.findOne({
      facebookID: profile.id
    });

    if (emailAuth) {
      // user already registered // log the user in
        const userDetail = await UserDetailModel.findOne({ email: emailAuth.email });
        console.log("User Found " + userDetail);
        userDetail.biography = ""; userDetail.image = "";

        const token = jwt.sign({ id: userDetail._id, userDetail: userDetail }, "shhhhh", {
          expiresIn: "2h",
        });

        console.log("User Saved " + token);
        emailAuth.token = token;
        await emailAuth.save(); // Save the user with the updated token
    }
    else {
        // User was not signed up from before
        // Need to redirect to account setup
        const newEmailAuth = new EmailAuthModel({
          email: profile.id + "@facebook.com",
          password: profile.id,
          username: profile.name.givenName + " " + profile.name.familyName,
          facebookID: profile.id
        });

        const newUserDetails = new UserDetailModel({
          email: profile.id + "@facebook.com",
          username: profile.name.givenName + " " + profile.name.familyName,
          age: 1000,
          gender: "secret",
        });
      
        newUserDetails.save()
        newEmailAuth.save() 
    }

    return cb(null, profile);
  })
);

/* Setup facebook authorization routes */
/* http://localhost:5000/auth/facebook */
app.get('/auth/facebook', cors(), passport.authenticate('facebook')
);

app.get('/auth/facebook/callback', cors(),
  passport.authenticate('facebook', { failureRedirect: 'http://localhost:3000/dashboard' }),
  async function(req, res) {
    // Successful authentication, redirect home.
      console.log(req.user) // Got the user here // King of the world
      const emailAuth = await EmailAuthModel.findOne({ email: req.user.id + "@facebook.com" });
      const userDetail = await UserDetailModel.findOne({ email: emailAuth.email });

      if (userDetail){
        // Generate jwt-token for the user
        const token = jwt.sign({ id: userDetail._id, userDetail: userDetail }, "shhhhh", {expiresIn: "2h", });
        emailAuth.token = token;
        await emailAuth.save();
        
        res.redirect('http://localhost:3000/dashboard?facebookEmail=' + emailAuth.email);

      }
      else{
        // redirect to account setup
      }
  }
);

/*********************************************************************/


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
app.use(express.static('public'));

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
const promoterRequestRouter = require("./routes/promoterRequest.routes");
const eventLinkRouter = require("./routes/eventLink.routes");
const businessRouter = require("./routes/businessAccounts.routes");

// connect routers
app.use("/api", chatRouter);
app.use("/email-auth", emailAuthRouter);
app.use("/user-details", userDetailsRouter);
app.use("/api", interestRouter);
app.use("/login", loginRouter);
app.use("/api", usersRouter);
app.use("/api", userEventsRouter);
app.use("/requests", requestsRouter);
app.use("/promoter-requests", promoterRequestRouter);
app.use("/api", eventLinkRouter);
app.use("/business", businessRouter);
app.use("/api", chatRouter);

/* Listen on port 5000 */
httpServer.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
