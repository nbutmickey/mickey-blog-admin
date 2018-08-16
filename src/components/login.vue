<template>
    <div class="login">
      <div class="login-form">
        <div class="title">米奇博客后台管理系统</div>
        <div class="tips" v-if="showTips">{{tips}}</div>
        <div class="item">
          <el-input type="text" placeholder="用户名" v-model="userName"></el-input>
        </div>
        <div class="item">
          <el-input type="password" placeholder="密码" v-model="passWord"></el-input>
        </div>
        <div class="item">
          <el-button type="primary" :loading="isLoading"  v-if="signType==='login'" @click="confirm" >登录</el-button>
          <el-button type="success"  :loading="isLoading" v-else-if="signType==='regist'" @click="confirm" >注册</el-button>
        </div>
        <div class="item">
          <a v-show="signType==='login'" @click="changeButton">注册成为管理员</a>
          <a v-show="signType==='regist'" @click="changeButton">已有账号，返回登录</a>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "login",
        data(){
          return{
            userName:'',
            passWord:'',
            tips:'',
            signType:'login',
            showTips:false,
            isLoading:false
          }
        },
        methods:{
          confirm: function(){
            if(this.userName===''){
              this.tips='用户名不能为空';
              this.showTips=true;
            }else if(this.passWord===''){
              this.tips='密码不能为空';
              this.showTips=true;
            }else {
              this.isLoading = true;
              this.$http.post('/api/admin/confirm', {
                params: {
                  username: this.userName,
                  password: this.passWord,
                  type: this.signType
                }
              }).then(res => {
                if (res.data.success) {
                  sessionStorage.setItem('Token', res.data.token);
                  this.$router.push('/backStage');
                }
                this.tips = res.data.message;
                this.showTips = true;
                this.isLoading = false;
              });
            }
           },
          changeButton:function () {
            this.signType=this.signType==='login'?'regist':'login';
            this.showTips=false;
          }
        }
    }
</script>

<style scoped lang="scss">
  @import "../style/var";
  .login{
    .login-form{
    position: fixed;
    top: 50%;
    left: 50%;
    width: 450px;
    padding: 20px;
    box-shadow: 0 0 30px #efefefef;
    border-top:4px solid $base-color;
    transform: translate(-50%,-50%);
    .tips{
      width: 100%;
      height: 30px;
      border-left: 4px solid $red;
      line-height: 30px;
      padding-left: 10px;
      color: $red;
      margin-bottom: 15px;
      font-size: 0.8rem;
    }
    .title{
      font-size: 1.5rem;
      text-align: center;
      margin-bottom: 30px;
      color: $base-color;
    }
    .item{
      margin-bottom: 30px;
      &:last-child{
        margin-bottom: 0;
        text-align: center;
        a{
          font-size: 0.5rem;
          cursor: pointer;
          &:hover{
            color: #136c7e;
          }
        }
      }
      .el-button--primary {
        color: #fff;
        background-color: #177b8f;
        border-color: #177b8f;
        &:hover{
          opacity: 0.8;
        }
      }
    }
      button{
        width: 100%;
      }
  }
}
@media screen and (max-width: 768px){
  .login{
    .login-form{
      width: 80%;
    }
  }
}

</style>
