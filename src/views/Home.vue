<template>
  <div class="home">
    <el-container>
      <el-header>
        <button @click="langToggle">en/中</button>
        <el-button type="text"
                   @click="goMarkdown"
                   icon="el-icon-document">{{$t('home.addArticle')}}</el-button>
      </el-header>
      <el-container class="container">
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-aside width="200px">Aside</el-aside>
      </el-container>
    </el-container>
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
<style lang="scss" scoped>
</style>
