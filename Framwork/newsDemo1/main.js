import App from './App'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';//ant
import InstantSearch from 'vue-instantsearch/vue3/es';//al
import { createApp } from 'vue'
// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	app.use(Antd);
	app.use(InstantSearch);
	
	const vuetify = createVuetify({
	  components,
	  directives,
	})
	app.use(vuetify)
	return {
		app
	}
}
// #endif