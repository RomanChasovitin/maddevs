<template>
  <div class="footer-navbar">
    <p class="footer-navbar__company-name">© Mad Devs - {{ currentYear }}</p>
    <div class="footer-navbar__nav-list">
      <a href="/gdpr/" target="_blank" class="footer-navbar__nav-item">GDPR Compliance Commitment</a>
      <a href="/nda/" target="_blank" class="footer-navbar__nav-item">Non-Disclosure Agreement (NDA)</a>
      <a href="/privacy/" target="_blank" class="footer-navbar__nav-item">Privacy Policy</a>
      <a href="/faq/" target="_blank" class="footer-navbar__nav-item">FAQ</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'footer-navbar',
  data() {
    return {
      currentYear: new Date().getFullYear()
    };
  }
};
</script>

<style lang="scss" scoped>
  @import '../../assets/styles/vars';

  .footer-navbar {
		width: max-content;
    margin-top: 64px;

    &__nav-list {
			display: flex;
		}

		&__nav-item,
		&__company-name {
			font-size: 16px;
      line-height: 24px;
			color: $text-color--grey;
			letter-spacing:  -0.02em;
		}

		&__company-name {
			margin-bottom: 6px;
		}

		&__nav-item {
			margin-right: 26px;
			text-decoration: underline;
			text-decoration-color: $footer--text-decoration-color;

			&:last-child {
				margin-right: 0;
			}
		}
  }

  @media only screen and (max-width: 1320px) {
		.footer-navbar {
			width: initial;
			margin-top: 40px;

			&__nav-list {
				flex-wrap: wrap;
			}

			&__nav-item,
			&__company-name {
				margin-bottom: 3px;
			}

			&__nav-item {
				&:nth-child(1) {
					width: 100%;
				}

				&:nth-child(2),
				&:nth-child(3) {
					margin-right: 15px;
				}

				&:nth-child(4) {
					margin-left: 0;
					margin-bottom: 0;
				}
			}
		}
	}

  @media only screen and (max-width: 991px) {
		.footer-navbar {
			&__nav-list {
				flex-direction: column;
			}
		}
	}
</style>
