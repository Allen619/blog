<template>
  <div>
    <el-form ref="markDownFrom"
             :rules="markDownRules"
             class="demo-ruleForm"
             :model="markDownFrom"
             label-width="100px">
      <el-form-item prop="articleTitle"
                    :label="$t('markDownPage.articleTitle')">
        <el-input type="text"
                  v-model="markDownFrom.articleTitle"
                  :placeholder="$t('markDownPage.articleTitlePlaceholder')"></el-input>
      </el-form-item>
      <el-form-item prop="articleDescribe"
                    :label="$t('markDownPage.articleDescribe')">
        <el-input type="textarea"
                  :rows="3"
                  :placeholder="$t('markDownPage.articleDescribePlaceholder')"
                  v-model="markDownFrom.articleDescribe">
        </el-input>
      </el-form-item>
      <el-form-item prop="markdownText"
                    :label="$t('markDownPage.articleContent')"
                    ref="markdownText">
        <mavon-editor :toolbars="toolbars"
                      :placeholder="$t('markDownPage.markDownPlaceholder')"
                      v-model="markDownFrom.markdownText" />
      </el-form-item>
    </el-form>
    <el-button type="primary"
               @click="sendContent('markDownFrom')">{{$t('global.save')}}</el-button>
  </div>
</template>

<script>
/*
  mavonEditor（github地址）：https://github.com/hinesboy/mavonEditor
**/

import { sendMarkDown } from '../../request/api'

export default {
  data () {
    return {
      markDownRules: {
        markdownText: [
          { required: true, message: this.$t('markDownPage.articleContentRequired'), trigger: 'blur' }
        ],
        articleTitle: [
          { required: true, message: this.$t('markDownPage.articleTitlePlaceholder'), trigger: 'blur' },
          { min: 1, max: 30, message: this.$t('markDownPage.articleTitleLength'), trigger: 'blur' }
        ],
        articleDescribe: [
          { min: 0, max: 200, message: this.$t('markDownPage.articleDescribeLength'), trigger: 'blur' }
        ]
      },
      markDownFrom: {
        markdownText: '',
        articleTitle: '',
        articleDescribe: ''
      },
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        // save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      },
      goListFn: null
    }
  },
  created () {
  },
  methods: {
    clearMarkdownText () {
      return true
    },
    sendContent (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          sendMarkDown({
            content: this.markDownFrom.markdownText,
            title: this.markDownFrom.articleTitle,
            describe: this.markDownFrom.articleDescribe
          }).then(res => {
            if (res.data.code === 0) {
              this.$message({
                message: this.$t('markDownPage.addSuccess'),
                type: 'success'
              })
              this.goListFn = setTimeout(() => {
                this.$router.push({ name: 'Default' })
                this.$once('hook:beforeDestroy', () => {
                  clearInterval(this.goListFn)
                })
              }, 500)
            }
          })
        } else {
          return false
        }
      })
    }
  },
  computed: {
    markdownText () {
      return this.markDownFrom.markdownText
    }
  },
  watch: {
    markdownText (newVal) {
      if (newVal) {
        this.$refs.markdownText.clearValidate()
      } else {
        return false
      }
    }
  },
  components: {
  }
}
</script>

<style lang="" scoped>
</style>
