const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;
const DB_NAME = "Project"

require('dotenv').config();

// routes
var UserRouter = require("./routes/Users");


// var GradeRouter = require("./routes/Grades");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connection to MongoDB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{ useNewUrlParser: true,useUnifiedTopology: true }); 
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully!");
})

// setup API endpoints
app.use("/api/users", UserRouter);

if (process.env.NODE_ENV === 'production') {
    // Exprees will serve up production assets
    app.use(express.static('client/build'));

    // Express serve up index.html file if it doesn't recognize route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


// app.use("/grade", GradeRouter);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
