module.exports = function (app) {
    var infos= require('../database/db').infos;
    app.get('/', function(req, res) {
        var page = parseInt(req.query.page) || 1;
        infos.count({},function (err,total){
              if(err){
                  req.flash('errod',err);
                  return res.redirect('/');
              }
            infos.find({}).skip((page - 1)*8).limit(8).sort({'_id':-1}).exec(function (error, doc) {
                res.render('index', {
                    title: '主页页面',
                    user: req.session.user,
                    success: req.flash('success').toString(),
                    error: req.flash('error').toString(),
                    doc:doc,
                    page:page,
                    isFirstPage:(page - 1)*8 == 0,
                    isLastPage:(page - 1)*8 + doc.length == total,
                    length:total
                });
            });
        })

    });


    app.get('/logout',function (req, res) {
        if(!req.session.user){
            req.flash('error','未登录');
            return res.redirect('/login');
        }else {
            req.session.user = null;
            req.flash('success','退出成功');
            return res.redirect('/');
        }

    })

    app.get('/search',function (req,res) {
        var newRegex = new RegExp(req.query.keyword,'i');
        infos.find({name:newRegex}).sort({
            time:-1
        }).exec(function (err,doc) {
            res.render('index', {
                title: '查询页面',
                user: req.session.user,
                success: req.flash('success').toString(),
                error: req.flash('error').toString(),
                doc:doc
            });
        })


    })
       
}

