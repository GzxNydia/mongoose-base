module.exports = function (app) {
    var user = require('../database/db').user;

    app.get('/reg', function(req, res) {
        res.render('reg', {
            title: '注册页面',
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
            // pro:doc
        });
    });

    app.post('/reg',function (req,res) {
        var name = req.body.name;
        var password = req.body.password;
        var password1 = req.body.password1;
        if(password != password1){
            req.flash('error','请重新输入密码！！');
            return res.redirect('/reg');
        }
        console.log(name);
        user.findOne({name: name}, function (error, doc) {
            if(doc){
                req.flash('error','用户名已存在');
                return res.redirect('/reg');
            }else{
                user.create({
                    name: name,
                    password: password
                }, function (error, doc) {
                    if (error) {
                        console.log('用户名创建失败！');
                        req.flash('error','用户名创建失败！');
                        return res.redirect('/reg');
                    } else {
                        req.flash('success','注册成功');
                        return res.redirect('/login');

                    }
                });
            }
        })
    })
}

