<template>
  <div>
      <el-input :placeholder="$t('views.pmdo.project.proj_km_center.proj_km_center_detail_dialog.placeholder')" v-model="docTitle" class="input-demo-400 input-title" style="margin-bottom:10px;">
        <template slot="prepend"><d2-icon name="folder-open"/></template>
      </el-input>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane :label="$t('views.pmdo.tabs.basic-info')" name="first">
            <el-row :gutter="10">
                <el-col :span="4">
                    <label class="form-label">{{$t('views.pmdo.form-label.create-person')}}:</label>
                </el-col>
                <el-col :span="8">
                    <el-select v-model="createP"
                    placeholder=""
                    class="select"
                    filterable>
                        <el-option-group
                        v-for="group in pOptions"
                        :key="group.label"
                        :label="group.label">
                        <el-option
                            v-for="item in group.options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                        </el-option-group>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <label class="form-label">{{$t('views.pmdo.form-label.create-time')}}:</label>
                </el-col>
                <el-col :span="8">
                   <el-date-picker
                    v-model="createT"
                    type="date"
                    placeholder=""
                    class="input-date"
                    value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-col>
            </el-row>
            <el-row :gutter="10" style="margin-top: 10px">
                <el-col :span="4">
                  <label class="form-label">{{$t('views.pmdo.project.proj_km_center.proj_km_center_detail_dialog.doc-suffix-label')}}:</label>
                </el-col>
                <el-col :span="8">
                  <el-input  v-model="docSuf" size="small" placeholder="" class="input-demo-400">
                  </el-input>
                </el-col>
                <el-col :span="4">
                  <label class="form-label">{{$t('views.pmdo.project.proj_km_center.proj_km_center_detail_dialog.doc-size-label')}}:</label>
                </el-col>
                <el-col :span="8">
                  <el-input v-model="docSize" size="small" placeholder="" class="input-demo-400">
                  </el-input>
                </el-col>
            </el-row>
            <el-row :gutter="10" style="margin-top: 10px">
                <el-col :span="4">
                  <label class="form-label">{{$t('views.pmdo.form-label.remark')}}:</label>
                </el-col>
                <el-col :span="20">
                    <el-input
                    type="textarea"
                    :autosize="{ minRows: 3, maxRows: 3}"
                    placeholder=""
                    v-model="remark"
                    class="input-demo-400">
                    </el-input>
                </el-col>
            </el-row>
            <el-tabs v-model="activeName_2">
                <el-tab-pane :label="$t('views.pmdo.tabs.comment')" name="first_2">
                  <comment :socialsV="socials"/>
                </el-tab-pane>
            </el-tabs>
        </el-tab-pane>
        <el-tab-pane name="second">
            <span slot="label">{{ $t('views.pmdo.tabs.doc-version') }} <el-badge class="item doc-total" :value="docTotal"></el-badge></span>
            <span class="explain"><d2-icon name="info-circle"/> {{$t('views.pmdo.project.proj_km_center.proj_km_center_detail_dialog.explain')}}</span>
            <el-button class="right" type="success" size="small"><d2-icon name="plus"/> {{$t('views.pmdo.project.proj_km_center.proj_km_center_detail_dialog.new-version-btn')}}</el-button>
            <div class="clc"></div>
            <d2-crud
            ref="d2Crud"
            :columns="docTColumns"
            :data="docTData"
            :rowHandle="rowHandle"
            :loading="tableLoading"/>
        </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import jQuery from 'jquery'

import Vue from 'vue'
import i18n from '../../../../../i18n'

const vueInstance = new Vue({ i18n })

export default {
  name: 'projKmCenterDetailDialog',
  props: ['tableId'],
  components: {
    'comment': () => import('../../../common/comment/index.vue')
  },
  data () {
    return {
      clickTree: this.treeId,
      docTitle: '',
      docTotal: null,
      activeName: 'first',
      activeName_2: 'first_2',
      socials: [],
      pOptions: [],
      createP: '',
      docSuf: '',
      docSize: '',
      remark: '',
      createT: '',
      docTColumns: [
        {
          title: '#',
          key: 'NO',
          width: '80'
        },
        {
          title: '文件名',
          key: 'name',
          width: '180'
        },
        {
          title: '版本',
          key: 'version'
        }
      ],
      docTData: [],
      rowHandle: {
        custom: [
          {
            text: `${vueInstance.$t('views.pmdo.common-btns.preview')}`,
            type: 'info',
            size: 'mini'
          },
          {
            text: `${vueInstance.$t('views.pmdo.common-btns.download')}`,
            type: 'primary',
            size: 'mini'
          },
          {
            text: `${vueInstance.$t('views.pmdo.common-btns.delete')}`,
            type: 'danger',
            size: 'mini',
            emit: 'rowDetail'
          }
        ]
      },
      tableLoading: false
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      console.log(this.tableId)
      this.tableLoading = true
      this.axios.post('/api/project/proj_km_center_detail').then((response) => {
        this.tableLoading = false
        let res = response.data
        let detailFormData = res.detailFormData
        this.docTitle = detailFormData.docName
        this.pOptions = detailFormData.pOptions
        this.createP = detailFormData.createPerson
        this.createT = detailFormData.createTime
        this.docSuf = detailFormData.suf
        this.docSize = detailFormData.size
        this.remark = detailFormData.remark
        this.socials = res.socialData
        this.docTData = res.docTData
        this.docTotal = this.docTData.length
        if (this.docTotal < 10) {
          jQuery('.doc-total .el-badge__content').addClass('el-badge__content--primary')
        }
      }).catch((response) => {
        this.tableLoading = false
      })
    }
  },
  watch: {
    tableId () {
      // console.log(this.tableId)
      this.tableLoading = true
      this.axios.post('/api/project/proj_km_center_detail').then((response) => {
        this.tableLoading = false
        let res = response.data
        let detailFormData = res.detailFormData
        this.docTitle = detailFormData.docName
        this.pOptions = detailFormData.pOptions
        this.createP = detailFormData.createPerson
        this.createT = detailFormData.createTime
        this.docSuf = detailFormData.suf
        this.docSize = detailFormData.size
        this.remark = detailFormData.remark
        this.socials = res.socialData
        this.docTData = res.docTData
        this.docTotal = this.docTData.length
        if (this.docTotal < 10) {
          jQuery('.doc-total .el-badge__content').addClass('el-badge__content--primary')
        }
      }).catch((response) => {
        this.tableLoading = false
      })
    }
  }
}
</script>
