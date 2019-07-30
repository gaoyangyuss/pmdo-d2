import Vue from 'vue'
import i18n from '../../i18n'

import layoutHeaderAside from '@/layout/header-aside'

const vueInstance = new Vue({ i18n })

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/pmdo/more',
  name: 'pmdo-more',
  meta,
  redirect: { name: 'pmdo-more-index' },
  component: layoutHeaderAside,
  children: (pre => [
    {
      path: 'domain_manage',
      name: `${pre}domain_manage`,
      component: _import('pmdo/more/domain_manage'),
      meta: {
        ...meta,
        title: `${vueInstance.$t('layout.sidebar.more.domain_manage')}`
      }
    }
  ])('pmdo-more-')
}
