<template>
    <section>
      <el-button @click="testEmail">点击发送邮件</el-button>
    </section>
</template>

<script>
  import{ messageManage } from "../utils/bread";
  import {mapMutations} from 'vuex'
    export default {
        name: "messageManage",
        mounted(){
        this.setCurBread(messageManage)
        },
        methods:{
          ...mapMutations({
            setCurBread:'setCurBread'
          }),
          testEmail:function () {
            this.$http.post('/api/admin/sendEmail').then(res=>{
              if(res.data.success){
               alert(res.data)
              }
            })
          }
        }
    }
</script>

<style scoped>

</style>
