<template>
<div class="section">
  <div class="login-container">
    <div class="logo-container">
      <img src="./../../public/image/logo.png" alt="" class="logo-image">
    </div>
    <p class="login-title">极客信息发布处理</p>
    <el-input type="text" class="login-name" v-model='phone' placeholder="手机号码"></el-input>
    <el-input type="text" class="login-code" v-model='code' placeholder="登录密码" show-password></el-input>
    <button class="login-button" @click="enter">登录</button>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import axios from '@/models/request';

export default {
  phone: 'home',
  data:function () {
    return {
      phone:'',
      code:'',
    }
  },
  created: function () {
    let token = localStorage.getItem('token');
    console.log(1);
    console.log(token);
    if(token != null){
      this.$router.push({name: 'User'})
    }
  },
  components: {
    
  },
  methods:{
    enter:function(){
      console.log(123);
      console.log(this.phone,this.code);
      let phone = this.phone;
      let code = this.code;
      if(!phone || !code){
        return alert('请输入账号与密码')
      }
      axios.post('http://localhost:3000/api/api/login',{
        phone:phone,
        code:code,
      }).then(res => {
        console.log(res);
        if(res.data.code == 200){
          console.log(res.data.token);
          localStorage.setItem('token',res.data.token);
          this.$router.push({name: 'User'})
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
};
</script>
<style scoped lang="less">
 .section{
   padding: 300px 0;
   display: flex;
   justify-content: center;
   align-items: center;
   width: 100%;
   height: 100%;
 }
 .login-container{
   background-color: #f4f4f4;
   padding: 30px;
 }
 .logo-container{
   display: block;
   text-align: left;
 }
 .logo-image{
   width: 80px;
   height: 30px;
   margin: 0;
 }
 .login-title{
   font-size: 24px;
   color: #000;
   margin-top: 0;
   margin-bottom: 20px;
 }
 .login-name{
   margin-bottom: 20px;
 }
 .login-name input{
   outline: none;
   color: #333;
   border: 1px solid #999;
   padding: 10px;
   font-size: 18px;
   display: block;
   border-radius: 5px;
   margin-block-end: 30px;
 }
 .login-code{
   margin-bottom: 30px;
 }
.login-code input{
  outline: none;
  color: #333;
  border: 1px solid #999;
  padding: 10px;
  font-size: 18px;
  display: block;
  border-radius: 5px;
  margin-block-end: 30px;
}
  .login-button{
    width: 210px;
    height: 43px;
    border: none;
    background-color: #87CEFA;
    color: #fff;
    border-radius: 5px;
  }
</style>
