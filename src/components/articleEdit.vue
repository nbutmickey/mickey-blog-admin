<template>
    <section>
      <el-form size="mini" label-width="90px">
        <el-form-item label="文章标题">
          <el-input  v-model="title"></el-input>
        </el-form-item>
        <el-form-item label="文章描述">
          <el-input  v-model="desc"></el-input>
        </el-form-item>
        <!--<el-form-item label="标签选择">-->
          <!--<el-checkbox-group v-model="checkInTagsList" :max="3" >-->
            <!--<el-checkbox-button  style="margin: 5px 2px;" v-for="(item,index) in tags" :key="index" :label="item"  name="type" ><i class="fa fa-tag"></i> {{item.tag}}</el-checkbox-button>-->
          <!--</el-checkbox-group>-->
          <!--<el-button type="success" @click="goToPath"><i class="el-icon-plus"></i> 新增标签</el-button>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="文章展示图">-->
          <!--<el-upload :action="domain"  :data="form"  :on-success="handlePictureSuccess">-->
            <!--<el-button size="mini"  type="primary">点击上传</el-button>-->
          <!--</el-upload>-->
        <!--</el-form-item>-->
        <el-form-item label="文章编辑">
          <mavon-editor v-model="value" ></mavon-editor>
        </el-form-item>
        <el-form-item>
          <el-button type="success" size="medium" >提交修改</el-button>
          <!--<el-button type="primary" size="medium">存为草稿</el-button>-->
          <!--<el-button  size="medium">上传md文件</el-button>-->
        </el-form-item>
      </el-form>
    </section>
</template>

<script>
    export default {
        name: "articleEdit",
        data(){
          return{
            value:'',
            title:'',
            desc:''
          }
        },
        created(){
          this.getArticlesWithDesc();
        },
        methods:{
          getArticlesWithDesc:function () {
            this.$http.get('/api/admin/editArticle',{params:{postId:this.$route.params.postId}}).then((res)=>{
              let article=res.data.article;
              this.title=article.title;
              this.desc=article.des;
              this.value=article.detail;
            })
          }
        }
    }
</script>

<style scoped>

</style>
