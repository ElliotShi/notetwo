var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var noteSchema = new Schema({
	content: String,
	createDate: {type: Date, default: Date.now},
	updateDate: {type: Date, default: Date.now},
});

module.exports = mongoose.model('notetwos', noteSchema);