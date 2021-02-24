<template>
	<div class="dashboard_container">
		<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
		 :router="true"  background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
			<el-menu-item v-for="(menu,i) in menuList" :index="menu.name">{{menu.description}}</el-menu-item>
		</el-menu>
	</div>
</template>

<script>
	export default {
		name: "dashboard",
		data() {
			return {
				menuList: [],
				activeIndex: '',
			};
		},
		created() {
			this.activeIndex = this.$router.currentRoute.name;
			this.menuList = this.$store.getters['menus/getMenus'];
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	}
</script>

<style lang="scss">
	.dashboard_container {
		background-color: #fff;

		.el-menu--horizontal {
			padding-left: 10px;
			border-bottom: none !important;
		}
	}
</style>
