import Vue from 'vue'
import i18n from '../../i18n'

const vueInstance = new Vue({ i18n })

export default {
  path: '/pmdo/project',
  title: ` ${vueInstance.$t('layout.sidebar.project.title')}`,
  icon: 'cubes',
  children: (pre => [
    { path: `${pre}proj_group_workbench`, title: `${vueInstance.$t('layout.sidebar.project.proj_group_workbench')}`, icon: 'map' },
    { path: `${pre}proj_center_design`, title: `${vueInstance.$t('layout.sidebar.project.proj_center_design')}`, icon: 'th-large' },
    { path: `${pre}proj_watch/plan_progress`,
      title: `${vueInstance.$t('layout.sidebar.project.proj_watch.title')}`,
      icon: 'eye',
      children: [
        { path: `${pre}proj_watch/plan_progress`, title: `${vueInstance.$t('layout.sidebar.project.proj_watch.plan_progress')}`, icon: 'plane' },
        { path: `${pre}proj_watch/income_expenses_analyze`, title: `${vueInstance.$t('layout.sidebar.project.proj_watch.income_expenses_analyze')}`, icon: 'money' },
        { path: `${pre}proj_watch/group_status`, title: `${vueInstance.$t('layout.sidebar.project.proj_watch.group_status')}`, icon: 'users' }
      ]
    },
    { path: `${pre}proj_start/proj_charter`,
      title: `${vueInstance.$t('layout.sidebar.project.proj_start.title')}`,
      icon: 'play',
      children: [
        { path: `${pre}proj_start/proj_charter`, title: `${vueInstance.$t('layout.sidebar.project.proj_start.proj_charter')}`, icon: 'book' }
      ]
    },
    { path: `${pre}proj_plan/proj_schedule`,
      title: `${vueInstance.$t('layout.sidebar.project.proj_plan.title')}`,
      icon: 'list',
      children: [
        { path: `${pre}proj_start/proj_schedule`, title: `${vueInstance.$t('layout.sidebar.project.proj_plan.proj_schedule')}`, icon: 'navicon' },
        { path: `${pre}proj_start/crew_plan`, title: `${vueInstance.$t('layout.sidebar.project.proj_plan.crew_plan')}`, icon: 'user-circle-o' },
        { path: `${pre}proj_start/cost_budget`, title: `${vueInstance.$t('layout.sidebar.project.proj_plan.cost_budget')}`, icon: 'calculator' }
      ]
    },
    { path: `${pre}proj_executive/task_track`,
      title: `${vueInstance.$t('layout.sidebar.project.proj_executive.title')}`,
      icon: 'rocket',
      children: [
        { path: `${pre}proj_start/task_track`, title: `${vueInstance.$t('layout.sidebar.project.proj_executive.task_track')}`, icon: 'binoculars' },
        { path: `${pre}proj_start/proj_meeting`, title: `${vueInstance.$t('layout.sidebar.project.proj_executive.proj_meeting')}`, icon: 'comments' },
        { path: `${pre}proj_start/week_paper`, title: `${vueInstance.$t('layout.sidebar.project.proj_executive.week_paper')}`, icon: 'clone' },
        { path: `${pre}proj_start/matters_register`, title: `${vueInstance.$t('layout.sidebar.project.proj_executive.matters_register')}`, icon: 'tags' }
      ]
    },
    { path: `${pre}proj_end/proj_replay`,
      title: `${vueInstance.$t('layout.sidebar.project.proj_end.title')}`,
      icon: 'hourglass-end',
      children: [
        { path: `${pre}proj_end/proj_replay`, title: `${vueInstance.$t('layout.sidebar.project.proj_end.proj_replay')}`, icon: 'object-group' }
      ]
    },
    { path: `${pre}proj_km_center`, title: `${vueInstance.$t('layout.sidebar.project.proj_km_center')}`, icon: 'folder-open' }
  ])('/pmdo/project/')
}
