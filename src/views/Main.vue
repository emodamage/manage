<template>
    <div>
        <el-container>
            <el-aside width="auto">
                <common-aside></common-aside>
            </el-aside>
            <el-container>
                <el-header>
                    <common-header></common-header>
                </el-header>
                <common-tag> </common-tag>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import CommonAside from '@/components/CommonAside.vue'
import CommonHeader from '@/components/CommonHeader.vue'
import CommonTag from '@/components/CommonTag.vue'

export default {
    name: 'myMain',
    components: {
        CommonAside,
        CommonHeader,
        CommonTag
    },
    data() {
        return {
            
        }
    },

    mounted() {
        
    },

    methods: {
        
    },
}
</script>

<style scoped>
.el-header {
    padding: 0;
}
</style>