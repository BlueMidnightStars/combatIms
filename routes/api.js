var express = require('express');
var router = express.Router();
let usercontroller = require('./../controller/user');
let classcontroller = require('./../controller/class');
let titlecontroller = require('./../controller/title');
/* GET home page. */
// 登录页
// 登录判断
router.post('/api/login',usercontroller.judge);
// 用户列表页
// 获取所有用户
router.get('/api/user', usercontroller.allUser);
// 添加用户
router.post('/api/user', usercontroller.addUser);
// 修改用户
router.put('/api/user:id', usercontroller.alterUser);
// 删除用户
router.delete('/api/user:id', usercontroller.deleteUser);
// 分类管理
// 获取所有分类
router.get('/api/classify', classcontroller.allClass);
// 获取指定分类
router.get('/api/classify:id', classcontroller.allClass);
// 添加分类
router.post('/api/classify', classcontroller.addClass);
// 修改分类
router.put('/api/classify:id', classcontroller.amendClass);
// 删除分类
router.delete('/api/classify:id', classcontroller.removeClass);
// 文章管理
// 获取所有文章
router.get('/api/article', titlecontroller.alltitle);
// 获取指定分类id下的文章
// router.get('/api/article?classify_id:id', titlecontroller.class_idTitle);
// 获取指定id的文章
router.get('/api/article/:id', titlecontroller.id_title_content);
// 添加文章
router.post('/api/article', titlecontroller.add_title_content);
// 修改文章
router.put('/api/article:id', titlecontroller.update_title_content);
// 删除文章
router.delete('/api/article:id', titlecontroller.delete_title_content);
module.exports = router;