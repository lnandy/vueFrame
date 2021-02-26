<template>
	<div class="login_page">
		<div class="bg_container">
			<div class="logo">Karting</div>
		</div>
		<div class="login_container" ref="loginCon" @mouseover="mask" @mouseout="removeMask">
			<div class="title">LOGIN</div>
			<div class="field">USERNAME</div>
			<el-input v-model="userInfo.name" placeholder=""></el-input>
			<div class="field">PASSWORD</div>
			<el-input v-model="userInfo.password" placeholder="" show-password></el-input>
			<div class="footer">
				<el-checkbox v-model="userInfo.remeberPwd">Keep me logged in</el-checkbox>
				<el-button type="primary" round size="medium" @click="login">LOGIN</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	import _ from 'loadsh'
	import http from "@/components/http"
	export default {
		name: "Login",
		data() {
			return {
				timer: 0,
				userInfo:{
					name: "",
					password: "",
					remeberPwd: false
				},
			}
		},
		mounted() {
			this.initUserInfo();
		},
		methods: {
			mask() {
				let me = this;
				clearInterval(me.timer);
				this.$refs.loginCon.style.background = 'rgba(0,0,0,0.6)';
				this.$refs.loginCon.style.opacity = 1;
			},
			removeMask() {
				let me = this;
				clearInterval(me.timer);
				me.timer = setInterval(function(){
					me.$refs.loginCon.style.background = '';
					me.$refs.loginCon.style.opacity = 0.2;
				},1500);
				
			},
			initUserInfo(){
				let userInfo = JSON.parse(localStorage.getItem('userInfo'));
				if(userInfo != null && userInfo != '{}'){
					this.userInfo.name = userInfo.name;
					this.userInfo.remeberPwd = userInfo.remeberPwd;
					//记住密码后且为过期，再次进入不需要登陆
					let now = new Date().getTime();
					if(userInfo.remeberPwd && (now-userInfo.timer)/24/60/60/1000 < 1){
						this.saveUserInfo();
					}
				}
			},
			saveUserInfo(){
				this.userInfo.timer = new Date().getTime();
				delete this.userInfo.password;
				localStorage.setItem("userInfo",JSON.stringify(this.userInfo));
				this.$store.dispatch('userInfo/SET',this.userInfo);
			},
			login(){
				let me = this;
				if(!me.validate()){
					return false;
				}
				let temp = _.cloneDeep(me.userInfo);
				temp.password = window.btoa(temp.password);
				http.post("/user/login.php",temp).then(resp => {
					if(!resp.data.content.length){
						this.$message.error('用户名或密码错误，请重试!');
					}else{
						Object.assign(me.userInfo,resp.data.content[0]);
						me.saveUserInfo();
					}
				})
				//登陆成功后
				//me.saveUserInfo();
			},
			validate(){
				if(!this.userInfo.name){
					this.$message.error('用户名不能为空!');
					return false;
				}else if(!this.userInfo.password){
					this.$message.error('密码不能为空!');
					return false;
				}else{
					return true;
				}
			}
		}
	}
</script>

<style lang="scss">
	.login_page {
		color: #fff;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		background-image: linear-gradient(#e4e4e4, #a7a7a7);

		.bg_container {
			width: 380px;
			height: 420px;
			position: relative;
			box-shadow: 0px 0px 10px 0px #000;
			background-image: url(../../assets/bg.png);
		}

		.login_container {
			opacity: 0.2;
			color: #fff;
			width: 380px;
			height: 420px;
			display: flex;
			position: absolute;
			padding: 50px 30px;
			flex-direction: column;
			box-sizing: border-box;
			align-items: flex-start;
			transition: all .3s;
		}

		.logo {
			z-index: 1;
			position: absolute;
			width: 100px;
			height: 40px;
			right: -10px;
			top: -10px;
			line-height: 40px;
			font-weight: bold;
			box-shadow: 0 0 3px 0px #000;
			background-color: #353434;
			user-select: none;
		}

		.title {
			font-weight: bold;
			line-height: 25px;
			font-size: 20px;
			margin-bottom: 40px;
			border-bottom: 2px solid #409EFF;
		}

		.field {
			margin: 20px 0 0;
			font-size: 15px;
		}
		.el-input{
			margin-bottom: 10px;
		}
		.el-input input {
			color: #fff;
			border: none;
			border-bottom: 1px solid #fff;
			background-color: transparent;
			border-radius: 0;
		}
		.footer{
			width: 100%;
			margin-top: 30px;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		.el-checkbox{
			color: #9a9a9a;
		}
		.el-button{
			flex: 1;
			margin-left: 10px;
		}
	}
</style>
