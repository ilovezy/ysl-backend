<template>
  <el-menu class="navbar"
           mode="horizontal">
    <div class='left'>
      <hamburger class="hamburger-container"
                 :toggleClick="toggleSideBar"
                 :isActive="sidebar.opened"></hamburger>

      <breadcrumb class="breadcrumb-container"></breadcrumb>
    </div>
    <div class="right-menu">
      <el-tooltip effect="dark"
                  content="查看文档"
                  v-if='isTestEnv'
                  placement="bottom">
        <router-link to='/documentation'
                     class='document-icon'>文档
        </router-link>
      </el-tooltip>

      <el-dropdown class="avatar-container right-menu-item"
                   trigger="hover">
        <div class="login-name">
          {{loginName}}
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <span @click="doOpenModal"
                  style="display:block;">
              修改密码
            </span>
          </el-dropdown-item>
          <el-dropdown-item>
            <span @click="doLogout"
                  style="display:block;">
              退出登录
            </span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-dialog width='500px'
               title="修改密码"
               :visible.sync="dialogFormVisible">
      <el-form label-position='left'>
        <el-form-item label="新密码"
                      label-width="100px">
          <el-input v-model="newLoginPwd"
                    auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="confirmChangePwd">确 定
        </el-button>
      </div>
    </el-dialog>
  </el-menu>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Breadcrumb from '@/components/Breadcrumb'
  import Hamburger from '@/components/Hamburger'
  import USER from '../../../global/USER'

  export default {
    components: {
      Breadcrumb,
      Hamburger
    },
    computed: {
      ...mapGetters([
        'sidebar'
      ])
    },
    data() {
      return {
        loginName: USER.getLoginName() || '',
        isTestEnv: window.CurrentEnv == 'development',
        dialogFormVisible: false,
        newLoginPwd: '',
      }
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('toggleSideBar')
      },

      doLogout() {
        USER.logout()
        // this.$store.dispatch('delAllViews')
        // this.$store.dispatch('delActionPermission')
        const self = this
        AXIOS.post('/member/account/logout').then(res => {
          self.$message.success('退出登录成功,请重新登录')
          setTimeout(() => {
            self.$router.push('/login')
          }, 1000)
        })
      },

      doOpenModal() {
        this.dialogFormVisible = true
      },

      confirmChangePwd() {
        const self = this
        if (isValidPassword(this.newLoginPwd)) {
          AXIOS.post('/auth/user/changeLoginPwd', {
            newLoginPwd: this.newLoginPwd
          }).then(res => {
            this.$message.success('密码修改成功,请重新登录')
            this.dialogFormVisible = false
            setTimeout(() => {
              self.doLogout()
            }, 1000)
          })
        } else {
          this.$message.error('请输入正确的密码，6-16位密码必须字母+数字')
          return false
        }
      },

    }
  }
</script>

<style rel="stylesheet/scss"
       lang="scss"
       scoped>
  .navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &:before, &:after {
      display: none;
    }
    .hamburger-container {
      line-height: 58px;
      height: 50px;
      float: left;
      padding: 0 10px;
    }
    .breadcrumb-container {
      float: left;
    }
    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }
    .right-menu {
      float: right;
      display: flex;
      align-items: center;
      &:focus {
        outline: none;
      }
      .right-menu-item {
        display: inline-block;
        margin: 0 8px;
      }
      .screenfull {
        height: 20px;
      }
      .international {
        vertical-align: top;
      }
      .theme-switch {
        vertical-align: 15px;
      }
      .document-icon {
        margin-right: 30px;
      }
      .avatar-container {
        height: 50px;
        margin-right: 30px;
        .login-name {
          cursor: pointer;
        }
      }
    }
  }
</style>
