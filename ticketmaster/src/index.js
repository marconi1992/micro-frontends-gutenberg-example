import hypernova from 'hypernova/server'
import { renderVuex } from 'hypernova-vue'
import express from 'express'
import path from 'path'

import EventListing from './components/EventListing.vue'

import createEventListingStore from './store/event-listing'

hypernova({
  devMode: process.env.NODE_ENV !== 'production',
  getComponent (name) {
    if (name === 'EventListing') {
      return renderVuex(name, EventListing, createEventListingStore)
    }
  },

  port: process.env.PORT || 3000,

  createApplication () {
    const app = express()

    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
      next()
    })

    app.use('/public', express.static(path.join(process.cwd(), 'dist')))

    return app
  }
})
