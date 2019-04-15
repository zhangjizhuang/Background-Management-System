import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)
var store=new Vuex.Store({
	state:{
		showLoading:false
	},
	mutations:{
		setLoading:function(state,data){
			state.showLoading=data;
		}
	}
});


export default store;
