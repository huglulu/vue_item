import Vue from 'vue';
import AV from 'leancloud-storage';
import style from './style.css'

let APP_ID = 'Gmm9BQ3VTdI6btgzLo8RWaO3-gzGzoHsz';
let APP_KEY = 'SFAJ0JzAVMoKFVD223YcDHT5';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

var app = new Vue({
	el:'#app',
	data:{
		newTodo:'',
		todoList:[],
		actionType:'signUp',
		formData:{
			username:'',
			password:''			
		},
		currentUser: null
	},
	created: function(){
		this.currentUser = this.getCurrentUser();
		this.fetchTodos();
	},
	methods:{
		updateTodos:function(){
			let dataString = JSON.stringify(this.todoList);
			let avTodos = AV.Object.createWithoutData('AllTodos',this.todoList.id);
			avTodos.set('content',dataString);
			avTodos.save().then(() => {
				console.log('更新成功');
			},() => {
				console.log('更新失败');
			})
		},
		saveTodos:function(){
			let dataString = JSON.stringify(this.todoList);
			var AVTodos = AV.Object.extend('AllTodos');		
			var avTodos = new AVTodos();
			avTodos.set('content',dataString);

			var acl = new AV.ACL();
			acl.setReadAccess(AV.User.current(),true);
  			acl.setWriteAccess(AV.User.current(),true);
  			avTodos.setACL(acl);

			avTodos.save().then((todo) => {
				this.todoList.id = todo.id;
				console.log('保存成功');
			},(error) => {
				alert('保存失败');
			});
		},
		saveOrUpdateTodos: function(){
			if (this.todoList.id) {
				this.updateTodos();
			}else{
				this.saveTodos();
			}
		},
		addTodo:function(){
			this.todoList.push({
				title : this.newTodo,
				createdAt : this.getTimes() ,
				done : false
			})
			console.log(this.todoList);
			this.newTodo = '';
			this.saveOrUpdateTodos();
		},
		removeTodo:function(todo){
			let index = this.todoList.indexOf(todo);
			this.todoList.splice(index,1);
			this.saveOrUpdateTodos();
		},
		getTimes:function(){
			let date = new Date(),
			 	seperator1 = "-",
			 	seperator2 = ":",
			 	month = date.getMonth() + 1,
			 	nowDate = date.getDate(),
			 	hours = date.getHours(),
			 	minutes = date.getMinutes(),
			 	seconds = date.getSeconds();		 
			month > 1 && month <= 9 ? ( month = "0" +month ): month;
			nowDate >=0 && nowDate<=9 ? (nowDate = "0"+ nowDate): nowDate;
			hours >=0 && hours <= 9 ? ( hours = "0" +hours ): hours;
			minutes >=0 && minutes <= 9 ? ( minutes = "0" +minutes ): minutes;
			seconds >=0 && seconds <= 9 ? ( seconds = "0" +seconds ): seconds;		
			let currentDate = date.getFullYear() + seperator1+ month + seperator1+nowDate+ " " + hours+ seperator2+minutes+seperator2+seconds;
			return currentDate;			
		},
		signUp: function(){
			let user = new AV.User();
			user.setUsername(this.formData.username);
			user.setPassword(this.formData.password);
			user.signUp().then((loginedUser)=>{
				console.log(loginedUser);
				this.currentUser = this.getCurrentUser();
			}, (error) => {
				console.log('error');
			});
		},
		login:function(){
			AV.User.logIn(this.formData.username,this.formData.password).then( (loginedUser) => {
				this.currentUser = this.getCurrentUser();
				this.fetchTodos();
			}, (error) => {
				console.log('登陆失败');
			})
		},
		logout:function(){
			AV.User.logOut();
			this.currentUser = null;
			window.location.reload();
		},
		getCurrentUser:function(){
			let current = AV.User.current();
			if (current) {
				let { id , createdAt ,attributes:{username} } = current;
				return {id , username , createdAt};
			}else{
				return null;
			}
		},
		fetchTodos:function(){
			if (this.currentUser) {
				var query = new AV.Query('AllTodos');
				query.find().then((todos) => {
					console.log(todos);
					let avAllTodos = todos[0];
					let id = avAllTodos.id;
					this.todoList = JSON.parse(avAllTodos.attributes.content);
					this.todoList.id = avAllTodos.id;
				},function(error){
					console.error(error);
				})
			}
		}
	}
})
