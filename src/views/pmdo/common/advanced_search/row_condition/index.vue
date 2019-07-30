<template>
  <el-row :gutter="10" style="margin-bottom:10px;">
        <el-col :span="6">
            <el-select size="small" style="width: 100%;" v-model="rcv.selectConditionsValue" :placeholder="$t('views.pmdo.select-placeholder')">
                <el-option
                v-for="item in selectConditions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-col>
        <el-col :span="4">
            <el-select size="small" style="width: 100%;" v-model="rcv.selectEqualValue" :placeholder="$t('views.pmdo.select-placeholder')">
                <el-option
                v-for="item in selectEqual"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-col>
        <el-col :span="8">
            <el-input size="small" placeholder="" class="input-demo-400" v-model="rcv.inputValue">
            </el-input>
        </el-col>
        <el-col :span="6">
            <el-tooltip
            effect="dark"
            :content="$t('views.pmdo.common-btns.delete')"
            placement="bottom">
              <!-- <el-button class="deleteSearchRow" @click="deleteSearchRow($event)" type="info" size="mini"><d2-icon name="close"/></el-button> -->
              <el-button class="deleteSearchRow" @click="deleteSearchRow()" type="info" size="mini"><d2-icon name="close"/></el-button>
            </el-tooltip>
        </el-col>
    </el-row>
</template>

<script>
import Vue from 'vue'
import i18n from '../../../../../i18n'

const vueInstance = new Vue({ i18n })

export default {
  name: 'rowCondition',
  props: {
    conditions: Array,
    rowConditionsValue: Object
  },
  data () {
    return {
      selectConditions: this.conditions,
      selectEqual: [{
        value: `${vueInstance.$t('views.pmdo.search-equal')}`,
        label: `${vueInstance.$t('views.pmdo.search-equal')}`
      }, {
        value: `${vueInstance.$t('views.pmdo.search-unequal')}`,
        label: `${vueInstance.$t('views.pmdo.search-unequal')}`
      }],
      /* rcv: {
          id: '',
          selectConditionsValue: '',
          selectEqualValue: '',
          inputValue: ''
        } */
      rcv: this.rowConditionsValue
    }
  },
  watch: {
    conditions () {
      this.selectConditions = this.conditions
    }
  },
  methods: {
    /* deleteSearchRow (event) {
      jQuery(event.currentTarget).parents('.el-row').remove()
    } */
    deleteSearchRow (id) {
      this.$emit('deleteRow')
    }
  }
}
</script>
