require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const connectDB = require('./config/database');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}); 