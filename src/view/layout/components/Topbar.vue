<template>
    <div class="topbar-wrapper flex-space-between user-select-none">
        <div class="topbar-left flex-center">
            <div class="topbar-left-icon">
                <i class="el-icon-s-operation"></i>
            </div>
            <b>LUC</b><b>KY</b>
        </div>
        <div class="topbar-right">
            <el-button type="primary"
                       @click="jumpToLogin">logout</el-button>
        </div>

    </div>
</template>

<script>
export default {
    methods: {
        jumpToLogin () {
            localStorage.setItem('user', '')
            this.$router.push('/login')
        }
    }
}
</script>

<style lang="scss" scoped>
.topbar-wrapper {
    background: #22242a;
    border-bottom: 1px solid #393d46;
    height: 60px;
    padding: 0 20px;
    color: #fff;
    .topbar-left {
        .topbar-left-icon {
            font-size: 26px;
            margin-right: 10px;
            color: #797979;
            cursor: pointer;
        }
        b {
            font-size: 24px;
        }
        b:nth-of-type(1) {
            color: #f2f2f2;
        }
        b:nth-of-type(2) {
            color: #4ecdc4;
        }
    }
}
</style>