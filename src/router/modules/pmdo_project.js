import Vue from 'vue'
import i18n from '../../i18n'

import layoutHeaderAside from '@/layout/header-aside'

const vueInstance = new Vue({ i18n })

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/pmdo/project',
  name: 'pmdo-project',
  meta,
  redirect: { name: 'pmdo-portal-index' },
  component: layoutHeaderAside,
  children: (pre => [
    {
      path: 'proj_group_workbench',
      name: `${pre}proj_group_workbench`,
      component: _import('pmdo/project/proj_group_workbench'),
      meta: {
        ...meta,
        title: `${vueInstance.$t('layout.sidebar.project.proj_group_workbench')}`
      }
    },
    {
      path: 'proj_km_center',
      name: `${pre}proj_km_center`,
      component: _import('pmdo/project/proj_km_center'),
      meta: {
        ...meta,
        title: `${vueInstance.$t('layout.sidebar.project.proj_km_center')}`
      }
    }
  ])('pmdo-project-')
}
