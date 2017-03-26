<template>
	<div class="dialogWrapper" v-show="visible">
		<div class="dialog">
			<header>
				{{title}}
				<span class="close" @click="close">X</span>
			</header>
			<main>
				<slot></slot>
			</main>
		</div>
	</div>
</template>

<script>
	export default {
		name: "MyDialog",
		props: ['title','visible'],
		methods:{
			close(){
				this.$emit('close');
			}
		}
	}
</script>

<style scoped lang="scss">
	.dialogWrapper{
		position:fixed;
		top:0;
		left:0;
		bottom:0;
		right:0;
		margin:0;
		display:flex;
		justify-content:center;
		align-items:center;
		background:hsla(0,0%,0%,0.25);	
		.dialog{
			width:320px;
		    background: #fff;
		    min-height: 6em;
		    min-width: 10em;
			header{
				padding:16px;
				display:flex;
				justify-content:space-between;
			}
			.close{cursor:pointer;}
			main{padding:16px;margin-top:10px;}
		}
	}	
</style>