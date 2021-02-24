<template>
	<div class="notfound_container">
		<img src="../../assets/404.png">
		<p>抱歉！你访问的页面不存在或已删除</p>
		<div>
			<el-button type="success" round @click="goLogin">重新登陆</el-button>
			<el-button type="warning" round @click="goback">返回</el-button>
		</div>
	</div>
</template>

<script>
	export default{
		name: "notFound",
		methods:{
			goLogin(){
				this.$router.push('/');
			},
			goback(){
				this.$router.go(-1)
			}
		}
	}
</script>

<style lang="scss">
	.notfound_container {
		height: 50%;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #fff;
		padding: 200px 0 0;
		p {
			text-align: center;
			font-size: 16px ! important;
			font-weight: 600;
		}
	}
</style>
