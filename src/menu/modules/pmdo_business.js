import Vue from 'vue'
import i18n from '../../i18n'

const vueInstance = new Vue({ i18n })

export default {
  path: '/pmdo/business',
  title: `${vueInstance.$t('layout.sidebar.business.title')}`,
  icon: 'building',
  children: (pre => [
    { path: `${pre}business_workbench`, title: `${vueInstance.$t('layout.sidebar.business.business_workbench')}`, icon: 'briefcase' },
    { path: `${pre}crm/client`,
      title: `${vueInstance.$t('layout.sidebar.business.crm.title')}`,
      icon: 'vcard',
      children: [
        { path: `${pre}crm/client`, title: `${vueInstance.$t('layout.sidebar.business.crm.client')}`, icon: 'vcard' },
        { path: `${pre}crm/contacts`, title: `${vueInstance.$t('layout.sidebar.business.crm.contacts')}`, icon: 'address-book-o' },
        { path: `${pre}crm/opportunity`, title: `${vueInstance.$t('layout.sidebar.business.crm.opportunity')}`, icon: 'suitcase' },
        { path: `${pre}crm/services`, title: `${vueInstance.$t('layout.sidebar.business.crm.services')}`, icon: 'server' }
      ]
    },
    { path: `${pre}contract_manage/contract_ledger`,
      title: `${vueInstance.$t('layout.sidebar.business.contract_manage.title')}`,
      icon: 'print',
      children: [
        { path: `${pre}contract_manage/contract_ledger`, title: `${vueInstance.$t('layout.sidebar.business.contract_manage.contract_ledger')}`, icon: 'clipboard' },
        { path: `${pre}contract_manage/receipt_plan`, title: `${vueInstance.$t('layout.sidebar.business.contract_manage.receipt_plan')}`, icon: 'list-ol' },
        { path: `${pre}contract_manage/invoice_apply`, title: `${vueInstance.$t('layout.sidebar.business.contract_manage.invoice_apply')}`, icon: 'asl-interpreting' },
        { path: `${pre}contract_manage/bill_register`, title: `${vueInstance.$t('layout.sidebar.business.contract_manage.bill_register')}`, icon: 'pencil-square-o' },
        { path: `${pre}contract_manage/income_register`, title: `${vueInstance.$t('layout.sidebar.business.contract_manage.income_register')}`, icon: 'paint-brush' },
        { path: `${pre}contract_manage/contract_borrow`, title: `${vueInstance.$t('layout.sidebar.business.contract_manage.contract_borrow')}`, icon: 'columns' }
      ]
    },
    { path: `${pre}subcontract_procument/provider`,
      title: `${vueInstance.$t('layout.sidebar.business.subcontract_procument.title')}`,
      icon: 'play',
      children: [
        { path: `${pre}subcontract_procument/provider`, title: `${vueInstance.$t('layout.sidebar.business.subcontract_procument.provider')}`, icon: 'bank' },
        { path: `${pre}subcontract_procument/procument_demand`, title: `${vueInstance.$t('layout.sidebar.business.subcontract_procument.procument_demand')}`, icon: 'shopping-cart' },
        { path: `${pre}subcontract_procument/tender_info`, title: `${vueInstance.$t('layout.sidebar.business.subcontract_procument.tender_info')}`, icon: 'info-circle' },
        { path: `${pre}subcontract_procument/procument_contract`, title: `${vueInstance.$t('layout.sidebar.business.subcontract_procument.procument_contract')}`, icon: 'inbox' },
        { path: `${pre}subcontract_procument/pay_plan`, title: `${vueInstance.$t('layout.sidebar.business.subcontract_procument.pay_plan')}`, icon: 'align-justify' },
        { path: `${pre}subcontract_procument/pay_apply`, title: `${vueInstance.$t('layout.sidebar.business.subcontract_procument.pay_apply')}`, icon: 'handshake-o' },
        { path: `${pre}subcontract_procument/pay_record`, title: `${vueInstance.$t('layout.sidebar.business.subcontract_procument.pay_record')}`, icon: 'credit-card' },
        { path: `${pre}subcontract_procument/performance_evaluation`, title: `${vueInstance.$t('layout.sidebar.business.subcontract_procument.performance_evaluation')}`, icon: 'star' }
      ]
    },
    { path: `${pre}km/km_center`, title: `${vueInstance.$t('layout.sidebar.business.km.km_center')}`, icon: 'folder-open-o' }
  ])('/pmdo/business/')
}
