import Vue from 'vue'

Vue.prototype.$getCurrentScreenSize = () => {
  window.addEventListener('resize', () => {
    // eslint-disable-next-line no-undef,no-console
    console.log(`Current screen size: ${Foundation.MediaQuery.current}`)
  })
}
