<template>
  <div class="login-container">
    <div class='login-bg'></div>
    <el-form class="login-form"
             autoComplete="on"
             :model="loginForm"
             :rules="loginRules"
             ref="loginForm"
             label-position="left">

      <img src='./img/logo_aa@2x.png'
           class='login-logo'
           alt=''>

      <div class="title-container">
        <h3 class="title">进入优思路课堂</h3>
      </div>

      <el-form-item prop="loginName">
        <el-select v-model="role"
                   style='width: 100%;'
                   placeholder="角色类型">
          <el-option
            v-for="item,index in enterStatusMap"
            :key="'enterStatusMap' + index"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="loginName">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user"/>
        </span>
        <el-input name="loginName"
                  v-model="loginForm.loginName"
                  autoComplete="on"
                  placeholder="请输入用户名"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
        <el-input name="password"
                  :type="passwordType"
                  @keyup.enter.native="handleLogin"
                  v-model="loginForm.password"
                  autoComplete="on"
                  placeholder="请输入密码"/>
        <span class="show-pwd"
              @click="showPwd">
          <svg-icon icon-class="eye"/>
        </span>
      </el-form-item>

      <el-button class='login-btn'
                 :loading="loading"
                 @click.native.prevent="handleLogin">登录
      </el-button>
    </el-form>
  </div>
</template>

<script>
  import AXIOS from '../../global/Fetch'

  export default {
    name: 'login',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (value) {
          callback()
        } else {
          callback(new Error('请输入正确的用户名'))
        }
        callback()
      }
      const validatePassword = (rule, value, callback) => {
        if (isValidPassword(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的密码，6-16位密码必须字母+数字'))
        }
      }
      return {
        loginForm: {
          loginName: window.isDev ? '17767213031' : '',
          password: window.isDev ? '123123' : ''
        },
        loginRules: {
          loginName: [{required: true, trigger: 'blur', validator: validateUsername}],
          // password: [{required: true, trigger: 'blur', validator: validatePassword}]
        },
        passwordType: 'password',
        loading: false,

        role: 1,
        enterStatusMap: [
          {value: 1, label: '学生'},
          {value: 2, label: '老师'},
        ],
      }
    },
    created() {
      // this.getActionPermission() //TODO 按钮权限
      this.getTeacherList()
    },
    methods: {
      getTeacherList() {
        AXIOS.post('/teacher/teacher/list').then(res => {
          // this.$store.dispatch('addActionPermission', res)
          // USER.setPermissions(res)
        })
      },
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
      },

      handleLogin() {
        const self = this
        const loginName = self.loginForm.loginName
        const password = self.loginForm.password

        self.$refs.loginForm.validate(valid => {
          if (valid) {
            self.loading = true
            AXIOS.post('/member/account/login', {
              username: loginName,
              password: password,
              from: 'pc',
              role: self.role
            }).then(res => {
              USER.setToken(res.bearerToken)
              USER.setLoginName(loginName)
              self.$router.push({path: '/'})
            }).catch(() => {
              self.loading = false
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss"
       lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg: #283443;
  $light_gray: #eee;
  $cursor: #fff;

  .login-btn {
    height: 54px;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 30px;
    font-size: 24px;
    background: #F19149;
    color: #fff;

    &:active,
    &:hover {
      background: darken(#F19149, 5%);
      color: #fff;
    }
  }

  .login-logo {
    position: absolute;
    width: 250px;
    top: -120px;
    left: 50%;
    transform: translateX(-50%);
  }

  .login-bg {
    background: url("./img/bg.png") no-repeat center;
    background-size: cover;
    height: 50%;
    margin: 0 auto;
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 52px;
      line-height: 52px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: #898F97;
        font-size: 18px;
        height: 52px;
      }
    }

    .el-select {
      .el-input {
        width: 100%!important;
      }
    }

    .el-form-item__error {
      margin-top: 3px;
      font-size: 16px;
    }

    .el-form-item {
      border: 1px solid #979797;
      border-radius: 8px;
      color: #898F97;
      margin-bottom: 40px;
    }
  }
</style>

<style rel="stylesheet/scss"
       lang="scss"
       scoped>
  $bg: #fff;
  $dark_gray: #889aa4;
  $light_gray: #eee;
  .login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: $bg;
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 520px;
      top: 50%;
      transform: translateY(-50%);
      padding: 35px 55px 15px;
      margin: 0 auto;
      background: #fff;
      color: #000;
      box-shadow: 0px 0 11px #eee;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }
    .svg-container {
      padding: 6px 5px 6px 12px;
      text-align: center;
      color: $dark_gray;
      vertical-align: middle;
      display: inline-block;
      font-size: 24px;
      width: 50px;
      &_login {
        font-size: 30px;
      }
    }
    .title-container {
      position: relative;
      .title {
        font-size: 24px;
        color: #000;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
      .set-language {
        color: #fff;
        position: absolute;
        top: 5px;
        right: 0px;
      }
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
    .thirdparty-button {
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
  }
</style>
