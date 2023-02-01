//因为menuData数据是从store获取的，所以刷新页面左侧的导航menuData会变空，因为数据是登录的时候从后台获取的；
//而之前的导航数据是写死的，所以导航还是有的
import Cookie from "js-cookie"
export default {
    state: {
        isCollapse: false,
        tabsList: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home/Home'
            }
        ],
        menu: []
    },
    mutations: {
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },

        selectMenu(state, payload) {
            if (payload.name !== 'home') {
                const index = state.tabsList.findIndex(item => item.name === payload.name)
                if (index === -1 ) {
                    state.tabsList.push(payload)
                }
            }
        },
        closeTag(state, payload) {
            const index = state.tabsList.findIndex(item => item.name === payload.name)
            state.tabsList.splice(index, 1)
        },
        //设置menuData数据
        setMenu(state, payload) {
            state.menu = payload
            //cookie中只能存字符串
            Cookie.set('menu', JSON.stringify(payload))
        },
        addMenu(state, router) {
            if (!Cookie.get('menu')) return
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            //动态添加路由数据
            const menuArray = []
            menu.forEach(item => {
                if (item.children) {
                    item.children = item.children.map(item => {
                        item.component = () => import(`@/views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                } else {
                    item.component = () => import(`@/views/${item.url}`)
                    menuArray.push(item)
                }
            })
            // console.log(menuArray)
            menuArray.forEach(item => {
                router.addRoute('Main', item)
            })
        }
    }
}