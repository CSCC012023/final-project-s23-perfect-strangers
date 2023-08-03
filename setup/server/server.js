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

/* Setup passport-facebook */ /* DEV-CGP-6 */
const FacebookStrategy = require("passport-facebook").Strategy;
const EmailAuthModel = require("./models/emailAuth.model");
const UserDetailModel = require("./models/userDetails.model");
const jwt = require("jsonwebtoken");

passport.authorize('facebook', { scope : ['email'] })
passport.use(
  new FacebookStrategy ({
    clientID: process.env.FB_APP_ID,
    clientSecret: process.env.FB_APP_SECRET,
    callbackURL: "http://localhost:5000/auth/facebook/callback",
    profileFields: ['id', 'email', 'gender', 'name', 'verified'],
    },
  async function(accessToken, refreshToken, profile, cb){

    const emailAuth = await EmailAuthModel.findOne({ facebookID: profile.id });

    if (emailAuth) {
        /* user exists -> generate token -> redirect to dashboard */
        const userDetail = await UserDetailModel.findOne({ email: emailAuth.email });

        const token = jwt.sign({ id: userDetail._id, userDetail: userDetail }, "shhhhh", {
          expiresIn: "2h",
        });

        userDetail.token = token;
        await userDetail.save(); // Save the user with the updated token
    }
    else {
        /* unregistered user -> create emaulAuth -> redirect to FBAccountSetup */
        const newEmailAuth = new EmailAuthModel({
          email: profile.id + "@facebook.com", password: profile.id,
          username: profile.name.givenName + " " + profile.name.familyName,
          facebookID: profile.id
        });

        newEmailAuth.save() 
    }

    return cb(null, profile);
  })
);

/* Setup facebook authorization routes */
app.get('/auth/facebook', cors(), passport.authenticate('facebook')
);

app.get('/auth/facebook/callback', cors(),
  passport.authenticate('facebook', { scope: ['email'], failureRedirect: 'http://localhost:3000/dashboard' }),
  async function(req, res) {
      // Successful authentication
      const userDetail = await UserDetailModel.findOne({ email: req.user.id + "@facebook.com" });
      const username = req.user.name.givenName + " " + req.user.name.familyName;
      const email = req.user.id + "@facebook.com";

      if (userDetail){        
        /* redirect to dashboard -> username and email in url for dashboard to access jwt */
        res.redirect('http://localhost:3000/dashboard?facebookEmail=' + email + "?username=" + username);
      }
      else{
        /* redirect to account setup */
        res.redirect('http://localhost:3000/account-setup?facebookEmail=' + email + "?username=" + username);
      }
  }
);


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
