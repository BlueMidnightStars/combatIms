let titleModels = require('./../models/title');
let authCode = require('./../utils/authCode');
let titleController = {
    alltitle:async function(req, res, next){
        try{
            let class_id = req.query.classify_id;
            if(class_id){
                let title = await titleModels.select({class_id:class_id});
                res.json({code:200,data:title});
                return
            }
            let titleList = await titleModels.all();
            res.json({code:200,data:titleList})
        }catch(e){
            res,json({code:0,data:e})
        }
    },
    id_title_content:async function(req, res, next){
        try{
            let title_id = req.params.id;
            let title = await titleModels.select({id:title_id});
            res.json({code:200,data:title});
        }catch(e){
            res.json({code:0,data:e});
        }
    },
    add_title_content:async function(req, res, next){
        console.log(123);
        try{
            
            let title = req.body.title;
            let content = req.body.content;
            let token = req.body.token;
            let auth_Code = authCode(token,'DECODE');
            let authArr = auth_Code.split("/tmp");
            let user_id = authArr[0];
            let class_id = req.body.class_id;
            if(!title || !content || !user_id || !class_id){
                throw new Error('添加失败');
            }
            let insert_title_content = await titleModels.insert({user_id:user_id,class_id:class_id,title:title,content:content})
            if(insert_title_content[0] == null){
                throw new Error('添加失败');                
            }
            console.log(insert_title_content);
            res.json({code:200,data:'添加成功'})
        }catch(e){
            res.json({code:0,data:e})    
        }
    },
    update_title_content:async function(req, res, next){
        try{
            let title_id = req.params.id;
            let content = req.body.content;
            let class_id = req.body.class_id;
            let title = req.body.title;
            if(!title || !content || !title_id || !class_id){
                throw new Error('添加失败');
            }
            let title_content = await titleModels.update(title_id,{class_id:class_id,title:title,content:content})
            if(title_content.toString() == 0){
                throw new Error('修改失败'); 
            }
            res.json({code:200,data:'修改成功'})            
        }catch(e){
            res.json({code:0,data:'修改失败'})            
        }
    },
    delete_title_content:async function(req, res, next){
        try{
            let title_id = req.params.id;
            console.log(title_id);
            if(!title_id){
                throw new Error('删除失败');
            }
            let title_content = await titleModels.delete(title_id);
            console.log(title_content);
            if(title_content.toString() == 0){
                throw new Error('删除失败'); 
            }
            res.json({code:200,data:'删除成功'})            
        }catch(e){
            res.json({code:0,data:'删除失败'})            

        }
    }
    
}
module.exports = titleController;
