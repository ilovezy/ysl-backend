<template>
  <div>
    <el-tabs v-model="month"
             type="card"
             @tab-click="handleClick">
      <el-tab-pane v-for='item,index in months'
                   :key='"month-select" + index'
                   :label="item"
                   :name="item">
      </el-tab-pane>
    </el-tabs>

    <el-table
      :data="list"
      tooltip-effect="dark"
      v-loading='listLoading'
      style="width: 100%;"
      max-height='600'>
      <el-table-column show-overflow-tooltip
                       prop="location"
                       width='200'
                       label="使用地点">
      </el-table-column>
      <el-table-column show-overflow-tooltip
                       prop="time"
                       width='200'
                       label="开始时间">
      </el-table-column>
      <el-table-column show-overflow-tooltip
                       prop="subflow"
                       width='200'
                       label="流量消耗（KB）">
      </el-table-column>
      <el-table-column show-overflow-tooltip
                       prop="service_name"
                       label="观看内容">
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
</template>

<script>
  export default {
    data() {
      return {
        month: '',

        showPagination: true,
        list: [],
        total: 0,
        listLoading: false,
        listQuery: {
          page: 0,
          size: 10,
        },
      }
    },

    props: {
      months: {
        type: Array,
        default: []
      },
      memberId: {
        default: ''
      }
    },

    created() {
      if (isLongArr(this.months)) {
        this.month = this.months[0]
        this.getList()
      }
    },

    methods: {
      handleClick(tab, event) {
        this.month = tab.name
        this.listQuery = {
          page: 0,
          size: 10,
        }
        this.getList()
      },

      getList() {
        const self = this
        self.listLoading = true
        let param = self.listQuery || {}
        param.month = self.month || ''
        param.memberId = Number(self.memberId)
        AXIOS.post('/auth/moxieInfo/netIndex', self.listQuery).then(res => {
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
