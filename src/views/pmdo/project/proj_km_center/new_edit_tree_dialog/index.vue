<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="4">
        <label class="form-label">{{$t('views.pmdo.project.proj_km_center.new_edit_tree_dialog.parent-node-label')}}:</label>
      </el-col>
      <el-col :span="20">
        <el-input v-model="parentNode" size="small" placeholder="" class="input-demo-400" disabled>
        </el-input>
      </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-top: 10px">
      <el-col :span="4">
        <label class="form-label">{{$t('views.pmdo.project.proj_km_center.new_edit_tree_dialog.name-label')}}:</label>
      </el-col>
      <el-col :span="20">
        <el-input v-model="node" size="small" placeholder="" class="input-demo-400" @change="changeV">
        </el-input>
      </el-col>
    </el-row>
    <el-row :gutter="10" style="margin-top: 10px">
      <el-col :span="4">
        <label class="form-label">{{$t('views.pmdo.project.proj_km_center.new_edit_tree_dialog.node-key')}}:</label>
      </el-col>
      <el-col :span="20">
        <el-input v-model="key" size="small" placeholder="" class="input-demo-400" @change="changeV">
        </el-input>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'newEditTreeDialog',
  props: ['parentNodeV', 'nodeV', 'keyV'],
  data () {
    return {
      parentNode: this.parentNodeV,
      node: this.nodeV,
      key: this.keyV
    }
  },
  methods: {
    changeV () {
      this.$emit('update:nodeV', this.node)
      this.$emit('update:keyV', this.key)
    }
  },
  watch: {
    parentNodeV () {
      this.parentNode = this.parentNodeV
    },
    nodeV () {
      this.node = this.nodeV
    },
    keyV () {
      this.key = this.keyV
    }
  }
}
</script>
