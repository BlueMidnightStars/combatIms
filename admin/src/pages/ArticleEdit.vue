<template>
  <publi>
    <div class="ArticleEdit-section">
      <a href="javascript:;" class="ArticleEdit-return">返回文章列表>></a>
      <div class="ArticleEdit-container">
        <div class="ArticleEdit-title">
          <p class="ArticleEdit-title-input">标题</p>
          <el-input class="ArticleEdit-title-input-text" style="width:400px"  v-model="title" placeholder="请输入内容"></el-input>
        </div>
        <div class="ArticleEdit-desc">
          <p class="ArticleEdit-desc-input">
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
        <div class="ArticleEdit-text">
          <p class="ArticleEdit-text-input">
            内容
          </p>
          <el-input
            class="ArticleEdit-text-input-textarea"
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="content">
          </el-input>
        </div>
        <div class="ArticleEdit-button">
          <el-button class="ArticleEdit-button-save" type="primary" @click="save">保存</el-button>
          <el-button class="ArticleEdit-button-cancel" type="primary" @click="abolish">取消</el-button>
        </div>
      </div>
    </div>
  </publi>
</template>

<script>
import publi from '@/components/public';
import axios from '@/models/request';


export default {
  name: 'ArticleEdit',
  data(){
    return{
      id:'',
      input:'',
      data:[],
      class_data:[],
      class_id:null,
      content:'',
      title:'',
    }
  },
  created:async function () {
    console.log(this.$route.params.id);
    let id = this.$route.params.id;
    this.id = id;
    axios.get('http://localhost:3000/api/api/article/' + id).then(res =>{
      this.data = res.data.data;
      this.content = res.data.data[0].content;
      this.title = res.data.data[0].title;
      this.class_id =  res.data.data[0].class_id;
      return axios.get('http://localhost:3000/api/api/classify')
    }).then((res)=>{
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
      let token = localStorage.getItem('token');
      console.log(token);
      let id = this.id;
      axios.put('http://localhost:3000/api/api/article' + id, {
        class_id:class_id,
        content:content,
        title:title
      }).then(res =>{
        console.log(res);
        if(res.data.code == 200){
          this.$router.push({name: 'Article'})
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
    },
    abolish:function(){

    }
  },
  components: {
    publi,
  },
};
</script>
<style lang="scss">
.ArticleEdit-section{

}
.ArticleEdit-return{
  display: block;
  text-decoration: none;
  color: #333;
  margin-right: 0;
  text-align: right;
  margin-bottom: 30px;
}
.ArticleEdit-title{
  text-align: left;
}
.ArticleEdit-title-input{
  display: inline-block;
  margin-right: 10px;
  font-size: 16px;
  color: #333;

}
.ArticleEdit-title-input-text{
  display: inline-block;
  font-size: 16px;
  color: #333;
  width: 400px;
}
.ArticleEdit-desc{
  text-align: left;
}
.ArticleEdit-desc-input{
  display: inline-block;
  margin-right: 10px;
  font-size: 16px;
  color: #333;

}
.ArticleEdit-desc-input-cascader{
  display: inline-block;
  font-size: 16px;
  color: #333;
  width: 200px;
}
.ArticleEdit-text{
  text-align: left;
}
.ArticleEdit-text-input{
  display: inline-block;
  margin-right: 10px;
  font-size: 16px;
  color: #333;

}
.ArticleEdit-text-input-textarea textarea{
  resize:none;
}
.ArticleEdit-button{
  display: flex;
  margin-top: 30px;
  justify-content: center;

}
</style>