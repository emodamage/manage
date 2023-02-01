<template>
    <div class="header-container">
        <div class="l-container">
            <el-button style="margin-right: 20px" @click="handleMenu" icon="el-icon-menu" size="mini"></el-button>

            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{ item.label }}</el-breadcrumb-item>
                <!-- <el-breadcrumb-item v-for="item in tags" :key="item.path"  :ref="`${item.name}`" @click="toPage(item)">{{ item.label }}</el-breadcrumb-item> -->
            </el-breadcrumb>
        </div>
        <div class="r-container">
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    <img class="user" src="@/assets/logo.png" alt="">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item command="loginOut">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import Cookie from 'js-cookie'
export default {
    data() {
        return {
            
        }
    },

    mounted() {
        // this.$refs.forEach(item => {
        //     item.addEventListener('click', (e) => {
        //         if (e.target === )
        //     })
        // })
    },

    methods: {
        handleMenu() {
            this.$store.commit('collapseMenu')
        },
        // toPage(item) {
        //     if (this.$route.path !== item.path && !(this.$route.path === '/home' && item.path === '/')) {
        //         this.$router.push(item.path)
        //     }
        //     console.log(item)
        // }
        handleCommand(command) {
            if (command === 'loginOut') {
                Cookie.remove('token')
                Cookie.remove('menu')
                // this.$store.state.tab.tabsList = [
                //     {
                //         path: '/',
                //         name: 'home',
                //         label: '首页',
                //         icon: 's-home',
                //         url: 'Home/Home'
                //     }
                // ]
                this.$router.push('/login')
            }
        }
    },

    computed: {
        ...mapState({
            tags: state => state.tab.tabsList
        })
    }
}
</script>

<style lang="less" scoped>
.header-container {
    padding: 0 20px;
    background-color: #333;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .text {
        color: #fff;
        font-size: 14px;
        margin-left: 10px;
    }
    .r-container {
        .user {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            vertical-align: middle;
        }
    }
    .l-container {
        display: flex;
        align-items: center;
        // scss ::v-deep
        // 每一个dom都有data-v-xxx的标识，没有的话color就不生效了
        /deep/.el-breadcrumb__item {
            .el-breadcrumb__inner {
                &.is-link {
                    color: #666;
                }
            }
            &:last-child {
                .el-breadcrumb__inner {
                    color: #fff;
                }
            }
        }
    }
}
</style>