<template>
  <section class="customer-university">
    <div class="container">
      <div class="customer-university__title">
        Customer<br>
        <span>University</span>
      </div>
      <div class="customer-university__wrapper">
        <div class="customer-university__featured-post">
          <router-link :to="`/customer-university/${master.data.featured_cu.uid}/`" class="featured-post" v-if="featured">
            <h6 class="featured-post__date">{{ formattedDate }}</h6>
            <h2 class="featured-post__title">{{ $prismic.asText(featured.title).replace(/^[0-9]*\. /, '') }}</h2>
            <p class="featured-post__text">{{ getFirstParagraph(featured) }}</p>
            <post-author :document="featured"/>
            <div class="featured-post__cover-wrapper">
              <prismic-image :field="featured.featured_image" class="featured-post__cover"/>
            </div>
          </router-link>
        </div>
        <div class="customer-university__list">
          <div class="customer-university__list-wrapper">
            <h6 class="customer-university__list-title">Series of articles:</h6>
            <div>
              <router-link
                :to="cluster.items.length ? `/customer-university/${cluster.items[0].cu_post.uid}/` : ''"
                class="customer-university__list-item single-cluster"
                v-for="(cluster, i) in clustersToShow"
                :key="i"
              >
                <div class="single-cluster__cover-wrapper">
                  <prismic-image :field="cluster.primary.cover_image" class="single-cluster__cover"/>
                </div>
                <div class="single-cluster__data">
                  <h3 class="single-cluster__title">{{ $prismic.asText(cluster.primary.cluster_name) }}</h3>
                  <div class="single-cluster__description">{{ $prismic.asText(cluster.primary.description) }}</div>
                </div>
              </router-link>
            </div>
            <div
              class="customer-university__list-show-more-wrapper"
            >
              <button
                class="customer-university__list-show-more"
                @click="showMore"
                v-if="clusters.length > 3 && !showAll"
              >
                Browse all series
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import PostAuthor from '@/components/Blog/PostAuthor';
export default {
  name: 'CustomerUniversitySection',
  components: {
    PostAuthor
  },
  data() {
    return {
      master: {},
      featured: null,
      formattedDate: '',
      showAll: false
    };
  },
  async fetch() {
    const master = await this.$prismic.api.getSingle('cu_master');
    if(master.data.featured_cu.uid) {
      this.featured = (await this.$prismic.api.getByUID('customer_university', master.data.featured_cu.uid)).data;
      this.formattedDate = Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(this.featured.date));
    }
    this.master = master;
  },
  methods: {
    showMore: function() {
      this.showAll = true;
    },
    getFirstParagraph (post) {
      const slices = post.body;
      let firstParagraph = '';
      let haveFirstParagraph = false;

      slices.map(slice => {
        if (!haveFirstParagraph && slice.slice_type == 'text') {
          slice.primary.text.forEach(function(block){
            if (block.type == 'paragraph' && !haveFirstParagraph) {
              firstParagraph += block.text;
              haveFirstParagraph = true;
            }
          });
        }
      });
      return this.sliceParagraph(firstParagraph);
    },
    sliceParagraph(paragraph) {
      const textLimit = 150;
      const limitedText = paragraph.substr(0, textLimit);

      if (paragraph.length > textLimit) {
        return limitedText.substr(0, limitedText.lastIndexOf(' ')) + '...';
      } else {
        return paragraph;
      }
    }
  },
  computed: {
    clusters: function() {
      if (this.master.data) {
        return this.master.data.body;
      } else {
        return [];
      }
    },
    clustersToShow: function() {
      return this.showAll ? this.clusters : this.clusters.slice(0, 3);
    }
  }
};
</script>

<style scoped lang="scss">
  @import '../../assets/styles/vars';

  @mixin label {
    color: $text-color--grey-team-list;
    font-family: Inter, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 166%;
    letter-spacing: -0.02em;
    margin-bottom: 16px;
  }

  .d-flex {
    display: flex;
  }

  .justify-content-between {
    justify-content: space-between;
  }

  .w-50 {
    width: 50%;
  }

  .pl-2 {
    padding-left: 60px;
  }

  .customer-university {
    background-color: $text-color--black-cases;
    padding: 90px 0;

    &__wrapper {
      display: flex;
      justify-content: space-between;
    }

    &__title {
      font-family: 'Poppins-Bold', sans-serif;
      font-style: normal;
      font-weight: bold;
      font-size: 120px;
      line-height: 96%;
      letter-spacing: -0.04em;
      -webkit-text-stroke: 1.13px $text-color--grey-team-list;
      color: $text-color--black-cases;
      margin-bottom: 78px;

      span {
        color: $bgcolor--silver;
        -webkit-text-stroke: 0;
      }
    }

    &__featured-post {
      width: 50%;
    }

    &__list-wrapper {
      padding-left: 60px;
    }

    &__list {
      width: 50%;
    }

    &__list-title {
      @include label;
    }

    &__list-show-more {
      font-family: Inter, sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 26px;
      letter-spacing: -0.035em;
      width: 100%;
      padding: 12px;
      color: $text-color--red;
      border: 1px solid $text-color--red;
      background-color: transparent;
      cursor: pointer;

      &-wrapper {
        margin-top: 36px;
      }
    }

    &__list-item {
      text-decoration: none;
    }
  }

  .featured-post {
    text-decoration: none;
    display: block;
    padding-right: 60px;

    &__date {
      @include label;
    }

    &__title {
      font-family: 'Poppins-Medium', sans-serif;
      font-style: normal;
      font-weight: 600;
      font-size: 33.2px;
      line-height: 130%;
      letter-spacing: -0.04em;
      font-feature-settings: 'zero' on, 'ordn' on, 'ss02' on, 'ss05' on;
      margin-bottom: 28px;
      color: $text-color--white-primary;
    }

    &__text {
      font-family: Inter, sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 166%;
      letter-spacing: -0.035em;
      margin-bottom: 28px;
      color: $text-color--grey-pale;
    }

    &__cover {
      max-width: 100%;
      height: auto;
      vertical-align: middle;

      &-wrapper {
        margin-top: 33px;
        text-align: center;
      }
    }
  }

  .single-cluster {
    margin-bottom: 31px;
    display: flex;

    &:last-child {
      margin-bottom: 0;
    }

    &__cover {
      max-width: 100%;
      height: auto;
      vertical-align: middle;

      &-wrapper {
        width: 52.68%;
        margin-right: 20px;
        flex-shrink: 0;
        text-align: center;
      }
    }

    &__title {
      font-family: 'Poppins-Medium', sans-serif;
      font-style: normal;
      font-weight: 600;
      font-size: 21.25px;
      line-height: 130%;
      letter-spacing: -0.02em;
      font-feature-settings: 'ss02' on;
      color: $text-color--white-primary;
      margin-bottom: 6px;
    }

    &__description {
      font-family: Inter, sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 166%;
      letter-spacing: -0.035em;
      color: $text-color--grey-pale;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  @media screen and (max-width: 1024px) {
    .customer-university {
      padding: 34px 0 69px;

      &__wrapper {
        display: block;
      }

      &__title {
        font-size: 50px;
        line-height: 101%;
        letter-spacing: -0.03em;
        font-feature-settings: 'ss02' on;
        margin-bottom: 38px;
      }

      &__list {
        width: 100%;

        &-wrapper {
          padding-left: 0;
        }

        &-show-more {
          font-weight: normal;
          font-size: 16px;
          line-height: 26px;
          letter-spacing: -0.035em;
          width: 100%;
          border-color: rgba(236, 28, 36, 0.4);
        }
      }

      &__featured-post,
      &__list-title {
        display: none;
      }
    }

    .featured-post {
      padding-right: 0;
    }

    .single-cluster {
      display: block;

      &__cover {
        &-wrapper {
          width: 100%;
          margin-bottom: 14px;
        }
      }

      &__title {
        color: $text-color--grey-cases;
        font-size: 22.78px;
        line-height: 130%;
        letter-spacing: -1px;
        font-feature-settings: 'zero' on, 'ordn' on, 'ss02' on, 'ss05' on;
      }

      &__description {
        font-weight: normal;
        font-size: 16px;
        line-height: 166%;
        letter-spacing: -0.035em;
        color: $text-color--grey-pale;
      }
    }
  }
</style>
