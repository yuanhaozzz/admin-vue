<template>
    <Detail @submit="submit" ref="detail"></Detail>
</template>

<script>
import Detail from './Detail.vue';

export default {
    data: () => {
        return {
            articleId: ''
        };
    },
    mounted() {
        this.articleId = this.$route.query;
        this.getDetail();
    },
    methods: {
        submit(params) {
            let { articleId } = this.$route.query;
            params.id = articleId;
            this.$http.post('/blog/hot/article/edit', params).then(res => {
                this.$message.success('修改成功');
                this.$router.back();
            });
        },
        /**
         * 获取详情
         */
        getDetail() {
            let { articleId } = this.$route.query;
            this.$http
                .post('/blog/hot/article/detail', { articleId })
                .then(res => {
                    this.$refs.detail.getDetail(res.detail);
                });
        }
    },
    components: {
        Detail
    }
};
</script>

<style></style>
