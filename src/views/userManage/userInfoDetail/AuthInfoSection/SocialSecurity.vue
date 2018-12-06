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
                  :subTitle='"信息获取时间：" + base_info.createAt'>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class='simple-text'>姓名：{{base_info.real_name}}</div>
              <div class='simple-text'>手机号：{{base_info.phone}}</div>
              <div class='simple-text'>身份证号：{{base_info.id_card}}</div>
              <div class='simple-text'>家庭住址: {{base_info.address}}</div>
            </el-col>
            <el-col :span="8">
              <div class='simple-text'>首次参保时间：{{base_info.first_insured_date}}</div>
              <div class='simple-text'>当前参保单位: {{base_info.insured_unit}}</div>
              <div class='simple-text'>缴存状态：{{base_info.pay_status}}</div>
              <div class='simple-text'>单位类型: {{base_info.unit_type}}</div>
            </el-col>
            <el-col :span="8">
              <div class='simple-text'>缴存基数(元) ：{{formatMoney(base_info.base_number)}}</div>
            </el-col>
          </el-row>
        </cc-panel>

        <cc-panel title='医疗保险缴存信息 TODO'>
          <el-table
            :data="insurance_record"
            tooltip-effect="dark"
            style="width: 100%;"
            max-height='400'>
            <el-table-column show-overflow-tooltip
                             prop="month"
                             width='200'
                             label="月份">
            </el-table-column>
            <el-table-column label="缴费基数(元)"
                             width='300'
                             show-overflow-tooltip>
              <template slot-scope="scope">
                {{formatMoney(scope.row.base_number)}}
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              label="单位缴存金额(元) TODO">
              <template slot-scope="scope">
                {{formatMoney(scope.row.corporation_payment)}}
              </template>
            </el-table-column>
            <el-table-column
              label="个人缴费额(元)"
              show-overflow-tooltip>
              <template slot-scope="scope">
                {{formatMoney(scope.row.personal_payment)}}
              </template>
            </el-table-column>
            <el-table-column
              prop='status'
              label="缴费状态标识 TODO"
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

        base_info: {},
        insurance_record: []
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
        AXIOS.post('/auth/moxieInfo/securityData', {
          memberId: Number(this.memberId)
        }).then(res => {
          if (_.isEmpty(res)) {
            self.isEmpty = true
          } else {
            self.base_info = res.base_info
            self.insurance_record = res.insurance_record
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
