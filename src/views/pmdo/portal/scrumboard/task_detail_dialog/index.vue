<template>
  <div>
      <el-row :gutter="10">
            <el-col :span="16">
                <span class="task-explain"><d2-icon name="vcard"/> {{projectTitle}} </span>
                <span class="task-explain dotted"><d2-icon name="vcard"/> {{projectType}}</span>
            </el-col>
            <el-col :span="8">
                <el-button type="danger" size="small" class="right"><d2-icon name="trash"/> {{$t('views.pmdo.common-btns.delete')}}</el-button>
                <el-button type="default" size="small" class="right"><d2-icon name="copy"/> {{$t('views.pmdo.portal.scrumboard.task_detail_dialog.copy-task-btn')}}</el-button>
                <div class="clc"></div>
            </el-col>
      </el-row>
      <el-row :gutter="10" style="margin-top:10px;">
            <el-input placeholder="" v-model="taskTitle" class="input-demo-400 input-title" style="margin-bottom:10px;">
                <template slot="prepend"><d2-icon name="window-restore"/></template>
                <el-button @click="describeCollapse" slot="append"><d2-icon class="rotate-icon" name="angle-down"/></el-button>
            </el-input>
      </el-row>
      <el-row v-if="taskDescribeVisible" :gutter="10">
            <el-input
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 3}"
            placeholder=""
            v-model="taskDescribe"
            class="input-demo-400">
            </el-input>
      </el-row>
      <el-row :gutter="10" style="margin-top:10px;">
            <el-col :span="2">
                <label style="line-height:38px;">{{$t('views.pmdo.portal.scrumboard.task_detail_dialog.progress')}}:</label>
            </el-col>
            <el-col :span="22">
                <el-slider v-model="progressValue"></el-slider>
            </el-col>
      </el-row>
      <el-row :gutter="10" style="margin-top:10px">
            <el-col :span="4">
                <label class="form-label">{{$t('views.pmdo.portal.scrumboard.task_detail_dialog.principal')}}:</label>
            </el-col>
            <el-col :span="8">
                <el-select v-model="chargeP" placeholder="" class="select" filterable>
                    <el-option-group
                    v-for="group in pOptions"
                    :key="group.label"
                    :label="group.label">
                    <el-option
                        v-for="item in group.options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label">
                    </el-option>
                    </el-option-group>
                </el-select>
            </el-col>
            <el-col :span="4">
                <label class="form-label">{{$t('views.pmdo.portal.scrumboard.task_detail_dialog.expiration-time')}}:</label>
            </el-col>
            <el-col :span="8">
                <el-date-picker
                v-model="untilT"
                type="date"
                placeholder=""
                class="input-date"
                value-format="yyyy-MM-dd">
                </el-date-picker>
            </el-col>
        </el-row>
        <el-row :gutter="10" style="margin-top:10px">
            <el-col :span="4">
                <label class="form-label">{{$t('views.pmdo.portal.scrumboard.task_detail_dialog.priority')}}:</label>
            </el-col>
            <el-col :span="8">
                <el-radio-group v-model="priority" style="margin-top:4px;">
                    <el-radio class="important-radio" label="priority-important">{{$t('views.pmdo.portal.scrumboard.task_detail_dialog.important')}}</el-radio>
                    <el-radio class="precedence-radio" label="priority-precedence">{{$t('views.pmdo.portal.scrumboard.task_detail_dialog.precedence')}}</el-radio>
                    <el-radio class="normal-radio" label="priority-normal">{{$t('views.pmdo.portal.scrumboard.task_detail_dialog.convention')}}</el-radio>
                </el-radio-group>
            </el-col>
            <el-col :span="4">
                <label class="form-label">{{$t('views.pmdo.portal.scrumboard.task_detail_dialog.plan-start')}}:</label>
            </el-col>
            <el-col :span="8">
                <el-date-picker
                v-model="startT"
                type="date"
                placeholder=""
                class="input-date"
                value-format="yyyy-MM-dd">
                </el-date-picker>
            </el-col>
        </el-row>
        <el-row v-if="joinVisible" :gutter="10" style="margin-top:10px">
            <el-col :span="4">
                <label class="form-label">{{$t('views.pmdo.portal.scrumboard.task_detail_dialog.participant')}}:</label>
            </el-col>
            <el-col :span="20">
                <el-select v-model="joinP" multiple placeholder=""
                class="select"
                filterable
                @change="joinPChange()">
                    <el-option-group
                    v-for="group in pOptions"
                    :key="group.label"
                    :label="group.label">
                        <el-option
                            v-for="item in group.options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.label">
                        </el-option>
                    </el-option-group>
                </el-select>
            </el-col>
        </el-row>
        <el-row v-if="tagsVisible" :gutter="10" style="margin-top:10px">
            <el-col :span="4">
                <label class="form-label">{{$t('views.pmdo.portal.scrumboard.task_detail_dialog.tags')}}:</label>
            </el-col>
            <el-col :span="20">
                <el-tag
                :key="tag.id"
                v-for="tag in dynamicTags"
                closable
                :disable-transitions="false"
                @close="handleTagInputClose(tag)"
                size="defualt"
                style="margin-bottom:10px;">
                {{tag.title}}
                </el-tag>
                <el-input
                class="input-new-tag"
                v-if="tagInputVisible"
                v-model="tagInputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleTagInputConfirm"
                @blur="handleTagInputConfirm"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showTagInput"><d2-icon name="plus"/> {{$t('views.pmdo.portal.scrumboard.add-tag-btn')}}</el-button>
            </el-col>
        </el-row>
        <el-row v-if="executeVisible" :gutter="10" style="margin-top:10px">
            <el-col :span="4">
                <label class="form-label">{{$t('views.pmdo.portal.scrumboard.task_detail_dialog.execute-business')}}:</label>
            </el-col>
            <el-col :span="14">
                <el-select v-model="execute" placeholder="" class="select" filterable>
                    <el-option-group
                    v-for="group in eOptions"
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
            <el-col :span="6">
                <el-button type="primary" size="small" style="width:100%"><d2-icon name="play"/> {{$t('views.pmdo.portal.scrumboard.task_detail_dialog.start')}}</el-button>
            </el-col>
        </el-row>
        <el-row v-if="subtaskVisible" :gutter="10" style="margin-top:10px">
            <el-col :span="4">
                <label class="form-label">{{$t('views.pmdo.portal.scrumboard.task_detail_dialog.subtask')}}:</label>
            </el-col>
            <el-col :span="20">
                <div class="subtask-wrap">
                    <subtask :listV="subtask" @subtaskFinished="handleFinished($event)"/>
                </div>
                <el-button @click="handleAddSubtask" class="btn-text green-btn margin-left-10 add-subtask-btn" type="text"><d2-icon name="plus"/>  {{ $t('views.pmdo.portal.scrumboard.task_detail_dialog.add-subtask-btn') }}</el-button>
                <div class="add-subtask-input">
                    <el-input :placeholder="$t('views.pmdo.portal.scrumboard.task_detail_dialog.add-subtask-placeholder')" class="input-demo-400" size="small" @keyup.enter.native="comfirmAddSubtask" v-model="addSubtaskValue">
                    <el-button @click="cancelAddSubtask" slot="append"><d2-icon name="close"/></el-button>
                    </el-input>
                </div>
            </el-col>
        </el-row>
        <el-row v-if="accessoryVisible" :gutter="10" style="margin-top:10px">
            <el-col :span="4">
                <label class="form-label">{{$t('views.pmdo.portal.scrumboard.task_detail_dialog.accessory')}}:</label>
            </el-col>
            <el-col :span="20">
                 <el-input v-model="accessory" size="small" placeholder="" class="input-demo-400">
                 </el-input>
            </el-col>
        </el-row>
        <el-row :gutter="0" style="margin-top:20px; margin-bottom:20px;">
            <el-col :span="5">
                <el-button @click="joinVisible=!joinVisible" class="full-width-btn btn-side-left btn-no-right" size="small"><d2-icon name="users"/> {{$t('views.pmdo.portal.scrumboard.task_detail_dialog.participant')}}</el-button>
            </el-col>
            <el-col :span="5">
                <el-button @click="tagsVisible=!tagsVisible" class="full-width-btn btn-no-right" size="small"><d2-icon name="tags"/> {{$t('views.pmdo.portal.scrumboard.task_detail_dialog.tags')}}</el-button>
            </el-col>
            <el-col :span="4">
                <el-button @click="executeVisible=!executeVisible" class="full-width-btn btn-no-right" size="small"><d2-icon name="play"/> {{$t('views.pmdo.portal.scrumboard.task_detail_dialog.execute-business')}}</el-button>
            </el-col>
            <el-col :span="5">
                <el-button @click="subtaskVisible=!subtaskVisible" class="full-width-btn btn-no-right" size="small"><d2-icon name="list"/> {{$t('views.pmdo.portal.scrumboard.task_detail_dialog.subtask')}}</el-button>
            </el-col>
            <el-col :span="5">
                <el-button @click="accessoryVisible=!accessoryVisible" class="full-width-btn btn-side-right" size="small"><d2-icon name="paperclip"/> {{$t('views.pmdo.portal.scrumboard.task_detail_dialog.accessory')}}</el-button>
            </el-col>
      </el-row>
        <el-tabs v-model="activeName">
            <el-tab-pane :label="$t('views.pmdo.tabs.comment')" name="first">
                <comment :socialsV="socials"/>
            </el-tab-pane>
            <el-tab-pane :label="$t('views.pmdo.tabs.activity')" name="second">
                <el-timeline style="margin-left:10px;">
                    <el-timeline-item
                    v-for="(activity, index) in activities"
                    :key="index"
                    :icon="activity.icon"
                    :type="activity.type"
                    :color="activity.color"
                    :size="activity.size"
                    :timestamp="activity.timestamp">
                    {{activity.content}}
                    </el-timeline-item>
                </el-timeline>
            </el-tab-pane>
        </el-tabs>
  </div>
</template>

<script>
import jQuery from 'jquery'

export default {
  name: 'taskDetailDialog',
  components: {
    'comment': () => import('../../../common/comment/index.vue'),
    'subtask': () => import('../subtask/index.vue')
  },
  props: ['tags', 'task'],
  data () {
    return {
      taskTitle: this.task.name,
      projectTitle: '',
      projectType: '',
      taskDescribeVisible: false,
      taskDescribe: '',
      progressValue: this.task.progress,
      pOptions: [{
        label: '热门城市',
        options: [{
          value: 'Shanghai',
          label: '上海'
        }, {
          value: 'Beijing',
          label: '北京'
        }]
      }, {
        label: '城市名',
        options: [{
          value: 'Chengdu',
          label: '成都'
        }, {
          value: 'Shenzhen',
          label: '深圳'
        }, {
          value: 'Guangzhou',
          label: '广州'
        }, {
          value: 'Dalian',
          label: '大连'
        }]
      }],
      chargeP: this.task.manager,
      untilT: this.task.date,
      startT: '',
      priority: this.task.class,
      joinVisible: false,
      tagsVisible: false,
      executeVisible: false,
      subtaskVisible: false,
      accessoryVisible: false,
      members: this.task.members,
      joinP: [],
      dynamicTags: this.tags,
      tagInputVisible: false,
      tagInputValue: '',
      eOptions: [],
      execute: '',
      subtask: this.task.subtask,
      finishedSUT: this.task.finishedSUT,
      addSubtaskValue: '',
      accessory: '',
      activeName: 'first',
      socials: this.task.socialData,
      activities: [{
        content: '支持使用图标',
        timestamp: '2018-04-12 20:46',
        size: 'large',
        type: 'primary'
      }, {
        content: '支持自定义颜色',
        timestamp: '2018-04-03 20:46',
        color: '#409EFF'
      }, {
        content: '支持自定义尺寸',
        timestamp: '2018-04-03 20:46',
        size: 'large'
      }, {
        content: '默认样式的节点',
        timestamp: '2018-04-03 20:46'
      }]
    }
  },
  mounted () {
    this.getData()
  },
  watch: {
    tags () {
      this.dynamicTags = this.tags
    },
    task () {
      this.taskTitle = this.task.name
      this.progressValue = this.task.progress
      this.chargeP = this.task.manager
      this.untilT = this.task.date
      this.priority = this.task.class
      this.members = this.task.members
      var joins = []
      for (var i = 0; i < this.members.length; i++) {
        joins[i] = this.members[i].label
      }
      this.joinP = joins
      this.subtask = this.task.subtask
      this.finishedSUT = this.task.finishedSUT
      this.socials = this.task.socialData
    },
    taskTitle () {
      this.task.name = this.taskTitle
    },
    progressValue () {
      this.task.progress = this.progressValue
    },
    chargeP () {
      this.task.manager = this.chargeP
    },
    untilT () {
      this.task.date = this.untilT
    },
    priority () {
      this.task.class = this.priority
    },
    members () {
      this.task.members = this.members
    },
    subtask () {
      this.task.subtask = this.subtask
    },
    /* finishedSUT () {
      this.task.finishedSUT = this.finishedSUT
    }, */
    socials () {
      this.task.socialData = this.socials
    }
  },
  methods: {
    getData () {
      this.axios.post('/api/portal/scrumboard_detail').then((response) => {
        let res = response.data
        this.projectTitle = res.projectTitle
        this.projectType = res.projectType
        this.taskDescribe = res.taskDescribe
        this.pOptions = res.pOptions
        this.startT = res.startT
        this.eOptions = res.eOptions
        this.execute = res.execute
        this.activities = res.activities
        var joins = []
        for (var i = 0; i < this.members.length; i++) {
          joins[i] = this.members[i].label
        }
        this.joinP = joins
      }).catch((response) => {

      })
    },
    handleTagInputClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    showTagInput () {
      this.tagInputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleTagInputConfirm () {
      let tagInputValue = this.tagInputValue
      let id = this.dynamicTags.length + 1
      if (tagInputValue) {
        this.dynamicTags.unshift({
          id: id,
          title: tagInputValue
        })
      }
      this.tagInputVisible = false
      this.tagInputValue = ''
    },
    handleAddSubtask () {
      jQuery('.add-subtask-btn').hide()
      jQuery('.add-subtask-input').show()
    },
    comfirmAddSubtask () {
      if (this.addSubtaskValue !== '') {
        var id = this.subtask.length + 1
        this.subtask.push({
          id: id,
          title: this.addSubtaskValue
        })
      }
      this.addSubtaskValue = ''
      jQuery('.add-subtask-input').hide()
      jQuery('.add-subtask-btn').show()
    },
    cancelAddSubtask () {
      this.addSubTaskValue = ''
      jQuery('.add-subtask-input').hide()
      jQuery('.add-subtask-btn').show()
    },
    describeCollapse () {
      this.taskDescribeVisible = !this.taskDescribeVisible
      jQuery('.rotate-icon').toggleClass('rotate-180')
    },
    handleFinished (c) {
      if (c) {
        ++this.task.finishedSUT
      } else {
        --this.task.finishedSUT
      }
    },
    joinPChange () {
      var m = []
      for (var i = 0; i < this.joinP.length; i++) {
        m[i] = {}
        m[i].value = i + 1
        m[i].label = this.joinP[i]
      }
      this.members = m
    }
  }
}
</script>

<style scoped>
.full-width-btn {
    width: 100%;
    border-radius: 0px;
}

.full-width-btn:active {
    border: 1px solid #DCDFE6;
}

.btn-no-right {
    border-right: 0px;
}

.btn-side-left {
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
}

.btn-side-right {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
}

.task-explain.dotted:not(.pull-right):before {
    content: '\2022';
    margin-right: 10px;
}

.el-tag + .el-tag {
    margin-left: 10px;
}

.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}

.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: top;
}

.subtask-wrap {
    height: 120px;
    overflow-y: scroll;
    border: 1px solid #DCDFE6;
    padding: 10px;
}

.add-subtask-input {
  margin-top: 10px;
  display: none;
}
</style>
