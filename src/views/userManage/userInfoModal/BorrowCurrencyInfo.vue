<template>
  <div>
    <div class='detail-info'
         v-loading='detailLoading'>
      <div class='detail-item-wrap'>
        <div class='detail-item'>
          <div class='number'>{{currencyBalance}} 个</div>
          <div class='text'>剩余借币</div>
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
        label="交易时间"
        width='280'
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop='changeReason'
        label="类型"
        width='180'>
      </el-table-column>
      <el-table-column
        label="数量"
        width='180'
        show-overflow-tooltip>
        <template slot-scope="scope">
          {{scope.row.type == 'income' ? '+' : '-'}} {{scope.row.changeAmount}}
        </template>
      </el-table-column>
      <el-table-column
        prop='balance'
        label="剩余"
        show-overflow-tooltip>
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

        currencyBalance: 0
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
          self.currencyBalance = res.currencyBalance || 0
          self.detailLoading = false
        }).catch((res) => {
          self.detailLoading = false
        })
      },

      getList() {
        const self = this
        self.listLoading = true
        self.listQuery.memberId = self.memberId
        AXIOS.post('/auth/userInfo/borrowCurrencyInfoIndex', self.listQuery).then(res => {
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
