<template>
  <section id="quickProjectStart" class="quickProjectStart">
    <div class="container">
      <h2 class="quickProjectStart__main-title">Quick Project Start</h2>
      <div class="quickProjectStart__content-list row">
        <div class="quickProjectStart__list-item col-xl-2 col-lg-2 col-md-2 quickProjectStart__list-item_contact">
          <div class="quickProjectStart__icons-group">
            <img width="52" height="73" :data-src="require(`@/assets/img/Home/svg/qickProjectIcons/contact.svg`)" alt="contact" class="quickProjectStart__main-icon img_lazy">
            <img :data-src="require(`@/assets/img/Home/svg/qickProjectIcons/arrow.svg`)" class="quickProjectStart__arrow-icon img_lazy">
          </div>
          <div class="quickProjectStart__list-item-text-wrapper">
            <h3 class="quickProjectStart__title">contact</h3>
            <p class="quickProjectStart__description">Submit your project request or project idea to us.</p>
          </div>
        </div>
        <div class="quickProjectStart__list-item col-xl-2 col-lg-2 col-md-2 quickProjectStart__list-item_analysis">
          <div class="quickProjectStart__icons-group">
            <img width="52" height="73" :data-src="require(`@/assets/img/Home/svg/qickProjectIcons/analysis.svg`)" alt="analysis" class="quickProjectStart__main-icon img_lazy">
            <img :data-src="require(`@/assets/img/Home/svg/qickProjectIcons/arrow.svg`)" class="quickProjectStart__arrow-icon img_lazy">
          </div>
          <div class="quickProjectStart__list-item-text-wrapper">
            <h3 class="quickProjectStart__title">analysis</h3>
            <p class="quickProjectStart__description">We will contact you to clarify your project requirements.</p>
          </div>
        </div>
        <div class="quickProjectStart__list-item col-xl-2 col-lg-2 col-md-2 quickProjectStart__list-item_proposal">
          <div class="quickProjectStart__icons-group">
            <img width="52" height="73" :data-src="require(`@/assets/img/Home/svg/qickProjectIcons/proposal.svg`)" alt="proposal" class="quickProjectStart__main-icon img_lazy">
            <img :data-src="require(`@/assets/img/Home/svg/qickProjectIcons/arrow.svg`)" class="quickProjectStart__arrow-icon img_lazy">
          </div>
          <div class="quickProjectStart__list-item-text-wrapper">
            <h3 class="quickProjectStart__title">proposal</h3>
            <p class="quickProjectStart__description">We will provide you with our free, non-binding bid or a tailored proposal.</p>
          </div>
        </div>
        <div class="quickProjectStart__list-item col-xl-2 col-lg-2 col-md-2 quickProjectStart__list-item_team">
          <div class="quickProjectStart__icons-group">
            <img width="52" height="73" :data-src="require(`@/assets/img/Home/svg/qickProjectIcons/team.svg`)" alt="team" class="quickProjectStart__main-icon img_lazy">
            <img :data-src="require(`@/assets/img/Home/svg/qickProjectIcons/arrow.svg`)" class="quickProjectStart__arrow-icon img_lazy">
          </div>
          <div class="quickProjectStart__list-item-text-wrapper">
            <h3 class="quickProjectStart__title">team</h3>
            <p class="quickProjectStart__description">We will assemble and prepare a team for your project.</p>
          </div>
        </div>
        <div class="quickProjectStart__list-item col-xl-2 col-lg-2 col-md-2 quickProjectStart__list-item_start">
          <div class="quickProjectStart__icons-group">
            <img width="52" height="73" :data-src="require(`@/assets/img/Home/svg/qickProjectIcons/start.svg`)" alt="start" class="quickProjectStart__main-icon img_lazy">
          </div>
          <div class="quickProjectStart__list-item-text-wrapper">
            <h3 class="quickProjectStart__title">start</h3>
            <p class="quickProjectStart__description">You will get to know the team and we’ll start the project work.</p>
          </div>
        </div>
      </div>
      <UIButtonModalTrigger
        class="quickProjectStart__button"
        :buttonInnerText="buttonInnerText"
        @onClick="$refs.orderProjectFromUsModal.show()"
        :isRed="true"
      />
    </div>
    <Modal ref="orderProjectFromUsModal">
      <orderProjectFromUsModal />
    </Modal>
  </section>
</template>

<script>
import UIButtonModalTrigger from '@/components/ui/UIButtonModalTrigger';
import Modal from '@/containers/Modal';

export default {
  name: 'QuickProjectStart',
  components: {
    UIButtonModalTrigger,
    Modal,
    orderProjectFromUsModal: () => import('@/components/Modals/order-project-from-us-modal')
  },
  data() {
    return {
      modalWindowName: 'order-project-from-us-modal',
      buttonInnerText: 'Submit your project'
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/vars';

.quickProjectStart {
  text-align: center;
  padding-bottom: 157px;

  @media screen and (max-width: 834px) {
    padding-bottom: 74px;
  }

  @media screen and (max-width: 578px) {
    padding-bottom: 95px;
  }

  &__main-title {
    @include h2_title;
    color: $text-color--white;
  }

  &__content-list {
    justify-content: space-between;
  }

  &__list-item,
  &__icons-group {
    display: flex;
  }

  &__list-item {
    flex-direction: column;
    align-items: center;

    &_contact {
      padding: 0 15px;
    }
  }

  &__main-icon,
  &__arrow-icon {
    display: block;
    height: 65px;
  }

  &__main-icon {
    width: 32px;
    margin-bottom: 8px;
    padding: 0 10px;
  }

  &__arrow-icon {
    width: 16vw;
    max-width: 165px;
    position: absolute;
    margin-left: 4.7vw;
    margin-bottom: 3px;
    opacity: 0.3;

    @media screen and (max-width: 1280px) {
      width: 10vw;
      margin-left: 5.7vw;
    }
  }

  &__title {
    font-family: 'Poppins-Bold', sans-serif;
    font-weight: 700;
    font-size: 32px;
    line-height: 32px;
    letter-spacing: -1px;
    text-transform: capitalize;
    color: $text-color--red;
  }

  &__description,
  &__button {
    font-family: 'Poppins-Regular', sans-serif;
  }

  &__description {
    margin-top: 8px;
    font-size: 14px;
    line-height: 22px;
    text-align: center;
    letter-spacing: -0.02em;
    color: $quick-project-description-color;
  }

  &__button {
    width: 100%;
    height: 56px;
    margin-top: 47px;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.02em;
  }
}

@media only screen and (max-width: 960px) {
  .quickProjectStart {
    &__title {
      font-size: 18px;
      line-height: 21px;
    }

    &__description {
      margin-top: 4px;
      font-size: 10px;
      line-height: 15px;
    }

    &__main-icon {
      width: 24px;
    }

    &__arrow-icon {
      width: 8vw;
      max-width: 84px;
      margin-left: 7.5vw;
    }

    &__button {
      height: 48px;
      font-size: 14px;
      margin-top: 37px;
    }
  }
}


@media only screen and (max-width: 767px) {
  .quickProjectStart {
    text-align: left;

    &__main-title {
      text-align: center;
    }

    &__list-item {
      flex-direction: row;
      align-items: flex-start;
      margin-top: 10px;
    }

    &__list-item-text-wrapper {
      margin-top: 16px;
      margin-left: 13px;
    }

    &__title {
      font-size: 27px;
      line-height: 32px;
    }

    &__description {
      font-size: 14px;
      line-height: 20px;
      text-align: left;
    }

    &__main-icon {
      width: 28px;
    }

    &__arrow-icon {
      display: none;
    }

    &__button {
      margin-top: 40px;
      color: $text-color--white;
      background-color: $bgcolor--red;
    }
  }
}
</style>
