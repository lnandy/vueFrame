<template>
	<div class="dashboard_container">
		<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :router="true"
			background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
			<template v-for="menu in menuList">
				<el-menu-item :key="menu.name" :index="menu.name" v-if="!menu.hidden">{{menu.description}}</el-menu-item>
			</template>
		</el-menu>
		<el-popover placement="top-start" trigger="hover" popper-class="dashboard_popper">
			<el-button size="mini" type="text" @click="showDialog = true">个人信息</el-button>
			<br />
			<el-button size="mini" type="text" @click="logout">退出</el-button>
			<img slot="reference" class="avatar" :src="require('../../assets/avatar.jpg')" />
		</el-popover>
		<el-dialog title="个人信息" :visible.sync="showDialog" v-if="showDialog" width="30%" :modal="true">
			<UserInfo :userInfo="userInfo" :show.sync="showDialog"></UserInfo>
		</el-dialog>
	</div>
</template>

<script>
	import http from "@/components/http"
	import UserInfo from "@/views/userManagement/UserInfo"
	export default {
		name: "dashboard",
		components: {
			UserInfo: UserInfo
		},
		data() {
			return {
				showDialog: false,
				menuList: [],
				activeIndex: '',
			};
		},
		computed:{
			userInfo(){
				return this.$store.getters['userInfo/get'];
			},
		},
		created() {
			this.activeIndex = this.$router.currentRoute.name;
			this.menuList = this.$store.getters['menus/getMenus'];
		},
		methods: {
			logout() {
				http.post('/loginlog/add.php',{name:this.userInfo.name,type:"log out"});
				localStorage.removeItem("userInfo");
				this.$store.dispatch('userInfo/SET', {});
				this.$router.push('/');
			}
		}
	}
</script>

<style lang="scss">
	.dashboard_container {
		position: relative;
		background-color: #fff;

		.el-menu--horizontal {
			padding-left: 10px;
			border-bottom: none !important;
		}

		.avatar {
			height: 40px;
			width: 40px;
			line-height: 40px;
			top: 10px;
			right: 20px;
			border-radius: 50%;
			position: absolute;
		}

		.menu {
			display: flex;
			flex-direction: row;
		}
	}

	.dashboard_popper {
		min-width: 60px !important;
	}
</style>
