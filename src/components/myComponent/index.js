import myComponent from './myComponent.vue'

const VueComponent = {
  install: function (Vue) {
    if (typeof window !== 'undefined' && window.Vue) {
      Vue = window.Vue
    }
    Vue.component('VueComponent', myComponent)
  }
}

export default VueComponent

