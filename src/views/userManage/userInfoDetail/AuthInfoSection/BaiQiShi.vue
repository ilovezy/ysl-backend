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
        <cc-panel title='决策信息'
                  :subTitle='"信息获取时间：" + createAt'>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class='simple-text'>建议：{{decisionMap[finalDecision] || finalDecision}}</div>
            </el-col>
          </el-row>
        </cc-panel>

        <cc-panel title='多头申请/借贷信息'>
          <el-table
            :data="multiLoans"
            tooltip-effect="dark"
            style="width: 100%;"
            max-height='600'>
            <el-table-column type="index"
                             width='120'
                             :index="indexMethod"
                             label="序号">
            </el-table-column>
            <el-table-column
              prop="ruleName"
              width='450'
              show-overflow-tooltip
              label="击中规则名称">
            </el-table-column>
            <el-table-column
              prop='memo'
              label="备注"
              show-overflow-tooltip>
            </el-table-column>
          </el-table>
        </cc-panel>

        <cc-panel title='失信名单信息'>
          <el-table
            :data="compares"
            tooltip-effect="dark"
            style="width: 100%;"
            max-height='600'>
            <el-table-column type="index"
                             width='120'
                             :index="indexMethod2"
                             label="序号">
            </el-table-column>
            <el-table-column
              prop="ruleName"
              width='450'
              show-overflow-tooltip
              label="击中规则名称">
            </el-table-column>
            <el-table-column
              prop='memo'
              label="备注"
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
        createAt: '',
        finalDecision: '',

        decisionMap: {
          'Accept': '通过',
          'Reject': '拒绝',
          'Review': '审核'
        },
        multiLoans: [],
        compares: [],
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
      indexMethod(index) {
        if (isLongArr(this.multiLoans)) {
          return this.multiLoans.length - index;
        } else {
          return ''
        }
      },
      indexMethod2(index) {
        if (isLongArr(this.compares)) {
          return this.compares.length - index;
        } else {
          return ''
        }
      },
      formatSpeDate,
      formatMoney,
      getDetail() {
        const self = this
        self.loading = true
        AXIOS.post('/auth/baiqishi/viewDecisionData', {
          memberId: Number(this.memberId)
        }).then(res => {
          if (_.isEmpty(res)) {
            self.isEmpty = true
          } else {
            self.createAt = res.createAt || ''
            self.finalDecision = res.finalDecision || ''
            self.multiLoans = res.multiLoans || []
            self.compares = res.compares || []
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
