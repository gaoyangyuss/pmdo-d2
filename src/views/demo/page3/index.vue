<template>
  <el-container class="main-container">
    <el-aside class="second-side">
      <div class="side-title">
        {{ $t('views.pmdo.project.proj_km_center.second-side-title') }}
      </div>
    </el-aside>
    <el-container>
      <el-header class="head">
        <div class="head-title">
          <d2-icon name="folder-open"/> {{$t('layout.sidebar.project.proj_km_center')}}
        </div>
        <div class="head-elements">
          <el-button type="success" size="small"><d2-icon name="upload"/> {{ $t('views.pmdo.common-btns.upload-doc') }}</el-button>
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

      </el-main>

    </el-container>
  </el-container>
</template>

<script>
/* import jQuery from 'jquery'
import Vue from 'vue'
import i18n from '../../../i18n'

const vueInstance = new Vue({ i18n }) */

export default {
  name: '',
  components: {

  },
  data () {
    return {

    }
  },
  watch: {

  },
  mounted () {

  },
  methods: {

  }
}
</script>
