<template>
    <div class="login-wrapper user-select-none">
        <div class="login-content flex-center">
            <div class="login-content-title">
                <b>
                    Login
                </b>
            </div>
            <p class="login-content-descrition">
                This is a background management system built from scratch
            </p>
            <!-- 登录框 -->
            <div class="login-content-box">
                <div class="login-content-box-top">
                    <h3>Login to our site</h3>
                    <p>Enter your username and password to log on:</p>
                </div>
                <!-- 账号密码 -->
                <div class="login-content-box-bottom">
                    <p
                        class="login-content-box-bottom-switch flex-end"
                        @click="swtichLogin"
                    >
                        {{ isLogin ? '注册' : '登录' }}
                    </p>
                    <el-form
                        :model="ruleForm"
                        status-icon
                        :rules="rules"
                        ref="ruleForm"
                        label-width="60px"
                        class="demo-ruleForm"
                    >
                        <!-- 用户名 -->
                        <el-form-item
                            label="用户名"
                            prop="username"
                            v-if="!isLogin"
                        >
                            <el-input
                                type="text"
                                v-model="ruleForm.username"
                                placeholder="Username.."
                            ></el-input>
                        </el-form-item>
                        <!-- 账号 -->
                        <el-form-item label="账号" prop="accountNumber">
                            <el-input
                                type="text"
                                v-model="ruleForm.accountNumber"
                                placeholder="Accont Number.."
                            ></el-input>
                        </el-form-item>
                        <!-- 密码 -->
                        <el-form-item label="密码" prop="password">
                            <el-input
                                type="password"
                                v-model="ruleForm.password"
                                placeholder="Password.."
                            ></el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-button
                                type="primary"
                                @click="submitForm('ruleForm')"
                                style="width: 100%"
                                >sign in !</el-button
                            >
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Api from '@/api/index.js';
import { setSessionStorage } from '@/util/common';
export default {
    data: () => {
        var isVaildAccountNumber = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入账号'));
            }
            callback();
        };
        var isVaildPassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            }
            callback();
        };
        var isVaildUsername = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入用户名'));
            }
            callback();
        };
        return {
            isLogin: true,
            ruleForm: {
                accountNumber: '',
                password: '',
                username: ''
            },
            rules: {
                accountNumber: [
                    { validator: isVaildAccountNumber, trigger: 'blur' }
                ],
                password: [{ validator: isVaildPassword, trigger: 'blur' }],
                username: [{ validator: isVaildUsername, trigger: 'blur' }]
            }
        };
    },
    methods: {
        /**
         * 切换界面
         */
        swtichLogin() {
            this.isLogin = !this.isLogin;
            this.ruleForm.accountNumber = '';
            this.ruleForm.password = '';
        },

        /**
         * 登录
         */
        handleLogin(params) {
            this.$http.post('/user/login', params).then(res => {
                this.entryHome(res);
            });
        },

        /**
         * 注册
         */
        handleRegister(params) {
            this.$http.post('/user/register', params).then(res => {
                this.entryHome(res);
            });
        },
        entryHome(res) {
            this.$message.success('登录成功');
            setSessionStorage(`user${res.id}`, res);
            setSessionStorage('id', res.id);
            this.$router.push('/entry');
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let { accountNumber, password, username } = this.ruleForm;
                    let params = {
                        accountNumber,
                        password
                    };
                    if (this.isLogin) {
                        this.handleLogin(params);
                    } else {
                        params.username = username;
                        this.handleRegister(params);
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.login-wrapper {
    height: 100%;
    background: url(http://yuanhao-web.cn:3003/uploads/background-admin-login.jpg)
        no-repeat center;
    .login-content {
        padding: 100px 0 170px 0;
        flex-direction: column;
        .login-content-title {
            font-size: 38px;
            color: #fff;
            margin: 10px 0;
            margin-bottom: 40px;
        }
        .login-content-descrition {
            opacity: 0.8;
            color: #fff;
            margin-bottom: 60px;
        }
        .login-content-box {
            width: 25%;
            border-radius: 4px;
            overflow: hidden;
            padding: 10px;
            .login-content-box-top {
                padding: 15px 25px;
                background: #fff;
                color: #888;
                h3 {
                    margin-bottom: 15px;
                    font-weight: 0;
                    color: #555;
                }
            }
            .login-content-box-bottom {
                background: #eee;
                padding: 10px 20px 20px;
                .login-content-box-bottom-switch {
                    margin-bottom: 10px;
                    color: #333;
                    cursor: pointer;
                }
                .login-content-box-bottom-switch:hover {
                    text-decoration: underline;
                }
            }
        }
    }
}
.el-input {
    width: 100% !important;
}
</style>
