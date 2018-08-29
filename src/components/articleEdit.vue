<template>
    <section>
      <el-form size="mini" label-width="90px">
        <el-form-item label="文章标题">
          <el-input  v-model="title"></el-input>
        </el-form-item>
        <el-form-item label="文章描述">
          <el-input  v-model="desc"></el-input>
        </el-form-item>
        <el-form-item label="文章编辑">
          <mavon-editor v-model="value" ref=med @imgAdd="$imgAdd" :codeStyle="'solarized-dark'" ></mavon-editor>
        </el-form-item>
        <el-form-item>
          <el-button type="success" size="medium" @click="updateArticle">提交修改</el-button>
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
            desc:'',
            form:{
              token:''
            },//存储token
          }
        },
        created(){
          this.beforeUploadPicture();
          this.getArticlesWithDesc();
        },
        methods:{
          getArticlesWithDesc:function () {
            this.$http.get('/api/getArticleDetails',{params:{postId:this.$route.params.postId}}).then((res)=>{
              this.title=res.data.title;
              this.desc=res.data.des;
              this.value=res.data.detail;
            })
          },
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
          //上传之前获取token
          beforeUploadPicture:function() {
            // 获取后端Token
            this.$http.get('/api/admin/token').then(res => {
              this.form.token = res.data.token;
            })
          },
          updateArticle:function () {
            this.$http.post('/api/admin/updateArticle',{params:{
                title:this.title,
                des:this.desc,
                content:this.value,
                lastModify:new Date().getTime(),
                postId:this.$route.params.postId
              }}).then(res => {
                if(res.data.success){
                  this.$message({
                    showClose: true,
                    message: '恭喜你完成修改！',
                    type: 'success'
                  });
                  this.title='';
                  this.desc='';
                  this.value='';
                }
            })
          }
        }
    }
</script>

<style scoped>

</style>
