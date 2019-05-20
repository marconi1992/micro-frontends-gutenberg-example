
import { Vue } from 'hypernova-vue'
import Vuex from 'vuex'
import axios from 'axios'
import moment from 'moment'

Vue.use(Vuex)

const baseURL = process.env.TICKETMASTER_API_BASE_URL
const apikey = process.env.TICKEMASTER_API_KEY

const defaultImage = {
  url: 'https://s1.ticketm.net/dam/c/ab4/6367448e-7474-4650-bd2d-02a8f7166ab4_106161_TABLET_LANDSCAPE_LARGE_16_9.jpg'
}

const getImage = (images) => {
  const sortedImages = images.filter(image => image.width >= 1024).sort((a, b) => b.width > a.width)

  const [image] = sortedImages

  return (image && image.url) || defaultImage.url
}

const getStartDateTime = (dates) => {
  return moment(dates.start.dateTime).format('LLLL')
}

export default () => new Vuex.Store({
  state: () => ({
    items: []
  }),

  actions: {
    async search ({ commit }, { term, size = 5 }) {
      const { data } = await axios.get(`${baseURL}/events.json`, {
        params: {
          apikey,
          keyword: term,
          size
        }
      })

      const events = data._embedded.events.map((event) => {
        return {
          id: event.id,
          name: event.name,
          imageUrl: getImage(event.images),
          startDateTime: getStartDateTime(event.dates),
          url: event.url
        }
      })

      return commit('pushItems', events)
    }
  },

  mutations: {
    pushItems (state, items) {
      state.items = state.items.concat(items)
    }
  }
})
