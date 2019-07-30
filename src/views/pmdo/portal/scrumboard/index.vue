<template>
  <el-container class="main-container">
    <el-aside class="second-side">
      <div class="side-title">
        {{ $t('views.pmdo.portal.scrumboard.second-side-title') }}
      </div>
      <div class="boardlist">
        <edit-list :listV="list" @listClick="handleListClick"/>
      </div>
      <el-button @click="handleAddBoard()" class="btn-text green-btn margin-left-10 add-board-btn" type="text"><d2-icon name="plus"/>  {{ $t('views.pmdo.portal.scrumboard.add-scrumboard-btn') }}</el-button>
      <div class="add-board-input">
        <el-input :placeholder="$t('views.pmdo.portal.scrumboard.add-board-placeholder')" class="input-demo-400" size="small" @keyup.enter.native="comfirmAddBoard" v-model="addListValue">
          <el-button @click="cancelAddBoard" slot="append"><d2-icon name="close"/></el-button>
        </el-input>
      </div>
      <div class="side-title" style="margin-top:10px;">
        {{ $t('views.pmdo.portal.scrumboard.tag') }}
      </div>
      <div class="taglist">
        <edit-list :listV="tags"/>
      </div>
      <el-button @click="handleAddTag()" class="btn-text green-btn margin-left-10 add-tag-btn" type="text"><d2-icon name="plus"/>  {{ $t('views.pmdo.portal.scrumboard.add-tag-btn') }}</el-button>
      <div class="add-tag-input">
        <el-input :placeholder="$t('views.pmdo.portal.scrumboard.add-tag-placeholder')" class="input-demo-400" size="small" @keyup.enter.native="comfirmAddTag" v-model="addTagValue">
          <el-button @click="cancelAddTag" slot="append"><d2-icon name="close"/></el-button>
        </el-input>
      </div>
      <p class="margin-left-10"><d2-icon name="ellipsis-h"/></p>
      <el-button class="btn-text dark-btn margin-left-10" type="text"><d2-icon name="trash"/>  {{ $t('views.pmdo.common-btns.recycle-bin') }}</el-button>
    </el-aside>
    <el-container>
      <el-header class="head">
        <div class="head-title">
          <d2-icon name="window-restore"/> {{$t('layout.sidebar.portal.scrumboard')}}
        </div>
        <div class="head-elements">
          <el-button @click="addTaskGroup" type="success" size="small"><d2-icon name="plus"/> {{ $t('views.pmdo.portal.scrumboard.new-task-group') }}</el-button>
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
        <taskboard ref="tb" @boardClick="handleBoardClick($event)" :boardsV="boards"/>
      </el-main>

      <el-dialog
       :title="$t('views.pmdo.portal.scrumboard.task_detail_dialog.title')"
       :visible.sync="taskDetailDialogVisible"
        width="60%">
        <task-detail-dialog  :tags="this.tags" :task="this.task"/>
        <!-- <div slot="footer" class="dialog-footer">
          <el-button @click="rowDetailDialogVisible = false" size="mini">{{ $t('views.pmdo.common-btns.cancel') }}</el-button>
          <el-button type="primary" @click="rowDetailDialogVisible = false" size="mini">{{ $t('views.pmdo.common-btns.comfirm') }}</el-button>
        </div> -->
      </el-dialog>
    </el-container>
  </el-container>
</template>

<script>
import jQuery from 'jquery'
import Vue from 'vue'
import i18n from '../../../../i18n'

const vueInstance = new Vue({ i18n })

var tagsIdCount = 9
var boardIdCount = 9

export default {
  name: 'scrumboard',
  components: {
    'edit-list': () => import('./edit_list/index.vue'),
    'taskboard': () => import('./taskboard/index.vue'),
    'task-detail-dialog': () => import('./task_detail_dialog/index.vue')
  },
  data () {
    return {
      list: [],
      addListValue: '',
      tags: [],
      addTagValue: '',
      boardsC: [],
      boards: [],
      task: [],
      taskDetailDialogVisible: false
    }
  },
  watch: {
  },
  mounted () {
    this.setMainHeight()
    this.getData()
  },
  methods: {
    setMainHeight () {
      var listHeight = jQuery(window).height() - 380
      listHeight = listHeight / 2
      var mainHeight = jQuery(window).height() - 160
      var mainWidth = jQuery(window).width() - 520
      jQuery('.main').css('height', mainHeight)
      jQuery('.main').css('width', mainWidth)
      jQuery('.boardlist').css('height', listHeight)
      jQuery('.taglist').css('height', listHeight)
    },
    getData () {
      this.axios.post('/api/portal/scrumboard').then((response) => {
        let res = response.data
        this.list = res.listData
        this.tags = res.tagsData
      }).catch((response) => {

      })
    },
    handleListClick () {
      this.axios.post('/api/portal/scrumboard_task').then((response) => {
        let res = response.data
        this.boardsC = res.boards
        for (var i = 0; i < this.boardsC.length; i++) {
          var tasks = this.boardsC[i].tasks
          for (var j = 0; j < tasks.length; j++) {
            var sbt = tasks[j].subtask
            var n = 0
            for (var k = 0; k < sbt.length; k++) {
              if (sbt[k].checked) {
                n++
              }
            }
            this.boardsC[i].tasks[j].finishedSUT = n
          }
        }
        this.boards = this.boardsC
      }).then((response) => {
        this.$refs.tb.setBoardHeight()
      }).catch((response) => {

      })
    },
    handleAddTag () {
      jQuery('.add-tag-btn').hide()
      jQuery('.add-tag-input').show()
    },
    comfirmAddTag () {
      if (this.addTagValue !== '') {
        tagsIdCount++
        this.tags.unshift({
          id: tagsIdCount,
          title: this.addTagValue
        })
      }
      this.addTagValue = ''
      jQuery('.add-tag-input').hide()
      jQuery('.add-tag-btn').show()
    },
    cancelAddTag () {
      this.addTagValue = ''
      jQuery('.add-tag-input').hide()
      jQuery('.add-tag-btn').show()
    },
    handleAddBoard () {
      jQuery('.add-board-btn').hide()
      jQuery('.add-board-input').show()
    },
    comfirmAddBoard () {
      if (this.addBoradValue !== '') {
        boardIdCount++
        this.list.unshift({
          id: boardIdCount,
          title: this.addListValue
        })
      }
      this.addListValue = ''
      jQuery('.add-board-input').hide()
      jQuery('.add-board-btn').show()
    },
    cancelAddBoard () {
      this.addListValue = ''
      jQuery('.add-board-input').hide()
      jQuery('.add-board-btn').show()
    },
    handleBoardClick (element) {
      this.taskDetailDialogVisible = true
      this.task = element
    },
    addTaskGroup0 () {
      var id = this.boards.length + 1
      this.boards.push({
        id: id,
        taskTitle: `${vueInstance.$t('views.pmdo.portal.scrumboard.unnamed')}`,
        tasks: [],
        addTaskValue: ''
      })
      return Promise.resolve(this.boards)
    },
    addTaskGroup () {
      this.addTaskGroup0().then(val => {
        this.$refs.tb.setBoardHeight()
      })
    }
  }
}
</script>

<style scoped>
.main {
  overflow-x: scroll;
  background-color: #ebf1f6;
}

.second-side {
  padding: 0px;
}

.side-title {
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
}

.margin-left-10 {
  margin-left: 10px;
}

.boardlist, .taglist {
  overflow: auto
}

.add-board-input, .add-tag-input {
  width: 278px;
  margin-left: 10px;
  margin-right: 10px;
  display: none;
}
</style>
