export default {
  install(Vue, options) {
    console.log(options);
    Vue.prototype.httpStateCheck = res => {
      if (res.state === 200) {
        return true;
      } else {
        return false;
      }
    }
  }
}