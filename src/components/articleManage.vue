<template>
    <section style="font-size: 0.6rem">
      <el-table :data="tableData" stripe style="width: 100%" height="425">
        <el-table-column type="index"  label="序号"  align="center"></el-table-column>
        <el-table-column prop="title" label="文章标题"   align="center" width="180"></el-table-column>
        <el-table-column prop="tags" label="标签"   align="center"></el-table-column>
        <el-table-column prop="date" label="日期"  align="center"></el-table-column>
        <el-table-column prop="readNum" label="阅览数"  align="center"></el-table-column>
        <el-table-column  label='操作' align="center" width="180">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="goToPath(scope.row.postId)">编辑</el-button>
            <el-button  size="mini" type="danger" icon="el-icon-delete"  @click="deleteArticle(scope.row.postId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>

</template>

<script>
    import {articleManage} from "../utils/bread";
    import {mapMutations} from 'vuex';
    import {formatTime} from '../utils/formDate';
    export default {
      name: "articleManage",
        data(){
          return{
            tableData: [],
            dialogFormVisible:false,
            article: {
              postId:0,
              title: '',
              des: ''
            },
          }
        },
        mounted(){
          this.setCurBread(articleManage);
          this.getArticleAll();
        },
        methods:{
          ...mapMutations({
            setCurBread:'setCurBread'
          }),
          goToPath:function(postId){
            console.log(postId);
            this.$router.push({name:'articleEdit',params:{postId:postId}});
          },
          updateArticle:function(){
            this.$confirm('此操作将会修改这篇文章, 是否继续?','提示',{
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(()=>{
              this.$http.post('/api/admin/updateArticle',{params:{
                  title:this.article.title,
                  des:this.article.des,
                  lastModify:new Date().getTime(),
                  postId:this.article.postId
                }}).then(res=>{
                  if(res.data.success){
                    this.$message({
                      message: '修改成功',
                      duration: 2000,
                      type: 'success'
                    });
                  this.dialogFormVisible=false;
                  this.getArticleAll();
                  }
              })
            }).catch(()=>{
              this.$message({
                type: 'info',
                message: '已取消编辑'
              });
            })
          },
          deleteArticle:function(postId){
            this.$confirm('此操作将永久删除该文章, 是否继续?','提示',{
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(()=> {
              this.$http.post('/api/admin/deleteArticle', {params: {postId: postId}}).then(res => {
                if (res.data.success) {
                  this.$message({
                    message: '删除成功',
                    duration: 2000,
                    type: 'success'
                  });
                  this.getArticleAll();
                }
              })
              }
            )
          },
          getArticleAll:function (){
            this.$http.get('/api/getArticle').then(res=>{
              this.tableData=res.data;
              for(let i=0;i<this.tableData.length;i++){
                this.tableData[i].date=this.time(res.data[i].date);
                this.tableData[i].readNum=parseInt(res.data[i].readNum);
              }
            })
          },
          time:function (times) {
            return formatTime(times,'yyyy-mm-dd')
          }
        },
    }
</script>

<style scoped lang="scss">
</style>
