require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const DbConnect = require('./database');

const PORT = process.env.PORT || 5000;

const corsOption = {
    credentials: true,
    origin: true,
}

app.use(cookieParser());
app.use(cors(corsOption));

app.get('/', (req, res) => res.send('Server is running...'));
DbConnect();
app.use(express.json({ limit: '8mb' }));
app.use(router);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));