import Vue from 'vue'
import i18n from '../../i18n'

import layoutHeaderAside from '@/layout/header-aside'

const vueInstance = new Vue({ i18n })

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/pmdo/business',
  name: 'pmdo-business',
  meta,
  redirect: { name: 'pmdo-business-index' },
  component: layoutHeaderAside,
  children: (pre => [
    {
      path: 'business_workbench',
      name: `${pre}business_workbench`,
      component: _import('pmdo/business/business_workbench'),
      meta: {
        ...meta,
        title: `${vueInstance.$t('layout.sidebar.business.business_workbench')}`
      }
    }
  ])('pmdo-business-')
}
