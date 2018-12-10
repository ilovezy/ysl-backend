import Layout from '@/views/layout/Layout'

export default [
  {
    path: '',
    component: Layout,
    redirect: 'teacherBasicInfo',
    children: [{
      path: 'teacherBasicInfo',
      component: () => import('@/views/teacher/basicInfo/BasicInfo'),
      name: 'teacherBasicInfo',
      meta: {title: '基本信息', icon: 'yslRenyuan', noCache: true}
    }]
  },
  // {
  //   path: '/teacherBasicInfo',
  //   component: Layout,
  //   redirect: '/teacherBasicInfo',
  //   children: [{
  //     path: 'teacherBasicInfo',
  //     component: () => import('@/views/teacher/basicInfo/BasicInfo'),
  //     name: 'teacherBasicInfo',
  //     meta: {title: '基本信息', icon: 'user', noCache: true}
  //   }]
  // },
  {
    path: '/teacherMyClass',
    component: Layout,
    redirect: '/teacherMyClass',
    children: [{
      path: 'teacherMyClass',
      component: () => import('@/views/teacher/myClass/MyClass'),
      name: 'teacherMyClass',
      meta: {title: '我的课程', icon: 'yslRiqi', noCache: true}
    }]
  }, {
    path: '/teacherOpenClassManage',
    component: Layout,
    redirect: '/teacherOpenClassManage',
    children: [{
      path: 'teacherOpenClassManage',
      component: () => import('@/views/teacher/openClassManage/OpenClassManage'),
      name: 'teacherOpenClassManage',
      meta: {title: '开课管理', icon: 'yslDiannao', noCache: true}
    }]
  }, {
    path: '/teacherHomeworkManage',
    component: Layout,
    redirect: '/teacherHomeworkManage',
    children: [{
      path: 'teacherHomeworkManage',
      component: () => import('@/views/teacher/homeworkManage/HomeworkManage'),
      name: 'teacherHomeworkManage',
      meta: {title: '作业管理', icon: 'yslJilu', noCache: true}
    }]
  },
]
