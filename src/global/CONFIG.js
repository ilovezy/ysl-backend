window.CONFIG = {
  serviceUrl: {
    'localhost': '//10.17.13.232:10010/', // 本地开发构建环境 npm run buildlocal
    'test': '//10.60.20.46:9011/backend/', // 测试构建环境 npm run build:test
    'production': '//api.51geai.com/backend/', // 上线构建环境  npm run build:prod

    // 热更新开发构建环境 npm run dev
    // 'development': '//10.60.20.46:9011/backend/' // 测试环境
    'development': 'http://www.yousilu.com/' // 米田共
    // 'development': '//10.60.10.20:9011/backend/' // 肥虫虫
    // 'development': '//10.60.30.69:9011/backend/',   // 王延吉
    // 'development': '//10.60.10.8:9011/backend/',   // 开阔
  },

  serviceParam: {
    clientName: 'backend-platform',
    clientSecret: 'backend-platform',
    clientSecretProd: 'shandianwebprod',
    Version: '1.0'
  }
}
