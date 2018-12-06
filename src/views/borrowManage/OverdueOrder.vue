<!--TODO-->
<template>
  <div class="app-container">
    <div class='search-bar'>
      <div class='title-bar'>
        <div class='title'>检索条件</div>
        <div class='btn-wrap'>
          <el-button type="primary"
                     @click='doSearch'>查询
          </el-button>
          <el-button @click='resetQuery'>重置</el-button>
        </div>
      </div>
      <div class='search-control'>
        <el-form :inline="true"
                 class="demo-form-inline">
          <el-form-item label="借款人姓名">
            <el-input v-model="listQuery.trueName"
                      placeholder="借款人姓名"></el-input>
          </el-form-item>
          <el-form-item label="借款人手机号">
            <el-input v-model="listQuery.mobile"
                      placeholder="借款人手机号"></el-input>
          </el-form-item>
          <el-form-item label="提交时间">
            <el-date-picker
              v-model='dateOrigin'
              @change='changeDate'
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class='main-table-wrap'>
      <el-table
        :data="list"
        tooltip-effect="dark"
        style="width: 100%;"
        max-height='600'
        v-loading="listLoading">
        <el-table-column
          prop='id'
          label="订单号"
          width='100'>
        </el-table-column>

        <el-table-column
          prop="trueName"
          label="借款人姓名"
          width='120'>
        </el-table-column>

        <el-table-column
          prop="mobile"
          label="借款人手机号"
          width='140'
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop="amount"
          label="借款金额"
          width='120'>
        </el-table-column>

        <el-table-column
          prop='period'
          label="期限"
          width='80'>
        </el-table-column>

        <el-table-column
          label="利率"
          width='100'
          show-overflow-tooltip>
          <template slot-scope="scope">
            {{(scope.row.rate * 100).toFixed(0)}}%
          </template>
        </el-table-column>
        <el-table-column
          prop='rewardAmount'
          label="打赏金额"
          width='100'
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop='createAt'
          label="提交借款时间"
          width='180'
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop='realAmount'
          label="实际到账金额"
          width='120'
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop='orderCreateAt'
          label="借款成功时间"
          width='180'
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop='expectRepayAmount'
          label="应还款金额"
          width='120'
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop='expectRepayTime'
          label="应还款日期"
          width='180'
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop='overdueDay'
          label="已逾期天数"
          width='120'
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop='overdueAmount'
          label="逾期罚息金额"
          width='120'
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop='investorName'
          label="投资人姓名"
          width='120'
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop='investorMobile'
          label="投资人手机号"
          width='120'
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          min-width='500'
          fixed="right"
          label="借款人信息">
          <template slot-scope="scope">
            <user-info-control type='overdueOrder' :member-id='scope.row.memberId'></user-info-control>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination background
                       v-if='showPagination'
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="listQuery.page + 1"
                       :page-sizes="[10,20,30, 50]"
                       :page-size="listQuery.size"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="total">
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
  import UserInfoControl from '../userManage/UserInfoControl'

  export default {
    components: {
      UserInfoControl
    },
    data() {
      return {
        showPagination: true,
        list: [],
        total: 0,
        listLoading: false,
        listQuery: {
          page: 0,
          size: 10,
          trueName: '',
          mobile: '',
          crTimeStart: '',
          crTimeEnd: '',
        },
        dateOrigin: '',
        statusMap: {
          wait: '待还款',
          advance_repay: '提前还款',
          normal_repay: '正常还款',
          overdue_repay: '逾期还款',
          overdue: '逾期',
        },
      }
    },

    created() {
      this.getList()
    },

    methods: {
      formatDate,
      changeDate(dateArr) {
        this.listQuery.crTimeStart = formatDate(new Date(dateArr[0]).getTime(), 'YYYY-MM-DD H:i:s')
        this.listQuery.crTimeEnd = formatDate(new Date(dateArr[1]).getTime(), 'YYYY-MM-DD H:i:s')
      },
      doSearch() {
        this.showPagination = false
        setTimeout(() => {
          this.showPagination = true
        }, 10)
        this.listQuery.page = 0
        this.getList()
      },
      resetQuery() {
        this.showPagination = false
        setTimeout(() => {
          this.showPagination = true
        }, 10)
        this.listQuery = {
          page: 0,
          size: 10,
        }
        this.getList()
      },

      getList() {
        const self = this
        self.listLoading = true
        AXIOS.post('/auth/loanManage/OrderOverdueIndex', self.listQuery).then(res => {
          self.list = res.content || []
          self.total = res.totalElements || 0
          self.listLoading = false
        }).catch((res) => {
          self.listLoading = false
        })
      },
      handleSizeChange(val) {
        this.listQuery.size = val
        this.getList()
      },

      handleCurrentChange(val) {
        this.listQuery.page = val - 1
        this.getList()
      },
    }
  }
</script>

<style lang="scss"
       scoped>

</style>


