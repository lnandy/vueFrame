<template>
	<div class="userManage_container" ref="con">
		<el-card>
			<div class="container_title">车场管理</div>
			<div class="search_box">
				<el-input v-model="search" size="mini" placeholder="输入名字搜索" />
				<el-button type="primary" size="mini" @click="add">新建车场</el-button>
			</div>
			<el-table :data="tableData.filter(item => item.pname.includes(search))" style="width: 100%" border ref="tabble"
				:height="tableHeight">
				<el-table-column label="车场ID" prop="pid" width="80">
				</el-table-column>
				<el-table-column label="车场名称" prop="pname" width="150">
					<template slot-scope="scope">
						<el-input v-model="scope.row.pname" v-show="showEdit"></el-input>
						<span v-show="!showEdit">{{scope.row.pname}}</span>
					</template>
				</el-table-column>
				<el-table-column label="车场地址" prop="paddress">
					<template slot-scope="scope">
						<el-input v-model="scope.row.paddress" v-show="showEdit"></el-input>
						<span v-show="!showEdit">{{scope.row.paddress}}</span>
					</template>
				</el-table-column>
				<el-table-column label="车场电话" prop="p_phonenum" width="200">
					<template slot-scope="scope">
						<el-input v-model="scope.row.p_phonenum" v-show="showEdit"></el-input>
						<span v-show="!showEdit">{{scope.row.p_phonenum}}</span>
					</template>
				</el-table-column>
				<el-table-column label="邮政编码" prop="p_unicode" width="200">
					<template slot-scope="scope">
						<el-input v-model="scope.row.p_unicode" v-show="showEdit"></el-input>
						<span v-show="!showEdit">{{scope.row.p_unicode}}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="200">
					<template slot-scope="scope">
						<el-button size="mini" type="warning" @click="showEdit=true" v-show="!showEdit">编 辑</el-button>
						<el-button size="mini" type="danger" @click="confirmDelete(scope.row)" v-show="!showEdit">删 除</el-button>
						<el-button size="mini" type="success" @click="saveEdit(scope.row)" v-show="showEdit">保 存</el-button>
						<el-button size="mini" @click="showEdit=false" v-show="showEdit">取 消</el-button>
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
		name: "parkManagement",
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
				showEdit: false,
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
			confirmDelete(row) {
				this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.deleteIt(row);
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			saveEdit(row) {
				http.post('/park/update.php', row).then((resp) => {
					if (resp.data.content === true) {
						this.$message.success('保存成功！');
						this.showEdit = false;
						this.render();
					}
				});
			},
			deleteIt(row) {
				http.post('/park/delete.php', {
					id: row.id
				}).then((resp) => {
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
				http.get('/park/query.php').then((resp) => {
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

		.cell .el-input {
			margin: 0;
			width: 100%;
		}
	}
</style>
