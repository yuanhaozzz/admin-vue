<template>
    <Detail @submit="submit"></Detail>
</template>

<script>
import Detail from './Detail.vue'

export default {
    methods: {
        submit (params) {
            this.$http.post('/blog/hot/article/add', params).then(res => {
                this.$message.success('添加成功')
                this.$router.back()
            })
        }
    },
    components: {
        Detail
    }
}
</script>

<style>
</style>