<template>
  <el-container class="main-container">
    <el-aside class="second-side">
      <div class="side-title">
        {{ $t('views.pmdo.project.proj_km_center.second-side-title') }}
      </div>
      <el-dropdown style="margin-right: 10px;">
        <el-button type="success" size="small"><d2-icon name="plus"/> {{ $t('views.pmdo.common-btns.new') }}</el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="newGlobalTree"> {{ $t('views.pmdo.project.proj_km_center.new-global-folder-btn') }} </el-dropdown-item>
          <el-dropdown-item @click.native="newPrivateTree">{{ $t('views.pmdo.project.proj_km_center.new-private-folder-btn') }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button @click="editTree" type="primary" size="small"><d2-icon name="pencil"/> {{ $t('views.pmdo.common-btns.edit') }}</el-button>
      <el-button @click="deleteTree" type="info" size="small"><d2-icon name="trash"/> {{ $t('views.pmdo.common-btns.delete') }}</el-button>
      <div class="side-tree">
        <el-input
          size="small"
          :placeholder="$t('views.pmdo.tree-filter-placeholder')"
          v-model="filterText">
        </el-input>
        <div class="tree-wrap">
          <el-tree
            class="filter-tree"
            :data="treeData"
            :props="defaultProps"
            :filter-node-method="filterNode"
            highlight-current
            node-key="id"
            ref="tree"
            @current-change = "handleCurrentChange"
            :load="loadNode"
            lazy>
          </el-tree>
        </div>
      </div>
    </el-aside>
    <el-container>
      <el-header class="head">
        <div class="head-title">
          <d2-icon name="folder-open"/> {{$t('layout.sidebar.project.proj_km_center')}}
        </div>
        <div class="head-elements">
          <el-button type="success" size="small"><d2-icon name="upload"/> {{ $t('views.pmdo.common-btns.upload-doc') }}</el-button>
          <el-tooltip
            effect="dark"
            :content="$t('views.pmdo.common-btns.help-tooltip')"
            placement="bottom">
            <el-button class="btn-text icon-btn" type="text"><d2-icon name="question-circle"/></el-button>
          </el-tooltip>
        </div>
        <div class="clc"></div>
      </el-header>
      <el-main class="main">
        <d2-crud
          ref="d2Crud"
          :columns="columns"
          :data="pageTableData"
          :options="options"
          selection-row
          @selection-change="handleSelectionChange"
          :loading="tableLoading"
          :rowHandle="rowHandle"
          @row-click="rowDetail">
          <div class="table-slot" slot="header">
            <div class="table-slot-left">
              <el-button-group>
                <el-tooltip
                  effect="dark"
                  :content="$t('views.pmdo.common-btns.move-to')"
                  placement="bottom">
                  <el-button type="default" size="small"><d2-icon name="arrows"/></el-button>
                </el-tooltip>
                <el-tooltip
                  effect="dark"
                  :content="$t('views.pmdo.common-btns.download-to')"
                  placement="bottom">
                  <el-button type="default" size="small"><d2-icon name="download"/></el-button>
                </el-tooltip>
                <el-tooltip
                  effect="dark"
                  :content="$t('views.pmdo.common-btns.delete')"
                  placement="bottom">
                  <el-button @click="rowDelete" type="default" size="small"><d2-icon name="trash"/></el-button>
                </el-tooltip>
              </el-button-group>
            </div>
            <div class="table-slot-right">
              <el-input style="width: 280px;" :placeholder="$t('views.pmdo.search-placeholder')" class="input-demo-400" size="small" v-model="searchTable">
                <el-button @click="handleSearchTable" slot="append"><d2-icon name="search"/></el-button>
              </el-input>
              <el-button @click="searchCollapse" id="collapse-btn" type="default" size="small" style="float:right;"><d2-icon class="rotate-icon" name="angle-down"/></el-button>
            </div>
            <div class="clc"></div>
            <advanced-search :conditionsNum="4" :searchTerms="conditions" :normalTags="searchTags" @advancedSearchComfirm="advancedSearchTable()" ref="as"/>
          </div>
        </d2-crud>
        <el-pagination
          @size-change="handlePageSizeChange"
          @current-change="paginationCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 25, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageTotal">
        </el-pagination>
      </el-main>

      <el-dialog
       :title="$t('views.pmdo.project.proj_km_center.proj_km_center_detail_dialog.title')"
       :visible.sync="rowDetailDialogVisible"
        width="60%">
        <proj-km-center-detail-dialog :tableId="this.clickRowId"/>
        <!-- <div slot="footer" class="dialog-footer">
          <el-button @click="rowDetailDialogVisible = false" size="mini">{{ $t('views.pmdo.common-btns.cancel') }}</el-button>
          <el-button type="primary" @click="rowDetailDialogVisible = false" size="mini">{{ $t('views.pmdo.common-btns.comfirm') }}</el-button>
        </div> -->
      </el-dialog>

      <el-dialog
        :title="newEditTreeTitle"
        :visible.sync="treeDialogVisible"
        :close-on-click-modal="false"
        width="40%">
        <new-edit-tree-dialog :nodeV.sync="nodeValue" :keyV.sync="keyValue" :parentNodeV="parentNodeValue" />
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelNewEditTree" size="mini">{{ $t('views.pmdo.common-btns.cancel') }}</el-button>
          <el-button type="primary" v-if="newGlobalTreeShow" @click="comfrimNewGlobalTree" size="mini">{{ $t('views.pmdo.common-btns.comfirm') }}</el-button>
          <el-button type="primary" v-if="newPrivateTreeShow" @click="comfirmNewPrivateTree" size="mini">{{ $t('views.pmdo.common-btns.comfirm') }}</el-button>
          <el-button type="primary" v-if="editTreeShow" @click="comfirmEditTree" size="mini">{{ $t('views.pmdo.common-btns.comfirm') }}</el-button>
        </div>
      </el-dialog>
    </el-container>
  </el-container>
</template>

<script>
import jQuery from 'jquery'
import Vue from 'vue'
import i18n from '../../../../i18n'

const vueInstance = new Vue({ i18n })

let currentNodeData = null
let currentNode = null
let root = null
let treeNode = null
let tableSelection = null
let user = 'admin'

export default {
  name: 'projKmCenter',
  components: {
    'proj-km-center-detail-dialog': () => import('./proj_km_center_detail_dialog/index.vue'),
    'new-edit-tree-dialog': () => import('./new_edit_tree_dialog/index.vue'),
    'advanced-search': () => import('../../common/advanced_search/index.vue')
  },
  data () {
    return {
      filterText: '',
      treeData: [],
      newGlobalTreeShow: false,
      newPrivateTreeShow: false,
      editTreeShow: false,
      parentNodeValue: '',
      nodeValue: '',
      keyValue: '',
      defaultProps: {
        children: 'zones',
        label: 'label',
        isLeaf: 'leaf'
      },
      searchTable: '',
      conditions: [],
      searchTags: [],
      columns: [],
      tableData: [],
      pageTableData: [],
      clickRowId: '',
      options: {
        stripe: true,
        order: 'descending'
      },
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
          }
        ]
      },
      tableLoading: false,
      rowDetailDialogVisible: false,
      currentPage: 1,
      pageSize: 10,
      pageTotal: null,
      newEditTreeTitle: `${vueInstance.$t('views.pmdo.project.proj_km_center.new_edit_tree_dialog.edit-title')}`,
      treeDialogVisible: false
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted () {
    this.setMainHeight()
    this.searchCollapse()
    this.getData()
    this.hideThead()
  },
  methods: {
    setMainHeight () {
      var treeHeight = jQuery(window).height() - 225
      var mainHeight = jQuery(window).height() - 200
      jQuery('.tree-wrap').css('height', treeHeight)
      jQuery('.main').css('height', mainHeight)
    },
    hideThead () {
      jQuery('.el-table thead').hide()
    },
    getData () {
      this.axios.post('/api/project/proj_km_center', {
        userName: user
      }).then((response) => {
        let res = response.data
        root = res.newTreeData.root
        treeNode = res.newTreeData.node
        this.treeData = root
      }).catch((response) => {

      })
    },
    loadNode (node, resolve) {
      setTimeout(() => {
        // console.log(this.keyValue)
        var kids = treeNode.filter(c => c.parentId === this.keyValue)
        const data = kids
        resolve(data)
      }, 500)
    },
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    handleCurrentChange (data, node) {
      currentNodeData = data
      currentNode = node
      this.nodeValue = currentNodeData.label
      this.keyValue = currentNodeData.id
      if (currentNode.childNodes.length === 0) {
        this.tableLoading = true
        this.axios.post('/api/project/proj_km_center_table', {
          treeId: currentNodeData.id
        }).then((response) => {
          let res = response.data
          this.columns = res.columns
          jQuery('.el-table thead').show()
          this.tableData = res.tableData
          this.pageTotal = this.tableData.length
          this.currentPage = 1
          this.showPageData()
          this.conditions = res.conditions
          this.tableLoading = false
        }).catch((response) => {
          this.tableLoading = false
        })
      }
    },
    showPageData () {
      var i = (this.currentPage - 1) * this.pageSize
      var j = this.currentPage * this.pageSize - 1
      this.pageTableData = []
      for (var n = i; n <= j; n++) {
        if (n < this.pageTotal) {
          this.pageTableData.push(this.tableData[n])
        }
      }
    },
    newGlobalTree () {
      this.treeDialogVisible = true
      this.newEditTreeTitle = `${vueInstance.$t('views.pmdo.project.proj_km_center.new_edit_tree_dialog.new-globall-title')}`
      this.newPrivateTreeShow = false
      this.editTreeShow = false
      this.newGlobalTreeShow = true
      this.parentNodeValue = ''
      this.nodeValue = ''
      this.keyValue = ''
    },
    newPrivateTree () {
      this.treeDialogVisible = true
      this.newEditTreeTitle = `${vueInstance.$t('views.pmdo.project.proj_km_center.new_edit_tree_dialog.new-private-title')}`
      this.editTreeShow = false
      this.newGlobalTreeShow = false
      this.newPrivateTreeShow = true
      if (currentNodeData !== null) {
        this.parentNodeValue = currentNodeData.label
      }
      this.nodeValue = ''
      this.keyValue = ''
    },
    editTree () {
      this.treeDialogVisible = true
      this.newEditTreeTitle = `${vueInstance.$t('views.pmdo.project.proj_km_center.new_edit_tree_dialog.edit-title')}`
      this.newGlobalTreeShow = false
      this.newPrivateTreeShow = false
      this.editTreeShow = true
      if (currentNode !== null) {
        let parentNode = currentNode.parent
        this.parentNodeValue = parentNode.data.label
        this.nodeValue = currentNode.data.label
        this.keyValue = currentNode.data.id
      }
    },
    deleteTree () {
      this.$confirm(`${vueInstance.$t('views.pmdo.delete-info')}`, `${vueInstance.$t('views.pmdo.delete-hint')}`, {
        confirmButtonText: `${vueInstance.$t('views.pmdo.common-btns.comfirm')}`,
        cancelButtonText: `${vueInstance.$t('views.pmdo.common-btns.cancel')}`,
        type: 'warning'
      }).then(() => {
        if (currentNode !== null) {
          this.$refs.tree.remove(currentNode)
        }
        this.$message({
          type: 'success',
          message: `${vueInstance.$t('views.pmdo.delete-success')}`
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: `${vueInstance.$t('views.pmdo.delete-cancel')}`
        })
      })
    },
    comfrimNewGlobalTree () {
      let data = {
        id: this.keyValue,
        label: this.nodeValue,
        childrens: []
      }
      let refData = this.treeData[0]
      if (data.id !== '' && data.label !== '') {
        this.$refs.tree.insertBefore(data, refData)
      }
      this.treeDialogVisible = false
      this.nodeValue = ''
      this.keyValue = ''
    },
    comfirmNewPrivateTree () {
      let data = {
        id: this.keyValue,
        label: this.nodeValue,
        childrens: []
      }
      let parentNode = currentNode
      if (data.id !== '' && data.label !== '') {
        this.$refs.tree.append(data, parentNode)
      }
      this.treeDialogVisible = false
      this.nodeValue = ''
      this.keyValue = ''
    },
    comfirmEditTree () {
      if (currentNodeData !== null) {
        if (this.nodeValue !== '' && this.keyValue !== '') {
          currentNodeData.label = this.nodeValue
          currentNodeData.id = this.keyValue
        }
      }
      this.treeDialogVisible = false
    },
    cancelNewEditTree () {
      this.nodeValue = ''
      this.keyValue = ''
      this.treeDialogVisible = false
    },
    searchCollapse () {
      jQuery('.table-slot-collapse').slideToggle()
      jQuery('.rotate-icon').toggleClass('rotate-180')
    },
    handlePageSizeChange (size) {
      this.pageSize = size
      this.showPageData()
    },
    paginationCurrentChange (currentPage) {
      this.currentPage = currentPage
      this.showPageData()
    },
    handleSelectionChange (selection) {
      tableSelection = selection
    },
    handleSearchTable () {
      if (this.$refs.as.conditionRows !== null || this.$refs.as.dateRangeValue !== null) {
        this.tableLoading = true
        this.axios.post('/api/project/proj_km_center_search').then((response) => {
          this.tableLoading = false
          let res = response.data
          this.tableData = res.tableData
          this.pagination.total = res.tableTotal
        }).catch((response) => {
          this.tableLoading = false
        })
      }
    },
    advancedSearchTable () {
      if (this.$refs.as.conditionRows !== null || this.$refs.as.dateRangeValue !== null) {
        this.tableLoading = true
        this.axios.post('/api/project/proj_km_center_search').then((response) => {
          this.tableLoading = false
          let res = response.data
          this.tableData = res.tableData
          this.pagination.total = res.tableTotal
        }).catch((response) => {
          this.tableLoading = false
        })
      }
    },
    rowDelete () {
      this.$confirm(`${vueInstance.$t('views.pmdo.delete-info')}`, `${vueInstance.$t('views.pmdo.delete-hint')}`, {
        confirmButtonText: `${vueInstance.$t('views.pmdo.common-btns.comfirm')}`,
        cancelButtonText: `${vueInstance.$t('views.pmdo.common-btns.cancel')}`,
        type: 'warning'
      }).then(() => {
        if (tableSelection !== null) {
          for (let i = 0; i < tableSelection.length; i++) {
            let index = this.tableData.findIndex(d => d.id === tableSelection[i].id)
            this.tableData.splice(index, 1)
            this.pagination.total--
          }
        }
        this.$message({
          type: 'success',
          message: `${vueInstance.$t('views.pmdo.delete-success')}`
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: `${vueInstance.$t('views.pmdo.delete-cancel')}`
        })
      })
    },
    rowDetail (row) {
      this.rowDetailDialogVisible = true
      this.clickRowId = row.id
    }
  }
}
</script>
