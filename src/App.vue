<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import util from '@/libs/util'
export default {
  name: 'app',
  watch: {
    '$i18n.locale': 'i18nHandle'
  },
  created () {
    this.i18nHandle(this.$i18n.locale)
  },
  methods: {
    i18nHandle (val, oldVal) {
      util.cookies.set('lang', val)
      document.querySelector('html').setAttribute('lang', val)
    }
  }
}
</script>

<style lang="scss">
@import '~@/assets/style/public-class.scss';

/* 设置滚动条的样式 */
/*滚动槽*/
::-webkit-scrollbar {
  width: 4px;
  height: 10px;
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(158,158,158,.6);
}
/* 设置滚动条的样式 */

/* 设置sidebar文字显示长度 */
.el-submenu__title > span,
.el-menu-item > span {
  display: inline-block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
/* 设置sidebar文字显示长度 */

.right {
  float: right;
}

.right+.right {
  margin-right: 10px;
}

.main-container {
  background-color: #fff;
  margin-right: 20px;
  border-left: 1px solid #cfd7e5;
  border-right: 1px solid #cfd7e5;
  border-bottom: 1px solid #cfd7e5;
}

.second-side {
  padding: 10px;
   border-right: 1px solid #cfd7e5;
}

.side-title {
  margin-bottom: 10px;
}

.side-tree {
  margin-top: 10px;
}

.tree-wrap,
.main {
  overflow: auto;
}

.head {
  padding: 10px 15px !important;
}

.head {
  border-bottom: 1px solid #cfd7e5;
}

.head-title {
  float: left;
  margin-top: 8px;
}

.head-elements {
  float: right;
  margin-top: -4px;
}

.clc {
  clear: both;
}

.icon-btn {
  font-size: 16px!important;
  color: #000!important;
}

.green-btn {
  color: #67C23A !important;
}

.dark-btn {
  color: #000 !important;
}

.main {
  padding: 0px 15px 10px 15px!important;
}

.table-slot {
  padding: 10px;
}

.table-slot-left {
  float: left;
}

.table-slot-right {
  float: right;
}

.table-slot-search {
  border-right: 1px solid #cfd7e5 !important;
}

.rotate-icon {
  transform-origin:center center;
  transform: rotate(0deg);
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -ms-transform: rotate(0deg);
  -o-transform: rotate(0deg);

  transition: transform 0.2s;
  -moz-transition: -moz-transform 0.2s;
  -moz-transition: -moz-transform 0.2s;
  -o-transition: -o-transform 0.2s;
  -ms-transition: -ms-transform 0.2s;
}

.rotate-180 {
  transform-origin:center center;
  transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  -o-transform: rotate(180deg);

  transition: transform 0.2s;
  -moz-transition: -moz-transform 0.2s;
  -moz-transition: -moz-transform 0.2s;
  -o-transition: -o-transform 0.2s;
  -ms-transition: -ms-transform 0.2s;
}

.el-dialog__body {
  padding: 10px 20px !important;
}

.input-date, .select {
  width: 100% !important;
}

.input-title,
.input-date,
.select {
  height: 32px !important;
  line-height: 32px !important;
  font-size: 13px;
}

.input-title .el-input__inner,
.input-date .el-input__inner,
.select .el-input__inner {
  height: 34px !important;
  line-height: 34px !important;
}

.form-label {
  display: block;
  text-align: right;
}

.explain {
  color: #999999;
}

.red-heart {
  color: #F56C6C;
}

.red-radio .el-radio__inner,
.red-radio .el-radio__inner:hover {
  border: 2px solid #E53935;
}

.red-radio .el-radio__input.is-checked .el-radio__inner {
  border-color: #E53935;
  background: #E53935;
}

.orange-radio .el-radio__inner,
.orange-radio .el-radio__inner:hover {
  border: 2px solid #F4511E;
}

.orange-radio .el-radio__input.is-checked .el-radio__inner {
  border-color: #F4511E;
  background: #F4511E;
}

.blue-radio .el-radio__inner,
.blue-radio .el-radio__inner:hover {
  border: 2px solid #1E88E5;
}

.blue-radio .el-radio__input.is-checked .el-radio__inner {
  border-color: #1E88E5;
  background: #1E88E5;
}

.green-blue-radio .el-radio__inner,
.green-blue-radio .el-radio__inner:hover {
  border: 2px solid #00ACC1;
}

.green-blue-radio .el-radio__input.is-checked .el-radio__inner {
  border-color: #00ACC1;
  background: #00ACC1;
}

.green-radio .el-radio__inner,
.green-radio .el-radio__inner:hover {
  border: 2px solid #43A047;
}

.green-radio .el-radio__input.is-checked .el-radio__inner {
  border-color: #43A047;
  background: #43A047;
}

.purple-radio .el-radio__inner,
.purple-radio .el-radio__inner:hover {
  border: 2px solid #3949AB;
}

.purple-radio .el-radio__input.is-checked .el-radio__inner {
  border-color: #3949AB;
  background: #3949AB;
}

.gray-radio .el-radio__inner,
.gray-radio .el-radio__inner:hover {
  border: 2px solid #607D8B;
}

.gray-radio .el-radio__input.is-checked .el-radio__inner {
  border-color: #607D8B;
  background: #607D8B;
}

.important-radio .el-radio__inner,
.important-radio .el-radio__inner:hover {
  border: 2px solid #e53935;
}

.important-radio .el-radio__input.is-checked .el-radio__inner {
  border-color: #e53935;
  background: #e53935;
}

.precedence-radio .el-radio__inner,
.precedence-radio .el-radio__inner:hover {
  border: 2px solid #fb8c00;
}

.precedence-radio .el-radio__input.is-checked .el-radio__inner {
  border-color: #fb8c00;
  background: #fb8c00;
}

.normal-radio .el-radio__inner,
.normal-radio .el-radio__inner:hover {
  border: 2px solid #606266;
}

.normal-radio .el-radio__input.is-checked .el-radio__inner {
  border-color: #606266;
  background: #606266;
}

.list-title-edit .el-input__inner {
  border-radius: 0;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 2px solid #DCDFE6;
}

.list-title-edit .el-input__inner:focus {
  border-color: #DCDFE6;
}

.no-color-edit .el-input__inner,
.no-color-edit .el-input-group__append  button.el-button {
  background-color: rgba(0,0,0,0);
  color: #fff;
}

.white-color {
  color: #fff !important;
}

.list-title-edit .el-input-group__append {
  border: 0px;
  background-color: transparent;
}

.list-title-edit .el-input-group__append  button.el-button {
  padding: 12px 10px;
}

/* taskboard css start */
.taskboard-stage {
  display: inline-block;
  width: 270px;
  height: 100%;
  margin-top: 10px;
  margin-right: 10px;
  vertical-align: top;
  background-color: #fff;
  border-width: 0px;
  border-radius: 0px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, .24);
}

.taskboard-stage-header {
  background-color: #ffffff;
  padding: 10px 15px;
  border-top: 0px solid #e0e0e0;
  border-right: 0px solid #e0e0e0;
  border-left: 0px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
}

.taskboard-stage-title {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  line-height: 33px;
  float: left;
}

.taskboard-stage-btn {
  float: right;
}

.taskboard-stage .scroll-wrap {
  overflow: auto
}

.sub-list-group {
  background-color: #fff;
}

.taskboard-stage .list-group-item {
  padding: 12px 15px;
  cursor: pointer;
  background-color: #fff;
  border-right: 1px solid transparent;
  border-bottom: 1px solid #e0e0e0;
  border-left: 3px solid transparent;
}

.taskboard-stage .list-group-item.priority-normal {
    border-left-color: #e0e0e0;
}

.taskboard-stage .list-group-item.priority-precedence {
    border-left-color: #fb8c00;
}

.taskboard-stage .list-group-item.priority-important {
    border-left-color: #e53935;
}

.taskboard-stage .el-checkbox__input.is-checked+.el-checkbox__label {
    color: #606266;
    text-decoration: line-through;
}

.task-title {
  display: block;
}

.task-badges {
  float: left;
}

.task-members {
  float: right;
}

.task-badge {
  font-size: 12px;
  margin-right: 10px;
  color: #9e9e9e;
  line-height: 30px;
  margin-top: 10px;
  display: inline-block;
}

.task-member {
  margin-top: 10px;
}

.task-member+.task-member {
  margin-left: 5px;
}

.taskboard-stage .sortable-drag {
  opacity: 1 !important;
}

.taskboard-stage .sortable-ghost {
  opacity: 0 !important;
}

.taskboard-stage.sortable-drag {
  /* background: linear-gradient(rgba(255,255,255,1),rgba(255,255,255,1)) !important; */
  background-color: #fff !important;
  opacity: 1 !important;
}

.taskboard-stage.sortable-ghost {
  opacity: 0 !important;
}

.add-task-input {
  width: 248px;
  margin: 24px 10px;
  display: none;
}

.add-task-btn {
  margin: 20px !important;
}

.rename-task {
  margin-right: -15px;
  display: none
}

.rename-task .edit-title-input,
.rename-task .edit-title-btn {
  width: 100%;
}

.rename-task .edit-title-btn {
  margin-top: 10px;
}

.taskboard-stage .el-checkbox {
  display: inline-block;
  margin-right: 0px;
}
/* taskboard css end */

.task-title .el-checkbox__input.is-checked+.el-checkbox__label {
    color: #606266;
    text-decoration: line-through;
}

/* calendar css start */
.fc-event {
  border: 1px solid transparent !important;
}

.fc-toolbar h2 {
  font-size: 1.2em !important;
  font-weight: normal !important;
}

.fc th {
  font-weight: normal !important;
}

.fc-button {
  padding: 0.3em 0.55em !important;
}

.fc-button-primary {
  background: #FFF !important;
  border: 1px solid #DCDFE6 !important;
  color: #606266 !important;
}

.fc-button-primary:disabled {
  cursor: not-allowed;
}

.fc-button-primary:not(:disabled):active:focus,
.fc-button-primary:not(:disabled).fc-button-active:focus,
.fc-button-primary:focus {
  box-shadow: none !important;
  color: #409EFF !important;
  border-color: #c6e2ff !important;
  background-color: #ecf5ff !important;
}
/* calendar css end */
</style>
