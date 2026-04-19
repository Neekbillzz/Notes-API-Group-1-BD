require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./database/connectBD");
const errorHandler = require("./middlewares/errHandler");
const logRequest = require("./middlewares/logger");
const noteRoutes = require("./routes/note.routes.js");
const userRoutes = require("./routes/user.routes.js");

const app = express();
const PORT = process.env.PORT || 3020;

connectDB();

app.use(logRequest);
app.use(express.json());
app.use(cors());
app.use("/api/notes", noteRoutes);
app.use("/api/users", userRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`API is running on port ${PORT}`);
});
