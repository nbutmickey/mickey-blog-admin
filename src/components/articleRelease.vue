<template>
    <section>
      <el-form size="mini"  :label-width="formWidth">
        <el-form-item label="文章标题">
          <el-input placeholder="请输入标题" v-model="title"></el-input>
        </el-form-item>
        <el-form-item label="文章描述">
          <el-input placeholder="请输入描述内容" v-model="desc"></el-input>
        </el-form-item>
        <el-form-item label="标签选择">
          <el-checkbox-group v-model="checkInTagsList" :max="3" >
            <el-checkbox-button @change="checkTagsList" style="margin: 5px 2px;" v-for="(item,index) in tags" :key="index" :label="item"  name="type" >{{item.tag}}</el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="文章展示图">
          <el-upload :action="domain"  :data="form"  :on-success="handlePictureSuccess">
            <el-button size="mini"  type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="文章编辑">
          <mavon-editor v-model="value" ref=med @imgAdd="$imgAdd"></mavon-editor>
        </el-form-item>
        <el-form-item>
          <el-button type="success" size="medium" @click="upLoadArticle">点击发布</el-button>
          <el-button type="primary" size="medium">存为草稿</el-button>
        </el-form-item>
      </el-form>
    </section>
</template>

<script>
  let md = require('markdown-it')().use(require('markdown-it-mark'));
  import {articleRelease} from "../utils/bread";
  import {mapMutations} from 'vuex'
    export default {
        name: "articleRelease",
        data(){
          return{
            domain:'http://upload.qiniup.com/',//七牛云的上传地址
            formWidth:'90px',
            value:'',
            title:'',
            desc:'',
            form:{
              token:''
            },//存储token
            fileList2:[],
            tags:[],
            contentHtml:'',
            checkInTagsList:[],
            ImgSrc:'',
            newArticle:{
              newTitle:'',
              newDesc:'',
              newTags:[],
              newContent:'',
              newTime:'',
              newImgSrc:''
            }
          }
        },
        created(){
          this.beforeUploadPicture();
        },
        mounted(){
          this.setCurBread(articleRelease);
          this.getAllTags();
        },
        methods:{
          ...mapMutations({
            setCurBread:'setCurBread'
          }),
          $imgAdd:function(pos,$file){
            let $vm=this.$refs.med;
            let formdata = new FormData();
            formdata.append('file', $file);
            formdata.append('token', this.form.token);
            this.$http.post(this.domain,formdata, {headers:{
                'Content-Type':'multipart/form-data'
              },
            }).then((res)=>{
              let url='http://pdj4ekt0a.bkt.clouddn.com/'+res.data.key;
              $vm.$img2Url(pos, url);
            })
          },
          //上传文章
          upLoadArticle:function(){
            this.$confirm('确定发布这篇文章到互联网吗？','提示',{
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(
              ()=>{
                this.contentHtml=md.render(this.value);
                this.newArticle.newTitle=this.title;
                this.newArticle.newDesc=this.desc;
                this.newArticle.newTags=this.checkInTagsList;
                this.newArticle.newContent=this.contentHtml;
                this.newArticle.newTime=new Date().getTime();
                this.newArticle.newImgSrc=this.ImgSrc;
                this.$http.post('/api/admin/addArticle',{params:{newArticle:this.newArticle}}).then(res=>{
                    this.$message({
                      message: res.data.message,
                      duration: 2000,
                      type: res.data.success?'success':'error'
                    });
                })
              }
            );
          },
          //标签选择判断
          checkTagsList:function(){
            console.log(this.checkInTagsList);
          },
          // 上传成功后的回调函数
          handlePictureSuccess:function(res){
                this.ImgSrc='http://pdj4ekt0a.bkt.clouddn.com/'+res.key;
          },
          //上传之前获取token
          beforeUploadPicture:function() {
            // 获取后端Token
            this.$http.get('/api/admin/token').then(res => {
              this.form.token = res.data.token;
            })
          },
          //获取当前所有标签
          getAllTags:function () {
            this.$http.get('/api/getTagsAll').then(
              res=>{
                this.tags=res.data;
              }
            );
          }
        }
    }
</script>

<style scoped>

</style>
