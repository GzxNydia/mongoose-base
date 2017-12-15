module.exports = function (app) {
    var infos = require('../database/db').infos;

    app.get('/add', function(req, res) {
        if(!req.session.user){
            req.flash('error','未登录');
            return res.redirect('/login')
        }else {
            res.render('add', {
                title: '添加信息',
                user: req.session.user,
                success: req.flash('success').toString(),
                error: req.flash('error').toString()
            });
        }
    });
    function formatDate(num) {
        return num < 10 ? '0' + num : num;
    }
    app.post('/add',function (req,res) {
        var name = req.body.name;
        var age = req.body.age;
        var phone = req.body.phone;
        var email = req.body.email;
        var introduce = req.body.introduce;
        var date = new Date();
        var now = date.getFullYear() + '-' + formatDate(date.getMonth()+1) + '-' + formatDate(date.getDate()) + ' ' + formatDate(date.getHours()) + ':' + formatDate(date.getMinutes()) + ':' + formatDate(date.getSeconds());
        infos.findOne({name: name}, function (error, doc) {
                infos.create({
                    name:name,
                    age:age,
                    phone:phone,
                    email:email,
                    introduce:introduce,
                    time:now
                }, function (error, doc) {
                    if (error) {
                        req.flash('error','客户名创建失败！');
                        return res.redirect('/add');
                    } else {
                        req.flash('success','客户添加成功');
                        return res.redirect('/');

                    }
                });
        })
    })
}

