<!--TODO-->
<template>
  <div class='main-section'
       v-loading='loading'>
    <div v-if='showResult'>
      <div class='no-data'
           style='padding: 150px;text-align: center;font-size: 20px;color: #999;'
           v-if='isEmpty'>
        暂无数据
      </div>

      <div v-else
           class='section-info-container'>
        <cc-panel title='基本信息'>
          <el-row :gutter="20">
            <el-col :span="24">
              <div class='simple-text'>用户姓名：{{userInfo.trueName}}</div>
              <div class='simple-text'>手机号：{{userInfo.mobile}}</div>
              <div class='simple-text'>身份证号：{{userInfo.identityNumber}}</div>
              <div class='simple-text'>身份证地址：{{userInfo.identityAddress}}</div>
            </el-col>
          </el-row>
        </cc-panel>

        <cc-panel title='借款信息'>
          <el-row :gutter="20">
            <el-col :span="24">
              <div class='simple-text'>授信额度：{{userInfo.maxBorrowLimit}} 元</div>
              <div class='simple-text'>剩余可用额度：{{userInfo.remainBorrowLimit}} 元</div>
              <div class='simple-text'>是否逾期：{{userInfo.overdueFlag ? '是' : '否'}}</div>
              <div class='simple-text'>逾期中金额：{{userInfo.overdueAmount}} 元</div>
            </el-col>
          </el-row>
        </cc-panel>

        <cc-panel title='认证信息'>
          <el-row :gutter="20">
            <el-col :span="6">
              <div class='simple-text'>人脸识别认证：{{userInfo.faceStatusFlag ? '已认证' : '未认证'}}</div>
              <div class='simple-text'>京东认证：{{userInfo.jdStatusFlag ? '已认证' : '未认证'}}</div>
            </el-col>
            <el-col :span="6">
              <div class='simple-text'>运营商认证：{{userInfo.mobileCarrierStatusFlag ? '已认证' : '未认证'}}</div>
              <div class='simple-text'>公积金认证：{{userInfo.fundStatusFlag ? '已认证' : '未认证'}}</div>
            </el-col>
            <el-col :span="6">
              <div class='simple-text'>支付宝认证：{{userInfo.alipayStatusFlag ? '已认证' : '未认证'}}</div>
              <div class='simple-text'>社保认证：{{userInfo.securityStatusFlag ? '已认证' : '未认证'}}</div>
            </el-col>
          </el-row>
        </cc-panel>

        <cc-panel title='图片信息'>
          <el-row :gutter="20">
            <el-col :span="12">
              <div class='spe-img-wrap'>
                <div class='title'>身份证正面</div>
                <img :src='userInfo.identityFrontImg'
                     alt=''>
              </div>
            </el-col>

            <el-col :span="12">
              <div class='spe-img-wrap'>
                <div class='title'>身份证反面</div>
                <img :src='userInfo.identityBackImg'
                     alt=''>
              </div>
            </el-col>

          </el-row>
          <el-row :gutter="20">
            <el-col :span="12"
                    style='margin-top: 30px;'>
              <div class='spe-img-wrap'>
                <div class='title'>人脸识别图片</div>
                <img :src='userInfo.faceRecognizeFileUrl'
                     alt=''>
              </div>
            </el-col>
          </el-row>
        </cc-panel>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loading: false,
        isEmpty: false,
        showResult: false,

        userInfo: {}
      }
    },

    props: {
      memberId: {
        default: ''
      }
    },

    created() {
      this.getDetail()
    },

    methods: {
      formatMoney,
      getDetail() {
        const self = this
        self.loading = true
        AXIOS.post('/auth/platformMember/memberInfoDetail', {
          memberId: Number(this.memberId)
        }).then(res => {
          if (_.isEmpty(res)) {
            self.isEmpty = true
          } else {
            self.userInfo = res || {}
          }
          self.showResult = true
          self.loading = false
        }).catch((res) => {
          self.showResult = true
          self.loading = false
        })
      }
    }
  }
</script>

<style lang="scss"
       scoped>
  .main-section {
    padding-bottom: 50px;

    .spe-img-wrap {
      .title {
        font-size: 18px;
        margin-bottom: 15px;
      }
      img {
        max-width: 500px;
      }
    }
  }
</style>
