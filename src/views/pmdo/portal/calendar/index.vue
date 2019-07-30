<template>
  <el-container class="main-container">
    <el-aside class="second-side">
      <div class="side-title">
        日程查看器
      </div>
      <div class="person-list-wrap">
        <el-select v-model="personRange" class="select" placeholder="请选择">
          <el-option
            v-for="item in prOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <ul class="person-list">
          <li class="person-item"><el-checkbox v-model="checked1"></el-checkbox><el-tag class="person-firstname" type="info" effect="dark">李</el-tag> 超级管理员</li>
          <li class="person-item"><el-checkbox v-model="checked2"></el-checkbox><el-tag class="person-firstname" type="info" effect="dark">张</el-tag> 超级管理员</li>
        </ul>
      </div>
      <div class="side-title" style="margin-top:10px;">
        常用事件
      </div>
      <div class="event-list">
        <div id='external-events'>
            <external-event :listV="externalEvents"/>
        </div>
      </div>
      <el-button @click="eventDialogVisible=true" class="btn-text green-btn margin-left-10 add-tag-btn" type="text"><d2-icon name="plus"/>  添加常用事件</el-button>
    </el-aside>
    <el-container>
      <el-header class="head">
        <div class="head-title">
          <d2-icon name="calendar"/> 日程表
        </div>
        <div class="head-elements">
          <el-button @click="handleAddCalendar" type="success" size="small"><d2-icon name="plus"/> 新建日程</el-button>
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
          <FullCalendar defaultView="dayGridMonth"
            :plugins="calendarPlugins"
            :header="header"
            :events="events"
            :droppable="true"
            :editable="true"
            locale="zh-cn"
            :button-text="btnText"
            @eventClick="handleEditCalendar"
            style="margin-top: 10px;"/>
      </el-main>

      <el-dialog
        title="添加常用事件"
        :visible.sync="eventDialogVisible"
        :close-on-click-modal="false"
        width="40%">
        <add-external-event-dialog ref="externalEvent"/>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelAddExternalEvent" size="mini">{{ $t('views.pmdo.common-btns.cancel') }}</el-button>
          <el-button type="primary" @click="comfirmAddExternalEvent" size="mini">{{ $t('views.pmdo.common-btns.comfirm') }}</el-button>
        </div>
      </el-dialog>

      <el-dialog
        :title="newEditCalendarTitle"
        :visible.sync="calendarDialogVisible"
        :close-on-click-modal="false"
        width="40%">
        <new-edit-calendar-dialog :ce="currentEvent"/>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelNewEditCalendar" size="mini">{{ $t('views.pmdo.common-btns.cancel') }}</el-button>
          <el-button type="primary" v-if="newCalendarShow" @click="newCalendarComfirm" size="mini">{{ $t('views.pmdo.common-btns.comfirm') }}</el-button>
          <el-button type="primary" v-if="editCalendarShow" @click="editCalendarComfirm" size="mini">{{ $t('views.pmdo.common-btns.comfirm') }}</el-button>
        </div>
      </el-dialog>
    </el-container>
  </el-container>
</template>

<script>
import jQuery from 'jquery'
import Vue from 'vue'
import i18n from '../../../../i18n'

import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'
import '@fullcalendar/core/locales/zh-cn'

const vueInstance = new Vue({ i18n })

export default {
  name: 'calendar',
  components: {
    FullCalendar,
    'external-event': () => import('./external_event/index.vue'),
    'add-external-event-dialog': () => import('./add_external_event_dialog/index.vue'),
    'new-edit-calendar-dialog': () => import('./new_edit_calendar_dialog/index.vue')
  },
  data () {
    return {
      calendarPlugins: [ dayGridPlugin, timeGridPlugin, interactionPlugin ],
      events: [
        {
          title: 'event 1',
          date: '2019-07-01',
          backgroundColor: '#E53935',
          eventBorderColor: '#E53935'
        },
        {
          title: 'event 2',
          date: '2019-07-22',
          backgroundColor: '#F4511E',
          eventBorderColor: '#F4511E'
        },
        {
          title: 'event3',
          start: '2019-07-05',
          end: '2019-07-07',
          backgroundColor: '#1E88E5',
          eventBorderColor: '#1E88E5'
        },
        {
          title: 'event4',
          start: '2019-07-09T12:30:00',
          allDay: false, // will make the time show
          backgroundColor: '#00ACC1',
          eventBorderColor: '#00ACC1'
        },
        {
          title: 'event5',
          start: '2019-07-29T18:00:00',
          allDay: false, // will make the time show
          backgroundColor: '#43A047',
          eventBorderColor: '#43A047'
        },
        {
          title: 'event6',
          start: '2019-07-30',
          allDay: true, // will make the time show
          backgroundColor: '#3949AB',
          eventBorderColor: '#3949AB'
        },
        {
          title: 'event7',
          start: '2019-07-31',
          allDay: false, // will make the time show
          backgroundColor: '#607D8B',
          eventBorderColor: '#607D8B'
        }
      ],
      currentEvent: {},
      btnText: {
        today: '今天',
        dayGridMonth: '月',
        timeGridWeek: '周',
        timeGridDay: '日'
      },
      header: {
        left: 'today prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      prOptions: [{
        value: '1',
        label: '市场部'
      }, {
        value: '2',
        label: '采购部'
      }, {
        value: '3',
        label: '人事部'
      }],
      personRange: '',
      checked1: false,
      checked2: false,
      externalEvents: [
        {
          id: 1,
          title: '常用事件1',
          color: '#E53935'
        },
        {
          id: 2,
          title: '常用事件2',
          color: '#F4511E'
        },
        {
          id: 3,
          title: '常用事件3',
          color: '#1E88E5'
        },
        {
          id: 4,
          title: '常用事件4',
          color: '#00ACC1'
        },
        {
          id: 5,
          title: '常用事件5',
          color: '#43A047'
        },
        {
          id: 6,
          title: '常用事件6',
          color: '#3949AB'
        },
        {
          id: 7,
          title: '常用事件7',
          color: '#607D8B'
        }
      ],
      eventDialogVisible: false,
      calendarDialogVisible: false,
      newEditCalendarTitle: '',
      newCalendarShow: false,
      editCalendarShow: false
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
      var listHeight = jQuery(window).height() - 320
      listHeight = listHeight / 2
      var mainHeight = jQuery(window).height() - 160
      jQuery('.main').css('height', mainHeight)
      jQuery('.person-list').css('height', listHeight)
      jQuery('.event-list').css('height', listHeight)
    },
    getData () {

    },
    comfirmAddExternalEvent () {
      if (this.$refs.externalEvent.eventTitle) {
        var id = this.externalEvents.length + 1
        var ee = {
          id: id,
          title: this.$refs.externalEvent.eventTitle,
          color: this.$refs.externalEvent.eventColor
        }
        this.externalEvents.unshift(ee)
      }
      this.$refs.externalEvent.eventTitle = ''
      this.eventDialogVisible = false
    },
    cancelAddExternalEvent () {
      this.eventDialogVisible = false
    },
    handleAddCalendar () {
      this.calendarDialogVisible = true
      this.newEditCalendarTitle = '新建日程'
      this.editCalendarShow = false
      this.newCalendarShow = true
    },
    handleEditCalendar (info) {
      this.calendarDialogVisible = true
      this.newEditCalendarTitle = '编辑日程'
      this.newCalendarShow = false
      this.editCalendarShow = true
      this.currentEvent = info.event
    },
    newCalendarComfirm () {
      this.calendarDialogVisible = false
    },
    editCalendarComfirm () {
      this.calendarDialogVisible = false
    },
    cancelNewEditCalendar () {
      this.calendarDialogVisible = false
    }
  }
}
</script>

<style lang='scss'>

@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';
@import '~@fullcalendar/timegrid/main.css';

</style>

<style scoped>
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

.person-list-wrap {
  padding: 0 10px;
}

.person-list {
  overflow: scroll;
  list-style-type: none;
  padding-inline-start: 10px;
}

.event-list {
  overflow: scroll;
  padding: 0 10px;
}

.person-item {
  padding: 5px 0;
}

.person-firstname {
  margin-right: 30px;
}
</style>
