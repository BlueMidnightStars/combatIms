<template>
 <publi>
   <div class="adduser-container">
     <p class="grid-content bg-purple" @click="reveal(1)">新增用户>></p>
   </div>
   <el-table
    :data="data"
    style="width: 100%">
    <el-table-column
      label="日期"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.created_time }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="姓名"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>账号: {{ scope.row.phone }}</p>
          <p>密码: {{ scope.row.code }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="reveal(2,scope.row.id,scope.row.phone,scope.row.name,scope.row.code)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="deleteUser(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog
    title=""
    :visible.sync="dialogVisible"
    width="30%">
    <el-input v-model="name" placeholder="请输入名称"></el-input>    
    <el-input v-model="phone" placeholder="请输入手机"></el-input>
    <el-input placeholder="请输入密码" v-model="code" show-password></el-input>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="redact">{{part}}</el-button>
    </span>
  </el-dialog>
 </publi>
</template>

<script>
// @ is an alias to /src
import publi from '@/components/public';
import axios from '@/models/request';

export default {
  name: 'user',
  data() {
      return {
        dialogVisible: false,
        data:[],
        show:0,
        name:'',
        phone:'',
        code:'',
        part:'',
      };
  },
  created:function(){
    axios.get('http://localhost:3000/api/api/user').then(res =>{
      this.data = res.data.data;
    }).catch(eer => {
      console.log(err);
    })
  },
  methods:{
    reveal:function(show,id,phone,name,code){
      console.log(show,id,phone,name,code); 
      if(show == 1){
        this.show = 1;
        this.name = '';
        this.phone = '';
        this.code = '';
        this.user_id = '';
        this.part = '添加';
        this.dialogVisible = true;
      }else if(show == 2){
        this.show = 2;
        this.name = name;
        this.phone = phone;
        this.code = code;
        this.user_id = id;
        this.part = '编辑';
        this.dialogVisible = true;
      }

    },
    cancel:function(){
      this.dialogVisible = false
    },
    redact:function(){
      let name = this.name;
      let phone = this.phone;
      let code = this.code;
      let user_id = this.user_id
      if(this.show == 1){
        axios.post('http://localhost:3000/api/api/user',{
          name:name,
          phone:phone,
          code:code,

        }).then(res =>{
          console.log(res);
          if(res.data.code == 200){
            this.dialogVisible = false
            this.$alert('添加成功', '提示',{
              confirmButtonText: '确定',
            });
            axios.get('http://localhost:3000/api/api/user').then(res =>{
              this.data = res.data.data;
            }).catch(eer => {
            })
          }else{
            this.$alert('添加失败', '提示',{
              confirmButtonText: '确定',
            });
          }
        }).catch(eer => {
          console.log(err);
          this.$alert('添加失败', '提示',{
              confirmButtonText: '确定',
            });

        })
      }else if(this.show == 2){
        axios.put('http://localhost:3000/api/api/user' + user_id,{
          name:name,
          phone:phone,
          code:code,

        }).then(res =>{
          console.log(res);
          if(res.data.code == 200){
            this.dialogVisible = false
            this.$alert('编辑成功', '提示',{
              confirmButtonText: '确定',
            });
            axios.get('http://localhost:3000/api/api/user').then(res =>{
              this.data = res.data.data;
            }).catch(eer => {
            })
          }else{
            this.$alert('编辑失败', '提示',{
              confirmButtonText: '确定',
            });
          }
        }).catch(eer => {
          console.log(err);
          this.$alert('编辑失败', '提示',{
              confirmButtonText: '确定',
            });

        })
      }
    },
    deleteUser:function(user_id){
      console.log(user_id);
      let url = 'http://localhost:3000/api/api/user' + user_id
      axios.delete(url).then(res =>{
        console.log(res);
        if(res.data.code == 200){
            this.dialogVisible = false
            this.$alert('删除成功', '提示',{
              confirmButtonText: '确定',
            });
            axios.get('http://localhost:3000/api/api/user').then(res =>{
              this.data = res.data.data;
            }).catch(eer => {
            })
          }else{
            this.$alert('删除失败', '提示',{
              confirmButtonText: '确定',
            });
          }
      }).catch(eer => {
        console.log(err);
         this.$alert('删除失败', '提示',{
              confirmButtonText: '确定',
            });
      })
    }
  },
  components: {
    publi,
  },
};
</script>
<style lang="scss">
  .adduser-container{
    display: block;
    text-align: right;
    margin: 0;
    padding: 0;
    height: 32px;
     margin: 10px;
  }
  .grid-content{
    line-height: 32px;
    margin: 0;
    height: 32px;
    display: inline-block;
    font-size: 18px;
    vertical-align: top;
    color: #666;
  }
</style>