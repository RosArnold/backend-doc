const express = require('express');
const connectDB = require('./config/db');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '300kb' }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/documents', require('./routes/document'));
app.use('/api/folders', require('./routes/folder'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
