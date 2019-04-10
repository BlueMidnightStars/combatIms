<template>
    <el-col>
        <el-menu
        :router='true'
        class="el-menu-vertical-demo">
            <el-menu-item index="1" route='User'>
                <i class="el-icon-menu"></i>
                <span slot="title" >用户管理</span>
            </el-menu-item>
             <el-menu-item index="2" route='Classify'>
                <i class="el-icon-menu"></i>
                <span slot="title">分类管理</span>
            </el-menu-item>
            <el-submenu index="3" >
                <template slot="title">
                <i class="el-icon-share"></i>
                <span>文章管理</span>
                </template>
                <el-menu-item index="3-1" route='Article'>文章列表</el-menu-item>
                <el-menu-item index="3-2" route='ArticleCreate'>新建文章</el-menu-item>
            </el-submenu>
        </el-menu>
    </el-col>
</template>
<script>
export default {
  name: 'elect',
  created: function () {
    let token = localStorage.getItem('token');
    if(!token){
      this.$router.push({name: 'Login'})
    }
  },
};
</script>