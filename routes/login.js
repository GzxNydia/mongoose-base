module.exports = function (app) {
    var user = require('../database/db').user;
    app.get('/login', function(req, res) {

        res.render('login', {
            title: '登录页面',
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });

    });
    app.post('/login', function(req, res) {
        var name = req.body.name;
        var password = req.body.password;
        console.log(name);
        user.findOne({name: name}, function (error, doc) {
            if (!doc) {
                req.flash('error','用户名不存在');
                return res.redirect('/login');
            } else {
                console.log(password);
                if(password == doc.password){
                    console.log( "登陆成功 ");
                    req.session.user = doc;
                    req.flash('success','登陆成功');
                    return res.redirect('/');
                }else{
                    console.log(": 密码错误！ ");
                    req.flash('error','密码错误！');
                    return res.redirect('/login');

                }
                req.session.user = user;
            }
        });

    });

}

