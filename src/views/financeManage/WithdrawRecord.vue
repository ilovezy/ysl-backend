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
          <el-form-item label="姓名">
            <el-input v-model="listQuery.trueName"
                      placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="listQuery.mobile"
                      placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item label="提现时间">
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

          <el-form-item label="提现状态">
            <el-select v-model="listQuery.status"
                       placeholder="请选择提现状态">
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
          prop="requestNo"
          label="订单号"
          width='280'
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop='trueName'
          label="姓名"
          width='120'
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop='mobile'
          label="手机号"
          width='140'
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop='amount'
          label="提现金额"
          width='120'
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop='createAt'
          label="提现申请时间"
          width='160'
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop='finishTime'
          label="完成时间"
          width='160'
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop='bankName'
          label="提现银行"
          width='160'
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          label="提现状态"
          width='100'>
          <template slot-scope="scope">
            {{statusMap[scope.row.status] || scope.row.status}}
          </template>
        </el-table-column>

        <el-table-column
          prop='remark'
          label="备注"
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
          trueName: '',
          mobile: '',
          crTimeStart: '',
          crTimeEnd: '',
          status: '',
        },
        dateOrigin: '',

        statusMap: {
          wait: '待处理',
          processing: '处理中',
          success: '成功',
          fail: '失败'
        },
        enterStatusMap: [
          { value: 'wait', label: '待处理',},
          {value: 'processing', label: '处理中',},
          {value: 'success', label: '成功',},
          {value: 'fail', label: '失败',},
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
        AXIOS.post('/auth/capitalInfo/withdrawRecordIndex', self.listQuery).then(res => {
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
