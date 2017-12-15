module.exports = function (app) {
    var infos = require('../database/db').infos;
    app.get('/remove/:id',function (req,res) {
        var id = req.params.id;
        infos.findByIdAndRemove(id,function (err) {
            if(err){
                req.flash('error','删除成功');
                return res.redirect('/')
            }else {
                req.flash('success','删除成功');
                return res.redirect('/');
            }
        })
    })
}