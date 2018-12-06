<template>
  <div class="app-container">
    <h1>welcome to 闪电借条系统</h1>
    <div v-if='isDev'>
      <el-button @click='failBid'>流标标的</el-button>
      <el-button @click='overdueBid'>逾期标的</el-button>
      <el-button @click='repayNotice'>标的还款提醒</el-button>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'dashboard',
    data() {
      return {}
    },
    created() {
    },
    computed: {
      isDev() {
        return window.CurrentEnv != 'production'
      }
    },
    methods: {
      failBid(){
        AXIOS.post('/auth/jobHandHandle/failBid')
      },
      overdueBid(){
        AXIOS.post('/auth/jobHandHandle/overdueBid')
      },
      repayNotice(){
        AXIOS.post('/auth/jobHandHandle/repayNotice')
      },
  // /auth/jobHandHandle/failBid
  // /auth/jobHandHandle/overdueBid
  // /auth/jobHandHandle/repayNotice
    }
  }
</script>

<style scoped>
  h1 {
    text-align: center;
    font-size: 40px;
    margin-top: 50px;
    color: #000;
  }
</style>
