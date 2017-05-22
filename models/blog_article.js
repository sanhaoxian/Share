var mongoose  = require('mongoose');
var BlogSchema = require('../schemas/blog_article');
var Blog = mongoose.model('Blog',BlogSchema);


module.exports = Blog;

