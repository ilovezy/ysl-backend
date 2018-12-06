<template>
  <!--v-permission='["platform:cms:article:create"]'-->
  <div v-if='this.memberId'>
    <el-button size="mini"
               type='primary'
               v-permission='permission.auth'
               @click='goAuthInfo'>认证信息
      <!--platform:member:info:auth-->
    </el-button>
    <el-button size="mini"
               type='warning'
               v-permission='permission.bid'
               @click='openBidInfo'>借款信息
      <!--platform:member:info:loan-->
    </el-button>
    <el-button size="mini"
               type='info'
               v-permission='permission.invest'
               @click='openInvestInfo'>投资信息
      <!--platform:member:info:invest-->
    </el-button>
    <el-button size="mini"
               type='success'
               v-permission='permission.capital'
               @click='openCapitalInfo'>资金详情
      <!--platform:member:info:capital-->
    </el-button>
    <el-button size="mini"
               v-permission='permission.currency'
               @click='openBorrowCurrencyInfo'>借币信息
      <!--platform:member:info:currency-->
    </el-button>

    <el-dialog title="借款信息"
               width='1200px'
               v-if='showBidInfo'
               :append-to-body='true'
               :visible.sync="showBidInfo">
      <bid-info :memberId='memberId'></bid-info>
    </el-dialog>

    <el-dialog title="投资信息"
               width='1200px'
               v-if='showInvestInfo'
               :append-to-body='true'
               :visible.sync="showInvestInfo">
      <invest-info :memberId='memberId'></invest-info>
    </el-dialog>

    <el-dialog title="资金详情"
               width='1200px'
               :append-to-body='true'
               v-if='showCapitalInfo'
               :visible.sync="showCapitalInfo">
      <capital-info :memberId='memberId'></capital-info>
    </el-dialog>

    <el-dialog title="借币信息"
               width='1200px'
               :append-to-body='true'
               v-if='showBorrowCurrencyInfo'
               :visible.sync="showBorrowCurrencyInfo">
      <borrow-currency-info :memberId='memberId'></borrow-currency-info>
    </el-dialog>
  </div>
</template>

<script>
  import BidInfo from './userInfoModal/BidInfo'
  import InvestInfo from './userInfoModal/InvestInfo'
  import CapitalInfo from './userInfoModal/CapitalInfo'
  import BorrowCurrencyInfo from './userInfoModal/BorrowCurrencyInfo'
  import UserPermission from './UserInfoPermission'

  export default {
    components: {
      BidInfo, InvestInfo, CapitalInfo, BorrowCurrencyInfo
    },
    data() {
      return {
        showBidInfo: false,
        showInvestInfo: false,
        showCapitalInfo: false,
        showBorrowCurrencyInfo: false,

        permission: [],
      }
    },
    props: {
      memberId: {
        default: ''
      },
      type: {
        default: '',
        type: String
      }
    },

    created() {
      console.log(this.type, UserPermission)
      if (this.type){
        this.permission = UserPermission[this.type]
      }
    },

    methods: {
      goAuthInfo() {
        this.$router.push('/userManage/AuthInfo/' + this.memberId)
      },
      openBidInfo() {
        this.showBidInfo = true
      },
      openInvestInfo() {
        this.showInvestInfo = true
      },
      openCapitalInfo() {
        this.showCapitalInfo = true
      },
      openBorrowCurrencyInfo() {
        this.showBorrowCurrencyInfo = true
      },
    }
  }
</script>

<style lang="scss"
       scoped>

</style>
