var mongoose = require('mongoose'); //引入建模工具模块；

var BlogSchema = new mongoose.Schema({   
	tag:String,
	title:String,
	zhaiyao:String,
	article:String,
	pv:{
		type:Number,
		default:0
	},
	meta:{
		createAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}
	}
});

BlogSchema.pre('save',function(next){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now()
	}else{
		this.meta.updateAt = Date.now()
	}
	next();
})

BlogSchema.statics = {
	fetch: function(cb){
		return this
		.find({})
		//.sort('meta.updateAt')
		.exec(cb)
	},
	findById:function(id,cb){
		return this
		.findOne({_id:id},function(err,cb){
			
			if(cb.pv === ""){
				cb.pv = 0
			}else{
				cb.pv = cb.pv + 1
				cb.meta.updateAt = cb.meta.createAt
				cb.save()
			}
		})
		.exec(cb)
	}
}
module.exports = BlogSchema;