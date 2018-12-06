<template>
  <div>
    <div class='detail-info'
         v-loading='detailLoading'>
      <div class='detail-item-wrap'>
        <div class='detail-item'>
          <div class='number'>{{totalReceiveAmount}} 元</div>
          <div class='text'>待收金额</div>
        </div>

        <div class='detail-item'>
          <div class='number'>{{totalInvestOverdueAmount}} 元</div>
          <div class='text'>逾期金额</div>
        </div>

        <div class='detail-item'>
          <div class='number'>{{totalInvestmentAmount}} 元</div>
          <div class='text'>累计投资金额</div>
        </div>
      </div>
    </div>
    <el-table
      :data="list"
      tooltip-effect="dark"
      style="width: 100%;"
      max-height='600'
      v-loading="listLoading">
      <el-table-column
        prop="id"
        label="交易订单号"
        width='180'>
      </el-table-column>
      <el-table-column
        prop="createAt"
        label="投资成功时间"
        width='280'
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="amount"
        label="投资金额"
        width='180'>
      </el-table-column>
      <el-table-column
        prop='trueName'
        label="借款人姓名"
        width='180'
        show-overflow-tooltip>
      </el-table-column>

      <el-table-column
        label="回款状态"
        show-overflow-tooltip>
        <template slot-scope="scope">
          {{statusMap[scope.row.status] || scope.row.status}}
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
</template>

<script>
  export default {
    data() {
      return {
        detailLoading: false,

        showPagination: true,
        list: [],
        total: 0,
        listLoading: false,
        listQuery: {
          page: 0,
          size: 10,
        },
        statusMap: {
          wait: '待回款',
          advance_repay: '提前回款',
          normal_repay: '正常回款',
          overdue_repay: '逾期回款',
          overdue: '逾期',
        },

        totalReceiveAmount: 0,
        totalInvestOverdueAmount: 0,
        totalInvestmentAmount: 0
      }
    },

    props: {
      memberId: {
        default: ''
      }
    },
    mounted() {
      this.getDetail()
      this.getList()
    },

    methods: {
      getDetail() {
        const self = this
        self.detailLoading = true
        AXIOS.post('/auth/userInfo/userTotalCountIndex', {
          memberId: self.memberId
        }).then(res => {
          self.totalReceiveAmount = res.totalReceiveAmount || 0
          self.totalInvestOverdueAmount = res.totalInvestOverdueAmount || 0
          self.totalInvestmentAmount = res.totalInvestmentAmount || 0
          self.detailLoading = false
        }).catch((res) => {
          self.detailLoading = false
        })
      },

      getList() {
        const self = this
        self.listLoading = true
        self.listQuery.memberId = self.memberId
        AXIOS.post('/auth/userInfo/investInfoIndex', self.listQuery).then(res => {
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
  @import "./modalStyle.scss";
</style>
