import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createMetaManager, defaultConfig } from 'vue-meta'
import { routes } from './router'
import App from './App.vue'
import './styles/index.scss'

const metaManager = createMetaManager(false, {
  ...defaultConfig,
  meta: { tag: 'meta', nameless: true },
})

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  scrollBehavior: () => ({ top: 0, behavior: 'smooth' }),
})

createApp(App).use(router).use(metaManager).mount('#app')
