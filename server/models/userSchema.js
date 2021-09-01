var mongoose = require('mongoose');

var appSchema = mongoose.Schema;
var userSchema = new appSchema({
    id: Number,
    first_name: String,
    last_name: String,
    phone: String,
    email: String,
    joined_at: Date,
    club_id: Number,
})
module.exports = mongoose.model('users',userSchema);