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
          <el-form-item label="用户姓名">
            <el-input v-model="listQuery.userName"
                      placeholder="用户姓名"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="listQuery.mobile"
                      placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item label="操作时间">
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

          <el-form-item label="类型">
            <el-select v-model="listQuery.type"
                       placeholder="请选择类型">
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
          label="类型"
          width='180'>
          <template slot-scope="scope">
            {{statusMap[scope.row.type] || scope.row.type}}
          </template>
        </el-table-column>

        <el-table-column
          prop='amount'
          label="个数"
          width='180'
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop='createAt'
          label="操作时间"
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
          userName: '',
          mobile: '',
          crTimeStart: '',
          crTimeEnd: '',
          type: '',
        },
        dateOrigin: '',

        statusMap: {
          '购买借币': '购买借币',
          '购买风控报告': '购买风控报告',
          '申请借款': '申请借款'
        },
        enterStatusMap: [
          {value: '购买借币', label: '购买借币',},
          {value: '购买风控报告', label: '购买风控报告',},
          {value: '申请借款', label: '申请借款',},
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
        AXIOS.post('/auth/financial/currency', self.listQuery).then(res => {
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
