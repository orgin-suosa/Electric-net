
import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import listMessage from './modules/listMessage'
import sendModuleMessage from './modules/sendModuleMessage'

Vue.use(Vuex)


export default new Vuex.Store({
    modules: {
        listMessage,
        sendModuleMessage
    }
})