<template>
	<div class="userInfo_container" >
		<div class="field">用户名</div>
		<el-input v-model="userInfoCopy.name" placeholder=""></el-input>
		<div class="field">密码</div>
		<el-input v-model="userInfoCopy.password" placeholder="" type="password"></el-input>
		<div class="footer">
			<el-button type="warning" @click="update">修 改</el-button>
			<el-button type="success" @click="close">取 消</el-button>
		</div>
	</div>
</template>

<script>
	import _ from 'loadsh'
	export default{
		name: "userInfo",
		props: ["userInfo","show"],
		data(){
			return {
				userInfoCopy:{}
			}
		},
		created() {
			this.userInfoCopy = _.cloneDeep(this.userInfo);
			this.userInfoCopy.password = window.atob(this.userInfoCopy.password);
		},
		methods:{
			close(){
				this.$emit('update:show', false)
			},
			update(){
				
			}
		}
	}
</script>

<style lang="scss">
	.userInfo_container{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		transition: all .3s;
		.field {
			margin: 20px 0 0;
			font-size: 15px;
		}
		.el-input{
			margin-bottom: 10px;
		}
		.el-input input {
			border: none;
			border-bottom: 1px solid #b5b5b5;
			background-color: transparent;
			border-radius: 0;
		}
		.footer{
			width: 100%;
			margin-top: 30px;
			display: flex;
			align-items: center;
			justify-content: flex-end;
		}
	}
</style>
