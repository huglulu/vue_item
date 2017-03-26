<template>
	<div id="resumeEditor">
		<nav>
			<ol>
				<li 
					v-for="(item,index) in resumeConfig" 
					:class="{active:item.field === selected}" 
					@click="selected = item.field"
				>
					<svg class="icon">
						<use :xlink:href="`#icon-${item.icon}`"></use>
					</svg>
				</li>
			</ol>
		</nav>
		<ol class="panels">
			<li 
				v-for="item in resumeConfig" 
				v-show="item.field===selected"
			>
				<div v-if="item.type === 'array'">
					<div class="subItem" v-for="(subItem, arrIdx) in resume[item.field]">
						<div class="resumeField" v-for="(value,key) in subItem"> 
							<label> {{key}} </label>
							<input type="text" :value="value" @input="changeResumeField(`${item.field}.${arrIdx}.${key}`,$event.target.value)">
						</div>
						<div class="removeItem" @click="removeItem(item.field, arrIdx)"></div>
						<hr>
					</div>
				</div>
				<div v-else class="resumeField" v-for="(value,key) in resume[item.field]">
					<label> {{key}} </label>
					<input type="text" :value="value" @input="changeResumeField(`${item.field}.${key}`, $event.target.value)">
				</div>
				<div class="addItem" v-show="item.field!=='profile'" @click="addItem(item.field)"></div>
			</li>
		</ol>
	</div>
</template>

<script>
	export default {
		name : 'ResumeEditor',
		computed:{
			selected:{
				get(){
					return this.$store.state.selected;
				},
				set(value){
					return this.$store.commit('switchTab',value);
				}
			},
			resume(){
				return this.$store.state.resume;
			},
			resumeConfig(){
				return this.$store.state.resumeConfig;
			}			
		},
		methods:{
			changeResumeField(path, value){
				this.$store.commit('updateResume', {path,value});
			},
			addItem(field){
				this.$store.commit('addItem',field);
			},
			removeItem(field,index){
				this.$store.commit('removeItem', {field,index});
			}
		}
	}
</script>

<style lang="scss">
#resumeEditor{
	background-color: #fff;
	box-shadow: 0 1px 3px 0 rgba(0,0,0,0.25);
	display:flex;
	flex-direction:row;
	overflow:auto;
	>nav{
		width:80px;
		background:black;
		color:white;
		>ol{
			>li{
				height:48px;
				display:flex;
				justify-content:center;
				align-items:center;
				margin-top:16px;
				margin-bottom:16px;
				&.active{
					background:#fff;
					color:#000;
				}
			}
		}
	}
	>.panels{
		flex-grow:1;
		overflow:auto;
		>li{
			padding:24px;
			.resumeField{
				>label{
					display:block;
				}
				input[type=text]{
					margin:16px 0;
					border-width:3px 2px 1px 2px;
					border-style:solid;
					border-color:#ddd;
					border-radius:3px;
					box-shodow:inset 0 3px 4px 4px rgba(0,0,0,0.25);
					width: 100%;
					height:40px;
					padding:0 8px;
				}
			}
			.subItem{
				position:relative;
				hr{
					border: none;
					border-top: 1px solid #ddd;
					margin:24px 0;
				}
				.removeItem{
					width:20px;
					height:20px;
					border:2px solid red;
					border-radius:50%;
					position:absolute;
					top:0;
					right:0;
					&:after{
						content:'';
						width:10px;
						height:2px;
						background:red;
						display:block;
						position:absolute;
						top:7px;
						left:3px;				
					}
				}					
			}
			.addItem{
				width:30px;
				height:30px;
				border-radius:50%;
				border:2px solid #333;
				position:relative;
				margin:0 auto;
				&:before{
					content:'';
					width:20px;
					height:4px;
					background:#333;
					display:block;
					position:absolute;
					top:11px;
					left:3px;
					border-radius:3px;
				}
				&:after{
					content:'';
					width:4px;
					height:20px;
					background:#333;
					display:block;
					position:absolute;
					top:3px;
					left:11px;
					border-radius:3px;						
				}
			}
		}
	}
	svg.icon{
		width:24px;
		height:24px;
	}
	ol{
		list-style:none;
	}
}
</style>