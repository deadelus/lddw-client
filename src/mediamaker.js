import gifshot from 'gifshot'

export default {
  /**
   * Install the GifShot class.
   *
   * Creates a GifshotPulgins to modify media
   * Then attaches this object to the global Vue (as Vue.auth).
   *
   * @param {Object} Vue The global Vue.
   * @param {Object} options Any options we want to have in our plugin.
   * @return {void}
   */
  install (Vue, options) {
    Vue.prototype.$gs = Vue.gs = gifshot
  }
}
