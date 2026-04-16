require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./database/connectBD');
const errorHandler = require('./middlewares/errHandler');
const logRequest = require('./middlewares/logger');
const NoteRoutes = require('./routes/note.routes.js');




const app = express();
const PORT = process.env.PORT || 3020

connectDB();


app.use(express.json());
app.use(logRequest);
app.use('/api/', NoteRoutes);
app.use(cors());
app.use(errorHandler);


app.listen( PORT, () => {
    console.log( `API is running on port ${PORT}`)
});


