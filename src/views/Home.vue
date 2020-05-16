<template>
  <div class="home">
    <el-button type="primary"
               @click="goMarkdown">markdown -></el-button>
    <h3>{{ $t("global.errInfo") }}</h3>
    <button @click="langToggle">en/中</button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  methods: {
    langToggle () {
      if (this.$i18n.locale === 'zh_CN') {
        this.$i18n.locale = 'en_US'
      } else {
        this.$i18n.locale = 'zh_CN'
      }
    },
    goMarkdown () {
      this.$router.push({ name: 'MarkdownEdit' })
    }
  }
}
</script>
