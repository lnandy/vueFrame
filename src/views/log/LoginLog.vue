<template>
	<div class="login_log" ref="con">
		<el-card class="box-card">
			<div class="container_title">登录日志</div>
			<div class="search_box">
				<el-input v-model="search" size="mini" placeholder="输入名字搜索" />
			</div>
			<el-table :data="tableData.filter(item => item.name.includes(search))" style="width: 100%" border ref="tabble"
				:height="tableHeight" :default-sort="{prop: 'timestamp', order: 'descending'}" row-class-name="row">
				<el-table-column label="时间" prop="timestamp" sortable>
				</el-table-column>
				<el-table-column label="用户" prop="name" sortable>
				</el-table-column>
				<el-table-column label="动作" prop="type">
				</el-table-column>
			</el-table>
			<el-pagination background layout="prev, pager, next, total, sizes" :page-size="pageSize" @current-change="change"
				:page-sizes="[100, 200, 500, 1000]" @size-change="handleSizeChange" :total="respData.length">
			</el-pagination>
		</el-card>
	</div>
</template>

<script>
	import http from "@/components/http"
	export default {
		name: "loginlog",
		data() {
			return {
				tableData: [],
				respData: [],
				search: '',
				tableHeight: 0,
				currentPage: 1,
				pageSize: 100,
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.tableHeight = this.$refs.con.offsetHeight - 204;
			})
			this.render();
			http.post('/loginlog/query.php').then(resp => {
				if (resp.data.content.length > 0) {
					this.respData = resp.data.content;
				}
			});
		},
		watch: {
			currentPage() {
				this.getDataByPage();
			},
			pageSize() {
				this.getDataByPage();
			}
		},
		methods: {
			handleSizeChange(size) {
				this.pageSize = size;
			},
			change(pageNum) {
				this.currentPage = pageNum;
			},
			getDataByPage() {
				let end = this.pageSize * this.currentPage;
				let start = end - this.pageSize;
				this.tableData = this.respData.slice(start, end);
			},
			render() {
				http.post('/loginlog/query.php').then(resp => {
					if (resp.data.content.length > 0) {
						this.respData = resp.data.content;
						this.getDataByPage();
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.login_log{
		padding: 20px;
		text-align: left;
		.search_box {
			height: 40px;
			text-align: end;
		}
		
		.el-input {
			width: 200px;
			margin-bottom: 10px;
		}
		
		.el-card {
			height: 100%;
		}
		
		.el-pagination {
			margin-top: 20px;
		}
		.row{
			height: 20px;
		}
	}
</style>
