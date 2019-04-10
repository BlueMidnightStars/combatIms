const user = require('./../models/user');
const authCodeFunc = require('./../utils/authCode');
const userController = {
    judge:async function(req, res, next){
        try{
            let ttt = req.cookies.ac;
            console.log(123,ttt);
            let phone = req.body.phone;
            let code = req.body.code;
            let decide = await user.select({phone:phone,code:code});
            console.log(decide);
            if(decide[0].id == null){
                throw new Error('无此用户');
            }
            console.log(authCodeFunc);
            let id = decide[0].id  + '/tmp' + code;
            let auth_Code = authCodeFunc(id,'ENCODE');
            res.cookie('ac', auth_Code, { maxAge: 24* 60 * 60 * 1000 });
            res.json({code:200, data:'有此用户',token:auth_Code});
        }catch(e){
            console.log(123);
            res.json({code:0, data:'无此用户'})
        }
    },
    allUser: async function(req, res, next){
        try{
            let judge = await  user.all();
            res.json({code:200,data:judge})
        }catch(e){
            res.json({code:0,data:e})
        }   
    },
    addUser: async function(req,res,next){
        try{
            let name = req.body.name;
            let phone = req.body.phone;
            let code = req.body.code;
            if(!name || !phone || !code){
                throw new Error('缺少必要参数'); 
            }
            let addUser_id =  await user.insert({name,phone,code});
            if(addUser_id == null){
                throw new Error('添加失败'); 
            }
            res.json({code:200,data:'添加成功'})

        }catch(e){
            res.json({code:0,data:'添加失败'})
        }
    },
    alterUser: async function(req, res, next){
        try{
        let user_id = req.params.id;
        let name = req.body.name;
        let phone = req.body.phone;
        let code = req.body.code;
        if(!user_id || !name || !phone || !code){
            throw new Error('缺少必要参数'); 
        }
        let alter = await user.update(user_id,{name:name,phone:phone,code:code});
        if(alter.toString() == 0){
            throw new Error('修改失败'); 
        }
        res.json({code:200,data:'修改成功'})
        }catch(e){
        res.json({code:0,data:'修改失败'})
        }
    },
    deleteUser:async function(req,res,next){
        try{
            let user_id = req.params.id;
            let remove = await user.delete(user_id);
            if(remove.toString() == 0){
                throw new Error('删除失败'); 
            }
            res.json({code:200,data:'删除成功'})
        }catch(e){
            res.json({code:0,data:'删除失败'})

        }
    }
}
module.exports = userController;
