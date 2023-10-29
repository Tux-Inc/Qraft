// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    version: '0.0.1'
  },
  typescript: {
    shim: false
  },
  modules: ['@nuxt/ui', "@nuxt/image"],
  devtools: { enabled: true }
})