<template>
	<div class="visitor_container" ref="con">
		<el-card class="box-card">
			<div class="container_title">访客统计</div>
			<div class="search_box">
				<el-input v-model="search" size="mini" placeholder="输入名字搜索" />
			</div>
			<el-table :data="tableData.filter(item => item.v_code.includes(search))" style="width: 100%" border ref="tabble"
				:height="tableHeight" :default-sort="{prop: 'v_timestamp', order: 'descending'}">
				<el-table-column label="微信ID" prop="v_id">
				</el-table-column>
				<el-table-column label="车场ID" prop="p_code" sortable>
				</el-table-column>
				<el-table-column label="微信昵称" prop="v_code">
				</el-table-column>
				<el-table-column label="d_ID" prop="d_id">
				</el-table-column>
				<el-table-column label="访问时间" prop="v_timestamp" sortable>
				</el-table-column>
			</el-table>
			<el-pagination background layout="prev, pager, next, total, sizes" :page-size="pageSize" @current-change="change"
				:page-sizes="[13, 100, 200, 500]" @size-change="handleSizeChange" :total="respData.length">
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
				tableData: [],
				respData: [],
				search: '',
				tableHeight: 0,
				currentPage: 1,
				pageSize: 13,
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.tableHeight = this.$refs.con.offsetHeight - 204;
			})
			this.render();
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
				http.get('/visitrecord/query.php').then((resp) => {
					this.respData = resp.data.content;
					this.getDataByPage();
				});
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

		.el-card {
			height: 100%;
		}

		.el-pagination {
			margin-top: 20px;
		}
	}
</style>
