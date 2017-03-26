<template>
	<div>
		<form @submit.prevent="signIn">
			<div class="row">
				<label>用户名</label>
				<input type="text" v-model="formDate.username" required>
			</div>
			<div class="row">
				<label>密码 </label>
				<input type="password" v-model="formDate.password" required>
			</div>	
			<div class="actions">
				<input type="submit" value="登入">
				<span>{{errorMessage}}</span>
			</div>		
		</form>
	</div>
</template>

<script>
	import AV from '../lib/leancloud'
	import getErrorMessage from '../lib/getErrorMessage'
	import getAVUser from '../lib/getAVUser'

	export default {
		name: 'SignInForm',
		data(){
			return {
				formDate: {
					username:'',
					password:''
				},
				errorMessage:''			
			}
		},
		methods:{
			signIn(){
				let {username, password} = this.formDate
				AV.User.logIn(username,password).then(() => {
					this.$emit('success', getAVUser())
				},(error) => {
					this.errorMessage = getErrorMessage(error)
				});			
			}			
		}
	}
</script>
<style lang="scss">
	.row{
		margin-bottom:10px;
		label{
			width:60px;
			display:inline-block;
		}
		input{
			width:180px;
			height:24px;
			font-family: sans-serif;
			line-height:1.2;		
		}
	}
	input[type=submit]{
		padding:4px 5px;
		cursor: pointer;
		margin-top:5px;
	}
	.row,.actions{
		margin-left:13px;
	}
</style>