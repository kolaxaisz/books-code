import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()
// Or:
// require('dotenv').config()
// For more info about dotenv, visit https://github.com/motdotla/dotenv

// Host base.
const protocol = 'http'
const host = process.env.NODE_ENV === 'production' ? 'localhost' : 'localhost'

console.log('nuxt.config.js: process.env.NUXT_ENV_GEN =', process.env.NUXT_ENV_GEN)
console.log('nuxt.config.js: process.env.DB_HOST =', process.env.DB_HOST)
console.log('nuxt.config.js: process.env.BASE_URL =', process.env.BASE_URL)

// Cross domain ports.
const ports = {
  local: '3000',
  remote: '4000',
}

const remoteUrl = protocol + '://' + host + ':' + ports.remote

export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',

  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'static',
  // target: 'server',

  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: 'LAU TIAM KOK | PORTFOLIO',
    titleTemplate: ' %s | LAU TIAM KOK',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'LAU TIAM KOK, aka LAU THIAM KOK is a cross-disciplinary Web Developer/Designer, Data Architect and Analyst.' }
    ],
    script: [
      // { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' },
      // { src: 'https://cdn.jsdelivr.net/npm/foundation-sites@6.5.1/dist/js/foundation.min.js' },
      // { src: 'https://cdnjs.cloudflare.com/ajax/libs/motion-ui/2.0.3/motion-ui.js' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    // 'foundation-sites/dist/css/foundation.min.css',
    // 'foundation-icon-fonts/foundation-icons.css',
    // 'jquery-ui-bundle/jquery-ui.min.css',

    // LESS files in the project.
    'assets/less/main.less',
  ],

  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '~/plugins/axios.js',
    '~/plugins/utils.js',
    '~/plugins/mixins.js',
    '~/plugins/client-only/foundation.client.js', //  client side only
    '~/plugins/client-only/aos.client.js', // client side only
  ],

  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,

  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },

  // The env property defines environment variables that should be
  // available on the client side.
  // https://nuxtjs.org/api/configuration-env#the-env-property
  env: {
    // This lets you create a baseUrl property that will be equal to
    // the BASE_URL environment variable if defined, otherwise, equal
    // to 'http://localhost:3000'
    baseUrl: process.env.BASE_URL || protocol + '://' + host + ':' + ports.local,

    // Set remote URL for axios.
    remoteUrl: remoteUrl,

    /**
     * Pull and save the remote resources for static pages.
     */
    // Step 1. Run `npm run pull`` to pull the remote resources.

    // Step 2. Run npm run generate to re-generate to compile the
    // resources.

    // Or:

    // Step 1. Set to true to pull the remote resources for serving
    // static pages.

    // Step 2. Set to false to re-generate the static pages so that
    // webpack will compile the resources.
    streamRemoteResource: process.env.NUXT_ENV_GEN === 'stream' ? true : false
  },

  // https://nuxtjs.org/api/configuration-router#linkactiveclass
  router: {
    linkActiveClass: 'current'
  },

  // Generate 404 page.
  // https://nuxtjs.org/api/configuration-generate#fallback
  generate: {
    fallback: true,

    // (Optional) Use this only if the Nuxt crawler fails to detect the dynamic routes.
    routes: async function () {
      const GET_PROJECTS = `
        query {
          allProjects {
            name
          }
        }
      `
      // const { data } = await axios.post(remoteUrl + '/admin/api', {
      //   query: GET_PROJECTS
      // })
      // return data.data.allProjects.map((project) => {
      //   return '/projects/' + project.name
      // })

      const { data } = await axios.post(remoteUrl + '/admin/api', {
        query: GET_PROJECTS
      })

      const routesProjects = data.data.allProjects.map(project => {
        return {
          route: '/projects/' + project.name,
          payload: project
        }
      })

      // Count total items and divide the total with the number of items per-page
      let totalMaxPages = Math.ceil(routesProjects.length / 6)
      let pagesProjects = []

      // Loop with ES6.
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill
      Array(totalMaxPages).fill().map((item, index) => {
        pagesProjects.push({
          route: '/projects/pages/' + (index + 1),
          payload: null
        })
      })

      const routes = [
        ...routesProjects,
        ...pagesProjects
      ]
      return routes
    }
  },
}
