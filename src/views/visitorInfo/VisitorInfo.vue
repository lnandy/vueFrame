<template>
	<div class="visitor_container">
		asd
	</div>
</template>

<script>
	import http from "@/components/http"
	export default{
		name: "visitorInfo",
		mounted(){
			this.render();
		},
		methods:{
			render(){
				//http.get(this.servicePath + 'component/message');
				http.get('/visitrecord/query.php');
				//http.get('/t1/docs.e1d8b79.js');
				//http.get('/api/state.js');
			}
		}
	}
</script>

<style>
</style>
