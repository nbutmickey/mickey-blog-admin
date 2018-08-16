<template>
    <nav>
      <el-row class="tac">
        <el-col :span="24">
          <el-menu>
            <el-menu-item index="1" @click="goto('/backStage/articleManage')">
              <i class="fa fa-line-chart"></i>
              <span>文章管理</span>
            </el-menu-item>
            <el-menu-item index="2" @click="goto('/backStage/articleRelease')">
              <i class="fa fa-send"></i>
              <span>文章发布</span>
            </el-menu-item>
            <el-menu-item index="3" @click="goto('/backStage/tagsManage')">
              <i class="fa fa-tags"></i>
              <span>标签管理</span>
            </el-menu-item>
            <el-menu-item index="4" @click="goto('/backStage/messageManage')">
              <i class="fa fa-comment"></i>
              <span>留言管理</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </nav>
</template>

<script>
    export default {
        name: "navBar",
        methods:{
          goto:function(path){
            this.$router.push(path);
          }
        }
    }
</script>

<style scoped lang="scss">
  @import "../style/var";
        .is-active {
          color: $green !important;
        }
</style>
