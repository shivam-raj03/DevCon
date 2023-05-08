const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();

//Connect Database
connectDB();

//Init  middleware
app.use(express.json({extended: false}));
app.use(cors());


//Listen to home route
app.get("/", (req, res) =>{
    res.send("API is Running");
});

// Define routes

app.use("/api/user", require("./routes/api/user"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started at  ${PORT}`));