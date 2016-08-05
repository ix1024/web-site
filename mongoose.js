var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/kingwell');
module.exports = mongoose;