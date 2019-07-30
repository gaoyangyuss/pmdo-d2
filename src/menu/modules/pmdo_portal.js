import Vue from 'vue'
import i18n from '../../i18n'

const vueInstance = new Vue({ i18n })

export default {
  path: '/pmdo/portal',
  title: `${vueInstance.$t('layout.sidebar.portal.title')}`,
  icon: 'user',
  children: (pre => [
    { path: `${pre}workbench`, title: `${vueInstance.$t('layout.sidebar.portal.workbench')}`, icon: 'tv' },
    { path: `${pre}calendar`, title: `${vueInstance.$t('layout.sidebar.portal.calendar')}`, icon: 'calendar' },
    { path: `${pre}task`, title: `${vueInstance.$t('layout.sidebar.portal.task')}`, icon: 'tasks' },
    { path: `${pre}workflows`, title: `${vueInstance.$t('layout.sidebar.portal.workflows')}`, icon: 'database' },
    { path: `${pre}messages`, title: `${vueInstance.$t('layout.sidebar.portal.messages')}`, icon: 'envelope' },
    { path: `${pre}worknotes`, title: `${vueInstance.$t('layout.sidebar.portal.worknotes')}`, icon: 'pencil' },
    { path: `${pre}my_projects`, title: `${vueInstance.$t('layout.sidebar.portal.my_projects')}`, icon: 'cube' },
    { path: `${pre}scrumboard`, title: `${vueInstance.$t('layout.sidebar.portal.scrumboard')}`, icon: 'window-restore' },
    { path: `${pre}work_paper`, title: `${vueInstance.$t('layout.sidebar.portal.work_paper')}`, icon: 'file-text-o' },
    { path: `${pre}domain_choose`, title: `${vueInstance.$t('layout.sidebar.portal.domain_choose')}`, icon: 'cloud' }
  ])('/pmdo/portal/')
}
