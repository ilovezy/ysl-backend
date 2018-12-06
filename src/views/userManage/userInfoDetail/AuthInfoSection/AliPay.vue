<!--TODO-->
<template>
  <div class='main-section'
       v-loading='loading'>
    <div v-if='showResult'>
      <div class='no-data'
           style='padding: 150px;text-align: center;font-size: 20px;color: #999;'
           v-if='isEmpty'>
        暂无数据
      </div>

      <div v-else
           class='section-info-container'>
        <cc-panel title='支付宝基本信息'
                  :subTitle='"信息获取时间：" + userInfo.createAt'>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class='simple-text'>用户姓名：{{userInfo.user_name}}</div>
              <div class='simple-text'>是否实名：{{userInfo.certified ? '经过认证' : '未经过认证'}}</div>
              <div class='simple-text'>绑定的手机号：{{userInfo.phone_number}}</div>
              <div class='simple-text'>
                身份证号：{{userInfo.idcard_number}}
              </div>
            </el-col>
            <el-col :span="8">
              <div class='simple-text'>支付宝注册日期：{{formatSpeDate(userInfo.register_time)}}</div>
              <div class='simple-text'>芝麻分：{{zmScore}}</div>
            </el-col>
          </el-row>
        </cc-panel>

        <cc-panel title='资产状况信息'>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class='simple-text'>账户余额：{{formatMoney(wealth.yue)}}</div>
              <div class='simple-text'>余额宝金额：{{formatMoney(wealth.yeb)}}</div>
              <div class='simple-text'>招财宝金额：{{formatMoney(wealth.zcb)}}</div>
              <div class='simple-text'>存金宝金额：{{formatMoney(wealth.cjb)}}</div>
            </el-col>
            <el-col :span="8">
              <div class='simple-text'>花呗授信额度：{{formatMoney(wealth.huabai_limit)}}</div>
              <div class='simple-text'>当前可用额度：{{formatMoney(wealth.huabai_balance)}}</div>
              <div class='simple-text'>当前是否有逾期：{{wealth.huabei_overdue ? '逾期' : '未逾期'}}</div>
              <div class='simple-text'>花呗逾期金额：{{formatMoney(wealth.huabei_overdue_amount)}}</div>
            </el-col>
            <el-col :span="8">
              <div class='simple-text'>是否已开通借呗 ：{{alipayJiebei.new_able ? '未开通' : '已开通'}}</div>
              <div class='simple-text'>借呗授信额度：{{formatMoney(alipayJiebei.credit_amt)}}</div>
              <div class='simple-text'>当前可用额度：{{formatMoney(alipayJiebei.loanable_amt)}}</div>
              <div class='simple-text'>日利率：{{alipayJiebei.risk_int_by_thousand || 0}}万</div>
              <div class='simple-text'>当前是否有逾期：{{alipayJiebei.ovd_able ? '是' : '否'}}</div>
            </el-col>
          </el-row>
        </cc-panel>

        <cc-panel title='银行卡信息'>
          <el-table
            :data="bankInfo"
            tooltip-effect="dark"
            style="width: 100%;"
            max-height='400'>
            <el-table-column show-overflow-tooltip
                             prop="bank_name"
                             width='200'
                             label="该银行卡的银行名称">
            </el-table-column>
            <el-table-column show-overflow-tooltip
                             prop="card_type"
                             width='140'
                             label="该银行卡类型">
            </el-table-column>
            <el-table-column show-overflow-tooltip
                             prop="user_name"
                             width='200'
                             label="该银行卡绑定的姓名">
            </el-table-column>
            <el-table-column show-overflow-tooltip
                             prop="mobile"
                             width='200'
                             label="该银行卡预留的手机号码">
            </el-table-column>
            <el-table-column show-overflow-tooltip
                             prop="card_number"
                             width='140'
                             label="该银行卡后4位">
            </el-table-column>
            <el-table-column show-overflow-tooltip
                             prop="open_fpcard"
                             width='200'
                             label="是否已开通快捷支付">
              <template slot-scope="scope">
                {{scope.row.open_fpcard ? '已开通' : '未开通'}}
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip
                             prop="active_date"
                             label="该银行卡绑定的时间">
              <template slot-scope="scope">
                {{formatSpeDate(scope.row.active_date)}}
              </template>
            </el-table-column>
          </el-table>
        </cc-panel>

        <cc-panel title='收货地址信息'>
          <el-table
            :data="alipayDeliverAddresses"
            tooltip-effect="dark"
            style="width: 100%;"
            max-height='600'>
            <el-table-column show-overflow-tooltip
                             prop="name"
                             width='200'
                             label="收件人姓名">
            </el-table-column>
            <el-table-column
                             label="省 / 市 / 区"
                             width='200'
                             show-overflow-tooltip>
              <template slot-scope="scope">
                {{scope.row.province}} {{scope.row.city}} {{scope.row.area}}
              </template>
            </el-table-column>
            <el-table-column
              prop="address"
              show-overflow-tooltip
              label="详细地址">
            </el-table-column>
            <el-table-column
              prop='phone_number'  width='200'
              label="收件人手机号码"
              show-overflow-tooltip>
            </el-table-column>
          </el-table>
        </cc-panel>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loading: false,
        isEmpty: false,
        showResult: false,

        alipayDeliverAddresses: [],
        alipayJiebei: {},
        bankInfo: [],
        userInfo: {},
        wealth: {},
        zmScore: ''
      }
    },

    props: {
      memberId: {
        default: ''
      }
    },

    created() {
      console.log('ali: ', this.memberId)
      this.getDetail()
    },

    methods: {
      formatSpeDate,
      formatMoney,
      getDetail() {
        const self = this
        self.loading = true
        AXIOS.post('/auth/moxieInfo/alipayData', {
          memberId: Number(this.memberId)
        }).then(res => {
          if (_.isEmpty(res)) {
            self.isEmpty = true
          } else {
            self.alipayDeliverAddresses = res.alipayDeliverAddresses || []
            self.alipayJiebei = res.alipayJiebei || {}
            self.bankInfo = res.bankInfo || []
            self.userInfo = res.userInfo || {}
            self.wealth = res.wealth || {}
            self.zmScore = res.zmScore || ''
          }
          self.showResult = true
          self.loading = false
        }).catch((res) => {
          self.showResult = true
          self.loading = false
        })
      }
    }
  }
</script>

<style lang="scss"
       scoped>
  .main-section {
    padding-bottom: 50px;
  }
</style>
