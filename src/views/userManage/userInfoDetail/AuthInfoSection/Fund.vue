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
        <cc-panel title='个人基本信息'
                  :subTitle='"信息获取时间：" + user_info.createAt'>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class='simple-text'>姓名：{{user_info.real_name}}</div>
              <div class='simple-text'>手机号：{{user_info.mobile}}</div>
              <div class='simple-text'>身份证号：{{user_info.id_card}}</div>
              <div class='simple-text'>性别：{{genderMap[user_info.gender] || user_info.gender}}</div>
            </el-col>
            <el-col :span="8">
              <div class='simple-text'>当前缴存城市名称：{{user_info.city}}</div>
              <div class='simple-text'>当前缴存企业名称：{{user_info.corporation_name}}</div>
            </el-col>
          </el-row>
        </cc-panel>

        <cc-panel title='账户基本信息'>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class='simple-text'>账户余额（元）：{{formatMoney(user_info.balance)}}</div>
              <div class='simple-text'>月缴金额（元）：{{formatMoney(user_info.monthly_total_income)}}</div>
              <div class='simple-text'>基数（元）：{{formatMoney(user_info.base_number)}}</div>
              <div class='simple-text'>最后缴费日期：{{user_info.last_pay_date}}</div>
            </el-col>
            <el-col :span="8">
              <div class='simple-text'>公积金存缴状态：{{payStatusMap[user_info.pay_status] || user_info.pay_status}}</div>
              <div class='simple-text'>单位月缴金额（元）：{{formatMoney(user_info.monthly_corporation_income)}}</div>
              <div class='simple-text'>个人月缴金额（元）：{{formatMoney(user_info.monthly_customer_income)}}</div>
              <div class='simple-text'>单位月缴比例：{{user_info.corporation_ratio}} %</div>
              <div class='simple-text'>个人月缴比例：{{user_info.customer_ratio}} %</div>
            </el-col>
            <el-col :span="8">
              <div class='simple-text'>开户日期：{{user_info.begin_date}}</div>
              <!--<div class='simple-text'>最早缴费日期：TODO 这个值没有的</div>-->
            </el-col>
          </el-row>
        </cc-panel>

        <cc-panel title='贷款信息 TODO'>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class='simple-text'>贷款人姓名：{{loan_info.name}}</div>
              <div class='simple-text'>贷款人联系电话：{{loan_info.phone}}</div>
            </el-col>
            <el-col :span="8">
              <div class='simple-text'>贷款状态：{{loan_info.status}}</div>
              <div class='simple-text'>承办银行：{{loan_info.bank}}</div>
              <div class='simple-text'>贷款类型：{{loan_info.loan_type}}</div>
              <div class='simple-text'>当前贷款购房地址：{{loan_info.house_address}}</div>
              <div class='simple-text'>贷款金额：{{formatMoney(loan_info.loan_amount)}}</div>
              <div class='simple-text'>贷款期数：{{loan_info.periods}}</div>
            </el-col>
            <el-col :span="8">
              <div class='simple-text'>月还款金额：{{formatMoney(loan_info.monthly_repay_amount)}}</div>
              <div class='simple-text'>贷款开始日期：{{loan_info.start_date}}</div>
              <div class='simple-text'>贷款结束日期：{{loan_info.end_date}}</div>
              <div class='simple-text'>还款方式：{{loan_info.repay_type}}</div>
              <div class='simple-text'>每月还款日：：{{loan_info.deduct_day}}</div>
            </el-col>
          </el-row>
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

        user_info: {},
        bill_record: [],
        loan_info: {},

        payStatusMap: {
          NONE	  :'未缴纳',
          NORMAL	:'正常',
          SUSPENSE:'停缴',
          CLOSED	:'注销',
        },

        genderMap: {
          1: '男',
          0: '女'
        }
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
      formatMoney,
      getDetail() {
        const self = this
        self.loading = true
        AXIOS.post('/auth/moxieInfo/fundData', {
          memberId: Number(this.memberId)
        }).then(res => {
          if (_.isEmpty(res)) {
            self.isEmpty = true
          } else {
            self.user_info = res.user_info || {}
            self.bill_record = res.bill_record || []
            self.loan_info = res.loan_info || {}
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
