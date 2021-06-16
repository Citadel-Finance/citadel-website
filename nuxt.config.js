import localeRu from './locales/ru.json';

require('dotenv').config();

export default {
  ssr: 'false',
  target: 'static',
  head: {
    title: 'Citadel',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap',
      },
      {
        rel: 'icon',
        href: '/favicon.ico',
        type: 'image/x-icon',
      },
    ],
  },
  css: [
    '@/assets/scss/main.scss',
  ],
  plugins: [
    { src: '@plugins/main.js' },
    { src: '@plugins/vee-validate.js' },
    { src: '@plugins/injectComponents.js' },
  ],
  components: true,
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/dotenv',
    '@nuxtjs/color-mode',
  ],
  styleResources: {
    scss: ['./assets/scss/resourses.scss'],
    css: [
      '~assets/scss/global.scss',
    ],
  },
  modules: [
    '@nuxtjs/style-resources',
    'bootstrap-vue/nuxt',
    'nuxt-i18n',
    'cookie-universal-nuxt',
    '@nuxtjs/axios',
  ],
  build: {
    transpile: [
      'vee-validate/dist/rules',
    ],
  },
  // bootstrapVue: {
  //   // bootstrapCSS: false, // Or `css: false`
  //   // bootstrapVueCSS: false, // Or `bvCSS: false`
  //   icons: true,
  // },
  i18n: {
    locales: ['ru'],
    defaultLocale: 'ru',
    strategy: 'no_prefix',
    vueI18n: {
      messages: {
        ru: localeRu,
      },
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: true,
    },
  },
  axios: {
    baseURL: process.env.API_URL,
  },
  env: {
    ADDRESS_FACTORY: process.env.ADDRESS_FACTORY,
    IS_MAINNET: process.env.IS_MAINNET,
    API_URL: process.env.API_URL,
  },
};
