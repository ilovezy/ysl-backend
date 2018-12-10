<template>
  <div class="app-container open-class-manage-page">
    <el-row :gutter="30">
      <el-col :span="8">
        <cc-panel class='search-wrap same-height'>
          <div style="margin-top: 30px; margin-bottom: 30px;">
            <el-input placeholder="请输入内容" v-model="searchText" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
          <div class='list-container'>
            <div v-for='item,index in 10'
                 class='list-select-item'>
              <div class='class-type'>数学</div>
              <div class='center-info'>
                <div class='name'>黄晓明</div>
                <div class='detail'>六年级 / 浙教版</div>
              </div>
              <div class='simple-btn'>
                开课
              </div>
            </div>
          </div>
        </cc-panel>
      </el-col>

      <el-col :span="16">
        <cc-panel class='notice-wrap same-height'>
          <el-tabs v-model="activeName"
                   @tab-click="handleClick">
            <el-tab-pane label="开课列表"
                         name="openClassList">
              <div class='main-table-wrap'>
                <el-table
                  :data="list"
                  tooltip-effect="dark"
                  style="width: 100%;"
                  max-height='650'
                  stripe
                  v-loading="listLoading">
                  <el-table-column
                    prop="name"
                    label="课程"
                    width='200'
                    show-overflow-tooltip>
                  </el-table-column>

                  <el-table-column
                    prop="trueName"
                    label="上课时间"
                    width='200'>
                  </el-table-column>

                  <el-table-column
                    prop="identityNumber"
                    label="上课时长"
                    width='200'
                    show-overflow-tooltip>
                  </el-table-column>

                  <el-table-column
                    prop="registerTime"
                    label="课程状态">
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
        activeName: 'openClassList',
        searchText: '',
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
  @import './OpenClassManage.scss';
</style>
