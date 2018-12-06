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
        <cc-panel title='京东基本信息'
                  :subTitle='"信息获取时间：" + userinfo.createAt'>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class='simple-text'>用户姓名：{{userinfo.real_name}}</div>
              <div class='simple-text'>性别：{{genderMap[userinfo.gender] || userinfo.gender}}</div>
              <div class='simple-text'>身份证号：{{userinfo.card_number}}</div>
              <div class='simple-text'>手机号：{{userinfo.phone_number}}</div>
            </el-col>
            <el-col :span="8">
              <div class='simple-text'>小白信用分：{{userinfo.xb_credit}}</div>
              <div class='simple-text'>京享值：{{userinfo.jxz}}</div>
            </el-col>
          </el-row>
        </cc-panel>

        <cc-panel title='资产信息'>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class='simple-text'>总资产： {{wealth.total_money}}元</div>
              <div class='simple-text'>理财金额：{{wealth.fund}}元</div>
              <div class='simple-text'>小金库金额： {{wealth.balance}}元</div>
              <div class='simple-text'>钱包可用余额：{{wealth.wallet_money}}元</div>
            </el-col>
            <el-col :span="8">
              <div class='simple-text'>白条总额度：{{wealth.credit_limit}}元</div>
              <div class='simple-text'>白条可用额度：{{wealth.available_limit}}元</div>
              <div class='simple-text'>白条逾期金额：{{wealth.delinquency_balance}}元</div>
            </el-col>
            <el-col :span="8">
              <div class='simple-text'>金条总额度：{{wealth.jtcredit_limit}}元</div>
              <div class='simple-text'>金条可用额度：{{wealth.jtavailable_limit}}元</div>
            </el-col>
          </el-row>
        </cc-panel>

        <cc-panel title="用户交易信息"
                  :subTitle="'共' + tradeDetailList.length + '件商品'">
          <el-table
            :data="tradeDetailList"
            tooltip-effect="dark"
            style="width: 100%;"
            max-height='600'>
            <el-table-column show-overflow-tooltip
                             prop="id"
                             width='80'
                             label="id">
            </el-table-column>
            <el-table-column show-overflow-tooltip
                             prop="trade_id"
                             width='140'
                             label="交易id">
            </el-table-column>
            <el-table-column show-overflow-tooltip
                             prop='trade_time'
                             label="交易日期"
                             width='230'>
              <template slot-scope="scope">
                {{formatSpeDate(scope.row.trade_time)}}
              </template>
            </el-table-column>
            <el-table-column
              width='500px'
              label="商品名称">
              <template slot-scope="scope">
                <div v-for='item,index in scope.row.productNames'
                     style='background: #eaeaea; margin-bottom: 10px; padding: 10px;'
                     :key='"pro" + index'>
                  {{item}}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop='amount'
              width='120px'
              label="交易金额(元)"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop='trade_status'
              :filters="filterSelectData"
              :filter-method="filterTradeStatus"
              filter-placement="bottom-end"
              label="交易状态"
              show-overflow-tooltip>
            </el-table-column>

            <el-table-column
              prop='receiver'
              label="订单的收件人"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop='receive_phone'
              label="收件人手机号码"
              show-overflow-tooltip>
            </el-table-column>
          </el-table>
        </cc-panel>

        <cc-panel title='收货地址信息'>
          <el-table
            :data="deliveraddresses"
            tooltip-effect="dark"
            style="width: 100%;"
            max-height='400'>
            <el-table-column show-overflow-tooltip
                             prop="name"
                             width='130'
                             label="收件人姓名">
            </el-table-column>
            <el-table-column
                             label="收货地址的省份"
                             width='130'
                             show-overflow-tooltip>
              <template slot-scope="scope">
                {{scope.row.province}}
              </template>
            </el-table-column>
            <el-table-column prop='city'
                             label="收货地址的城市"
                             width='130'
                             show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="address"
              width='300'
              show-overflow-tooltip
              label="收货地址">
            </el-table-column>

            <el-table-column
              prop="full_address"
              label="详细地址">
            </el-table-column>

            <el-table-column
              prop='phone_no'
              width='150'
              label="收件人手机号码"
              show-overflow-tooltip>
            </el-table-column>

            <el-table-column
              label="默认收件地址"
              width='120'
              show-overflow-tooltip>
              <template slot-scope="scope">
                {{scope.row.default ? '是' : ''}}
              </template>
            </el-table-column>
          </el-table>
        </cc-panel>

        <cc-panel title='银行卡信息'>
          <el-table
            :data="bindcards"
            tooltip-effect="dark"
            style="width: 100%;"
            max-height='400'>
            <el-table-column show-overflow-tooltip
                             prop="bank_name"
                             width='200'
                             label="银行名称">
            </el-table-column>

            <el-table-column show-overflow-tooltip
                             prop="card_num"
                             width='140'
                             label="卡号末4位">
            </el-table-column>
            <el-table-column show-overflow-tooltip
                             prop="card_type"
                             width='140'
                             label="卡类型">
            </el-table-column>

            <el-table-column show-overflow-tooltip
                             prop="card_name"
                             width='200'
                             label="持卡人">
            </el-table-column>

            <el-table-column show-overflow-tooltip
                             prop="phone_num"
                             label="手机号">
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

        bindcards: [],
        deliveraddresses: {},
        tradeDetailList: [],
        userinfo: {},
        wealth: {},

        genderMap: {
          MALE: '男',
          FEMALE: '女'
        },
        filterSelectData: [
          {text: '已完成', value: '已完成'},
          {text: '充值成功', value: '充值成功'},
          {text: '订单取消', value: '订单取消'},
          {text: '已取消', value: '已取消'}
          // {text: '充值成功', value: '充值成功'},
        ]
      }
    },

    props: {
      memberId: {
        default: ''
      }
    },

    created() {
      this.getDetail()
    },

    methods: {
      filterTradeStatus(value, row) {
        return row.trade_status === value
      },

      formatSpeDate,
      formatMoney,
      getDetail() {
        const self = this
        self.loading = true
        AXIOS.post('/auth/moxieInfo/jdData', {
          memberId: Number(this.memberId)
        }).then(res => {
          if (_.isEmpty(res)) {
            self.isEmpty = true
          } else {
            self.bindcards = res.bindcards || []
            self.deliveraddresses = res.deliveraddresses || []
            self.tradeDetailList = res.tradeDetailList || []
            self.userinfo = res.userinfo
            self.wealth = res.wealth
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
