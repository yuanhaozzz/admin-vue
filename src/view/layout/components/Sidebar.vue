<template>
    <div class="sidebar-wrapper user-select-none">
        <div class="sidebar-userinfo flex-center">
            <img :src="avatar" />
            <p>yuanhao</p>
        </div>
        <div>
            <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#2f323a"
                text-color="#aeb2b7"
                active-text-color="#fff"
            >
                <router-link to="/entry">
                    <el-menu-item index="2">
                        <i class="el-icon-menu"></i>
                        <span slot="title">首頁</span>
                    </el-menu-item>
                </router-link>

                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>博客</span>
                    </template>

                    <router-link to="/entry/hot">
                        <el-menu-item index="3">
                            <p slot="title" class="menu-item">热门文章</p>
                        </el-menu-item>
                    </router-link>
                    <router-link to="/entry/recommend">
                        <el-menu-item index="4">
                            <p slot="title" class="menu-item">推荐文章</p>
                        </el-menu-item>
                    </router-link>
                </el-submenu>
            </el-menu>
        </div>
    </div>
</template>

<script>
import Avatar from '@/assets/images/avatar.jpg';
export default {
    data: () => {
        return {
            avatar: Avatar
        };
    },
    methods: {
        handleOpen() {
            console.log(1);
        },
        handleClose() {
            console.log(2);
        }
    }
};
</script>

<style lang="scss" scoped>
.sidebar-wrapper {
    width: 15%;
    height: 100%;
    background-color: #2f323a;
    .sidebar-userinfo {
        flex-direction: column;
        height: 150px;
        img {
            width: 80px;
            height: 80px;
            border-radius: 80px;
            margin-bottom: 5px;
        }
        p {
            color: #f2f2f2;
        }
    }
    .menu-item {
        padding-left: 15px;
    }
}
</style>
