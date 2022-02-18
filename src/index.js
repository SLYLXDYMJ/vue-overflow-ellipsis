import VueOverflowEllipsis from './vue-overflow-ellipsis'

const plugin = {
  install (Vue) {
    Vue.component('vue-overflow-ellipsis', VueOverflowEllipsis)
  }
}

if (window.Vue) {
  plugin.install(window.Vue)
}

export default plugin