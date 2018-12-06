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
        <cc-panel title='学籍信息'
                  :subTitle='"信息获取时间：" + student.createAt'>
          <el-row :gutter="20">
            <el-col :span="6">
              <div class='simple-text'>
                <div style='padding-bottom: 15px;'>头像：</div>
                <img :src='"data:image/jpg;base64, " +student.head_img'
                     class='spe-avatar'
                     alt=''/>
              </div>
            </el-col>
            <el-col :span="6">
              <div class='simple-text'>姓名：{{student.real_name}}</div>
              <div class='simple-text'>性别：{{student.sex}}</div>
              <div class='simple-text'>民族：{{student.nation}}</div>
              <div class='simple-text'>出生日期：{{student.birth_date}}</div>
              <div class='simple-text'>身份证：{{student.id_card}}</div>
            </el-col>
            <el-col :span="6">
              <div class='simple-text'>院校名称：{{student.school_name}}</div>
              <div class='simple-text'>分校：{{student.branch_school}}</div>
              <div class='simple-text'>系：{{student.department}}</div>
              <div class='simple-text'>专业：{{student.specialty}}</div>
              <div class='simple-text'>学制（年）：{{student.length_of_schooling}}</div>
            </el-col>
            <el-col :span="6">
              <div class='simple-text'>学历类别：{{student.edu_type}}</div>
              <div class='simple-text'>学习形式：{{student.edu_form}}</div>
              <div class='simple-text'>入学时间：{{student.enrollment_time}}</div>
              <div class='simple-text'>学籍状态：{{student.status}}</div>



              <div class='simple-text'>离校时间：{{student.leave_school_time}}</div>
              <div class='simple-text'>毕业时间：{{education.graduate_time}}</div>
              <div class='simple-text'>学历层次：{{education.edu_level}}</div>
              <div class='simple-text'>是否结业、毕业：{{education.graduate}}</div>
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

        chsiEducations: [],
        chsiStudents: [],
        student: {},
        education: {}
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
      formatSpeDate,
      formatMoney,
      getDetail() {
        const self = this
        self.loading = true
        AXIOS.post('/auth/moxieInfo/chsiData', {
          memberId: Number(this.memberId)
        }).then(res => {
          if (_.isEmpty(res)) {
            self.isEmpty = true
          } else {
            self.chsiEducations = res.chsiEducations || []
            self.chsiStudents = res.chsiStudents || []
            if (isLongArr(res.chsiEducations)){
              self.education = res.chsiEducations[0] || {}
            }
            if (isLongArr(res.chsiStudents)) {
              self.student = res.chsiStudents[0] || {}
            }
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

    .spe-avatar {
      max-width: 200px;
      height: auto;
    }
  }
</style>
