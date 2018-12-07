<template>
  <div class="app-container teacher-my-class-page">
    <el-row :gutter="30">
      <el-col :span="6">
        <cc-panel title='日期'
                  class='left-list-wrap same-height'>
          <div class='list-container'>
            <div v-for='item,index in 10'
                 class='list-select-item'>
              {{'2018-2-3'}}
            </div>
          </div>
        </cc-panel>
      </el-col>

      <el-col :span="18">
        <cc-panel title='课程安排'
                  class='notice-wrap same-height'>
          <div class='main-table-wrap'>
            <el-table
              :data="list"
              tooltip-effect="dark"
              style="width: 100%;"
              max-height='600'
              stripe
              v-loading="listLoading">
              <el-table-column
                prop="mobile"
                label="手机号"
                width='140'
                show-overflow-tooltip>
              </el-table-column>

              <el-table-column
                prop="trueName"
                label="姓名"
                width='140'>
              </el-table-column>

              <el-table-column
                prop="identityNumber"
                label="身份证号"
                width='200'
                show-overflow-tooltip>
              </el-table-column>

              <el-table-column
                prop="registerTime"
                label="注册时间"
                width='180'>
              </el-table-column>

              <el-table-column
                label="是否首次审核"
                width='120'
                show-overflow-tooltip>
                <template slot-scope="scope">
                  {{scope.row.enterApplyFlag ? '是' : '否'}}
                </template>
              </el-table-column>

              <el-table-column
                label="审核状态"
                width='140'
                show-overflow-tooltip>
                <template slot-scope="scope">
                </template>
              </el-table-column>

              <el-table-column
                prop='borrowLimit'
                label="基础借款额度"
                width='180'
                show-overflow-tooltip>
              </el-table-column>

              <el-table-column
                min-width='320'
                fixed="right"
                label="操作">
                <template slot-scope="scope">
                  <el-button size="mini"
                             type='primary'
                             v-permission='["platform:member:info:authX1"]'
                             @click='goAuthInfo(scope.row.id)'>认证信息
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
        </cc-panel>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: [{
          name: 'test'
        }, {
          name: 'test'
        }, {
          name: 'test'
        }, {
          name: 'test'
        }, {
          name: 'test'
        }, {
          name: 'test'
        }, {
          name: 'test'
        }, {
          name: 'test'
        }, {
          name: 'test'
        }, {
          name: 'test'
        },],
      }
    },

    created() {
      // this.getList()
    },

    methods: {
      formatDate,

      doUnbind(row) {
        this.$confirm('确定解绑吗', {
          type: 'warning'
        }).then(() => {
          AXIOS.post('/auth/platformMember/memberUnbindCard', {
            bankCardId: row.id,
            memberId: row.memberId
          }).then(res => {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            this.getList()
          })
        })
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
        AXIOS.post('/auth/platformMember/memberBankCardPageIndex', self.listQuery).then(res => {
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

<style lang="scss">
  @import './MyClass.scss';
</style>
