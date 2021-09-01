var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ArboxUsersDB',{
    useNewUrlParser: true,
    useUnifiedTopology:true
})