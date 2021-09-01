var mongoose = require('mongoose');

var appSchema = mongoose.Schema;
var membershipSchema = new appSchema({
    user_id: Number,
    start_date: Date,
    end_date: Date,
    membership_type: String
})
module.exports = mongoose.model('memberships',membershipSchema);