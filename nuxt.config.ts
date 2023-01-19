// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default {
  // server side rendering mode
  ssr: true,

  // typescripts
  typescript: {
    strict: true,
    typeCheck: true,
  },

  css: ['the-new-css-reset/css/reset.css', '~/assets/defaults.scss'],

  // modules
  modules: ['@pinia/nuxt', '@vueuse/nuxt', '@nuxtjs/supabase'],
}
