<template>
  <div class="backStage">
   <nav-header></nav-header>
   <div class="body">
     <div class="nav">
       <NavLeft></NavLeft>
     </div>
     <div class="container">
       <el-card class="box-card" shadow="hover" body-style="padding:12px">
        <el-breadcrumb separator="/" style="font-size: 0.7rem">
          <el-breadcrumb-item v-for="(item,index) in curBread" :key="index" :to="{'path':item.path}">{{item.text}}</el-breadcrumb-item>
         </el-breadcrumb>
       </el-card>
       <router-view></router-view>
     </div>
   </div>
  </div>
</template>

<script>
    import NavHeader from './headerBar'
    import NavLeft from './navBar'
    import { mapGetters } from 'vuex'
    export default {
        name: "backStage",
        computed:{
          ...mapGetters(['curBread'])
        },
        components:{
          NavHeader,
          NavLeft
        }
    }
</script>

<style scoped lang="scss">
  .body{
    width: 100%;
    display: flex;
    .nav{
      width: 180px;
      overflow: hidden;
      padding: 10px 0;
      nav {
        .el-menu {
          .el-menu-item {
            font-size: 0.75rem !important;
          }
        }
      }
    }
    .container{
      flex: 1;
      padding: 10px;
      overflow: hidden;
      font-size: 10px;
    }
  }
</style>
