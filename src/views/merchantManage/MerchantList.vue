<!--TODO-->
<template>
  <!--商户列表 暂时不做-->
  <div class="app-container">
    <div class="sub-navbar"
         v-permission='["platform:merchant:info:create"]'>
      <div class='subtitle'>操作</div>
      <div class='sub-navbar-btnwrap'>
        <el-button type="primary"
                   @click="openAdd">新增
        </el-button>
      </div>
    </div>

    <div class='main-table-wrap'>
      <el-table
        :data="list"
        tooltip-effect="dark"
        style="width: 100%;"
        max-height='600'
        v-loading="listLoading">
        <el-table-column type="index"
                         width='120'
                         :index="indexMethod"
                         label="序号">
        </el-table-column>

        <el-table-column
          prop="name"
          label="商户名称"
          width='300'
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          label="状态"
          width='240'>
          <template slot-scope="scope">
            {{statusMap[scope.row.status] || scope.row.status}}
          </template>
        </el-table-column>

        <el-table-column
          min-width='320'
          fixed="right"
          label="操作">
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

    <el-dialog title="新增商户"
               width='600px'
               :visible.sync="auditModalShow">
      <el-form label-position='left'
               label-width="120px">
        <el-form-item label="商户名称">
          <el-input v-model="name"
                    style='width: 200px'></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer"
           class="dialog-footer">
        <el-button @click="closeAuditDialog">取 消</el-button>
        <el-button type="primary"
                   @click="confirmAuditDialog">确 定
        </el-button>
      </div>
    </el-dialog>
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
        },
        name: '',
        auditModalShow: false,
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
      indexMethod(index) {
        if (isLongArr(this.list)) {
          return this.list.length - index;
        } else {
          return ''
        }
      },
      openAdd() {
        this.auditModalShow = true
      },

      closeAuditDialog() {
        this.auditModalShow = false
        this.name = ''
        this.getList()
      },

      confirmAuditDialog: _.debounce(function () {
        const self = this
        if (!self.name) {
          this.$message.error('请输入商户名称')
          return
        }

        AXIOS.post('/auth/merchant/saveMerchantInfo', {
          name: self.name,
        }).then(res => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          this.closeAuditDialog()
        })
      }, 2000, true),

      resetQuery() {
        this.showPagination = false
        setTimeout(() => {
          this.showPagination = true
        }, 10)
        this.dateOrigin = ''
        this.listQuery = {
          page: 0,
          size: 10,
        }
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
        AXIOS.post('/auth/merchant/getMerchantInfoPage', self.listQuery).then(res => {
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


