import Vue from 'vue'
import i18n from '../../i18n'

const vueInstance = new Vue({ i18n })

export default {
  path: '/pmdo/more',
  title: `${vueInstance.$t('layout.sidebar.more.title')}`,
  icon: 'flask',
  children: (pre => [
    { path: `${pre}domain_manage`, title: `${vueInstance.$t('layout.sidebar.more.domain_manage')}`, icon: 'cloud' },
    { path: `${pre}proj_structures`, title: `${vueInstance.$t('layout.sidebar.more.proj_structures')}`, icon: 'code-fork' },
    { path: `${pre}organization/users`,
      title: `${vueInstance.$t('layout.sidebar.more.organization.title')}`,
      icon: 'user-circle-o',
      children: [
        { path: `${pre}organization/users`, title: `${vueInstance.$t('layout.sidebar.more.organization.users')}`, icon: 'user-circle-o' },
        { path: `${pre}organization/org_structures`, title: `${vueInstance.$t('layout.sidebar.more.organization.org_structures')}`, icon: 'sitemap' },
        { path: `${pre}organization/roles`, title: `${vueInstance.$t('layout.sidebar.more.organization.roles')}`, icon: 'user-circle' },
        { path: `${pre}organization/functions`, title: `${vueInstance.$t('layout.sidebar.more.organization.functions')}`, icon: 'mortar-board' },
        { path: `${pre}organization/parameters`, title: `${vueInstance.$t('layout.sidebar.more.organization.parameters')}`, icon: 'key' }
      ]
    },
    { path: `${pre}system_template/plan_template_setting`,
      title: ` ${vueInstance.$t('layout.sidebar.more.organization.title')}`,
      icon: 'object-ungroup',
      children: [
        { path: `${pre}system_template/plan_template_setting`, title: `${vueInstance.$t('layout.sidebar.more.system_template.plan_template_setting')}`, icon: 'sticky-note' },
        { path: `${pre}system_template/cost_manage`, title: `${vueInstance.$t('layout.sidebar.more.system_template.cost_manage')}`, icon: 'sticky-note-o' }
      ]
    }
  ])('/pmdo/more/')
}
