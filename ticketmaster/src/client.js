import { renderVue, Vue } from 'hypernova-vue'
import EventListing from './components/EventListing.vue'

renderVue('EventListing', Vue.extend(EventListing))
