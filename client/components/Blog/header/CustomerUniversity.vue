<template>
  <common-header
    :title="$prismic.asText(document.title)"
    :subtitle="$prismic.asText(document.subtitle)"
    :coverImageUrl="document.featured_image.url"
    :coverImageAltText="document.featured_image.alt"
  >
    <template v-slot:beforeTitle>
      <div class="row cluster-navigation">
        <div class="cluster-navigation__name">{{clusterName}}</div>
        <div class="col-12 col-lg-5 mt-0 cluster-navigation__select-wrapper">
          <v-select
            class="cluster-navigation__select"
            :options="postOptions"
            @option:selected="handleChange"
            :clearable="false"
            :filterable="false"
            :searchable="false"
            :components="{OpenIndicator}"
            :value="currentPost ? {label: 'Explore the chapters', value: currentPost.cu_post.uid} : {label: 'Explore the chapters', value: ''}"
          />
        </div>
        <div class="col-12 col-lg-7 mt-0 cluster-navigation__buttons-wrapper">
          <div class="cluster-navigation__buttons">
            <router-link
              :to="prevArticleUrl"
              class="cluster-navigation__link"
              :class="prevArticleUrl === '#' ? 'disabled' : ''"
            >
              <span class="arrow prev"/>
              Previous
            </router-link>
            <span class="cluster-navigation__divider"/>
            <router-link
              :to="nextArticleUrl"
              class="cluster-navigation__link"
              :class="nextArticleUrl === '#' ? 'disabled' : ''"
            >
              Next
              <span class="arrow next"/>
            </router-link>
          </div>
        </div>
      </div>
    </template>
  </common-header>
</template>

<script>
import CommonHeader from '@/components/Blog/header/Common';
import VSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

export default {
  name: 'CustomerUniversity',
  components: {
    CommonHeader,
    VSelect
  },
  data () {
    return {
      currentPostUid: '',
      OpenIndicator: {
        render: createElement => {
          return createElement('svg', {
            domProps: {
              innerHTML: '<path d="M0.447443 0.454545L4.53835 7.40909L8.62926 0.454545H0.447443Z" fill="#A0A0A1"/>'
            },
            attrs: {
              width: 9,
              height: 8,
              viewBox: '0 0 9 8'
            }
          });
        }
      }
    };
  },
  props: {
    document: {
      type: Object,
      required: true
    },
    postList: {
      type: Array,
      default: () => []
    },
    clusterName: {
      type: String,
      default: () => ''
    },
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    postOptions: function () {
      return this.postList.map(post => {
        return {
          label: this.$prismic.asText(post.chapter_name),
          value: post.cu_post.uid
        };
      });
    },
    currentPost: function () {
      return this.postList.find(post => post.cu_post.id === this.id);
    },
    nextArticleUrl: function () {
      if (this.currentPost && this.currentPostIndex < this.postList.length - 1) {
        return `/customer-university/${this.postList[this.currentPostIndex + 1].cu_post.uid}/`;
      } else {
        return '#';
      }
    },
    prevArticleUrl: function () {
      if (this.currentPost && this.currentPostIndex > 0) {
        return `/customer-university/${this.postList[this.currentPostIndex - 1].cu_post.uid}/`;
      } else {
        return '#';
      }
    },
    currentPostIndex: function () {
      if (this.currentPost) {
        return this.postList.indexOf(this.currentPost);
      } else {
        return undefined;
      }
    }
  },
  methods: {
    handleChange(selectedPost) {
      if(this.currentPost && this.currentPost.cu_post.uid !== selectedPost.value) {
        this.$router.push({path: `/customer-university/${selectedPost.value}/`});
      }
    }
  }
};
</script>

<style scoped lang="scss">
  @import '../../../assets/styles/vars';
  @import '../../../assets/styles/commonIcons';

  .cluster-navigation {
    color: white;
    align-items: center;

    &__name {
      font-family: Inter, sans-serif;
      font-weight: 400;
      font-size: 16px;
      line-height: 166%;
      letter-spacing: -0.035em;
      color: $text-color--grey-team-list;
      margin-bottom: 24px;
    }

    &__select {

      /deep/ .vs {
        &__dropdown-toggle {
          padding: 13px 15px 13px 20px;
          border: none;
          background: rgba(51,51,51,0.44);
          border-radius: 4px;
        }

        &__dropdown-menu {
          padding: 0;
          top: calc(100% + 6px);
          border-radius: 4px;
          list-style: decimal !important;
          width: 420px;
          padding-left: 38px;
        }

        &__dropdown-option {
          font-family: Inter, sans-serif;
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 160%;
          letter-spacing: -0.02em;
          padding: 12px 16px 12px 10px;
          color: $text-color--black-cases;
          display: list-item;
          white-space: normal;
          position: relative;

          &:before {
            content: '';
            right: 0;
            top: 0;
            height: 100%;
            width: calc(100% + 40px);
            background: #F4F4F4;
            position: absolute;
            z-index: -1;
            opacity: 0;
          }

          &--selected {
            opacity: .4;
          }

          &--highlight {
            background-color: transparent;
          }

          &--highlight:before {
            opacity: 1;
          }
        }

        &__selected {
          color: $bgcolor--silver;
        }
      }

      &.vs--open {
        /deep/ .vs {
          &__dropdown-toggle {
            background: $bgcolor--silver;
          }

          &__selected {
            color: $text-color--black-cases
          }
        }
      }
    }

    &__buttons {
      text-align: right;
    }

    &__link {
      color: $bgcolor--silver;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      line-height: 166%;
      font-family: Inter, sans-serif;
      font-weight: 400;

      &:not(.disabled):hover {
        color: $text-color--red;

        .arrow {
          @include arrow-icon-red;
        }
      }

      .arrow {
        @include arrow-icon;
        display: inline-block;
        width: 12px;
        height: 11px;

        &.prev {
          margin-right: 10px;
        }

        &.next {
          margin-left: 10px;
          transform: rotate(180deg);
        }
      }

      &.disabled {
        opacity: 0.2;
        cursor: default;
        pointer-events: none;
      }
    }

    &__divider {
      display: inline-block;
      height: 27px;
      width: 1px;
      background-color: $bgcolor--grey-pale;
      vertical-align: middle;
      margin: 0 40px;
    }
  }

  .mt-0 {
    margin-top: 0 !important;
  }

  @media screen and (max-width: 1024px) {
    .cluster-navigation {
      padding: 0 24px;
    }
  }

  @media screen and (max-width: 991px) {
    .cluster-navigation {
      margin: 0;

      &__name {
        margin-bottom: 13.5px;
        margin-top: 0;
        padding: 0;
      }

      &__select {
        &-wrapper {
          margin-bottom: 25px;
          padding: 0;
        }
      }

      &__buttons {
        display: flex;
        justify-content: space-between;

        &-wrapper {
          padding: 0;
        }
      }

      &__divider {
        display: none;
      }

      &__select {

        /deep/ .vs {

          &__dropdown-menu {
            width: 100%;
          }
        }
      }
    }
  }
</style>
