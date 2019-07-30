<template>
    <div class="list-wrap">
      <div class="list-item" v-for="item in list" :key="item.id">
          <div class="list-item-show" @click="itemClick($event)" @mouseover="overhandle($event)" @mouseout="outhandle($event)">
              <label>{{item.title}}</label>
              <el-button @click.native.stop="deleteListItem(item.id)" class="btn-text icon-btn item-btn" type="text" style="margin-top:2px;"><d2-icon name="trash"/></el-button>
              <el-button @click.native.stop="editListItem($event, item.title)" class="btn-text icon-btn item-btn" type="text" style="margin-right:5px; margin-top:4px;"><d2-icon name="edit"/></el-button>
          </div>
          <div class="list-edit-show">
              <el-input v-model="item.title" @keyup.enter.native="comfirmEditListItem($event, item)" placeholder="" class="input-demo-400 list-title-edit" size="small">
                  <el-button @click="cancelEditListItem($event)" slot="append"><d2-icon name="close"/></el-button>
              </el-input>
          </div>
      </div>
  </div>
</template>

<script>
import jQuery from 'jquery'
import Vue from 'vue'
import i18n from '../../../../../i18n'

const vueInstance = new Vue({ i18n })

export default {
  name: 'editList',
  props: ['listV'],
  data () {
    return {
      list: this.listV,
      title: ''
    }
  },
  watch: {
    listV () {
      this.list = this.listV
    }
  },
  methods: {
    itemClick (e) {
      jQuery(e.currentTarget).parents('.list-wrap').find('.list-item-show').removeClass('active')
      jQuery(e.currentTarget).addClass('active')
      this.$emit('listClick')
    },
    overhandle (e) {
      jQuery(e.currentTarget).find('.item-btn').show()
    },
    outhandle (e) {
      jQuery(e.currentTarget).find('.item-btn').hide()
    },
    deleteListItem (id) {
      this.$confirm(`${vueInstance.$t('views.pmdo.delete-info')}`, `${vueInstance.$t('views.pmdo.delete-hint')}`, {
        confirmButtonText: `${vueInstance.$t('views.pmdo.common-btns.comfirm')}`,
        cancelButtonText: `${vueInstance.$t('views.pmdo.common-btns.cancel')}`,
        type: 'warning'
      }).then(() => {
        var i = this.list.findIndex(d => d.id === id)
        this.list.splice(i, 1)
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
    editListItem (e, title) {
      this.title = title
      jQuery(e.currentTarget).parent('.list-item-show').hide()
      jQuery(e.currentTarget).parent('.list-item-show').next('.list-edit-show').show()
    },
    comfirmEditListItem (e, item) {
      if (item.title === '') {
        item.title = this.title
      }
      jQuery(e.currentTarget).parents('.list-edit-show').hide()
      jQuery(e.currentTarget).parents('.list-edit-show').prev('.list-item-show').show()
    },
    cancelEditListItem (e) {
      jQuery(e.currentTarget).parents('.list-edit-show').hide()
      jQuery(e.currentTarget).parents('.list-edit-show').prev('.list-item-show').show()
    }
  }
}
</script>

<style scoped>
.list-edit-show {
  display: none;
}

.list-item-show {
  padding-left: 10px;
  padding-right: 10px;
}

.list-item-show:hover {
  background-color: #eee;
}

.list-item-show > label {
  line-height: 43px;
}

.list-item-show > .icon-btn {
  float: right;
}

.item-btn {
  display: none;
}

.list-title-edit {
  width: 278px;
  margin-left: 10px;
}

.active {
  background-color: #eee;
}
</style>
