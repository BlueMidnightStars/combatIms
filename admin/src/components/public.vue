<template>
    <el-container>
        <el-header>
            <div class="header-logo">
                <img src="./../../public/image/logo.png" class='logo-image'>
                <p class="logo-title">信息管理</p>
            </div>
            <div class="quit-title" @click="quit">
                退出登录
            </div>
            
        </el-header>
        <el-container>
            <el-aside width="240px"><elect></elect></el-aside>
            <el-main><slot></slot></el-main>
        </el-container>
    </el-container>  
</template>
<script>
import elect from '@/components/elect'
export default {
name: 'public',
components: {
    elect,
  },
methods:{
  quit:function(){
    localStorage.removeItem('token');
    this.$router.push({name: 'Login'})
  }
}
};
</script>
<style scoped lang="scss">
.el-header, .el-footer {
    background-color: #fff;
    color: #333;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .header-logo{
    height: 69px;
    width: 200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .logo-image{
      width: 100px;
      height: 36px;
  }
  .logo-title{
      font-size: 16px;
      color: #333;
      font-weight: 400;

  }
  .quit-title{
      font-size: 16px;
      color: #333;
      font-weight: 400;
  }
  .el-aside {
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 200px;
    height: 100%;
  }
  .el-main {
    background-color: #fff;
    color: #333;
    text-align: center;

  }
  body > .el-container {
    margin-bottom: 40px;
  }
</style>