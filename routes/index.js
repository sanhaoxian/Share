var express = require('express');
var router = express.Router();
var path = require('path');
var _ = require('underscore')
var mongoose = require('mongoose')
var Article = require('../models/article')
var Blog = require('../models/blog_article');

module.exports = function(app) {
    /*app.get('/',function(req,res){
        Article.fetch(function(err,articles){
            if(err){
                console.log(err);
            }
            res.render('index',{
                title:'share',
                articles:articles
            })
        })
    })*/
    app.get('/', function (req, res) {
        res.render('index',{
            title:'Share',
            articles:[
            {   
                "_id":1,
                "wtitle":"摄影记录",
                "poster":"images/benefit.png",
                "explain":"时光的凝固艺术，记录那一刻的你...和我的故事"
            },{
                "_id":2,
                "wtitle":"编程记录",
                "poster":"images/tab_one.png",
                "explain":"好记性不如烂笔头，学到什么就应该记录下来"
            },{
                "_id":3,
                "wtitle":"阅读随笔",
                "poster":"images/tab_two.png",
                "explain":"阅读使我的每一天充满阳光和温暖"
            }]
        })
    });

    app.get('/article/:id',function(req,res){
        var id = req.params.id;

        Article.findById(id,function(err,article){
            if(err){
                console.log(err);
            }
            res.render('article',{
                title:'share详情页',
                article:article
            })
        })
    });

    app.get('/admin',function(req,res){
        res.render('admin',{
            title:'后台录入界面',
            article:{
                wtitle:'',
                explain:'',
                photo:'',
                neirong:''
            }
        }) 
    });

    /*admin post article*/
    app.post('/admin/new',function(req,res){
        var id = req.body.article._id
        var articleObj = req.body.article
        var _article

        if (id !== '') {
            Article.findById(id,function(err, article){
                if(err){
                    console.log(err)
                }

                _article = _.extend( article, articleObj)
                _article.save(function( err, article){
                    if(err){
                        console.log(err)
                    }

                    res.redirect('/article/' + article._id)
                })
            })
        }
        else{
            _article = new Article({
                wtitle:articleObj.wtitle,
                explain:articleObj.explain,
                photo:articleObj.photo,
                neirong:articleObj.neirong,
            })

            _article.save(function(err, article){
            if(err){
                    console.log(err)
                }

                res.redirect('/article/' + article._id)
            })
        }
    })
    app.get('/admin/update/:id',function(req,res){
        var id  = req.params.id

        if(id){
            Article.findById(id,function(err,article){
                res.render('admin',{
                    title:'文章 后台更新页',
                    article: article
              })
            })
        }
    });

/*--------------------博客专栏-----------------*/


    app.get('/blog/blogIndex',function(req,res){

        Blog.fetch(function(err,blogs){
            if(err){
                console.log(err);
            }
            res.render('blogIndex',{
                title:'博客专页',
                blogs:blogs
            })
        })
    });

    app.get('/blog/blog_list',function(req,res){
        Blog.fetch(function(err,blogList){
            if(err){
                console.log(err);
            }
            res.render('blog_list',{
                title:'博客列表',
                blogList : blogList
            })
        })
    })

    


    app.get('/blog/editor-blog',function(req,res){
        res.render('editor-blog',{
            title:'博客编辑'
        })
    });
/*后台录入也提交过来的数据，在此进行处理*/
    app.post('/blog/editor-blog/new', function(req,res) {
        var id = req.body.blog._id;
        var blogObj = req.body.blog;
        var _blog;
        
        /*if(id !== ''){
            Blog.findById(id, function(err,blog){
                if(err){
                    console.log(err);
                }

                _blog = _.extend( blog,blogObj);
                _blog.save(function( err, blog) {
                    if(err){
                        console.log(err);
                    }
                    res.redirect('/blog/blog-share' + blog._id);
                })
            })
        }*/
        if(id == ''){
            _blog = new Blog({
                tag:blogObj.tag,
                title:blogObj.title,
                zhaiyao:blogObj.zhaiyao,
                article:blogObj.article,
            })

            _blog.save(function(err, blog){
            if(err){
                    console.log(err)
                }
                res.redirect('/blog/blog-share/' + blog._id)
            })
        }
    });

   /* app.get('/blog/blog_list',function(req,res){
        Blog.fetch(function(err,blogList){
            if(err){
                console.log(err);
            };
            res.render('blog_list',{
                title : '博客列表',
                blogList : blogList
            })
        })
    });*/
    app.get('/blog/blog-share/:id',function(req,res){
        var id = req.params.id;
        Blog.findById(id,function(err, blog){
            if(err){
                console.log(err);
            }
            res.render('blog-share',{
                title:'博客文章' ,
                blog: blog
            })
        });
    }); 
};

        
/*
----上面是通过数据库连接的语句，下面是伪造数据的语句-----------------------------------------
 */
    

    /*app.get('/index',function(req,res){
        res.render('index',{
            title:'Share',
            what_ul:[
            {
                "wtitle":"街头摄影",
                "poster":"http://img.hb.aicdn.com/c0b35eed3ce270da5b0c6092a17a8ceb5df317052866-gx7Kbx_fw580",
                "explain":"摄影分享是一种快乐，用摄影定个幸福时刻"
            },{
                "wtitle":"风景摄影",
                "poster":"http://img.hb.aicdn.com/c0b35eed3ce270da5b0c6092a17a8ceb5df317052866-gx7Kbx_fw580",
                "explain":"分享是将自己的愉悦感染他人"
            },{
                "wtitle":"微摄影",
                "poster":"http://img.hb.aicdn.com/c0b35eed3ce270da5b0c6092a17a8ceb5df317052866-gx7Kbx_fw580",
                "explain":"用自己的机器记录我的生活"
            }]
        });

    });*/

    /*app.get('/admin',function(req,res){
        res.render('admin',{
            title:'后台录入界面',
            article:{
                wtitle:'',
                explain:'',
                photo:'',
                neirong:''
            }
        }) 
    });*/

    /*app.get('/article/:id',function(req,res){
        res.render('article',{
            title:'详情页',
            article:{
                wtitle:'我爱俏妍',
                explain:'就是这么任性',
                photo:'http://img.hb.aicdn.com/c0b35eed3ce270da5b0c6092a17a8ceb5df317052866-gx7Kbx_fw580',
                neirong:'放假哦文件哦啊是个棘手的房间啊哦是放假啊收费的'
            }
        })
    })*/
/*-----------------------------登录模块----------------------------------------------------------*/
    
/*---------------------------------------------------------------------------------------*/    

    

    


/* GET home page. */
/*router.get("/home",function(req,res){
    if(!req.session.user){ 					//到达/home路径首先判断是否已经登录
        req.session.error = "请先登录"
        res.redirect("/login");				//未登录则重定向到 /login 路径
    }
    res.render("home",{title:'Home'});         //已登录则渲染home页面
});*/

//module.exports = router;
