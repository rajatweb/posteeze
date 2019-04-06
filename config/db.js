const mongoose = require('mongoose');
mongoose.connect('mongodb://posteeze:post123@ds161411.mlab.com:61411/posteeze', { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('db connection success!');
});

