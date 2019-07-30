<template>
  <div class="table-slot-collapse">
        <div class="table-slot-collapse-title">{{ $t('views.pmdo.search-collaspe') }}：<el-button class="addSearchCondition" @click="addSearchCondition" type="text"><d2-icon name="plus"/> {{ $t('views.pmdo.common-btns.new-search-condition') }}</el-button></div>
           <row-condition  v-for="row in conditionRows" :conditions="conditions" :rowConditionsValue="row" :key="row.id" @deleteRow="deleteSearch(row.id)"/>
            <el-row :gutter="10" style="margin-bottom: 10px;">
                <el-col :span="6">
                    <el-input size="small" :placeholder="$t('views.pmdo.date-range-placeholder')" class="input-demo-400" disabled>
                    </el-input>
                </el-col>
                <el-col :span="12">
                    <el-date-picker
                    v-model="dateRangeValue"
                    type="daterange"
                    :range-separator="$t('views.pmdo.date.to')"
                    :start-placeholder="$t('views.pmdo.date.start-date')"
                    :end-placeholder="$t('views.pmdo.date.end-date')"
                    style="width:100%;"
                    size="small"
                    value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-col>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="14">
                    <span>&nbsp;</span>
                    <el-tag
                    v-for="tag in normalSearchTags"
                    :key="tag"
                    closable
                    @close="handleClose(tag)"
                    size="defualt">
                    {{tag}}
                    </el-tag>
                </el-col>
                <el-col :span="10">
                    <el-button @click="searchComfirm" class="right" type="primary" size="small"><d2-icon name="search"/> {{ $t('views.pmdo.common-btns.search') }}</el-button>
                    <el-button @click="normalSearchDialogVisible = true" class="right" type="success" size="small"><d2-icon name="save"/> {{ $t('views.pmdo.common-btns.save-normal-search') }}</el-button>
                </el-col>
            </el-row>

            <el-dialog
            :title="$t('views.pmdo.normal-search-title')"
            :visible.sync="normalSearchDialogVisible"
            width="40%">
            <el-row :gutter="10">
                <el-col :span="4">
                    <label class="form-label">{{ $t('views.pmdo.form-label.please-enter-name' )}}:</label>
                </el-col>
                <el-col :span="20">
                    <el-input v-model="normalSearchTag" size="small" placeholder="" class="input-demo-400">
                    </el-input>
                </el-col>
            </el-row>
            <div slot="footer" class="dialog-footer">
            <el-button @click="cancel" size="mini">{{ $t('views.pmdo.common-btns.cancel') }}</el-button>
            <el-button @click="comfirm" type="primary" size="mini">{{ $t('views.pmdo.common-btns.comfirm') }}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import jQuery from 'jquery'

export default {
  name: 'advancedSearch',
  props: {
    conditionsNum: Number,
    searchTerms: Array,
    normalTags: Array
  },
  components: {
    'row-condition': () => import('./row_condition/index.vue')
  },
  data () {
    return {
      dateRangeValue: null,
      normalSearchTags: this.normalTags,
      normalSearchDialogVisible: false,
      normalSearchTag: '',
      conditions: this.searchTerms,
      conditionRows: [
        {
          id: 1,
          selectConditionsValue: '',
          selectEqualValue: '',
          inputValue: ''
        }
      ],
      conditionTotal: this.conditionsNum,
      conditionCount: 1,
      idCount: 1
    }
  },
  watch: {
    searchTerms () {
      this.conditions = this.searchTerms
    }
  },
  methods: {
    handleClose (tag) {
      this.normalSearchTags.splice(this.normalSearchTags.indexOf(tag), 1)
    },
    cancel () {
      this.normalSearchDialogVisible = false
      this.normalSearchTag = ''
    },
    comfirm () {
      this.normalSearchTags.push(this.normalSearchTag)
      this.normalSearchDialogVisible = false
      this.normalSearchTag = ''
    },
    addSearchCondition () {
      if (this.conditionCount < this.conditionTotal) {
        this.idCount++
        this.conditionRows.push({
          id: this.idCount,
          selectConditionsValue: '',
          selectEqualValue: ``,
          inputValue: ''
        })
        this.conditionCount++
        if (this.conditionCount === this.conditionTotal) {
          jQuery('.addSearchCondition').addClass('disabled')
        }
      }
    },
    deleteSearch (id) {
      for (var i = this.conditionRows.length - 1; i >= 0; i--) {
        if (this.conditionRows[i].id === id) {
          this.conditionRows.splice(i, 1)
        }
      }
      this.conditionCount--
      jQuery('.addSearchCondition').removeClass('disabled')
    },
    searchComfirm () {
      this.$emit('advancedSearchComfirm', this.conditionRows, this.dateRangeValue)
    }
  }
}
</script>

<style scoped>
.table-slot-collapse {
  border: 1px solid #cfd7e5 !important;
  margin-top: 10px;
  padding: 10px;
  display: none;
}

.table-slot-collapse-title {
  font-size: 14px;
}

.table-slot-collapse-title .el-button--text,
.table-slot-collapse-title .el-button--text:active,
.table-slot-collapse-title .el-button--text:hover,
.table-slot-collapse-title .el-button--text:focus {
  font-size: 14px;
  color: #67C23A;
}

.table-slot-collapse-title .disabled,
.table-slot-collapse-title .disabled:active,
.table-slot-collapse-title .disabled:hover,
.table-slot-collapse-title .disabled:focus {
  color: gray;
}

.table-slot-collapse .el-tag+.el-tag {
    margin-left: 10px;
}
</style>
