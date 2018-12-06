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
          <el-form-item label="商户名称">
            <el-input v-model="listQuery.name"
                      placeholder="商户名称"></el-input>
          </el-form-item>

          <el-form-item label="手机号">
            <el-input v-model.number="listQuery.mobile"
                      placeholder="手机号"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="sub-navbar"
         v-permission='["platform:merchant:user:create"]'>
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
        <el-table-column
          prop="name"
          label="商户名称"
          width='200'
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop="mobile"
          label="手机号"
          width='300'
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop="trueName"
          label="用户姓名"
          width='240'>
        </el-table-column>

        <el-table-column
          min-width='220'
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button size='mini'
                       v-permission='["platform:merchant:user:asset"]'
                       @click="goAssetDetail(scope.row.memberId)">查看资产
            </el-button>

            <el-button size='mini'
                       type='primary'
                       v-permission='["platform:merchant:user:freeze"]'
                       @click="handleToggleFreeze(scope.$index, scope.row, scope.row.status == 'freeze')"
                       v-if='scope.row.status != "freeze"'>冻结
            </el-button>
            <el-button size='mini'
                       type='warning'
                       v-permission='["platform:merchant:user:unfreeze"]'
                       @click="handleToggleFreeze(scope.$index, scope.row, scope.row.status == 'freeze')"
                       v-if='scope.row.status == "freeze"'>解冻
            </el-button>
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

    <el-dialog title="操作"
               width='600px'
               :visible.sync="auditModalShow">
      <el-form label-position='left'
               label-width="120px">
        <el-form-item label="选择商户">
          <el-select v-model="merchantId">
            <el-option
              v-for="item,index in merchantDropdown"
              :key="'enterStatusMap' + index"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户手机号">
          <el-input v-model="mobile"
                    style='width: 200px'></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="roleId">
            <el-option
              v-for="item,index in roleDropdown"
              :key="'enterStatusMap' + index"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <hr>

      <p>
        后台登录密码：同APP登录密码 <br>
        登录账户：用户手机号
      </p>

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
          name: '',
          mobile: '',
        },

        auditModalShow: false,

        merchantDropdown: [],
        merchantId: '',
        mobile: '',
        roleDropdown: [],
        roleId: '',

        enterStatusMap: []
      }
    },

    created() {
      this.getList()
      this.getMerchantDropdown()
      this.getRoleOptions()
    },

    methods: {
      formatDate,

      goAssetDetail(id) {
        this.$router.push('/merchantManage/AssetDetail/' + id)
      },

      handleToggleFreeze(index, row, freeze) {
        const tip = freeze ? '解冻' : '冻结'
        const url = freeze ? '/auth/merchant/unfreezeMerchantUser' : '/auth/merchant/freezeMerchantUser'
        this.$confirm('确定' + tip + '该用户吗？', {
          type: 'warning'
        }).then(() => {
          AXIOS.post(url, {
            id: row.id
          }).then(res => {
            this.$message({
              type: 'success',
              message: tip + '成功!'
            })
            this.getList()
          })
        })
      },

      getMerchantDropdown() {
        AXIOS.post('/auth/merchant/findMerchantInfoDropDownBox', {}).then(res => {
          this.merchantDropdown = res || []
        })
      },
      getRoleOptions() {
        AXIOS.post('/auth/role/roleOptions', {
          target: 'merchant'
        }).then(res => {
          this.roleDropdown = res || []
        })
      },
      openAdd() {
        this.auditModalShow = true
      },

      closeAuditDialog() {
        this.auditModalShow = false
        this.merchantId = ''
        this.mobile = ''
        this.roleId = ''
        this.getList()
      },

      confirmAuditDialog: _.debounce(function () {
        const self = this
        if (!self.merchantId) {
          this.$message.error('请选择商户')
          return
        }
        if (!isValidPhone(self.mobile)) {
          this.$message.error('请输入正确手机号')
          return
        }
        if (!self.roleId) {
          this.$message.error('请选择角色')
          return
        }
        let param = {
          mobile: self.mobile,
          merchantId: self.merchantId,
          roleId: self.roleId,
        }

        AXIOS.post('/auth/merchant/saveMerchantUser', param).then(res => {
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
        AXIOS.post('/auth/merchant/getList', self.listQuery).then(res => {
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


