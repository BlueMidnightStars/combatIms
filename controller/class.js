let classModels = require('./../models/class');
let classController = {
    allClass:async function(req,res,next){
        try{
            let class_id = req.params.id;
            console.log(class_id);
            if(class_id){
                let classItem = await classModels.select({id:class_id});
                console.log(classItem);
                res.json({code:200,data:classItem});
                return;
            }
            let classList = await classModels.all();
            res.json({code:200,data:classList})
        }catch(e){
            res.json({code:0,data:e})
        }
    },
    addClass:async function(req, res, next){
        try{
            let title = req.body.title;
            if(!title){
                throw new Error('缺少必要参数'); 
            }
            let insertClass = await classModels.insert({title});
            if(insertClass[0] == null){
                throw new Error('添加失败'); 
            }
            res.json({code:200,data:'添加成功'})
        }catch(e){
            res.json({code:0,data:'添加失败'})
        }
    },
    amendClass:async function(req, res, next){
        try{
            let class_id = req.params.id;
            let title = req.body.title;
            if(!class_id || !title){
                throw new Error('缺少参数'); 
            }
            let updateClass = await classModels.update(class_id,{title:title});
            if(updateClass.toString() == 0){
                throw new Error('修改失败'); 
            }
            res.json({code:200,data:'修改成功'})
        }catch(e){
            res.json({code:0,data:'修改失败'})
        }
    },
    removeClass:async function(req, res, next){
        try{
            let class_id = req.params.id;
            let deleteClass = await classModels.delete(class_id);
            if(deleteClass.toString() == 0){
                throw new Error('删除失败'); 
            }
            res.json({code:200, data:'删除成功'})
        }catch(e){
            res.json({code:0, data:'删除失败'})
        }

    }
}
module.exports = classController;