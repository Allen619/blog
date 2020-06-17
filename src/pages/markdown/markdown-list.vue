<template>
  <div>
    <div class="infinite-list-wrapper"
         style="overflow:auto">
      <ul>
        <li class="article-item"
            v-for="(item, index) in articleList"
            :key="item.articleId">
          <div class="article-title">{{ item.title }}</div>
          <p class="article-introduction">{{ item.introduction }}</p>
          <div></div>
          <div class="article-icon">

          </div>
          <el-divider v-if="(articleList.length-1) > index"></el-divider>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getArticleList } from '../../request/api'

export default {
  data () {
    return {
      loading: false,
      noMore: false,
      articleList: [],
      queryData: {
        pageSize: 10,
        startArticle: 0
      }
    }
  },
  created () {
    this.getData(this.queryData, true)
  },
  methods: {
    getData (data, isLoading) {
      getArticleList(data, isLoading).then(res => {
        const { data } = res
        if (data.code === 0) {
          this.articleList = data.result
          console.log(this.articleList)
        }
      })
    },
    loadData () {
      // this.articleList.push({ title: 123 })
      console.log(123)
    }
  },
  computed: {
    disabled () {
      return this.loading || this.noMore
    }
  }
}
</script>

<style lang="scss" scoped>
.article-item {
  cursor: pointer;
  text-align: left;
  .article-title {
    font-size: 1.2rem;
    font-weight: 600;
    line-height: 1.2;
    color: #2e3135;
    margin: 0.5rem 0 0.8rem;
  }
  &:hover .article-title {
    color: #007fff;
  }
  .article-introduction {
    font-size: 13px;
    color: #b2bac2;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>
