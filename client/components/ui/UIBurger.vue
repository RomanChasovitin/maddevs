<template>
  <div class="ui-burger" @click="$emit('click')">
    <svg v-if="opened" class="ui-burger--close" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.807613 19.1924L19.1924 0.807623M19.1914 19.1924L0.806641 0.807617" stroke="#fff" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <svg v-else class="ui-burger--open" width="30" height="10" viewBox="0 0 30 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0H30V1H0V0Z" fill="#F5F7F9"/>
      <path d="M0 9H30V10H0V9Z" fill="#F5F7F9"/>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'UIBurger',
  props: {
    opened: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
  .ui-burger {
    display: none;
    position: fixed;
    top: 0;
    right: 25px;
    padding: 11px 14px;

    &--close {
      width: 22px;
      height: 22px;
      margin-top: 3px;
      margin-right: 3px;
    }

    @media screen and (max-width: 991px) {
      display: block;
    }

    @media screen and (max-width: 767px) {
      right: 10px;
    }
  }
</style>
