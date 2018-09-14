var express = require('express');
var router = express.Router();
var Note = require('../model/note')

/* 获取所有的 notes */

router.get('/notes', function(req, res, next) {
    var opts = {raw: true}
    if(req.session && req.session.user){
        opts.where = {username:req.session.user.username }
    }

    Note.findAll(opts).then(function(notes) {
        console.log(notes)
        res.send({status: 0, data: notes});
    }).catch(function(){
        res.send({ status: 1,errorMsg: '数据库异常'});
    });
});

/*新增note*/
router.post('/notes/add', function(req, res, next){
    if(!req.session || !req.session.user){
        return res.send({status: 1, errorMsg: '请先登录'})
    }
    if (!req.body.note) {
        return res.send({status: 2, errorMsg: '内容不能为空'});
    }
    var note = req.body.note;
    var username = req.session.user.username;
    console.log({text: note, username: username})
    Note.create({text: note, username: username}).then(function(){
        console.log(arguments)
        res.send({status: 0})
    }).catch(function(){
        res.send({ status: 1,errorMsg: '数据库异常或者你没有权限'});
    })
})

/*修改note*/
router.post('/notes/edit', function(req, res, next){
    if(!req.session || !req.session.user){
        return res.send({status: 1, errorMsg: '请先登录'})
    }
    var noteId = req.body.id;
    var note = req.body.note;
    var username = req.session.user.username;
    Note.update({text: note}, {where:{id: noteId, username: username}}).then(function(lists){
        if(lists[0] === 0){
            return res.send({ status: 1,errorMsg: '你没有权限'});
        }
        res.send({status: 0})
    }).catch(function(e){
        res.send({ status: 1,errorMsg: '数据库异常或者你没有权限'});
    })
})

/*删除note*/
router.post('/notes/delete', function(req, res, next){
    if(!req.session || !req.session.user){
        return res.send({status: 1, errorMsg: '请先登录'})
    }

    var noteId = req.body.id
    var username = req.session.user.username;

    Note.destroy({where:{id:noteId, username: username}}).then(function(deleteLen){
        if(deleteLen === 0){
            return res.send({ status: 1, errorMsg: '你没有权限'});
        }
        res.send({status: 0})
    }).catch(function(e){
        res.send({ status: 1,errorMsg: '数据库异常或者你没有权限'});
    })
})

module.exports = router;
