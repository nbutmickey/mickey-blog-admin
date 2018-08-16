<template>
    <section>这里是留言管理界面</section>
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
          })
        }
    }
</script>

<style scoped>

</style>
