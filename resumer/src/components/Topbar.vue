<template>
	<div id="topbar">
		<div class="wrapper">
			<span class="logo">Resumer</span>
			<div class="actions">
				<div v-if="logined" class="userActions" >
					<span class="welcome">你好，{{user.username}}</span>
					<a class="button" href="#" @click.prevent="signOut">登出</a>
				</div>

				<div v-else class="userActions" >
					<a class="button primary"  @click.prevent="signUpDialogVisible = true" href="#">注册</a>
					<a class="button" @click.prevent="signInDialogVisible = true" href="#">登录</a>
				</div>	
			</div>
		</div>
		<MyDialog title = "注册" :visible="signUpDialogVisible" @close="signUpDialogVisible = false">
			<SignUpForm @success="signIn($event)"/>
		</MyDialog>	
		<MyDialog title = "登录" :visible="signInDialogVisible" @close="signInDialogVisible = false">
			<SignInForm @success="signIn($event)"/>
		</MyDialog>								
	</div>
</template>

<script>
	import MyDialog from './MyDialog'
	import SignUpForm from './SignUpForm'
	import SignInForm from './SignInForm'	
	import AV from '../lib/leancloud'

	export default {
		name : 'Topbar',
		data(){
			return{
				signUpDialogVisible:false,
				signInDialogVisible:false
			}
		},
		computed:{
			user(){
				return this.$store.state.user
			},
			logined(){
				// console.log(this.user)
				return this.user.id
			}
		},
		components:{ MyDialog, SignUpForm, SignInForm } ,
		methods:{
			signIn(user){
				this.signUpDialogVisible = false
				this.signInDialogVisible = false
				this.$store.commit('setUser',user)
			},
			signOut(){
				AV.User.logOut()
				this.$store.commit('removeUser')
			}
		}
	}
</script>

<style scoped lang='scss'>
	#topbar{
		background-color: #fff;
		box-shadow: 0 1px 3px 0 rgba(0,0,0,0.25);
		.wrapper{
			min-width: 1024px;
			max-width: 1440px;
			margin: 0 auto;
			height: 64px;
			line-height: 64px;
		}
		.wrapper{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 16px;
		}
		.logo{
			font-size: 24px;
			color: #000;
		}
		.button{  /* 由于加了 scoped， 所以这个 button 选择器只在本组件内有效，不会影响其他组件 */
			width: 72px;
			height: 32px;
			border:none;
			cursor: pointer;
			font-size: 18px;
			background-color: #ddd;
			color: #222;
			text-decoration: none;
			display: inline-flex;
			justify-content:center;
			align-items: center;
			vertical-align: middle;
			&:hover{
				box-shadow:1px 1px 1px hsla(0,0,0,0.5);
			}
			&.primary{
				background-color: #02af5f;
				color: #fff;
			}
		}
		.actions{
			display:flex;
			.userActions{
				.welcome{
					margin-right: .5em;
				}			
			}
		}
	}
</style>