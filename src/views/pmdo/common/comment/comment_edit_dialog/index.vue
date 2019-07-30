<template>
  <div style="margin-top:-10px;">
        <el-input
        type="textarea"
        :autosize="{ minRows: 3, maxRows: 3}"
        placeholder=""
        v-model="editComment"
        @change="handleChange"
        class="input-demo-400">
        </el-input>
        <el-row :gutter="10" style="margin-top: 10px;">
            <el-col :span="14">
                <div>
                    <transition name="fade" mode="">
                        <div class="emoji-box" v-if="showEditEmoji" >
                            <el-button
                            class="btn-text icon-btn"
                            type="text"
                            @click="showEditEmoji = false">
                                <d2-icon name="close"/>
                            </el-button>
                            <div class="clc"></div>
                            <vue-emoji
                            @select="editSelectEmoji">
                            </vue-emoji>
                            <span class="pop-arrow arrow"></span>
                        </div>
                    </transition>
                </div>
                <el-button @click="showEditEmoji = !showEditEmoji" class="btn-text icon-btn" type="text"><d2-icon name="smile-o"/></el-button>
                <el-button class="btn-text icon-btn" type="text"><d2-icon name="file-image-o"/></el-button>
                <el-button class="btn-text icon-btn" type="text"><d2-icon name="at"/></el-button>
            </el-col>
            <el-col :span="10">
                <el-button @click="editSubmit" class="right" type="primary" size="mini">{{ $t('views.pmdo.common-btns.publish') }}</el-button>
                <el-button @click="editCancel" class="right" type="default" size="mini">{{ $t('views.pmdo.common-btns.cancel') }}</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import vueEmoji from '../../emoji/index.vue'

export default {
  name: 'commentEditDialog',
  props: {
    textareaV: String
  },
  components: {
    vueEmoji
  },
  data () {
    return {
      editComment: this.textareaV,
      showEditEmoji: false
    }
  },
  methods: {
    editSelectEmoji (code) {
      // this.showEditEmoji = false
      this.editComment += code
    },
    handleChange () {
      this.$emit('update:textareaV', this.editComment)
    },
    editSubmit () {
      this.$emit('editConfirm')
      this.showEditEmoji = false
    },
    editCancel () {
      this.$emit('closeDialog')
      this.showEditEmoji = false
    }
  },
  watch: {
    textareaV () {
      this.editComment = this.textareaV
    }
  }
}
</script>
