export default {
  methods: {
    enableScrollOnBody() {
      document.body.style.top = 'auto';
      document.body.style.overflow = 'auto';
    },
    disableScrollOnBody() {
      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.overflow = 'hidden';
    }
  }
};
