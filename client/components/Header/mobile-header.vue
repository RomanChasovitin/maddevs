<template>
  <div class="mobile-header" >
    <div class="safari-only container mobile-header__mobile-menu-scollbar" id="mobile-header-scrollbar">
      <div class="mobile-header__content-wrap">
        <div class="mobile-header__nav-wrap">
          <nav class="mobile-header__header-routes_links">
            <router-link @click.native="goToPage()" class="mobile-header__nav-link" exact to="/">About</router-link>
            <router-link @click.native="goToPage()" class="mobile-header__nav-link" to="/services/">Services</router-link>
            <router-link @click.native="goToPage()" class="mobile-header__nav-link" to="/projects/">Projects</router-link>
            <router-link @click.native="goToPage()" class="mobile-header__nav-link" to="/careers/">Careers</router-link>
            <router-link @click.native="goToPage()" class="mobile-header__nav-link mobile-header__nav-blog-link" to="/blog/">Blog</router-link>
          </nav>
          <div class="mobile-header__contacts mobile-header__large-phone-content">
            <div class="mobile-header__contact-item mobile-header__contact-item-email">
              <p class="mobile-header__contact-title">Text us:</p>
              <a :href="`mailto:${mailLink}`" class="mobile-header__contact-link mobile-header__contact-mail">{{mailLink}}</a>
            </div>
            <div class="mobile-header__contact-item">
              <div class="mobile-header__contact-title-wrapper">
                <!-- Flag uk -->
                <img
                  width="19"
                  height="14"
                  src="@/assets/img/Home/flags/uk.svg"
                  class="mobile-header__contact-title-flag"
                  alt="United Kingdom"
                >
                <p class="mobile-header__contact-title">Call us:</p>
              </div>
              <a href="tel:+442039848555" class="mobile-header__contact-link mobile-header__contact-phone-number">+44 20 3984 8555</a>
            </div>
            <ul class="mobile-header__messengers-list">
              <li>
                <a href="https://facebook.com/maddevsllc" target="_blank" class="mobile-header__messenger-item-wrapper">
                  <img
                    width="42"
                    height="42"
                    src="@/assets/img/Footer/svg/messenger.svg"
                    alt="Messenger"
                  >
                  <p class="mobile-header__messenger-name">Messenger</p>
                </a>
              </li>
              <li>
                <a href="https://wa.me/message/KPJAW6J7BF7EK1" target="_blank" class="mobile-header__messenger-item-wrapper">
                  <img
                    width="42"
                    height="42"
                    src="@/assets/img/Footer/svg/whatsapp.svg"
                    alt="WhatsApp"
                  >
                  <p class="mobile-header__messenger-name">WhatsApp</p>
                </a>
              </li>
              <li>
                <a href="https://t.me/MadDevs_io" target="_blank" class="mobile-header__messenger-item-wrapper">
                  <img
                    width="42"
                    height="42"
                    src="@/assets/img/Footer/svg/telegram.svg"
                    alt="Telegram"
                  >
                  <p class="mobile-header__messenger-name">Telegram</p>
                </a>
              </li>
              <li>
                <a href="https://msng.link/o/?https%3A%2F%2Fu.wechat.com%2FICWluRgJH8tu0IisMQ1eEFo=wc" target="_blank" class="mobile-header__messenger-item-wrapper">
                  <img
                    width="42"
                    height="42"
                    src="@/assets/img/Footer/svg/wechat.svg"
                    alt="WeChat"
                  >
                  <p class="mobile-header__messenger-name">WeChat</p>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <UIButtonModalTrigger
          :buttonInnerText="buttonInnerText"
          :isRed="true"
          @onClick="$emit('open-modal')"
          class="mobile-header__modal-trigger-btn"
        />
        <footerContacts class="mobile-header__small-phone-content" />
      </div>
    </div>
  </div>
</template>

<script>
import UIButtonModalTrigger from '@/components/ui/UIButtonModalTrigger';
import footerSocialNetworkList from '@/components/Footer/footer-social-network-list';
import footerContacts from '@/components/Footer/footer-contacts';
import headerLogo from '@/components/svg/headerLogo';

export default {
  name: 'mobile-header',
  components: {
    UIButtonModalTrigger,
    footerSocialNetworkList,
    footerContacts,
    headerLogo,
    showLogoText: true
  },
  data() {
    return {
      buttonInnerText: 'Contact me',
      mailLink: process.env.emailContact
    };
  },
  created() {
    if (process.client) {
      if (document) {
        this.$nextTick(() => this.refreshImg());
      }
    }
  },
  methods: {
    goToPage() {
      this.$emit('changed-page');
      if (document.body.classList.contains('scrollDisabled') && document.documentElement.classList.contains('scrollDisabled')) {
        document.body.classList.remove('scrollDisabled');
        document.documentElement.classList.remove('scrollDisabled');
      }
    },
    refreshImg() {
      const lazyImg = [].slice.call(document.querySelectorAll('img.img_lazy'));
      lazyImg.forEach(lazyImg => {
        lazyImg.src = lazyImg.dataset.src;
        lazyImg.classList.remove('img_lazy');
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  @import '../../assets/styles/vars';

  .mobile-header {
    width: 100%;
    height: calc(100vh - 45px);
    position: fixed;
    top: 0;
    left: 0;
    background-color: $bgcolor--black;
    margin-top: 45px;
    z-index: 2;

    &__modal-trigger-btn {
      width: 100%;
      height: 60px;
      margin-top: 5px;
      margin-bottom: 11px;
      font-family: 'Poppins-Regular', sans-serif;
      font-size: 16px;
    }

    &__top-line {
      max-height: 48px;
      display: flex;
      justify-content: space-between;
      padding: 0 34px;

      @media screen and (max-width: 970px) {
        padding: 0 28px;
      }

      @media screen and (max-width: 768px) {
        padding: 0 18px;
      }

      @media screen and (max-width: 440px) {
        padding: 0 24px;
      }
    }

    &__header-logo {
      width: 28px;
      height: 49px;
      margin-top: 11px;
      z-index: 2;
    }

    &__content-wrap {
      padding-top: 27px;
      background-color: $bgcolor--black;
    }

    &__nav-wrap,
    &__header-routes_links {
      display: flex;
    }

    &__nav-wrap {
      justify-content: space-between;
    }

    &__header-routes_links {
      width: 40%;
      flex-direction: column;
    }

    &__nav-link {
      padding: 14px 0;
      font-size: 32px;
      font-family: 'Poppins-Medium', sans-serif;
      letter-spacing: -1px;
      line-height: 38px;
      text-decoration: none;
      color: $text-color--white;
      border-bottom: 1px solid $header-grey-border-color;
    }

    &__nav-blog-link {
      padding-bottom: 54px;
      border-bottom: 0;
    }

    &__social-network_links {
      padding: 32px 0;
      border-top: 1px solid $footer--border-color--grey-light;
    }

    &__toogle-btn {
      width: 22px;
      height: 22px;
      display: block;
      margin-top: 12px;
      padding: 0;
      border: 0;
      box-shadow: none;
      background-color: transparent;
      cursor: pointer;
    }

    &__hamburger,
    &__close {
      width: 30px;
      height: 30px;
    }

    .nuxt-link-active {
      color: $text-color--red;

      &::after {
        color: $text-color--red;
      }
    }

    &__contacts {
      margin-top: 12px;
      margin-left: 40px;
    }

    &__messengers-list {
      display: grid;
      grid-template-columns: repeat(2, max-content);
      grid-column-gap: 60px;
      grid-row-gap: 6px;
      margin-top: 53px;
      margin-left: -7px;
    }

    &__contact-title-wrapper,
    &__messenger-item-wrapper {
      display: flex;
      align-items: center;
    }

    &__messenger-item-wrapper {
      text-decoration: none;
    }

    &__contact-title,
    &__messenger-name {
      font-family: 'Poppins-Regular', sans-serif;
    }

    &__contact-title,
    &__contact-link {
      color: $text-color--white;
    }

    &__contact-item-email {
      margin-bottom: 33px;
    }

    &__contact-link {
      display: inline-block;
      margin-top: 11px;
      font-size: 28px;
      line-height: 38px;
      letter-spacing: -1px;
      font-family: 'Poppins-Regular', sans-serif;
      border-bottom: 1px solid $header-red-border-color;
      text-decoration: none;
    }

    &__contact-title-flag {
      display: block;
      width: 18px;
      height: 14px;
      margin-right: 8px;
    }

    &__contact-title,
    &__messenger-name {
      letter-spacing: -0.02em;
    }

    &__contact-title {
      font-size: 16px;
      line-height: 24px;
    }

    &__messenger-item {
      display: block;
      width: 42px;
      height: 42px;
      margin-right: 3px;
    }

    &__messenger-name {
      font-size: 16px;
      line-height: 24px;
      color: $text-color--grey;
    }

    &__icons-list {
      margin-bottom: 73px;
    }

    &__small-phone-content {
      margin-bottom: 25px;

      /deep/ .footer-contacts__head-content,
      /deep/ .footer-contacts__messengers-list {
        display: none;
      }
    }

    &__mobile-menu-scollbar {
      height: calc(100vh - 62px);
      overflow: auto;
    }

    @media screen and (max-width: 991px) {
      display: block;
      box-sizing: border-box;
    }
  }

  @media screen and (max-width: 640px) {
    .mobile-header {
      &__header-routes_links {
        width: 100%;
      }

      &__large-phone-content {
        display: none;
      }

      &__icons-list {
        margin-bottom: 0;
      }

      &__small-phone-content {
        /deep/ .footer-contacts__head-content {
          display: block;
        }

        /deep/ .footer-contacts__messengers-list {
          display: grid;
        }
      }

      &__modal-trigger-btn {
        margin-bottom: 55px;
      }

      /deep/ .footer-contacts__head-content {
        margin-bottom: 62px;
      }

      /deep/ .footer-contacts__social-network-list-desktop {
        display: block;
      }

      /deep/ .footer-contacts__messenger-name,
      /deep/ .footer-contacts__contact-title {
        font-size: 15px;
      }

      /deep/ .footer-contacts__messenger-item,
      /deep/ .footerSocialNetworkList__social-network-link {
        width: 42px;
        height: 42px;
      }

      /deep/ .footer-contacts__contact-link {
        font-size: 28px;
      }
    }
  }

  @media screen and (max-width: 600px) {
    .mobile-header {
      /deep/ .footer-contacts__messengers-list {
        grid-column-gap: 60px;
      }
    }
  }

  @media only screen and (max-width: 360px) {
    .mobile-header {

      /deep/ .footer-contacts__messengers-list {
        grid-column-gap: 33px;
        width: 100%;
      }

      &__header-routes_links {
        padding-top: 20px;
      }

      &__nav-link {
        padding: 10px 0;
        font-size: 29px;
      }

      &__nav-blog-link {
        padding-bottom: 25px;
      }
    }
  }

  @media screen and (max-width: 767px) {
    .mobile-header {
      /deep/ .footer-contacts__social-network-list-desktop {
        display: block;
      }
    }
  }

  /* iphone 5 */
  @media only screen and (min-device-width: 320px) and (max-device-height: 568px) and (-webkit-device-pixel-ratio: 2) {
    _::-webkit-full-page-media, _:future, :root .safari-only {
      max-height: calc(100vh - 120px) !important;
    }
  }
  /* iphone 6, 6s, 7, 8 */
  @media only screen and (min-device-width: 375px) and (max-device-height: 667px) and (-webkit-device-pixel-ratio: 2) {
    _::-webkit-full-page-media, _:future, :root .safari-only {
      max-height: calc(100vh - 120px) !important;
    }
  }
  /* iphone 6+, 6s+, 7+, 8+ */
  @media only screen and (min-device-width: 414px) and (max-device-height: 736px) and (-webkit-device-pixel-ratio: 3) {
    _::-webkit-full-page-media, _:future, :root .safari-only {
      max-height: calc(100vh - 120px) !important;
    }
  }
  /* iphone X , XS, 11 Pro */
  @media only screen and (min-device-width: 375px) and (max-device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    _::-webkit-full-page-media, _:future, :root .safari-only {
      max-height: calc(100vh - 157px) !important;
    }
  }
  /* iphone XR, 11 */
  @media only screen and (min-device-width : 414px) and (max-device-height : 896px) and (-webkit-device-pixel-ratio: 2) {
    _::-webkit-full-page-media, _:future, :root .safari-only {
      max-height: calc(100vh - 157px) !important;
    }
  }
  /* iphone XS Max, 11 Pro Max */
  @media only screen and (min-device-width : 414px) and (max-device-height : 896px) and (-webkit-device-pixel-ratio: 3) {
    _::-webkit-full-page-media, _:future, :root .safari-only {
      max-height: calc(100vh - 157px) !important;
    }
  }
</style>

