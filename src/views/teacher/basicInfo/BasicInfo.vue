<template>
  <div class="app-container teacher-basic-info-page">
    <el-row :gutter="30">
      <el-col :span="10">
        <div class='basic-info-wrap'>
          <div class='basic-top'>
            <div class='avatar'>
              <img src='./img/default-avatar.png'
                   alt=''>
            </div>

            <div class='name'>
              吴老师
            </div>
          </div>

          <div class='basic-bottom'>
            <div class='list-item'>
              <span class='iconfont'></span>
              <div class='content'>毕业院校：华中师范大学</div>
            </div>
            <div class='list-item'>
              <span class='iconfont'></span>
              <div class='content'>教学经验：五年以上</div>
            </div>
            <div class='list-item'>
              <span class='iconfont'></span>
              <div class='content'>自我介绍：本科学历，学士学位。小学高级教师，国家二级心理
                咨询师，市级优秀教师。用心经营着教育，用爱温暖童心，引领
                孩子沐浴阳光，引导孩子浸润书香 。我相信，生命因阅读而幸福，
                教育因执著而精彩！
              </div>
            </div>
          </div>
        </div>
      </el-col>

      <el-col :span="14">
        <cc-panel title='课程提醒'
                  class='notice-wrap'>
          <div class='class-alert-info'>
            <div class='left-wrap'>
              <div class='left-title'>武松打虎</div>
              <div class='left-content'>
                2018年11月30日 18：00 45分钟
              </div>
            </div>
            <div class='right-btn'>
              进入课堂
            </div>
          </div>

          <div class='class-alert-info'>
            <div class='left-wrap'>
              <div class='left-title'>武松打虎</div>
              <div class='left-content'>
                2018年11月30日 18：00 45分钟
              </div>
            </div>
            <div class='right-btn'>
              进入课堂
            </div>
          </div>

          <div class='class-alert-info'>
            <div class='left-wrap'>
              <div class='left-title'>武松打虎</div>
              <div class='left-content'>
                2018年11月30日 18：00 45分钟
              </div>
            </div>
            <div class='right-btn'>
              进入课堂
            </div>
          </div>
          <div class='class-alert-info'>
            <div class='left-wrap'>
              <div class='left-title'>武松打虎</div>
              <div class='left-content'>
                2018年11月30日 18：00 45分钟
              </div>
            </div>
            <div class='right-btn'>
              进入课堂
            </div>
          </div>
        </cc-panel>
      </el-col>
    </el-row>

    <cc-panel title='教师基本培训' class='bottom-wrap'>
      <el-row :gutter='30'>
        <el-col :span='8'>
          <div class='basic-item'>
            <div class='icon-wrap'>
              <img src='./img/ic_audition@2x.png'
                   style='width: 35px;'
                   alt=''>
            </div>
            <div class='text'>讲师审核面试</div>
          </div>
        </el-col>
        <el-col :span='8'>
          <div class='basic-item'>
            <div class='icon-wrap'>
              <img src='./img/ic_skill@2x.png'
                   style='width: 39px;'
                   alt=''>
            </div>
            <div class='text'>授课技巧培训</div>
          </div>
        </el-col>
        <el-col :span='8'>
          <div class='basic-item'>
            <div class='icon-wrap'>
              <img src='./img/ic_make@2x.png'
                   style='width: 33px;'
                   alt=''>
            </div>
            <div class='text'>客户端使用指南</div>
          </div>
        </el-col>
      </el-row>
    </cc-panel>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
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
  @import './BasicInfo.scss';
</style>
