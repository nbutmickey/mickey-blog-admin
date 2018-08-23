<template>
    <section style="font-size: 12px">
      <el-tabs :tab-position="tabPosition">
        <el-tab-pane label="新增标签"  style="padding: 20px 100px">
          <el-form size="small" label-width="100px" :model="tagValidate" ref="tagValidate">
            <el-form-item label="标签名称" prop="tag"
                          :rules="[{ required: true, message: '标签名称不能为空'},{ type: 'string', message: '标签必须为字符串'}]">
              <el-input type="tag" v-model.string="tagValidate.tag" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item style="margin-top: 40px">
              <el-button type="primary" @click="submitTag('tagValidate')">提交</el-button>
              <el-button @click="resetTag('tagValidate')">重置</el-button>
              <el-button type="success" @click="goToPath">发表文章</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="标签管理">
          <el-table :data="tableData" stripe style="width: 100%" height="425">
            <el-table-column type="index"  label="序号"  align="center"></el-table-column>
            <el-table-column prop="tag" label="标签名"   align="center"></el-table-column>
            <el-table-column  label='操作' align="center" width="180">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" icon="el-icon-edit" @click="openDialog(scope.row)">编辑</el-button>
                <el-button  size="mini" type="danger" icon="el-icon-delete" @click="deleteTag(scope.row.tagId)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <!--标签修改对话框-->
      <el-dialog title="标签名称修改" :visible.sync="dialogFormVisible">
        <el-form v-model="tags">
          <el-form-item label="文章标题">
            <el-input v-model="tags.tag" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button  type="primary" @click="editTag">提交修改</el-button>
        </div>
      </el-dialog>
    </section>
</template>

<script>
  import {tagsManage} from "../utils/bread";
  import {mapMutations} from 'vuex'
    export default {
        name: "tagsManage",
        data(){
          return{
            tabPosition:'left',
            dialogFormVisible: false,
            tableData:[],
            tagValidate:{
              tag:''
            },
            tags:{
              tagId:0,
              tag:''
            }
          }
        },
        mounted(){
          this.setCurBread(tagsManage);
          this.getAllTags();
        },
        methods:{
          ...mapMutations({
            setCurBread:'setCurBread'
          }),
          goToPath:function(){
            this.$router.push('/backStage/articleRelease');
          },
          openDialog:function(item){
            console.log(item);
            this.tags.tagId=item.tagId;
            this.tags.tag=item.tag;
            this.dialogFormVisible=!this.dialogFormVisible;
          },
          editTag:function(){
            this.$confirm('此操作将会修改这个标签, 是否继续?','提示',{
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(()=>{
              this.$http.post('/api/admin/updateTag',{params:{
                  tag:this.tags.tag,
                  tagId:this.tags.tagId,
                }}).then(res=>{
                if(res.data.success){
                  this.$message({
                    message: '修改成功',
                    duration: 2000,
                    type: 'success'
                  });
                  this.dialogFormVisible=false;
                  this.getAllTags();
                }
              })
            });
          },
          deleteTag:function(tagId){
             this.$confirm('此操作将会删除该标签,是否继续？','提示',{
               confirmButtonText: '确定',
               cancelButtonText: '取消',
               type: 'warning'
             }).then(()=>{
               this.$http.post('/api/admin/deleteTag',{params:{tagId:tagId}}).then(res=>{
                 if(res.data.success){
                   this.$message({
                     message: '删除成功',
                     duration: 2000,
                     type: 'success'
                   });
                   this.getAllTags();
                 }
               });
             })
          },
          submitTag:function(formName){
              this.$refs[formName].validate((valid)=>{
                if(valid){
                  this.$http.post('/api/admin/addTag',{params:{
                    tag:this.tagValidate.tag
                    }}).then(res=>{
                      if(res.data.success){
                        this.getAllTags();
                        this.$refs[formName].resetFields();
                      }
                      this.$message({
                      message:res.data.message,
                      duration: 2000,
                      type: 'success'
                    });
                  })
                } else{
                  return false;
                }
              })
          },
          resetTag:function(formName){
            this.$refs[formName].resetFields();
          },
          getAllTags:function () {
            this.$http.get('/api/getTagsAll').then(
              res=>{
                console.log(res.data);
                this.tableData=res.data;
              }
            );
          }
        }
    }
</script>

<style scoped lang="scss">
  .el-tabs__nav {
    .el-tabs__item, .is-left,.is-active{
      font-size: 12px !important;
      padding: 0 20px 0 0 !important;
    }
  }
</style>
