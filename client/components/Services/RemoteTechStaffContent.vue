<template>
  <div 
    class="remoteTechStaffContent__tech-staff" 
    :class="[(`remoteTechStaffContent__tech-staff-${title.toLowerCase()}`), (activeByDefault === true ? 'remoteTechStaffContent__tech-staff-active' : '')]"
    @mouseover="handleMouseOver(title)"
    @mouseout="handleMouseOut(title)"
  >
    <div class="remoteTechStaffContent__content_wrapper">
      <div class="remoteTechStaffContent__text-wrap">
        <UIItemTitle :itemTitle="title" />
        <UIItemSubTitle :itemSubTitle="subTitle" class="remoteTechStaffContent__item-sub-title"/>
        <UIParagraph :paragraph="paragraph" class="remoteTechStaffContent__paragraph" :class="`remoteTechStaffContent__${title.toLowerCase()}-paragraph`"/>
        <div class="remoteTechStaffContent__item-icon" :class="`remoteTechStaffContent__${title.toLowerCase()}-icon`"></div>
      </div>
    </div>
    <UIButtonModalTrigger 
      :buttonInnerText="buttonInnerText"
      @onClick="$emit('onClick')" 
      class="remoteTechStaffContent__ui-button-modal-trigger"
    />
  </div>
</template>

<script>
import UIButtonModalTrigger from '@/components/ui/UIButtonModalTrigger';
import UIParagraph from '@/components/ui/Services/UIParagraph';
import UIItemTitle from '@/components/ui/Services/UIItemTitle';
import UIItemSubTitle from '@/components/ui/Services/UIItemSubTitle';

export default {
  name: 'RemoteTechStaffContent',
  components: {
    UIButtonModalTrigger,
    UIItemTitle,
    UIItemSubTitle,
    UIParagraph
  },
  props: {
    title: {
      type: String,
      default: 'Title'
    },
    subTitle: {
      type: String,
      default: 'Sub Title'
    },
    paragraph: {
      type: String,
      default: 'Paragraph'
    },
    buttonInnerText: {
      type: String,
      default: 'Button Inner Text'
    },
    activeByDefault: {
      type: Boolean,
      default: null
    }
  },
  data() {
    return {
      teamsItem: null
    };
  },
  mounted() {
    this.teamsItem = document.getElementsByClassName('remoteTechStaffContent__tech-staff-teams')[0];
  },
  methods: {
    handleMouseOver(currentElement) {
      if (currentElement !== 'Teams') {
        this.teamsItem.classList.remove('remoteTechStaffContent__tech-staff-active');
      }
    },
    handleMouseOut(currentElement) {
      if (currentElement !== 'Teams') {
        this.teamsItem.classList.add('remoteTechStaffContent__tech-staff-active');
      }
    }
  }
};

</script>

<style lang="scss" scoped>
  @import '../../assets/styles/vars';
  @import '../../assets/styles/_remoteTechStaffIcons';

  .remoteTechStaffContent {
    &__tech-staff {
      width: 503px;
      justify-content: space-between;
      position: relative;
      opacity: 0.6;
    }

    &__tech-staff-active, &__tech-staff:hover  {
      opacity: 1;

      .remoteTechStaffContent__item-icon {
        opacity: 1;
      }
    }

    &__content_wrapper {
      margin-bottom: 28px;
    }

    &__tech-staff,
    &__item-icon {
      transition: 0.4s;
    }

    &__tech-staff,
    &__text-wrap {
      display: flex;
      flex-direction: column;
    }

    &__text-wrap {
      position: relative;
    }

    &__item-sub-title {
      width: 350px;
      margin-bottom: 16px;
    }
    
    &__ui-button-modal-trigger {
      font-size: 16px;
      line-height: 24px;
      letter-spacing: -0.02em;
    }

    &__teams-paragraph {
      width: 400px;
    }

    &__individuals-paragraph {
      width: 424px;
    }

    &__item-icon {
      display: block;
      position: absolute;
      opacity: 0.4;
    }

    &__ui-button-modal-trigger {
      width: 100%;
      height: 56px;
      line-height: 24px;
      letter-spacing: -0.02em;
      color: $text-color--white;
      border-color: $button-border--white-opacity;

      &:hover {
        background-color: $bgcolor--white;
        color: $text-color--black !important;
      }

      &:active {
        background-color: $bgcolor--white !important;
        border-color: $button-border--white-opacity !important;
      }

      @media screen and (max-width: 375px) {
        height: 48px;
      }
    }

    &__teams-icon {
      width: 158px;
      height: 156px;
      top: -10px;
      right: -48px;
      @include teams-icon;
    }

    &__individuals-icon {
      width: 190px;
      height: 207px;
      top: -35px;
      right: -6px;
      @include individuals-icon;
    }

    @media only screen and (max-width: 1320px) {
      &__tech-staff {
        width: 475px;
      }
    }

    @media only screen and (max-width: 1280px) {
      &__tech-staff {
        width: 445px;
      }

      &__content_wrapper {
        margin-bottom: 22px;
      }

      &__teams-paragraph {
        width: 350px;
      }

      &__individuals-paragraph {
        width: 375px;
      }

      &__item-sub-title {
        width: 300px;
      }

      &__teams-icon {
        width: 118px;
        height: 116px;
        right: -22px;
      }

      &__individuals-icon {
        width: 140px;
        height: 147px;
        top: -25px;
        right: 15px;
      }

      &__ui-button-modal-trigger {
        font-size: 14px;
      }
    }

    @media only screen and (max-width: 1220px) {
      &__tech-staff {
        width: 400px;
      }
    }

    @media only screen and (max-width: 1080px) {
      &__tech-staff {
        width: 380px;
      }

      &__teams-icon {
        width: 100px;
      }

      &__individuals-icon {
        width: 115px;
        right: -10px;
      }
    }

    @media only screen and (max-width: 1023px) {
      &__tech-staff,
      &__item-icon {
        opacity: 1;
      }

      &__tech-staff {
        width: 100%;
      }

      &__item-sub-title {
        width: 100%;
        margin-bottom: 13px;
      }

      &__tech-staff-individuals {
        margin-top: 65px;
      }

      &__item-icon {
        top: -20px;
        right: 0;
        opacity: 1;
      }

      &__paragraph {
        width: 80%;
      }
    }

    @media only screen and (max-width: 834px) {
      &__teams-icon {
        width: 40px;
        height: 38px;
        top: -11px;
        left: 90px;
      }

      &__individuals-icon {
        width: 48px;
        height: 75px;
        top: -27px;
        left: 133px;
      }

      &__paragraph {
        width: 100%;
      }
    }
  }
</style>
