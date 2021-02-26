<template>
	<div class="userInfo_container">
		<div class="field">用户名</div>
		<el-input v-model="userInfoCopy.name" placeholder=""></el-input>
		<div class="field">密码</div>
		<el-input v-model="userInfoCopy.password" placeholder="" type="password"></el-input>
		<div class="footer" ref="updateFoo">
			<el-button type="warning" @click="update">修 改</el-button>
			<el-button @click="close">取 消</el-button>
		</div>
		<div class="footer" ref="addFoo" style="display: none;">
			<el-button type="success" @click="add">确 定</el-button>
			<el-button @click="close">取 消</el-button>
		</div>
	</div>
</template>

<script>
	import _ from 'loadsh'
	import http from "@/components/http"
	export default {
		name: "userInfo",
		props: ["userInfo", "show"],
		data() {
			return {
				userInfoCopy: {}
			}
		},
		mounted() {
			if (JSON.stringify(this.userInfo) == "{}") {
				this.$refs.updateFoo.style.display = "none";
				this.$refs.addFoo.style.display = "";
			}
			this.userInfoCopy = _.cloneDeep(this.userInfo);
			// if (this.userInfoCopy.password) {
			// 	this.userInfoCopy.password = window.atob(this.userInfoCopy.password);
			// }
		},
		methods: {
			close() {
				this.$emit('update:show', false)
			},
			update() {
				if(!this.validate()){
					return false;
				}
				this.userInfoCopy.password = window.btoa(this.userInfoCopy.password);
				http.post('/user/update.php', this.userInfoCopy).then(resp => {
					if (resp.data.content === true) {
						this.$message.success('修改成功！');
						this.close();
						this.$emit('refresh');
					}
				})
			},
			add() {
				if(!this.validate()){
					return false;
				}
				let temp = _.cloneDeep(this.userInfoCopy);
				temp.password = window.btoa(temp.password);
				http.post('/user/add.php', this.userInfoCopy).then(resp => {
					if (resp.data.content === true) {
						this.$message.success('新建用户成功！');
						this.close();
						this.$emit('refresh');
					}
				})
			},
			validate(){
				if(!this.userInfoCopy.name){
					this.$message.error('用户名不能为空!');
					return false;
				}else if(!this.userInfoCopy.password){
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
	.userInfo_container {
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

		.el-input {
			margin-bottom: 10px;
		}

		.el-input input {
			border: none;
			border-bottom: 1px solid #b5b5b5;
			background-color: transparent;
			border-radius: 0;
		}

		.footer {
			width: 100%;
			margin-top: 30px;
			display: flex;
			align-items: center;
			justify-content: flex-end;
		}
	}
</style>
