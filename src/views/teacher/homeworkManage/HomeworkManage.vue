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
                    label="录音"
                    width='250'
                    show-overflow-tooltip>
                  </el-table-column>

                  <el-table-column
                    prop="trueName"
                    label="日期"
                    width='250'>
                  </el-table-column>

                  <el-table-column
                    prop="identityNumber"
                    label="时长"
                    width='250'
                    show-overflow-tooltip>
                  </el-table-column>

                  <el-table-column
                    fixed="right"
                    label="操作">
                    <template slot-scope="scope">
                      <div class='simple-btn'
                           @click='goAuthInfo(scope.row.id)'>播放
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
                <div class='audio-list-wrap'>
                  <div class='audio-item'
                       v-for='item,index in audioList'>
                    <img src='./img/demo.jpg'
                         class='audio-cover'
                         alt=''>
                    <div class='audio-desc'>{{item.name}}</div>
                  </div>
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
        audioList: [{
          name: 'test23 32312'
        }, {
          name: 'test23 32312'
        }, {
          name: 'test23 32312'
        }, {
          name: 'test23 32312'
        }, {
          name: 'test23 32312'
        },{
          name: 'test23 32312'
        }, {
          name: 'test23 32312'
        }, {
          name: 'test23 32312'
        }, {
          name: 'test23 32312'
        }, {
          name: 'test23 32312'
        },{
          name: 'test23 32312'
        }, {
          name: 'test23 32312'
        }, {
          name: 'test23 32312'
        }, {
          name: 'test23 32312'
        }, {
          name: 'test23 32312'
        },],
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
