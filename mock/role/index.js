const Mock = require('mockjs')
const { deepClone } = require('../utils')
const { asyncRoutes, constantRoutes } = require('./routes.js')

const routes = deepClone([...constantRoutes, ...asyncRoutes])

const roles = [
  {
    key: 'admin',
    name: 'admin',
    description: 'Super Administrator. Have access to view all pages.',
    routes: routes
  },
  {
    key: 'editor',
    name: 'editor',
    description: 'Normal Editor. Can see all pages except permission page',
    routes: routes.filter(i => i.path !== '/permission')// just a mock
  },
  {
    key: 'visitor',
    name: 'visitor',
    description: 'Just a visitor. Can only see the home page and the document page',
    routes: [{
      path: '',
      redirect: 'dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          meta: { title: 'dashboard', icon: 'dashboard' }
        }
      ]
    }]
  }
]

const data = [{
  'children': [{
    'children': [{
      'alwaysShow': true,
      'component': '/system/user/create/index',
      'hidden': false,
      'id': 27,
      'meta': {
        'icon': '#',
        'status': true,
        'title': '添加用户'
      },
      'name': '添加用户',
      'path': '/system/user/create',
      'pid': 2,
      'url': '/user/create'
    }, {
      'component': '/system/user/list/index',
      'hidden': false,
      'id': 28,
      'meta': {
        'icon': '#',
        'status': true,
        'title': '用户列表'
      },
      'name': '用户列表',
      'path': '/system/user/list',
      'pid': 2,
      'url': '/user/index'
    }, {
      'alwaysShow': true,
      'component': '/system/user/edit/index',
      'hidden': true,
      'id': 29,
      'meta': {
        'icon': '#',
        'status': true,
        'title': '用户编辑'
      },
      'name': '用户编辑',
      'path': '/system/user/edit/:id(\\d+)',
      'pid': 2,
      'url': '/user/edit'
    }],
    'component': '/system/user/index',
    'hidden': false,
    'id': 2,
    'meta': {
      'icon': '#',
      'status': true,
      'title': '用户管理'
    },
    'name': '用户管理',
    'path': '/system/user',
    'pid': 1,
    'url': '/user'
  }, {
    'component': '/system/menu/index',
    'hidden': false,
    'id': 3,
    'meta': {
      'icon': '#',
      'status': true,
      'title': '菜单管理'
    },
    'name': '菜单管理',
    'path': '/system/menu',
    'pid': 1,
    'url': '/menu'
  }, {
    'alwaysShow': true,
    'component': '/system/role/index',
    'hidden': false,
    'id': 26,
    'meta': {
      'icon': '#',
      'status': true,
      'title': '角色管理'
    },
    'name': '角色管理',
    'path': '/system/role',
    'pid': 1,
    'url': '/roles'
  }],
  'component': '#',
  'hidden': false,
  'id': 1,
  'meta': {
    'icon': 'fafa-adjust',
    'status': true,
    'title': '系统管理'
  },
  'name': '系统管理',
  'path': '#',
  'pid': 0,
  'url': '#'
}, {
  'alwaysShow': true,
  'children': [{
    'alwaysShow': true,
    'component': '/article/create/index',
    'hidden': false,
    'id': 31,
    'meta': {
      'icon': '#',
      'status': true,
      'title': '创建文章'
    },
    'name': '创建文章',
    'path': '/article/create',
    'pid': 30,
    'url': '/article/create'
  }, {
    'alwaysShow': true,
    'component': '/article/edit/index',
    'hidden': true,
    'id': 32,
    'meta': {
      'icon': '#',
      'status': true,
      'title': '文章编辑'
    },
    'name': '文章编辑',
    'path': '/article/edit/:id(\\d+)',
    'pid': 30,
    'url': '/article/edit'
  }, {
    'alwaysShow': true,
    'component': '/article/list/index',
    'hidden': false,
    'id': 33,
    'meta': {
      'icon': '#',
      'status': true,
      'title': '文章列表'
    },
    'name': '文章列表',
    'path': '/article/list',
    'pid': 30,
    'url': '/article/list'
  }],
  'component': '#',
  'hidden': false,
  'id': 30,
  'meta': {
    'icon': '#',
    'status': true,
    'title': '内容管理'
  },
  'name': '内容管理',
  'path': '#',
  'pid': 0,
  'url': '/article'
}]

module.exports = [
  // mock get all routes form server
  {
    url: '/vue-element-admin/routes',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: routes
      }
    }
  },

  // mock get all routes form server
  {
    url: '/vue-element-admin/getMenus',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: data
      }
    }
  },

  // mock get all roles form server
  {
    url: '/vue-element-admin/roles',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: roles
      }
    }
  },

  // add role
  {
    url: '/vue-element-admin/role',
    type: 'post',
    response: {
      code: 20000,
      data: {
        key: Mock.mock('@integer(300, 5000)')
      }
    }
  },

  // update role
  {
    url: '/vue-element-admin/role/[A-Za-z0-9]',
    type: 'put',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  },

  // delete role
  {
    url: '/vue-element-admin/role/[A-Za-z0-9]',
    type: 'delete',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  }
]
