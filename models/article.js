var mongoose = require('mongoose');
var ArticleSchema = require('../schemas/article');
/*
----------------------------------------------
首先要加载mongoose这个工具模块，以及编写好的模式文件
编译生成article这个模型，他需要两个参数，一个是这个模型的名字
第二个是这个模型参照的模式schema，
 */
var Article = mongoose.model('Article',ArticleSchema)

module.exports = Article;      

