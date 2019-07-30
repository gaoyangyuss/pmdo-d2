<template>
  <draggable class="list-group" group="people" :list="boards" @change="log" drag-class="sortable-drag" @start="start" @end="end" :disabled="!enabled">
    <div class="taskboard-stage list-group-item" v-for="(item, index) in boards" :key="item.id">
      <header class="taskboard-stage-header ui-sortable-handle">
          <h6 class="taskboard-stage-title">{{item.taskTitle}} {{index}}</h6>
          <el-dropdown class="taskboard-stage-btn" trigger="click">
            <el-button class="btn-text icon-btn" type="text" size="mini"><d2-icon name="angle-down"/></el-button>
            <el-dropdown-menu class="dropdown-menu" slot="dropdown">
                <el-dropdown-item @click.native="renameClick($event, item)" class="dropdown-item">{{ $t('views.pmdo.common-btns.rename') }}</el-dropdown-item>
                <el-dropdown-item @click.native="deleteBoard(item)" class="dropdown-item">{{ $t('views.pmdo.common-btns.delete') }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div class="clc"></div>
          <div class="rename-task">
            <el-input placeholder="" v-model="item.taskTitle" class="input-demo-400 list-title-edit" size="small" @keyup.enter.native="comfirmRename($event, item)" >
              <el-button @click="cancelRename($event, item)" slot="append"><d2-icon name="close"/></el-button>
            </el-input>
          </div>
      </header>
      <div class="scroll-wrap">
        <draggable class="sub-list-group" style="min-height:44px;" :list="item.tasks" group="people" @change="log" @start="startItem" @end="endItem" :disabled="!enabledItem">
          <div
          class="list-group-item"
          v-for="(element, index) in item.tasks"
          :key="element.id"
          :class="element.class"
          @click="listClick(element)">
            <el-checkbox @click.native.stop class="task-title" v-model="element.checked">{{ element.name }} {{ index }}</el-checkbox>
            <div class="clc"></div>
            <div class="task-badges">
              <el-tooltip
                effect="dark"
                :content="$t('views.pmdo.portal.scrumboard.subtask')"
                placement="bottom">
                <span v-if="element.subtask.length" class="task-badge"><d2-icon name="list"/> {{element.finishedSUT}}/{{element.subtask.length}}</span>
              </el-tooltip>
              <el-tooltip
                effect="dark"
                :content="$t('views.pmdo.portal.scrumboard.accessory')"
                placement="bottom">
                <span v-if="element.accessory" class="task-badge"><d2-icon name="paperclip"/> {{element.accessory}}</span>
              </el-tooltip>
              <el-tooltip
                effect="dark"
                :content="$t('views.pmdo.portal.scrumboard.comment')"
                placement="bottom">
                <span v-if="element.socialData.length" class="task-badge"><d2-icon name="comment-o"/> {{element.socialData.length}}</span>
              </el-tooltip>
              <el-tooltip
                effect="dark"
                :content="$t('views.pmdo.portal.scrumboard.date')"
                placement="bottom">
                <span v-if="element.date" class="task-badge"><d2-icon name="calendar"/> {{element.date}}</span>
              </el-tooltip>
              <el-tooltip
                effect="dark"
                :content="$t('views.pmdo.portal.scrumboard.progress')"
                placement="bottom">
                <span v-if="element.progress" class="task-badge"><d2-icon name="circle-o-notch"/> {{element.progress}}%</span>
              </el-tooltip>
            </div>
            <div class="task-members">
                <el-tag v-if="element.manager" class="task-member" type="info" effect="dark" style="color: red">{{element.manager.substring(0,1)}}</el-tag>
                <el-tag v-for="member in element.members" :key="member.value" class="task-member" type="info" effect="dark">{{member.label.substring(0,1)}}</el-tag>
            </div>
            <div class="clc"></div>
          </div>
        </draggable>
      </div>
       <el-button @click="handleAddTask($event)" class="btn-text green-btn add-task-btn" type="text"><d2-icon name="plus"/>  {{ $t('views.pmdo.portal.scrumboard.add-task-btn') }}</el-button>
      <div class="add-task-input">
        <el-input :placeholder="$t('views.pmdo.portal.scrumboard.add-task-placeholder')" class="input-demo-400" size="small" @keyup.enter.native="comfirmAddTask($event, item)" v-model="item.addTaskValue">
          <el-button @click="cancelAddTask" slot="append"><d2-icon name="close"/></el-button>
        </el-input>
      </div>
    </div>
  </draggable>
</template>

<script>
import jQuery from 'jquery'
import draggable from 'vuedraggable'

import Vue from 'vue'
import i18n from '../../../../../i18n'

const vueInstance = new Vue({ i18n })

var editTitle = ''

export default {
  name: 'taskboard',
  props: {
    boardsV: Array
  },
  components: {
    draggable
  },
  data () {
    return {
      boards: this.boardsV,
      isWhite: false,
      enabled: true,
      enabledItem: true
    }
  },
  mounted () {
  },
  methods: {
    setBoardHeight () {
      var boardHeight = jQuery(window).height() - 310
      jQuery('.taskboard-stage .scroll-wrap').css('height', boardHeight)
    },
    handleAddTask (e) {
      jQuery(e.currentTarget).hide()
      jQuery(e.currentTarget).next('.add-task-input').show()
    },
    comfirmAddTask (e, item) {
      if (item.addTaskValue !== '') {
        var id = item.tasks.length + 1
        item.tasks.unshift({
          id: id,
          name: item.addTaskValue,
          class: 'priority-normal',
          checked: false,
          subtask: [],
          accessory: '',
          socialData: [],
          progress: 0,
          date: '',
          members: [],
          manager: ''
        })
      }
      item.addTaskValue = ''
      jQuery(e.currentTarget).parents('.add-task-input').hide()
      jQuery(e.currentTarget).parents('.add-task-input').prev('.add-task-btn').show()
    },
    cancelAddTask (e) {
      this.addTagValue = ''
      jQuery(e.currentTarget).parents('.add-task-input').hide()
      jQuery(e.currentTarget).parents('.add-task-input').prev('.add-task-btn').show()
    },
    listClick (element) {
      this.$emit('boardClick', element)
    },
    renameClick (e, item) {
      editTitle = item.taskTitle
      var id = jQuery(e.currentTarget).parents('.el-dropdown-menu').attr('id')
      jQuery('button[aria-controls = "' + id + '"]').parents('.taskboard-stage-header').find('.taskboard-stage-title').hide()
      jQuery('button[aria-controls = "' + id + '"]').parents('.taskboard-stage-header').find('.taskboard-stage-btn').hide()
      jQuery('button[aria-controls = "' + id + '"]').parents('.taskboard-stage-header').find('.rename-task').show()
    },
    comfirmRename (e, item) {
      if (item.taskTitle === '') {
        item.taskTitle = editTitle
      }
      jQuery(e.currentTarget).parents('.taskboard-stage-header').find('.rename-task').hide()
      jQuery(e.currentTarget).parents('.taskboard-stage-header').find('.taskboard-stage-btn').show()
      jQuery(e.currentTarget).parents('.taskboard-stage-header').find('.taskboard-stage-title').show()
    },
    cancelRename (e, item) {
      item.taskTitle = editTitle
      jQuery(e.currentTarget).parents('.taskboard-stage-header').find('.rename-task').hide()
      jQuery(e.currentTarget).parents('.taskboard-stage-header').find('.taskboard-stage-btn').show()
      jQuery(e.currentTarget).parents('.taskboard-stage-header').find('.taskboard-stage-title').show()
    },
    deleteBoard (item) {
      this.$confirm(`${vueInstance.$t('views.pmdo.delete-info')}`, `${vueInstance.$t('views.pmdo.delete-hint')}`, {
        confirmButtonText: `${vueInstance.$t('views.pmdo.common-btns.comfirm')}`,
        cancelButtonText: `${vueInstance.$t('views.pmdo.common-btns.cancel')}`,
        type: 'warning'
      }).then(() => {
        var i = this.boards.findIndex(d => d.id === item.id)
        this.boards.splice(i, 1)
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
    log (evt, item) {
      console.log(evt)
    },
    start () {
      this.enabledItem = false
    },
    end () {
      this.enabledItem = true
    },
    startItem () {
      this.enabled = false
    },
    endItem () {
      this.enabled = true
    }
  },
  watch: {
    boardsV () {
      this.boards = this.boardsV
    }
  }
}
</script>
