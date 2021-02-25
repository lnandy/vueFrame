<template>
	<div id="app">
		<Dashboard v-if="showDashboard"></Dashboard>
		<keep-alive>
			<router-view class="frame" />
		</keep-alive>
	</div>
</template>

<script>
	import Dashboard from "@/views/dashboard/Dashboard"
	export default {
		name: "App",
		components: {
			Dashboard: Dashboard
		},
		data() {
			return {
				showDashboard: false,
			}
		},
		watch: {
			'$route.path': function(newVal) {
				if (newVal !== '/' && newVal !== '/notFound') {
					this.showDashboard = true;
				} else {
					this.showDashboard = false;
				}
			}
		},
		mounted() {
			this.hideMask();
			this.getUserInfoStorage();
		},
		methods: {
			hideMask() {
				document.body.style.backgroundImage = "none";
			},
			getUserInfoStorage() {
				let me = this;
				let userInfo = JSON.parse(localStorage.getItem('userInfo'));
				if (userInfo != null && userInfo != '{}' && userInfo.remeberPwd) {
					let invalid = (new Date().getTime() - userInfo.timer) / 1000 / 60 / 60 / 24 > 1;
					if (invalid) {
						me.$store.dispatch('userInfo/SET', {
							name: userInfo.name
						});
						me.$router.push('/');
						return false;
					} else {
						//保存过密码，密码未失效，更新失效时间，更新store，store里面check permission后跳转
						userInfo.timer = new Date().getTime();
						localStorage.setItem("userInfo", JSON.stringify(userInfo));
						me.$store.dispatch('userInfo/SET', userInfo);
					}
				} else {
					me.$router.push('/');
				}
			},
		}
	}
</script>
<style>
	html,
	body {
		margin: 0;
		padding: 0;
		width: 100%;
		height: 100%;
	}

	body {
		background-size: 100% 150px;
		background-position-y: center;
		background-color: #5A5A5A;
		background-repeat: no-repeat;
		background-image: url("data:image/svg+xml;base64,PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTDUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMCAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCiAgPHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCgkgIDwhW0NEQVRBWw0KCQkgIHN2Z3sNCgkJCSAgYmFja2dyb3VuZDogIzVBNUE1QTsNCgkJICB9DQoJICBdXT4NCiAgPC9zdHlsZT4NCiAgPGNpcmNsZSBmaWxsPSIjZmZmIiBzdHJva2U9Im5vbmUiIGN4PSIxNCIgY3k9IjUwIiByPSI2Ij4NCgk8YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIGR1cj0iMXMiIHR5cGU9InRyYW5zbGF0ZSIgdmFsdWVzPSIwIDIwIDsgMCAtMjA7IDAgMjAiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBiZWdpbj0iMC4xIj48L2FuaW1hdGVUcmFuc2Zvcm0+DQogIDwvY2lyY2xlPg0KICA8Y2lyY2xlIGZpbGw9IiNmZmYiIHN0cm9rZT0ibm9uZSIgY3g9IjM4IiBjeT0iNTAiIHI9IjYiPg0KCTxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgZHVyPSIxcyIgdHlwZT0idHJhbnNsYXRlIiB2YWx1ZXM9IjAgMTUgOyAwIC0xNTsgMCAxNSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGJlZ2luPSIwLjIiPjwvYW5pbWF0ZVRyYW5zZm9ybT4NCiAgPC9jaXJjbGU+DQogIDxjaXJjbGUgZmlsbD0iI2ZmZiIgc3Ryb2tlPSJub25lIiBjeD0iNjIiIGN5PSI1MCIgcj0iNiI+DQoJPGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiBkdXI9IjFzIiB0eXBlPSJ0cmFuc2xhdGUiIHZhbHVlcz0iMCAxMCA7IDAgLTEwOyAwIDEwIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgYmVnaW49IjAuMyI+PC9hbmltYXRlVHJhbnNmb3JtPg0KICA8L2NpcmNsZT4NCiAgPGNpcmNsZSBmaWxsPSIjZmZmIiBzdHJva2U9Im5vbmUiIGN4PSI4NiIgY3k9IjUwIiByPSI2Ij4NCiAgCTxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgZHVyPSIxcyIgdHlwZT0idHJhbnNsYXRlIiB2YWx1ZXM9IjAgNSA7IDAgLTU7IDAgNSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGJlZ2luPSIwLjQiPjwvYW5pbWF0ZVRyYW5zZm9ybT4NCiAgPC9jaXJjbGU+DQo8L3N2Zz4K");
	}

	#app {
		font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		background-color: transparent;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.frame {
		flex: 1;
		background-color: #e4e4e4;
	}

	.el-scrollbar__wrap {
		overflow-x: hidden !important;
	}

	.el-scrollbar__thumb {
		background-color: #949494 !important;
	}
</style>
