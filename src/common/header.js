import Vue from "vue";
Vue.component('c-header', {
  props: ['title'],
  template: `<a-layout-header style="background: #fff; padding: 0; border-bottom: 1px solid #e8e8e8;font-size: 20px;font-weight: bold;" class="c-header">
  <a-icon type="arrow-left" @click="handleBack"/>   {{title}}
</a-layout-header>`,
  methods: {
    handleBack() {
      this.$router.back();
    }
  },
});