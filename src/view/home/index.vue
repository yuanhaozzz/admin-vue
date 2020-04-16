<template>
    <div>我是主页{{ test }}</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'Home',
    computed: mapState([
        // 映射 this.count 为 store.state.count
        'test'
    ]),
    mounted() {
        let params = {};
    }
};
</script>

<style></style>
