<template>
  <div class="app-container asset-detail-page">
    <cc-panel title='账户信息'>
      <div class='simple-item'>商户名称：{{detail.businessName || ''}}</div>
      <div class='simple-item'>
        <span class='list-item'>账户可用余额：{{detail.accountAvailableBalance || 0}}元</span>
        <span class='list-item'>借币余额：{{detail.borrowingBalance || 0}}个</span>
      </div>
    </cc-panel>

    <cc-panel title='投资信息'>
      <div class='simple-item'>
        <div class='simple-item'>
        累计成功投资本金：{{detail.accumulatedSuccessfulInvestmentPrincipal || 0}}元
        </div>
        <div class='simple-item'>
          <span class='list-item'>已回款本金：{{detail.returnedPrincipal || 0}}元 </span>
          <span class='list-item'>待收本金：{{detail.pendingPrincipal || 0}}元 </span>
          <span class='list-item'>逾期中全部本金：{{detail.allPrincipalsOverdue || 0}}元</span>
          <span class='list-item'>逾期30天以上本金：{{detail.overduePrincipalForMoreThan30Days || 0}}元</span>
        </div>
      </div>
      <hr>
      <div class='simple-item'>
        <span class='list-item'>获得打赏红包：{{detail.rewardRedEnvelope || 0}}元</span>
        <span class='list-item'>已回款利息：{{detail.returnedInterest || 0}}元</span>
        <span class='list-item'>待收利息：{{detail.interestToBeReceived || 0}}元</span>
      </div>
    </cc-panel>

    <cc-panel title='充值 / 提现信息'>
      <div class='simple-item'>累计充值金额：{{detail.accumulatedRechargeAmount || 0}}元</div>
      <div class='simple-item'>累计提现成功金额：{{detail.cumulativeCashWithdrawalAmount || 0}}元</div>
    </cc-panel>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        memberId: '',
        detail: {}
      }
    },

    created() {
      let params = this.$route.params || {}
      this.memberId = params.memberId
      this.getDetail()
    },

    methods: {
      getDetail() {
        const self = this
        self.detailLoading = true
        AXIOS.post('/auth/merchant/queryAssetDetails', {
          memberId: self.memberId
        }).then(res => {
          self.detail = res || {}
        }).catch((res) => {
        })
      },
    }
  }
</script>

<style lang="scss"
       scoped>
.asset-detail-page {
  .simple-item {
    margin: 20px 0;
    .list-item{
      display: inline-block;
      margin-right: 40px;
    }
  }
}
</style>
