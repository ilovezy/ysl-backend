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
        <cc-panel title='运营商基本信息'
                  :subTitle='"信息获取时间：" + baseInfo.createAt'>
          <el-row :gutter="20">
            <el-col :span="12">
              <div class='simple-text'>机主姓名：{{baseInfo.name}}</div>
              <div class='simple-text'>手机号码：{{baseInfo.mobile}}</div>
              <div class='simple-text'>机主身份证：{{baseInfo.idcard}}</div>
              <!--<div class='simple-text'>年龄：TODO</div>-->
              <div class='simple-text'>本机号码归属省份 / 城市：{{baseInfo.province}} {{baseInfo.city}}</div>
              <div class='simple-text'>详细地址：{{baseInfo.address}}</div>
              <div class='simple-text'>运营商标识：{{carrierMap[baseInfo.carrier] || baseInfo.carrier}}</div>
              <div class='simple-text'>用户星级：{{baseInfo.level}}</div>
            </el-col>

            <el-col :span="12">
              <div class='simple-text'>入网日期：{{baseInfo.open_time}}</div>
              <div class='simple-text'>入网月数：{{enterMonth}} 个月</div>
              <!--<div class='simple-text'>最后充值日期：2018-01-01</div>-->
              <div class='simple-text'>本机实名状态：{{reliabilityMap[baseInfo.reliability] || baseInfo.reliability}}</div>
              <div class='simple-text'>本机号码状态：{{stateMap[baseInfo.state] || baseInfo.state}}</div>
              <div class='simple-text'>本机当前可用话费余额：{{formatMoney(baseInfo.available_balance)}}</div>
            </el-col>
          </el-row>
        </cc-panel>

        <cc-panel title='紧急联系人通话信息'>
          <el-table
            :data="emergencyPhones"
            tooltip-effect="dark"
            style="width: 100%;"
            max-height='400'>
            <el-table-column show-overflow-tooltip
                             prop="name"
                             width='100'
                             label="姓名">
            </el-table-column>
            <el-table-column show-overflow-tooltip
                             prop="phone"
                             width='140'
                             label="号码">
            </el-table-column>
            <el-table-column show-overflow-tooltip
                             width='80'
                             label="关系">
              <template slot-scope="scope">
                {{relationshipMap[scope.row.emergencyRelationship] || scope.row.emergencyRelationship}}
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip
                             prop="commCount"
                             width='100'
                             label="通话次数">
            </el-table-column>
            <el-table-column show-overflow-tooltip
                             prop="sumDuration"
                             width='140'
                             label="通话时长（秒）">
            </el-table-column>
            <el-table-column show-overflow-tooltip
                             width='100'
                             prop="commCountDial"
                             label="主叫次数">
            </el-table-column>
            <el-table-column show-overflow-tooltip
                             prop="sumDurationDial"
                             width='140'
                             label="主叫时长（秒）">
            </el-table-column>
            <el-table-column show-overflow-tooltip
                             prop="commCountDialed"
                             width='100'
                             label="被叫次数">
            </el-table-column>
            <el-table-column show-overflow-tooltip
                             prop="sumDurationDialed"
                             width='140'
                             label="被叫时长（秒）">
            </el-table-column>
            <el-table-column show-overflow-tooltip
                             prop="minTime" width='200'
                             label="第一次通话时间">
            </el-table-column>
            <el-table-column prop="maxTime"
                             min-width='200px'
                             label="最后一次通话时间">
            </el-table-column>
          </el-table>
        </cc-panel>

        <cc-panel title='近6个月话费充值记录'>
          <el-row style='padding: 15px; background: #1989FA; color: #fff;'>
            <el-col :span="6">充值总金额：{{formatMoney(sumRechargeAmount)}}</el-col>
            <el-col :span="6">总充值次数：{{rechargeCount}}次</el-col>
            <el-col :span="6">平均单笔充值金额：{{formatMoney(averageRechargeAmount)}}</el-col>
          </el-row>
          <el-table
            :data="recharges"
            tooltip-effect="dark"
            style="width: 100%;"
            max-height='400'>
            <el-table-column show-overflow-tooltip
                             prop="month"
                             width='300'
                             label="日期">
            </el-table-column>
            <el-table-column show-overflow-tooltip
                             label="该月份总充值金额">
              <template slot-scope="scope">
                {{formatMoney(scope.row.monthRechargeAmount)}}
              </template>
            </el-table-column>
          </el-table>
        </cc-panel>

        <cc-panel title='近6个月内消费信息'>
          <el-table
            :data="consumes"
            tooltip-effect="dark"
            style="width: 100%;"
            max-height='400'>
            <el-table-column show-overflow-tooltip
                             prop="month"
                             label="月份">
            </el-table-column>
            <el-table-column show-overflow-tooltip
                             prop="mobile"
                             label="通话费用">
              <template slot-scope="scope">
                {{formatMoney(scope.row.monthSumCallFee)}}
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip
                             label="短信费用">
              <template slot-scope="scope">
                {{formatMoney(scope.row.monthSumSmsFee)}}
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip
                             label="网络流量费用">
              <template slot-scope="scope">
                {{formatMoney(scope.row.monthSumWebFee)}}
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip
                             label="其他费用">
              <template slot-scope="scope">
                {{formatMoney(scope.row.monthSumExtraFee)}}
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip
                             label="本月总费用">
              <template slot-scope="scope">
                {{formatMoney(scope.row.monthSumTotalFee)}}
              </template>
            </el-table-column>
          </el-table>
        </cc-panel>

        <cc-panel title='亲情网信息'>
          <el-table
            :data="families"
            tooltip-effect="dark"
            style="width: 100%;"
            max-height='400'>
            <el-table-column show-overflow-tooltip
                             prop="itemsLongNumber"
                             width='200'
                             label="亲情网手机号码">
            </el-table-column>
            <el-table-column show-overflow-tooltip
                             prop="itemsShortNumber"
                             width='140'
                             label="短号">
            </el-table-column>
            <el-table-column show-overflow-tooltip
                             width='200'
                             label="类型">
              <template slot-scope="scope">
                {{memberTypeMap[scope.row.itemsMemberType] || scope.row.itemsMemberType}}
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip
                             prop="itemsJoinDate"
                             width='200'
                             label="加入日期">
            </el-table-column>
            <el-table-column show-overflow-tooltip
                             prop="itemsExpireDate"
                             label="退出日期">
            </el-table-column>
          </el-table>
        </cc-panel>

        <cc-panel title='近6个月内流量使用信息'>
          <six-month-flow-info :months='months' :memberId='memberId'></six-month-flow-info>
        </cc-panel>
      </div>
    </div>
  </div>
</template>

<script>
  import SixMonthFlowInfo from './OperatorComp/SixMonthFlowInfo'
  export default {
    components: {
      SixMonthFlowInfo
    },
    data() {
      return {
        loading: false,
        isEmpty: false,
        showResult: false,

        averageRechargeAmount: '',
        baseInfo: {},
        consumes: [],
        emergencyPhones: [],
        families: [],
        nets: [],
        rechargeCount: '',
        recharges: [],
        sumRechargeAmount: '',
        enterMonth: '',

        months: [],

        relationshipMap: {
          'father': '父亲',
          'mother': '母亲',
          'spouse': '配偶',
          'child': '子女',
          'relative': '亲戚',
          'colleague': '同事',
          'classmate': '同学',
          'friend': '朋友',
        },
        memberTypeMap: {
          MASTER: '家长',
          MEMBER: '成员'
        },
        reliabilityMap: {
          '-1': '未知',
          '0': '未实名',
          '1': '已实名'
        },
        carrierMap: {
          CHINA_MOBILE: '中国移动',
          CHINA_TELECOM: '中国电信',
          CHINA_UNICOM: '中国联通'
        },
        stateMap: {
          '-1': '未知',
          '0': '正常',
          '1': '单向停机',
          '2': '停机',
          '3': '预销户',
          '4': '销户',
          '5': '过户',
          '6': '改号',
          '99': '号码不存在',
        },
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
        AXIOS.post('/auth/moxieInfo/operatorData', {
          memberId: Number(this.memberId)
        }).then(res => {
          if (_.isEmpty(res)) {
            self.isEmpty = true
          } else {
            self.averageRechargeAmount = res.averageRechargeAmount
            self.baseInfo = res.baseInfo || {}
            self.consumes = res.consumes || []
            self.emergencyPhones = res.emergencyPhones
            self.families = res.families || []
            self.nets = res.nets || []
            self.rechargeCount = res.rechargeCount
            self.recharges = res.recharges || []
            self.sumRechargeAmount = res.sumRechargeAmount
            self.enterMonth = res.enterMonth
            self.months = res.months || []
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
