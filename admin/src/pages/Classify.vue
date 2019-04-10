<template>
 <publi>
   <div class="adduser-container">
     <p class="grid-content bg-purple" @click="reveal(2)">添加分类>></p>
   </div>
      
   <el-table
    :data="data"
    style="width: 100%">
    <el-table-column
      label="id"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.created_time }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="分类名称"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>ID: {{ scope.row.id }}</p>
          <p>分类名称: {{ scope.row.title }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.title }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="reveal(1,scope.row.id,scope.row.title )">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="deleteClass(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog
    title=""
    :visible.sync="dialogVisible"
    width="30%">
    <el-input v-model="title" placeholder="请输入主题"></el-input>    
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
  name: 'Classify',
  data:function(){
    return{
      data:[],
      dialogVisible:false,
      title:'',
      class_id:'',
      show:0,
      part:"",
    }
  },
  components: {
    publi,
  },
  created:function(){
    axios.get('http://localhost:3000/api/api/classify').then(res =>{
      this.data = res.data.data;
    }).catch(eer => {
    })
  },
  methods:{
    reveal:function(show,class_id,title){
      if(show == 1){
        this.show = 1;
        this.dialogVisible = true;
        this.class_id = class_id;
        this.title = title;
        this.part = '编辑';     
      }else if(show == 2){
        this.show = 2;
        this.dialogVisible = true;
        this.class_id = '';
        this.title = '';
        this.part = '添加';
      }
    },
    cancel:function(){
      this.dialogVisible = false;
    },
    redact:function(){
      let title = this.title;
      let class_id = this.class_id;
      if(this.show == 1){
        axios.put('http://localhost:3000/api/api/classify' + class_id,{
          title:title
        }).then(res =>{
          if(res.data.code == 200){
            this.dialogVisible = false
            this.$alert('修改成功', '提示',{
              confirmButtonText: '确定',
            });
            axios.get('http://localhost:3000/api/api/classify').then(res =>{
              this.data = res.data.data;
            }).catch(eer => {
            })
          }else{
            this.$alert('修改失败', '提示',{
              confirmButtonText: '确定',
            });
          }
        }).catch(eer => {
          this.$alert('修改失败', '提示',{
              confirmButtonText: '确定',
            });
        })
      }else if(this.show == 2){
        axios.post('http://localhost:3000/api/api/classify',{
          title:title,
        }).then(res =>{
          if(res.data.code == 200){
            this.dialogVisible = false
            this.$alert('添加成功', '提示',{
              confirmButtonText: '确定',
            });
            axios.get('http://localhost:3000/api/api/classify').then(res =>{
              this.data = res.data.data;
            }).catch(eer => {
            })
          }else{
            this.$alert('添加失败', '提示',{
              confirmButtonText: '确定',
            });
          }
        }).catch(eer => {
          this.$alert('添加失败', '提示',{
              confirmButtonText: '确定',
            });
        })
      }
      
    },
    deleteClass:function(id){
      axios.delete('http://localhost:3000/api/api/classify' + id).then(res =>{
          if(res.data.code == 200){
            this.dialogVisible = false
            this.$alert('删除成功', '提示',{
              confirmButtonText: '确定',
            });
            axios.get('http://localhost:3000/api/api/classify').then(res =>{
              this.data = res.data.data;
            }).catch(eer => {
            })
          }else{
            this.$alert('删除失败', '提示',{
              confirmButtonText: '确定',
            });
          }
        }).catch(eer => {
          this.$alert('删除失败', '提示',{
              confirmButtonText: '确定',
            });
        })
    }
  }
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