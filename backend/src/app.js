const express = require('express');
const connectDB = require('.//config/db');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes')
require('dotenv').config();

const app = express();

connectDB();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Serveur operationnel');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{
    console.log(`Serveur lancé sur http://localhost:${PORT}`)
});

app.use('/api/tasks', taskRoutes);
