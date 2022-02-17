import { createSSRApp } from 'vue'
import { createHead } from '@vueuse/head'

import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'
import { createRouter } from './router'

// SSR requires a fresh app instance per request, therefore we export a function
// that creates a fresh app instance. If using Vuex, we'd also be creating a
// fresh store here.
export function createApp() {
  const app = createSSRApp(App)
  const router = createRouter()
  const head = createHead()

  const ctx = {
    app,
    initialState: {},
    router,
    isClient: false,
  }

  Object.values(import.meta.globEager('./modules/*.ts')).forEach(i =>
    i.install?.(ctx),
  )

  app.use(head)
  app.use(router)

  return { app, router }
}
