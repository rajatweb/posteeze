const dotenv = require('dotenv');
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const port = process.env.PORT || 8000;
const db = require('./config/db');

dotenv.config();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false
}));

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const webRoutes = require('./routes/web');

app.use(express.static(path.join(__dirname, '/public/')));
app.use('/v1/api/user', userRoutes);
app.use('/v1/api/post', postRoutes);
//app.use('/', webRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});