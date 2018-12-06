<!--TODO-->
<template>
  <div class="app-container data-view-page">
    <div class='main-table-wrap'
         style='margin-bottom: 20px; padding: 20px;'
         v-loading='listLoading'>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class='spe-item'>
            <img src='./img/Group1.png'
                 class='spe-img'
                 alt=''>
            <div class='info'>
              <div class='top'>{{obj.totalBorrowers}}</div>
              <div class='bottom'>总借款成功人数</div>
            </div>
          </div>
        </el-col>

        <el-col :span="8"
                style='border-left: 1px solid #D8D8D8; border-right: 1px solid #D8D8D8'>
          <div class='spe-item'>
            <img src='./img/Group2.png'
                 class='spe-img'
                 alt=''>
            <div class='info'>
              <div class='top'>{{obj.totalNumberOfBorrowings}}</div>
              <div class='bottom'>总借款笔数</div>
            </div>
          </div>
        </el-col>

        <el-col :span="8">
          <div class='spe-item'>
            <img src='./img/Group3.png'
                 class='spe-img'
                 alt=''>
            <div class='info'>
              <div class='top'>{{obj.totalLoanAmount}}</div>
              <div class='bottom'>总借款金额</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class='main-table-wrap'
         v-loading='listLoading'>
      <table class='el-table el-table--border table-spe'>
        <tr>
          <td>成功借款笔数</td>
          <td>失败借款笔数</td>
          <td>已还款笔数</td>
          <td>正常还款笔数</td>
          <td>提前还款笔数</td>
        </tr>
        <tr>
          <td>{{obj.totalSuccessNumberOfBorrowings}}</td>
          <td>{{obj.totalFailNumberOfBorrowings}}</td>
          <td>{{obj.totalRepaidNumber}}</td>
          <td>{{obj.totalNormalRepaidNumber}}</td>
          <td>{{obj.totalAdvanceRepaidNumber}}</td>
        </tr>
        <tr>
          <td>成功借款金额</td>
          <td>失败借款金额</td>
          <td>已还款金额</td>
          <td>正常还款金额</td>
          <td>提前还款金额</td>
        </tr>
        <tr>
          <td>{{obj.totalSuccessLoanAmount}}</td>
          <td>{{obj.totalFailLoanAmount}}</td>
          <td>{{obj.totalRepaidLoanAmount}}</td>
          <td>{{obj.totalNormalRepaidAmount}}</td>
          <td>{{obj.totalAdvanceRepaidAmount}}</td>
        </tr>
        <tr>
          <td>逾期中笔数</td>
          <td>逾期1-30天内笔数</td>
          <td>逾期30天以上笔数</td>
          <td>首次逾期笔数</td>
          <td>首逾率</td>
        </tr>
        <tr>
          <td>{{obj.totalOverdueNumber}}</td>
          <td>{{obj.totalOverdueNumber1_30}}</td>
          <td>{{obj.totalOverdueNumberOver30}}</td>
          <td>{{obj.firstOverdueNumber}}</td>
          <td>{{obj.firstOverdueRate}}</td>
        </tr>
        <tr>
          <td>逾期中金额</td>
          <td>逾期1-30天内金额</td>
          <td>逾期30天以上金额</td>
          <td>首逾金额</td>
          <td>坏账率</td>
        </tr>
        <tr>
          <td>{{obj.totalOverdueAmount}}</td>
          <td>{{obj.totalOverdueAmount1_30}}</td>
          <td>{{obj.totalOverdueAmountOver30}}</td>
          <td>{{obj.firstOverdueAmount}}</td>
          <td>{{obj.badDebtRate}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        listLoading: false,
        obj: {}
      }
    },

    created() {
      this.getDetail()
    },

    methods: {
      formatDate,
      getDetail() {
        const self = this
        self.listLoading = true
        AXIOS.post('/auth/business/businessInfoIndex', self.listQuery).then(res => {
          self.obj = res || {}
          self.listLoading = false
        }).catch((res) => {
          self.listLoading = false
        })
      }
    }
  }
</script>

<style lang="scss"
       scoped>
  .data-view-page {

    .spe-item {
      display: flex;
      align-items: center;
      justify-content: center;
      .spe-img {
        width: 72px;
        height: 72px;
      }
      .info {
        padding-left: 40px;

        color: #333;
        .top {
          font-size: 24px;
        }
        .bottom {
          padding-top: 10px;
          font-size: 20px;
        }
      }
    }

    .table-spe {
      /*border-collapse: collapse;*/
      tr {
        td {
          padding: 15px 30px;
          color: #333;
        }
      }
    }
  }
</style>


