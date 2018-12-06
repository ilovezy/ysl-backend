<template>
  <div v-loading='loading'
       element-loading-text="上传中">
    <div v-if='file'>
      文件地址:
      <div>{{file}}</div>
      <el-button @click='handleRemove'
                 type='danger'>删除
      </el-button>
    </div>

    <el-upload
      v-else
      v-cloak
      class='spe-upload'
      :action="imgUploadUrl"
      :headers='uploadHeader'
      :on-success='uploadSuccess'
      :on-error='uploadError'
      :before-upload="beforeAvatarUpload"
      :show-file-list="false">
      <i class="el-icon-plus"></i>
    </el-upload>
  </div>
</template>

<script>
  export default {
    name: 'SingleFileUploader',
    data() {
      return {
        loading: false,
      }
    },

    props: {
      file: {
        type: String,
        default: ''
      },
      uploadUrl: {
        type: String,
        default: ''
      },
    },

    computed: {
      imgUploadUrl() {
        const env = process.env.NODE_ENV
        const ajaxUrl = CONFIG.serviceUrl[env]
        return ajaxUrl + (this.uploadUrl || 'auth/file/upload') // TODO 替换掉地址
      },
      uploadHeader() {
        const token = USER.getToken()
        return {
          Version: '1.0',
          Authorization: 'Bearer ' + token
        }
      }
    },

    methods: {
      uploadSuccess(res, file) {
        const self = this
        const result = res.result
        self.file = result
        self.$emit('update', result)

        this.loading = false
        this.$message({
          type: 'success',
          message: '上传成功'
        })
      },

      handleRemove() {
        this.file = ''
        this.$emit('update', '')
      },

      uploadError(err, file, fileList) {
        this.loading = false

        this.$message({
          type: 'error',
          message: '上传失败'
        })
      },

      beforeAvatarUpload(file) {
        this.loading = true
      },
      destoryed() {
        this.loading = false
      }
    }
  }
</script>

<style lang='scss'
       scoped>
</style>
