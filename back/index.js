const express = require("express");
const cors = require("cors");
const { connection } = require("./database/connection");

connection()

const app = express();
const port = 3900;

app.use(cors());

app.use(express.json({limit: '4mb'}));
app.use(express.urlencoded({extended:true})); 

const userRoutes = require("./routes/userRoute"); 
const followRoutes = require("./routes/followRoute"); 
const publicationRoutes = require("./routes/publicationRoute"); 
const fileRoutes = require("./routes/fileRoute");

app.use("/api/users", userRoutes);
app.use("/api/publications", publicationRoutes);
app.use("/api/follows", followRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/publications", publicationRoutes);

app.listen(port, () => console.log("Started on port " + port));
