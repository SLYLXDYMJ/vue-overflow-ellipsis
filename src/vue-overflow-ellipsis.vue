<template>
  <div class="mm-ellipsis-container">
    <!-- 省略后的 -->
    <div class="after" :class="{ hidden: innerEllipsis === false }">
      <div class="shadow">
        <textarea :rows="rows" readonly></textarea>
        <div class="shadow-box" ref="box">
          <span v-html="showContent"></span>
          <span>
            {{ ellipsisText }}
            <span class="ellipsis-btn">{{ showMoreText }}</span>
          </span>
          <span ref="tail"></span>
        </div>
      </div>
      <div class="real-box">
        <span v-html="showContent"></span>
        <span v-if="(textLength < content.length) || btnShow">
          {{ ellipsisText }}
          <span
            class="ellipsis-btn"
            @click="showMore">{{ showMoreText }}</span>
        </span>
      </div>
    </div>

    <!-- 未省略的 -->
    <div class="before" :class="{ hidden: innerEllipsis === true }">
      <!-- 未折叠的 -->
      <span v-html="content"></span>
      <span
        class="ellipsis-btn"
        v-if="(showContent !== content) || btnShow"
        @click="hideMore">{{ hideMoreText }}</span>
    </div>
  </div>
</template>

<script>
  import resizeObserver from 'element-resize-detector'

  const observer = resizeObserver()

  export default {
    props: {
      content: {
        type: String,
        default: ''
      },
      rows: {
        type: Number,
        default: 3
      },
      ellipsisText: {
        type: String,
        default: '...'
      },
      showMoreText: {
        type: String,
        default: '展开'
      },
      hideMoreText: {
        type: String,
        default: '折叠'
      },
      btnShow: {
        type: Boolean,
        default: false
      },
      ellipsis: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        textLength: 0,
        beforeRefresh: null,
        boxWidth: 0,
        boxHeight: 0,

        innerEllipsis: this.ellipsis
      }
    },
    computed: {
      showContent () {
        // const length = this.beforeRefresh ? this.content.length : this.textLength
        return this.content.substr(0, this.textLength)
      },
      watchData () {
        return [
          this.content,
          this.showMoreText,
          this.hideMoreText,
          this.innerEllipsis,
          this.ellipsisText,
          this.rows,
          this.btnShow
        ]
      }
    },
    watch: {
      watchData: {
        immediate: true,
        handler () {
          this.refresh()
        }
      }
    },
    mounted () {
      observer.listenTo(this.$refs.box, (el) => {
        if (el.offsetWidth == this.boxWidth && el.offsetHeight == this.boxHeight) return
        this.boxWidth = el.offsetWidth
        this.boxHeight = el.offsetHeight
        this.refresh()
      })
    },
    beforeDestroy () {
      observer.uninstall(this.$refs.box)
    },
    methods: {
      refresh () {
        this.beforeRefresh && this.beforeRefresh()
        let stopLoop = false
        this.beforeRefresh = () => stopLoop = true
        this.textLength = this.content.length
        const checkLoop = (start, end) => {
          if (stopLoop || start + 1 >= end) {
            this.beforeRefresh = null
            return
          }
          const boxRect = this.$refs.box.getBoundingClientRect()
          const tailRect = this.$refs.tail.getBoundingClientRect()
          const overflow = tailRect.bottom > boxRect.bottom
          overflow ? (end = this.textLength) : (start = this.textLength)
          this.textLength = Math.floor((start + end) / 2)
          this.$nextTick(() => checkLoop(start, end))
        }
        this.$nextTick(() => checkLoop(0, this.textLength))
      },

      // 展开更多
      showMore (event) {
        this.innerEllipsis = false
        this.$emit('update:ellipsis', false)
        this.$emit('show-more')
      },

      // 折叠
      hideMore () {
        this.innerEllipsis = true
        this.$emit('update:ellipsis', true)
        this.$emit('hide-more')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .mm-ellipsis-container
    text-align left
    position relative
    line-height 1.5

    .shadow
      width 100%
      display flex
      pointer-events none
      opacity 0
      user-select none
      position absolute
      outline green solid 1px

      textarea
        border none
        flex auto
        padding 0
        resize none
        overflow hidden
        font-size inherit
        line-height inherit
        outline none

      .shadow-box
        position absolute
        left 0
        right 0
        top 0
        bottom 0

    .ellipsis-btn
      cursor pointer
      text-decoration underline
      color #4791ff

    .before.hidden,
    .after.hidden {
      position absolute
      left 0
      top 0
      opacity 0
      visibility hidden
      pointer-events none
    }
</style>