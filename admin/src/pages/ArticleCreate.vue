<template>
  <publi>
    <div class="ArticleCreate-section">
      <router-link href="javascript:;" class="ArticleCreate-return" to='Article'>返回文章列表>></router-link>
      <div class="ArticleCreate-container">
        <div class="ArticleCreate-title">
          <p class="ArticleCreate-title-input">标题</p>
          <el-input class="ArticleCreate-title-input-text" style="width:400px"  v-model="title" placeholder="请输入内容"></el-input>
        </div>
        <div class="ArticleCreate-desc">
          <p class="ArticleCreate-desc-input">
            分类
          </p>
          <el-select v-model="class_id" placeholder="请选择">
            <el-option
              v-for="item in class_data"
              :key="item.id"
              :label="item.title"
              :value="item.id"
              :id="item.id"
              >
            </el-option>
          </el-select>
        </div>
        <div class="ArticleCreate-text">
          <p class="ArticleCreate-text-input">
            内容
          </p>
          <el-input
            class="ArticleCreate-text-input-textarea"
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="content">
          </el-input>
        </div>
        <div class="ArticleCreate-button">
          <el-button class="ArticleCreate-button-save" type="primary" @click="save">创建</el-button>
          <router-link to='Article'><el-button class="ArticleCreate-button-cancel" type="primary">取消</el-button></router-link>
        </div>
      </div>
    </div>
  </publi>
</template>

<script>
import publi from '@/components/public';
import axios from '@/models/request';

export default {
  name: 'ArticleCreate',
  data(){
    return{
      class_data:[],
      title:'',
      class_id:'',
      content:'',
    }
  },
  created: function () {
     axios.get('http://localhost:3000/api/api/classify').then((res)=>{
      this.class_data = res.data.data;
    }).catch((e)=>{
      console.log(e)
    }) 
  },
  methods:{
    save:function(){
      let title = this.title;
      let class_id = this.class_id;
      let content = this.content;
      if(!title || !class_id || !content){
        this.$alert('添加失败，缺少参数', '提示',{
            confirmButtonText: '确定',
          });
        return 
      }
      let token = localStorage.getItem('token');
      axios.post('http://localhost:3000/api/api/article', {
        class_id:class_id,
        content:content,
        title:title,
        token:token
      }).then(res =>{
        console.log(res);
        if(res.data.code == 200){
          this.$router.push({name: 'Article'})
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
    }
  },
  components: {
    publi,
  },
};
</script>
<style lang="scss">
.ArticleCreate-return{
  display: block;
  text-decoration: none;
  color: #333;
  margin-right: 0;
  text-align: right;
  margin-bottom: 30px;
}
.ArticleCreate-title{
  text-align: left;
}
.ArticleCreate-title-input{
  display: inline-block;
  margin-right: 10px;
  font-size: 16px;
  color: #333;

}
.ArticleCreate-title-input-text{
  display: inline-block;
  font-size: 16px;
  color: #333;
  width: 400px;
}
.ArticleCreate-desc{
  text-align: left;
}
.ArticleCreate-desc-input{
  display: inline-block;
  margin-right: 10px;
  font-size: 16px;
  color: #333;

}
.ArticleCreate-desc-input-cascader{
  display: inline-block;
  font-size: 16px;
  color: #333;
  width: 200px;
}
.ArticleCreate-text{
  text-align: left;
}
.ArticleCreate-text-input{
  display: inline-block;
  margin-right: 10px;
  font-size: 16px;
  color: #333;

}
.ArticleCreate-text-input-textarea textarea{
  resize:none;
}
.ArticleCreate-button{
  display: flex;
  margin-top: 30px;
  justify-content: center;
}
.ArticleCreate-button .el-button{
  margin: 0 10px;
}
</style>