var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Courseschema = new Schema({	
		posts: [{post : String, vote : Number,
		subcomments : [{subcomment : String}], 
		subvotes : [{subvote : Number}]}],
		course_abbreviation : String,
		course_title : String
});

//var Courseschemas = mongoose.model('Courseschemas',Courseschema);
module.exports = mongoose.model('courseschemas',Courseschema);