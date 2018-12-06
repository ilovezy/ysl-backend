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
          <el-form-item label="姓名">
            <el-input v-model="listQuery.trueName"
                      placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="listQuery.mobile"
                      placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item label="注册时间">
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

          <el-form-item label="准入借款">
            <el-select v-model="listQuery.enterStatus"
                       placeholder="请选择准入借款">
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
          label="id"
          width='80'>
        </el-table-column>
        <el-table-column
          prop="trueName"
          label="姓名"
          width='100'>
        </el-table-column>

        <el-table-column
          prop="mobile"
          label="手机号"
          width='140'
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop="identityNumber"
          label="身份证号"
          width='180'>
        </el-table-column>

        <el-table-column
          prop='registerTime'
          label="注册时间"
          width='160'
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          label="准入借款"
          width='80'
          show-overflow-tooltip>
          <template slot-scope="scope">
            {{statusMap[scope.row.enterStatus] || scope.row.enterStatus}}
          </template>
        </el-table-column>

        <el-table-column
          prop='maxBorrowLimit'
          label="总借款额度"
          width='120'
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop='totalLoanAmount'
          label="累计借款金额"
          width='120'
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop='totalInvestmentAmount'
          label="累计投资金额"
          width='120'
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          min-width='500'
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <user-info-control type='userInfo' :member-id='scope.row.id'></user-info-control>
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
  import UserInfoControl from './UserInfoControl'

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
          mobile: '', // TODO REMOVE
          crTimeStart: '',
          crTimeEnd: '',
          enterStatus: ''
        },
        dateOrigin: '',

        statusMap: {
          success: '是',
          wait: '否',
          processing: '进行中',
          fail: '失败'
        },
        enterStatusMap: [
          {value: 'success', label: '是',},
          {value: 'wait', label: '否',},
        ],
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
        AXIOS.post('/auth/userInfo/userInfoIndex', self.listQuery).then(res => {
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
