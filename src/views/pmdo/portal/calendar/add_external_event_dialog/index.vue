<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="4">
        <label class="form-label">事件标题:</label>
      </el-col>
      <el-col :span="20">
        <el-input v-model="eventTitle" size="small" placeholder="" class="input-demo-400">
        </el-input>
      </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-top: 10px">
      <el-col :span="4">
        <label class="form-label">颜色:</label>
      </el-col>
      <el-col :span="20">
          <el-radio class="red-radio" v-model="eventColor" label="#E53935">&nbsp;</el-radio>
          <el-radio class="orange-radio" v-model="eventColor" label="#F4511E">&nbsp;</el-radio>
          <el-radio class="blue-radio" v-model="eventColor" label="#1E88E5">&nbsp;</el-radio>
          <el-radio class="green-blue-radio" v-model="eventColor" label="#00ACC1">&nbsp;</el-radio>
          <el-radio class="green-radio" v-model="eventColor" label="#43A047">&nbsp;</el-radio>
          <el-radio class="purple-radio" v-model="eventColor" label="#3949AB">&nbsp;</el-radio>
          <el-radio class="gray-radio" v-model="eventColor" label="#607D8B">&nbsp;</el-radio>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'addExternalEventDialog',
  props: [],
  data () {
    return {
      eventTitle: '',
      eventColor: '#E53935'
    }
  },
  methods: {

  },
  watch: {

  }
}
</script>
