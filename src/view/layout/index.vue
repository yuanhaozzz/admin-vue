<template>
    <div class="layout-wrapper">
        <!-- 导航栏 -->
        <Topbar></Topbar>
        <div class="layout-content flex-start">
            <!-- 侧边栏 -->
            <Sidebar></Sidebar>
            <!-- 内容 -->
            <Content></Content>
        </div>
    </div>
</template>

<script>
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
export default {
    components: {
        Topbar,
        Sidebar,
        Content
    }
};
</script>

<style lang="scss" scoped>
.layout-wrapper {
    height: 100%;
    .layout-content {
        width: 100%;
        height: 100%;
        align-items: flex-start;
    }
}
</style>
