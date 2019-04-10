提交路由以及路由所需要用到的信息

#####统一路由前缀: api/

###登录页
##登录判断
路由：/api/login,
post请求
前端需要提交的数据{
    phone:手机号码,
    code:密码
}
后端通过res.body获取数据
后端正确时返回的数据{
    code:200,
    data:有此用户
}


###用户列表
##获取所有用户
路由：/api/user,
get请求
前端需要提交的数据{

}
后端通过res.body获取数据
后端正确时返回的数据{
    code:200,
    data:所有用户资料
}


##添加新的用户
路由：/api/user,
post请求
<!-- 缺一不可 -->
前端需要提交的数据{
    name:名称,
    phone:手机,
    code:密码
}
后端通过res.body获取数据
后端正确时返回的数据{
    code:200,
    data:添加成功
}


##修改指定用户
路由：/api/user:id,
put请求
<!-- 缺一不可 -->
前端需要提交的数据{
    name:名称,
    phone:手机,
    code:密码
}
后端通过res.body获取数据
后端正确时返回的数据{
    code:200,
    data:修改成功
}


##删除指定用户
路由：/api/user:id,
delete请求
<!-- 缺一不可 -->
前端需要提交的数据{
    
}
后端通过res.body获取数据
后端正确时返回的数据{
    code:200,
    data:删除成功
}




###分类列表
##获取所有分类
路由：/api/classify,
get请求
前端需要提交的数据{

}
后端通过res.body获取数据
后端正确时返回的数据{
    code:200,
    data:所有用户资料
}


##添加新的分类
路由：/api/classify,
post请求
前端需要提交的数据{
    title:分类名称
}
后端通过res.body获取数据
后端正确时返回的数据{
    code:200,
    data:添加成功
}

##修改指定分类
路由：/api/classify:id,
put请求
前端需要提交的数据{
    title:分类名称
}
后端通过res.body获取数据
后端正确时返回的数据{
    code:200,
    data:修改成功
}

##删除指定分类
路由：/api/classify:id,
delete请求
前端需要提交的数据{
}
后端通过res.body获取数据
后端正确时返回的数据{
    code:200,
    data:删除成功
}



###文章列表

##获取所有文章
路由：/api/article,
get请求
前端需要提交的数据{	
	
}
后端通过res.body获取数据
后端正确时返回的数据{
    code:200,
    data:所有文章
}

##获取指定分类文章
路由：/api/article?classify_id=:id,
get请求
前端需要提交的数据{	
	
}
后端通过res.body获取数据
后端正确时返回的数据{
    code:200,
    data:指定分类的文章
}
##获取指定id文章
路由：/api/article/:id,
get请求
前端需要提交的数据{	
	
}
后端通过res.body获取数据
后端正确时返回的数据{
    code:200,
    data:所有文章
}

##添加文章
路由：/api/article,
post请求
前端需要提交的数据{	
	"title":"标题",
	"content":"内容",
	"user_id":"用户id",
	"class_id":"分类id"
}
后端通过res.body获取数据
后端正确时返回的数据{
    code:200,
    data:添加成功
}

##修改文章
路由：/api/article:id,
put请求
前端需要提交的数据{	
	"title":"标题",
	"content":"内容",
	"class_id":"分类id"
}
后端通过res.body获取数据
后端正确时返回的数据{
    code:200,
    data:修改成功
}


##删除文章
路由：/api/article:id,
delete请求
前端需要提交的数据{	
}
后端通过res.body获取数据
后端正确时返回的数据{
    code:200,
    data:删除成功
}