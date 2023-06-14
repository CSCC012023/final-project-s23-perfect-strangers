const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express ();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const dbUri = process.env.ATLAS_URI;
mongoose.connect(dbUri);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection established");
});

//define routers
const emailAuthRouter = require('./routes/emailAuth.routes');
const userDetailsRouter = require('./routes/userDetails.routes');

//connect routers
app.use('/email-auth', emailAuthRouter);
app.use('/user-details', userDetailsRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})