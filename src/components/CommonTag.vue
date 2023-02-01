<template>
    <div class="tabs">
        <el-tag
            v-for="(item, index) in tags"
            :key="item.path"
            :closable="item.name !== 'home'"
            :effect="$route.name === item.name ? 'dark' : 'plain'"
            @click="changeMenu(item)"
            @close="handleClose(item, index)"
            size="small">
            {{ item.label }}
        </el-tag>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
    name: 'CommonTag',

    data() {
        return {
            
        }
    },

    mounted() {
        
    },

    methods: {
        ...mapMutations(['closeTag']),

        changeMenu(item) {
            // console.log(item)
            // this.$router.push({ name: item.name})
            // this.$router.push(`${item.path}`)
            this.$router.push({ path: item.path })
        },
        handleClose(item, index) {
            const lastIndex = this.tags.length-1
            // console.log(lastIndex)

            this.closeTag(item)
            
            // 1 const length = this.tags.length 
            if (item.name !== this.$route.name) {
                return
            }
            // console.log(index,length)

        //  1   if (index === length ) {
        //         this.$router.push({
        //             name: this.tags[index - 1].name
        //         })
        //     } else {
        //         this.$router.push({
        //             name: this.tags[index].name
        //         })
        //     }

            if (index === lastIndex) {
                this.$router.push({
                    name: this.tags[lastIndex - 1].name
                })
            } else {
                this.$router.push({
                    name: this.tags[index].name
                })
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
.tabs {
    padding: 20px;
    .el-tag {
        margin-right: 15px;
        cursor: pointer
    }
}
</style>





