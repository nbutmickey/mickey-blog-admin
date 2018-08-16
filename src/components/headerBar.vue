<template>
    <header>
      <div class="content">
        <div class="logo">米奇的博客</div>
        <div class="uinfo">
          <div class="uname"><i class="fa fa-user"></i> 米奇</div>
          <div class="logout" @click="logout">
            <i class="fa fa-sign-out"></i> 退出
          </div>
        </div>
      </div>
    </header>
</template>

<script>
    export default {
        name: "headerBar",
        methods:{
          logout:function () {
            sessionStorage.setItem('Token','');
            this.$router.push('/login');
          }
        }
    }
</script>

<style scoped lang="scss">
  @import "../style/var";
  header{
    width: 100%;
    height: 60px;
    background-color: $green;
    line-height: 60px;
    color: $white;
    .content{
      width: 100%;
      padding: 0 20px;
      height: 60px;
      margin: 0 auto;
      display: flex;
      .logo{
        flex: 4;
      }
      .uinfo{
        font-size: 0.8rem;
        display: flex;
        flex:8;
        justify-content: flex-end;
        .uname{
          margin-right: 20px;
        }
        .logout{
          padding: 0 10px;
          &:hover{
            background-color: $deep-green;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
