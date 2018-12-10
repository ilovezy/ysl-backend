<template>
  <div class="app-container homework-manage-page">
    <el-row :gutter="30">
      <el-col :span="6">
        <cc-panel class='left-list-wrap same-height'>
          <div class='list-container'>
            <div v-for='item,index in 10'
                 class='list-select-item'>
              小明
            </div>
          </div>
        </cc-panel>
      </el-col>

      <el-col :span="18">
        <cc-panel class='notice-wrap same-height'>
          <el-tabs v-model="activeName"
                   @tab-click="handleClick">
            <el-tab-pane label="音频"
                         name="audio">
              <div class='main-table-wrap'>
                <el-table
                  :data="list"
                  tooltip-effect="dark"
                  style="width: 100%;"
                  max-height='650'
                  stripe
                  v-loading="listLoading">
                  <el-table-column
                    prop="mobile"
                    label="上课学生"
                    width='140'
                    show-overflow-tooltip>
                  </el-table-column>

                  <el-table-column
                    prop="trueName"
                    label="上课科目"
                    width='140'>
                  </el-table-column>

                  <el-table-column
                    prop="identityNumber"
                    label="上课内容"
                    width='200'
                    show-overflow-tooltip>
                  </el-table-column>

                  <el-table-column
                    prop="registerTime"
                    label="上课时间"
                    width='180'>
                  </el-table-column>

                  <el-table-column
                    label="上课时长"
                    width='120'
                    show-overflow-tooltip>
                    <template slot-scope="scope">
                      {{scope.row.enterApplyFlag ? '是' : '否'}}
                    </template>
                  </el-table-column>

                  <el-table-column
                    min-width='320'
                    fixed="right"
                    label="操作">
                    <template slot-scope="scope">
                      <div class='simple-btn'
                           @click='goAuthInfo(scope.row.id)'>进入课堂
                      </div>
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
            </el-tab-pane>
            <el-tab-pane label="图片"
                         name="picture">
              <div class='main-table-wrap'>
                <el-table
                  :data="list"
                  tooltip-effect="dark"
                  style="width: 100%;"
                  max-height='650'
                  stripe
                  v-loading="listLoading">
                  <el-table-column
                    prop="mobile"
                    label="上课学生"
                    width='140'
                    show-overflow-tooltip>
                  </el-table-column>

                  <el-table-column
                    prop="trueName"
                    label="上课科目"
                    width='140'>
                  </el-table-column>

                  <el-table-column
                    prop="identityNumber"
                    label="上课内容"
                    width='200'
                    show-overflow-tooltip>
                  </el-table-column>

                  <el-table-column
                    prop="registerTime"
                    label="上课时间"
                    width='180'>
                  </el-table-column>

                  <el-table-column
                    label="上课时长"
                    width='120'
                    show-overflow-tooltip>
                    <template slot-scope="scope">
                      {{scope.row.enterApplyFlag ? '是' : '否'}}
                    </template>
                  </el-table-column>

                  <el-table-column
                    min-width='320'
                    fixed="right"
                    label="操作">
                    <template slot-scope="scope">
                      <div class='simple-btn'
                           @click='goAuthInfo(scope.row.id)'>进入课堂
                      </div>
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
            </el-tab-pane>
          </el-tabs>
        </cc-panel>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeName: 'audio', // music picture
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
  @import './HomeworkManage.scss';
</style>
