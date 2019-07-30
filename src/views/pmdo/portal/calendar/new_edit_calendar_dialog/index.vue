<template>
  <div>
    <el-row :gutter="10">
        <el-input placeholder="请输入日程标题" v-model="calendarTitle" class="input-demo-400 input-title" style="margin-bottom:10px;">
            <template slot="prepend"><d2-icon name="calendar"/></template>
            <el-button @click="describeCollapse" slot="append"><d2-icon class="rotate-icon" name="angle-down"/></el-button>
        </el-input>
    </el-row>
    <el-row v-if="calendarDescribeVisible" :gutter="10" style="margin-bottom:10px;">
        <el-input
        type="textarea"
        :autosize="{ minRows: 3, maxRows: 3}"
        placeholder=""
        v-model="calendarDescribe"
        class="input-demo-400">
        </el-input>
    </el-row>
    <el-row :gutter="10"  style="margin-top:10px;">
      <el-col :span="4">
        <label class="form-label">起始时间:</label>
      </el-col>
      <el-col :span="20">
        <el-date-picker
        v-model="startTime"
        type="datetime"
        placeholder=""
         class="input-date"
         value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-col>
    </el-row>
    <el-row :gutter="10"  style="margin-top:10px;">
      <el-col :span="4">
        <label class="form-label">结束时间:</label>
      </el-col>
      <el-col :span="20">
        <el-date-picker
        v-model="endTime"
        type="datetime"
        placeholder=""
         class="input-date"
         value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-col>
    </el-row>
    <el-row :gutter="10"  style="margin-top:10px;">
      <el-col :span="4">
        <label class="form-label">全天事件:</label>
      </el-col>
      <el-col :span="20">
        <el-switch
        v-model="wholeDay">
        </el-switch>
      </el-col>
    </el-row>
    <el-row :gutter="10"  style="margin-top:10px;">
      <el-col :span="4">
        <label class="form-label">参与人:</label>
      </el-col>
      <el-col :span="20">
        <el-select v-model="joinP" multiple placeholder=""
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
    </el-row>
    <el-row :gutter="10"  style="margin-top:10px;">
      <el-col :span="4">
        <label class="form-label">地点:</label>
      </el-col>
      <el-col :span="20">
        <el-input v-model="address" size="small" placeholder="" class="input-demo-400">
        </el-input>
      </el-col>
    </el-row>
    <el-row :gutter="10"  style="margin-top:10px;">
      <el-col :span="4">
        <label class="form-label">公开程度:</label>
      </el-col>
      <el-col :span="20">
          <el-select v-model="publicLevel" placeholder="" class="select">
            <el-option
            v-for="item in plOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-top: 10px">
      <el-col :span="4">
        <label class="form-label">颜色:</label>
      </el-col>
      <el-col :span="20">
          <el-radio class="red-radio" v-model="calendarColor" label="#E53935">&nbsp;</el-radio>
          <el-radio class="orange-radio" v-model="calendarColor" label="#F4511E">&nbsp;</el-radio>
          <el-radio class="blue-radio" v-model="calendarColor" label="#1E88E5">&nbsp;</el-radio>
          <el-radio class="green-blue-radio" v-model="calendarColor" label="#00ACC1">&nbsp;</el-radio>
          <el-radio class="green-radio" v-model="calendarColor" label="#43A047">&nbsp;</el-radio>
          <el-radio class="purple-radio" v-model="calendarColor" label="#3949AB">&nbsp;</el-radio>
          <el-radio class="gray-radio" v-model="calendarColor" label="#607D8B">&nbsp;</el-radio>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import jQuery from 'jquery'

export default {
  name: 'newEditCalendarDialog',
  props: ['ce'],
  data () {
    return {
      calendarTitle: this.ce.title,
      calendarDescribeVisible: false,
      calendarDescribe: '',
      startTime: this.ce.start,
      endTime: this.ce.end,
      wholeDay: this.ce.allDay,
      pOptions: [
        {
          'label': '一导情',
          'options': [
            {
              'value': 1,
              'label': '罗娟'
            },
            {
              'value': 2,
              'label': '何艳'
            },
            {
              'value': 3,
              'label': '梁洋'
            }
          ]
        },
        {
          'label': '调六织',
          'options': [
            {
              'value': 4,
              'label': '毛娜'
            },
            {
              'value': 5,
              'label': '文桂英'
            },
            {
              'value': 6,
              'label': '丁磊'
            }
          ]
        },
        {
          'label': '值铁油',
          'options': [
            {
              'value': 7,
              'label': '梁丽'
            },
            {
              'value': 8,
              'label': '赖涛'
            },
            {
              'value': 9,
              'label': '胡磊'
            }
          ]
        }
      ],
      joinP: '',
      address: '',
      publicLevel: '',
      plOptions: [
        {
          'value': 1,
          'label': '对所有人可见'
        },
        {
          'value': 2,
          'label': '仅自己可见'
        }
      ],
      calendarColor: this.ce.backgroundColor
    }
  },
  methods: {
    describeCollapse () {
      this.calendarDescribeVisible = !this.calendarDescribeVisible
      jQuery('.rotate-icon').toggleClass('rotate-180')
    }
  },
  watch: {
    ce () {
      this.calendarTitle = this.ce.title
      this.startTime = this.ce.start
      this.endTime = this.ce.end
      this.wholeDay = this.ce.allDay
      this.calendarColor = this.ce.backgroundColor
    }
  }
}
</script>
