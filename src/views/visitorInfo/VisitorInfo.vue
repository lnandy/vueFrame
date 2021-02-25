<template>
	<div class="visitor_container" ref="con">
		<el-card class="box-card">
			<div class="container_title">访客统计</div>
			<div class="search_box">
				<el-input v-model="search" size="mini" placeholder="输入名字搜索" />
			</div>
			<el-table :data="tableData.filter(item => item.name.includes(search))" style="width: 100%" border ref="tabble"
			:height="tableHeight">
				<el-table-column label="访客ID" prop="date">
				</el-table-column>
				<el-table-column label="车场ID" prop="date">
				</el-table-column>
				<el-table-column label="微信ID" prop="name">
				</el-table-column>
				<el-table-column label="微信昵称" prop="date">
				</el-table-column>
				<el-table-column label="微信头像" prop="name">
				</el-table-column>
			</el-table>
			<el-pagination
			  background
			  layout="prev, pager, next, total, sizes"
			  :page-size="pageSize" @current-change="change" :page-sizes="[13, 100, 200, 500]" @size-change="handleSizeChange"
			  :total="respData.length">
			</el-pagination>
		</el-card>
	</div>
</template>

<script>
	import http from "@/components/http"
	export default {
		name: "visitorInfo",
		data() {
			return {
				tableData:[],
				respData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}, {
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '孙小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				},{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}, {
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '孙小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				},{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}, {
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '孙小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				}],
				search: '',
				tableHeight: 0,
				currentPage: 1,
				pageSize: 13,
			}
		},
		mounted() {
			let me = this
			this.$nextTick(() => {
				this.tableHeight = this.$refs.con.offsetHeight - 204;
			})
			this.render();
		},
		watch:{
			currentPage(){
				this.getDataByPage();
			},
			pageSize(){
				this.getDataByPage();
			}
		},
		methods: {
			handleSizeChange(size){
				this.pageSize = size;
			},
			change(pageNum){
				this.currentPage = pageNum;
			},
			getDataByPage(){
				let end = this.pageSize*this.currentPage;
				let start = end-this.pageSize;
				this.tableData = this.respData.slice(start,end);
			},
			render() {
				http.get('/visitrecord/query.php');
				this.getDataByPage();
			}
		}
	}
</script>

<style lang="scss">
	.visitor_container {
		padding: 20px;

		.search_box {
			height: 40px;
			text-align: end;
		}

		.el-input {
			width: 200px;
			margin-bottom: 10px;
		}
		
		.el-card{
			height: 100%;
		}
		.el-pagination{
			margin-top: 20px;
		}
	}
</style>
