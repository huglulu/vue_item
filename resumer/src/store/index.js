//# 组装模块并导出 store,数据改动在store中完成
import Vue from 'vue'
import Vuex from 'vuex'
import objectPath from "object-path"

Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		selected:'profile',
		user:{
			id: '',
			username: ''
		},
		resumeConfig: [
				{ field:'profile', icon:'id' , keys:['name','city','title','birthday'] },
				{ field:'workHistory', icon:'work', type:'array', keys:['company','details'] },
				{ field:'education', icon:'book' ,type:'array', keys:['school','major','details'] },
				{ field:'projects', icon:'heart' , type:'array', keys:['name','details'] },
				{ field:'awards', icon:'cup' ,type:'array', keys:['name','content'] },
				{ field:'contacts', icon:'phone' ,type:'array', keys:['contact','content'] },
		],
		resume: {
			// profile:{},
			// workHistory:[],
			// education:[],
			// projects:[],
			// awards:[],
			// contacts:[]
		}
	},	
	mutations:{
		initState(state, payload) {
			state.resumeConfig.map((item) => {
				if (item.type==='array') {
					Vue.set(state.resume, item.field, [])
				}else{
					Vue.set(state.resume, item.field, {})
					item.keys.map((key) => {
						Vue.set(state.resume[item.field], key, '')
					})
				}
			})
			Object.assign(state, payload)
		},
		switchTab(state, payload) {
			state.selected = payload
			localStorage.setItem('state',JSON.stringify(state))
		},
		updateResume(state, {path, value}){
			objectPath.set(state.resume, path, value)
			localStorage.setItem('state',JSON.stringify(state))
		},
		setUser(state, payload){
			Object.assign(state.user, payload)
			// console.log(state.user)
		},
		removeUser(state){
			state.user.id = null
		},
		addItem(state,payload){
			state.resumeConfig.map((item) =>{
				if (item.field === payload) {
					var fieldKeys = item.keys
					var keysObj = {}
					fieldKeys.map(subItem => {
						keysObj[subItem] = ''
					})
					state.resume[payload].push(keysObj)
				}
			})
		},
		removeItem(state, {field, index}){
			console.log(state.resume[field][index])
			state.resume[field].splice(index,1)
		}
	}
})
export default store