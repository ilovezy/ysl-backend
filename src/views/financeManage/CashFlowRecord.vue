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
          <el-form-item label="交易时间">
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

          <el-form-item label="交易类型">
            <el-select v-model="listQuery.type"
                       placeholder="请选择交易类型">
              <el-option
                v-for="item,index in enterStatusMap"
                :key="'enterStatusMap' + index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
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
          prop="id"
          label="订单号"
          width='220'
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop='userName'
          label="用户姓名"
          width='150'
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop='mobile'
          label="用户手机号"
          width='150'
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          label="交易类型"
          width='150'>
          <template slot-scope="scope">
            {{statusMap[scope.row.type] || scope.row.type}}
          </template>
        </el-table-column>

        <el-table-column
          prop='amount'
          label="交易金额(元)"
          width='150'
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop='createAt'
          label="交易时间"
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

  </div>
</template>

<script>
  export default {
    data() {
      return {
        showPagination: true,
        list: [],
        total: 0,
        listLoading: false,
        listQuery: {
          page: 0,
          size: 10,
          crTimeStart: '',
          crTimeEnd: '',
          type: '',
        },
        dateOrigin: '',

        statusMap: {
          'recharge': '充值',
          'withdraw': '提现',
          'withdraw_fee': '提现手续费',
          'invest': '投资',
          'repay': '还款',
          'reward': '打赏红包',
          'loan': '放款',
          'info_publish_fee': '信息发布费',
          'buy_borrow_currency': '购买借币',
        },

        enterStatusMap: [
          {value: 'recharge', label: '充值'},
          {value: 'withdraw', label: '提现'},
          {value: 'withdraw_fee', label: '提现手续费'},
          {value: 'invest', label: '投资'},
          {value: 'repay', label: '还款'},
          {value: 'reward', label: '打赏红包'},
          {value: 'loan', label: '放款'},
          {value: 'info_publish_fee', label: '信息发布费'},
          {value: 'buy_borrow_currency', label: '购买借币'},
        ],
      }
    },

    created() {
      this.getList()
    },

    methods: {
      changeDate(dateArr) {
        this.listQuery.crTimeStart = formatDate(new Date(dateArr[0]).getTime(), 'YYYY-MM-DD H:i:s')
        this.listQuery.crTimeEnd = formatDate(new Date(dateArr[1]).getTime(), 'YYYY-MM-DD H:i:s')
      },

      resetQuery() {
        this.showPagination = false
        setTimeout(() => {
          this.showPagination = true
        }, 10)
        this.listQuery = {
          page: 0,
          size: 10
        }
        this.dateOrigin = ''
        this.getList()
      },

      doSearch() {
        this.showPagination = false
        setTimeout(() => {
          this.showPagination = true
        }, 10)
        this.listQuery.page = 0
        this.getList()
      },

      getList() {
        const self = this
        self.listLoading = true
        AXIOS.post('/auth/financial/flow', self.listQuery).then(res => {
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
