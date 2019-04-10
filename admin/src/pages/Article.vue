<template>
<publi>

 <el-table
    :data="data"
    style="width: 100%">
    <el-table-column
      label="index"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.created_time }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="标题"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>分类: {{ class_title(scope.row.class_id) }}</p>
          <p>标题: {{ scope.row.title }}</p>
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
          @click="redact(scope.row.id)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="deleteTitle(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </publi>
</template>

<script>
import publi from '@/components/public';
import axios from '@/models/request';

export default {
  name: 'Article',
  data:function(){
    return{
      data:[],
      class_data:[]
    }
  },
  components: {
    publi,
  },
  created:function(){
    axios.get('http://localhost:3000/api/api/article').then(res =>{
      this.data = res.data.data;
    }).catch(eer => {
      console.log(err);
    });
    axios.get('http://localhost:3000/api/api/classify').then(res =>{
      this.class_data = res.data.data;
      console.log(this.class_data);
    }).catch(eer => {
      console.log(err);
    })
  },
  methods:{
    class_title:function(class_id){
      let class_title = '';
      this.class_data.forEach(item => {
        if(item.id == class_id){
          class_title = item.title;
        }
      })
      if(class_title == ''){
        class_title = '无'
      }
      return class_title;
    },
    redact:function(id){
      this.$router.push('/ArticleEdit' + id)
    },
    deleteTitle:function(id){
      axios.delete('http://localhost:3000/api/api/article' + id).then(res =>{
        if(res.data.code == 200){
          this.$alert('删除成功', '提示',{
            confirmButtonText: '确定',
          });
          axios.get('http://localhost:3000/api/api/article').then(res =>{
            this.data = res.data.data;
          }).catch(eer => {
          });
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
      });
    }
  }
};
</script>