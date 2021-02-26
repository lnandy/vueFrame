<template>
	<div class="userManage_container" ref="con">
		<el-card>
			<div class="container_title">用户管理</div>
			<div class="search_box">
				<el-input v-model="search" size="mini" placeholder="输入名字搜索" />
				<el-button type="primary" size="mini" @click="add">新建用户</el-button>
			</div>
			<el-table :data="tableData.filter(item => item.name.includes(search))" style="width: 100%" border ref="tabble"
				:height="tableHeight" :default-sort="{prop: 'v_timestamp', order: 'descending'}">
				<el-table-column label="用户ID" prop="id">
				</el-table-column>
				<el-table-column label="用户名称" prop="name" sortable>
				</el-table-column>
				<el-table-column label="用户类型" prop="type">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button size="mini" @click="edit(scope.row)">编 辑</el-button>
						<el-button size="mini" type="danger" @click="deleteIt(scope.row)">删 除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination background layout="prev, pager, next, total, sizes" :page-size="pageSize" @current-change="change"
				:page-sizes="[13, 100, 200, 500]" @size-change="handleSizeChange" :total="respData.length">
			</el-pagination>
		</el-card>
		<el-dialog title="个人信息" :visible.sync="showDialog" v-if="showDialog" width="30%" :modal="true" :append-to-body="true">
			<UserInfo :userInfo="userInfo" :show.sync="showDialog" @refresh="render"></UserInfo>
		</el-dialog>
	</div>
</template>

<script>
	import http from "@/components/http"
	import UserInfo from "@/views/userManagement/UserInfo"
	export default {
		name: "userManagement",
		components: {
			UserInfo: UserInfo
		},
		data() {
			return {
				tableData: [],
				respData: [],
				search: '',
				tableHeight: 0,
				currentPage: 1,
				pageSize: 13,
				showDialog: false,
				userInfo: {},
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
			add() {
				this.userInfo = {};
				this.showDialog = true;
			},
			edit(row){
				this.userInfo = row;
				this.showDialog = true;
			},
			deleteIt(row){
				http.post('/user/delete.php',{id:row.id}).then((resp) => {
					if (resp.data.content === true) {
						this.$message.success('删除成功！');
						this.render();
					}
				});
			},
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
				http.get('/user/query.php').then((resp) => {
					this.respData = resp.data.content;
					this.getDataByPage();
				});
			}
		}
	}
</script>

<style lang="scss">
	.userManage_container {
		padding: 20px;

		.search_box {
			height: 40px;
			text-align: end;
		}

		.el-input {
			width: 200px;
			margin-bottom: 10px;
			margin-right: 10px;
		}

		.el-card {
			height: 100%;
		}

		.el-pagination {
			margin-top: 20px;
		}
	}
</style>
