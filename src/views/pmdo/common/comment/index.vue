<template>
  <div>
    <ul class="media-list">
        <li v-for="social in socials" :key="social.id" style="margin-bottom:20px;">
            <div class="media-left">
                <div class="icon-object border-primary text-primary"><d2-icon name="comments-o"/></div>
            </div>
            <div class="media-body">
                <div class="media-heading">
                    <span class="name-semibold"><el-tag size="mini" type="info" effect="dark">{{social.name.substring(0,1)}}</el-tag> {{social.name.substring(1)}}</span>
                    <span class="media-annotation dotted"><d2-icon name="vcard"/>{{social.label}}：{{social.explain}}</span>
                </div>

                <p class="result" v-html="social.say"></p>

                <viewer :images="social.images">
                    <img class="comment-img" v-for="src in social.images" :src="src" :key="src">
                </viewer>

                <ul class="list-time">
                    <li>{{social.date}}</li>
                </ul>

                <ul class="list-operation">
                    <li><el-button type="text" @click="agree($event, social.isRedHeart, social.praiseNum)"><i v-bind:class="social.isRedHeart ? 'fa fa-heart red-heart' : 'fa fa-heart-o'"/> (<span class="agree-number">{{social.praiseNum}}</span>)</el-button></li>
                    <li><el-button type="text" @click="commentAndReply($event)"><d2-icon name="comment-o"/> {{ $t('views.pmdo.common-btns.comment') }} (<span class="comment-number">{{social.commentNum}}</span>)</el-button></li>
                    <li><el-button type="text" @click.native="editBroad(social.id)"><d2-icon name="edit"/> {{ $t('views.pmdo.common-btns.edit') }}</el-button></li>
                    <li><el-button type="text" @click="deleteBroad(social.id)"><d2-icon name="trash"/> {{ $t('views.pmdo.common-btns.delete') }}</el-button></li>
                </ul>

                <div class="reply">
                    <el-input
                    placeholder=""
                    v-model="reply"
                    class="input-demo-400">
                    </el-input>
                    <el-row :gutter="10" style="margin-top: 10px;">
                        <el-col :span="14">
                            <div>
                                <transition name="fade" mode="">
                                    <div class="emoji-box" v-if="showReplyEmoji" >
                                        <el-button
                                        class="btn-text icon-btn"
                                        type="text"
                                        @click="showReplyEmoji = false">
                                            <d2-icon name="close"/>
                                        </el-button>
                                        <div class="clc"></div>
                                        <vue-emoji
                                        @select="selectReplyEmoji">
                                        </vue-emoji>
                                        <span class="pop-arrow arrow"></span>
                                    </div>
                                </transition>
                            </div>
                            <el-button @click="showReplyEmoji = !showReplyEmoji" class="btn-text icon-btn" type="text"><d2-icon name="smile-o"/></el-button>
                            <el-button class="btn-text icon-btn" type="text"><d2-icon name="file-image-o"/></el-button>
                            <el-button class="btn-text icon-btn" type="text"><d2-icon name="at"/></el-button>
                        </el-col>
                        <el-col :span="10">
                            <el-button @click="replySubmit(social.id)" class="right" type="primary" size="mini">{{ $t('views.pmdo.common-btns.publish') }}</el-button>
                            <el-button @click="replyCancel" class="right" type="default" size="mini">{{ $t('views.pmdo.common-btns.cancel') }}</el-button>
                        </el-col>
                    </el-row>
                </div>

                <div class="clc"></div>

                <div class="reply-media" v-for="children in social.childrens" :key="children.id">
                    <div class="media-left">
                        <div class="icon-object border-info text-info"><d2-icon name="comments-o"/></div>
                    </div>
                    <div class="media-body">
                        <div class="media-heading">
                            <span class="name-semibold"><el-tag type="info" effect="dark">{{children.name.substring(0,1)}}</el-tag> {{children.name.substring(1)}}</span>
                            <span v-if="children.hasReplyTo" class="media-annotation dotted">回复@{{children.replyTo}}</span>
                        </div>

                        <p class="result" v-html="children.say"></p>

                        <viewer :images="children.images">
                            <img class="comment-img" v-for="src in children.images" :src="src" :key="src">
                        </viewer>

                        <ul class="list-time">
                            <li>{{children.date}}</li>
                        </ul>

                        <ul class="list-operation">
                            <li><el-button type="text" @click="agree($event, children.isRedHeart, children.praiseNum)"><i v-bind:class="children.isRedHeart ? 'fa fa-heart red-heart' : 'fa fa-heart-o'"/> (<span class="agree-number">{{children.praiseNum}}</span>)</el-button></li>
                            <li><el-button type="text" @click="commentAndReply($event)"><d2-icon name="reply"/> {{ $t('views.pmdo.common-btns.reply') }}</el-button></li>
                            <li><el-button type="text" @click="editBroad(social.id, children.id)"><d2-icon name="edit"/> {{ $t('views.pmdo.common-btns.edit') }}</el-button></li>
                            <li><el-button type="text" @click="deleteBroad(social.id, children.id)"><d2-icon name="trash"/> {{ $t('views.pmdo.common-btns.delete') }}</el-button></li>
                        </ul>

                        <div class="reply">
                            <el-input
                            placeholder=""
                            v-model="reply"
                            class="input-demo-400">
                            </el-input>
                            <el-row :gutter="10" style="margin-top: 10px;">
                                <el-col :span="14">
                                    <div>
                                        <transition name="fade" mode="">
                                            <div class="emoji-box" v-if="showReplyEmoji" >
                                                <el-button
                                                class="btn-text icon-btn"
                                                type="text"
                                                @click="showReplyEmoji = false">
                                                    <d2-icon name="close"/>
                                                </el-button>
                                                <div class="clc"></div>
                                                <vue-emoji
                                                @select="selectReplyEmoji">
                                                </vue-emoji>
                                                <span class="pop-arrow arrow"></span>
                                            </div>
                                        </transition>
                                    </div>
                                    <el-button @click="showReplyEmoji = !showReplyEmoji" class="btn-text icon-btn" type="text"><d2-icon name="smile-o"/></el-button>
                                    <el-button class="btn-text icon-btn" type="text"><d2-icon name="file-image-o"/></el-button>
                                    <el-button class="btn-text icon-btn" type="text"><d2-icon name="at"/></el-button>
                                </el-col>
                                <el-col :span="10">
                                    <el-button @click="replySubmit(social.id, children.name)" class="right" type="primary" size="mini">{{ $t('views.pmdo.common-btns.publish') }}</el-button>
                                    <el-button @click="replyCancel" class="right" type="default" size="mini">{{ $t('views.pmdo.common-btns.cancel') }}</el-button>
                                </el-col>
                            </el-row>
                        </div>

                    </div>
                </div>

            </div>
        </li>
    </ul>

    <div class="publisher">
        <el-input
        type="textarea"
        :autosize="{ minRows: 3, maxRows: 3}"
        placeholder=""
        v-model="comment"
        class="input-demo-400">
        </el-input>
        <el-row :gutter="10" style="margin-top: 10px;">
            <el-col :span="14">
                <div>
                    <transition name="fade" mode="">
                        <div class="emoji-box" v-if="showEmoji" >
                            <el-button
                            class="btn-text icon-btn"
                            type="text"
                            @click="showEmoji = false">
                                <d2-icon name="close"/>
                            </el-button>
                            <div class="clc"></div>
                            <vue-emoji
                            @select="selectEmoji">
                            </vue-emoji>
                            <span class="pop-arrow arrow"></span>
                        </div>
                    </transition>
                </div>
                <el-button @click="showEmoji = !showEmoji" class="btn-text icon-btn" type="text"><d2-icon name="smile-o"/></el-button>
                <el-button class="btn-text icon-btn" type="text"><d2-icon name="file-image-o"/></el-button>
                <el-button class="btn-text icon-btn" type="text"><d2-icon name="at"/></el-button>
            </el-col>
            <el-col :span="10">
                <el-button @click="submit" class="right" type="primary" size="mini">{{ $t('views.pmdo.common-btns.publish') }}</el-button>
                <el-button @click="cancel" class="right" type="default" size="mini">{{ $t('views.pmdo.common-btns.cancel') }}</el-button>
            </el-col>
        </el-row>
    </div>

    <el-dialog
    :title="$t('views.pmdo.common-btns.edit')"
    :visible.sync="commentEditDialogVisible"
    width="40%"
    append-to-body>
        <comment-edit-dialog @closeDialog="commentEditDialogVisible = false" @editConfirm="editSubmit" :textareaV.sync="editContent"/>
    </el-dialog>
  </div>
</template>

<script>
import jQuery from 'jquery'
import vueEmoji from '../emoji/index.vue'
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import Vue from 'vue'
import i18n from '../../../../i18n'
Vue.use(Viewer)
const vueInstance = new Vue({ i18n })
export default {
  name: 'comment',
  props: ['socialsV'],
  components: {
    vueEmoji,
    'comment-edit-dialog': () => import('./comment_edit_dialog/index.vue')
  },
  data () {
    return {
      comment: '',
      showEmoji: false,
      reply: '',
      showReplyEmoji: false,
      editContent: '',
      sIndex: NaN,
      cIndex: NaN,
      /* socials: [
        {
          id: 1,
          familyN: '杜',
          lastN: '臻',
          label: '客户',
          explain: '中国移动',
          say: '说点什么好呢1',
          images: [
            '/image/demo/56-1440x900.jpg',
            '/image/demo/57-1440x900.jpg',
            '/image/demo/58-1440x900.jpg',
            '/image/demo/59-346x216.jpg',
            '/image/demo/60-346x216.jpg'
          ],
          date: '2017-06-07 15:58:39',
          isRedHeart: false,
          praiseNum: 6,
          commentNum: 5,
          childrens: [
            {
              id: 11,
              familyN: '肖',
              lastN: '明',
              isRedHeart: false,
              hasReplyTo: false,
              replyTo: '',
              say: '说点什么好呢2',
              images: [],
              date: '2017-06-06 15:58:39',
              praiseNum: 3
            },
            {
              id: 12,
              familyN: '杜',
              lastN: '臻',
              isRedHeart: true,
              hasReplyTo: true,
              replyTo: '肖明',
              say: '说点什么好呢3',
              images: [],
              date: '2017-06-03 15:58:39',
              praiseNum: 7
            }
          ]
        },
        {
          id: 2,
          familyN: '杜',
          lastN: '臻2',
          label: '员工',
          explain: '中国联通',
          say: '说点什么好呢4',
          images: [
            '/image/demo/56-1440x900.jpg',
            '/image/demo/57-1440x900.jpg',
            '/image/demo/58-1440x900.jpg',
            '/image/demo/59-346x216.jpg',
            '/image/demo/60-346x216.jpg'
          ],
          date: '2017-06-07 15:58:39',
          isRedHeart: true,
          praiseNum: 6,
          commentNum: 5,
          childrens: []
        }
      ], */
      socials: this.socialsV,
      socialsTotal: 2,
      commentEditDialogVisible: false
    }
  },
  methods: {
    formatDate () {
      let date = new Date()
      let y = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM < 10 ? ('0' + MM) : MM
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      let h = date.getHours()
      h = h < 10 ? ('0' + h) : h
      let m = date.getMinutes()
      m = m < 10 ? ('0' + m) : m
      let s = date.getSeconds()
      s = s < 10 ? ('0' + s) : s
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
    },
    selectEmoji (code) {
      // this.showEmoji = false
      this.comment += code
    },
    submit () {
      this.socialsTotal++
      let c = {
        id: this.socialsTotal,
        name: '管理员',
        label: '客户经理',
        explain: '中国电信',
        say: this.emoji(this.comment),
        images: [],
        date: this.$options.methods.formatDate(),
        isRedHeart: false,
        praiseNum: 0,
        commentNum: 0,
        childrens: []
      }
      this.socials.unshift(c)
      this.comment = ''
      this.showEmoji = false
    },
    cancel () {
      this.comment = ''
      this.showEmoji = false
    },
    selectReplyEmoji (code) {
      this.reply += code
    },
    replySubmit (sid, n) {
      for (var i = this.socials.length - 1; i >= 0; i--) {
        if (this.socials[i].id === sid) {
          var id = this.socials[i].childrens.length + 1
          console.log(id)
          let r = {
            id: id,
            name: '管理员',
            isRedHeart: false,
            hasReplyTo: false,
            replyTo: '',
            say: this.emoji(this.reply),
            date: this.$options.methods.formatDate(),
            praiseNum: 0
          }
          if (n) {
            r.hasReplyTo = true
            r.replyTo = n
          }
          this.socials[i].childrens.push(r)
        }
      }
      this.reply = ''
      this.showReplyEmoji = false
      jQuery('.reply').hide()
    },
    replyCancel () {
      this.reply = ''
      this.showReplyEmoji = false
      jQuery('.reply').hide()
    },
    agree (e, red, num) {
      if (!red) {
        jQuery(e.currentTarget).find('.fa').addClass('fa-heart').addClass('red-heart').removeClass('fa-heart-o')
        jQuery(e.currentTarget).find('.agree-number').text(++num)
      }
    },
    commentAndReply (e) {
      jQuery('.reply').hide()
      jQuery(e.currentTarget).parents('.list-operation').next('.reply').toggle()
      this.showReplyEmoji = false
      this.reply = ''
    },
    editBroad (sid, cid) {
      this.commentEditDialogVisible = true
      this.sIndex = NaN
      this.cIndex = NaN
      var i = this.socials.findIndex(d => d.id === sid)
      var j
      if (cid) {
        j = this.socials[i].childrens.findIndex(d => d.id === cid)
        this.editContent = this.socials[i].childrens[j].say
        this.sIndex = i
        this.cIndex = j
      } else if (cid === undefined && this.socials[i].id === sid) {
        this.editContent = this.socials[i].say
        this.sIndex = i
      }
      /* for (var i = this.socials.length - 1; i >= 0; i--) {
        if (cid && this.socials[i].id === sid) {
          for (var j = this.socials[i].childrens.length - 1; j >= 0; j--) {
            if (this.socials[i].childrens[j].id === cid) {
              this.editContent = this.socials[i].childrens[j].say
              this.sIndex = i
              this.cIndex = j
            }
          }
        } else if (cid === undefined && this.socials[i].id === sid) {
          this.editContent = this.socials[i].say
          this.sIndex = i
        }
      } */
    },
    editSubmit () {
      let i = this.sIndex
      let j = this.cIndex
      if (isNaN(j)) {
        this.socials[i].say = this.emoji(this.editContent)
        this.socials[i].date = this.$options.methods.formatDate()
      } else {
        this.socials[i].childrens[j].say = this.emoji(this.editContent)
        this.socials[i].childrens[j].date = this.$options.methods.formatDate()
      }
      this.commentEditDialogVisible = false
    },
    editCancel () {
      this.commentEditDialogVisible = false
      this.showEditEmoji = false
    },
    deleteBroad (sid, cid) {
      this.$confirm(`${vueInstance.$t('views.pmdo.delete-info')}`, `${vueInstance.$t('views.pmdo.delete-hint')}`, {
        confirmButtonText: `${vueInstance.$t('views.pmdo.common-btns.comfirm')}`,
        cancelButtonText: `${vueInstance.$t('views.pmdo.common-btns.cancel')}`,
        type: 'warning'
      }).then(() => {
        var i = this.socials.findIndex(d => d.id === sid)
        var j
        if (cid) {
          j = this.socials[i].childrens.findIndex(d => d.id === cid)
          if (this.socials[i].childrens[j].id === cid) {
            this.socials[i].childrens.splice(j, 1)
          }
        } else if (cid === undefined && this.socials[i].id === sid) {
          this.socials.splice(i, 1)
        }
        /* for (var i = this.socials.length - 1; i >= 0; i--) {
          if (cid && this.socials[i].id === sid) {
            for (var j = this.socials[i].childrens.length - 1; j >= 0; j--) {
              if (this.socials[i].childrens[j].id === cid) {
                this.socials[i].childrens.splice(j, 1)
              }
            }
          } else if (cid === undefined && this.socials[i].id === sid) {
            this.socials.splice(i, 1)
          }
        } */
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
    }
  },
  watch: {
    socialsV () {
      this.socials = this.socialsV
    }
  }
}
</script>

<style scoped>
.media-left {
    position: relative;
    display: table-cell;
    vertical-align: top;
    padding-right: 10px;
}

.icon-object {
    border-radius: 50%;
    text-align: center;
    margin: 0px 10px 10px 10px;
    border-width: 2px;
    border-style: solid;
    padding: 6px 8px;
    display: inline-block;
    font-size: 20px;
}

.border-primary {
    border-color: #409EFF;
}

.text-primary {
    color: #409EFF;
}

.border-info {
    border-color: #909399;
}

.text-info {
    color: #909399;
}

.media-list {
    padding-left: 0;
    list-style: none;
}

.media-body {
    position: relative;
    overflow: visible;
    display: table-cell;
    vertical-align: top;
    width: 10000px;
    zoom: 1;
}

.media-annotation {
    margin-left: 7px;
    color: #999999;
    font-size: 12px;
    line-height: 1.6666667;
    font-weight: 400;
}

.media-annotation.dotted:not(.pull-right):before {
    content: '\2022';
    margin-right: 10px;
}

.result {
 margin: 10px 0px 2px 0px;
}

.comment-img {
    width: 60px;
    height: 60px;
    margin: 10px 0;
}

.comment-img+.comment-img {
    margin-left: 10px;
}

.list-time {
    margin-left: 0;
    padding-left: 0;
    list-style: none;
    float: left;
    font-size: 12px;
    padding-top: 8px;
}

.list-operation {
    list-style: none;
    float: right;
}

.list-operation li {
    padding-left: 0;
    padding-right: 10px;
    display: inline-block;
}

.reply-media {
    margin-top: 20px;
}

.publisher {
    margin-top: 10px;
    border: 1px solid #cfd7e5 !important;
    margin-top: 10px;
    padding: 10px;
}

.reply {
    display: none;
}
</style>

<style lang="scss">
ul {
    margin: 0;
    padding: 0;
    list-style: none;
}

.emoji-box {
    position: absolute;
    top: -210px;
    box-shadow: 0 4px 20px 1px rgba(0, 0, 0, 0.2);
    background: white;
    width: 400px;
    .el-button {
    z-index: 10;
    margin: 8px 10px 0 0;
    padding: 0px;
    float: right;
    }
    .arrow {
    left: 10px;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s;
}

.fade-enter,
.fade-leave-active {
    opacity: 0;
}

.fade-move {
    transition: transform .4s;
}

.list-enter-active,
.list-leave-active {
    transition: all .5s;
}

.list-enter,
.list-leave-active {
    opacity: 0;
    transform: translateX(30px);
}

.list-leave-active {
    position: absolute !important;
}

.list-move {
    transition: all .5s;
}
</style>
