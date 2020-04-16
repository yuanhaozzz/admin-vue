<template>
    <div class="article-wrapper">
        <div class="flex-end">
            <el-button type="primary"
                       @click="handleAdd"
                       size="medium">新增</el-button>
        </div>
        <el-table :data="list.list"
                  stripe
                  style="width: 100%;"
                  header-row-class-name="table-th-class">
            <el-table-column prop="title"
                             width="100"
                             align="center"
                             label="序号">

                <template slot-scope="scope">
                   {{(page - 1) * 10 + scope.$index + 1}}
                </template>
            </el-table-column>
            <el-table-column prop="title"
                             label="文章标题"> </el-table-column>
            <el-table-column prop="author"
                             label="作者"
                             align="center"
                             width="180">
            </el-table-column>
            <el-table-column prop="pageViews"
                             label="浏览量"
                             align="center"
                             width="100">
            </el-table-column>
            <el-table-column label="封面"
                             align="center"
                             width="180">
                <template slot-scope="scope">
                    <div class="flex-center pointer"
                         @click="openImageUrl(scope.row.imageUrl)">
                        <img :src="scope.row.imageUrl"
                             alt="" />
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="description"
                             align="center"
                             label="文章描述">
            </el-table-column>
            <el-table-column prop="releaseTime"
                             align="center"
                             label="发布时间">
            </el-table-column>
            <el-table-column prop="date"
                             align="center"
                             label="操作">
                <template slot-scope="scope">
                    <div class="flex-center">
                        <el-button type="warning"
                                   @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="danger"
                                   @click="handleDelete(scope.row)">删除</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <br />
        <el-pagination background
                       layout="prev, pager, next"
                       :page-size="10"
                       @current-change="changePage"
                       v-if="page > 1"
                       :total="list.total">
        </el-pagination>
    </div>
</template>

<script>
export default {
    data: () => {
        return {
            list: {},
            page: 1
        };
    },
    mounted () {
        this.getList();
    },
    methods: {
        /**
          * 查看大图
          * @param {Number} currentPage 改变的页数
          */
        changePage (currentPage) {
            this.page = currentPage
            this.getList()
        },

        /**
         * 查看大图
         */
        openImageUrl (url) {
            window.open(url);
        },

        /**
         * 获取列表
         */
        getList () {
            let params = {
                pageSize: 10,
                page: this.page,
                // type 1 热门 2 推荐
                type: 2
            };
            this.$http.post('/blog/recommend/article/list', params).then(res => {
                this.list = res;
            });
        },

        /**
         * 文章编辑
         */
        handleEdit (row) {
            let { id } = row;
            this.$router.push({
                path: '/entry/recommend/edit',
                query: {
                    articleId: id
                }
            });
        },

        /**
         * 文章新增
         */
        handleAdd () {
            this.$router.push('/entry/recommend/add');
        },

        /**
         * 删除弹窗
         */
        handleDelete (row) {
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.$http
                        .post('/blog/recommend/article/delete', { articleId: row.id })
                        .then(() => {
                            this.getList();
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
        }
    }
};
</script>

<style lang="scss" scoped>
.article-wrapper {
    img {
        width: 100px;
    }
}
</style>
