import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import "./api/mock"
// import index from '@/assets/index.css'
import { 
  Row, 
  Button, 
  Container, 
  Aside, 
  Header, 
  Main, 
  Menu, 
  Submenu, 
  MenuItem,  
  MenuItemGroup, 
  Dropdown,
  DropdownMenu,
  DropdownItem,
  row,
  col,
  Card,
  Table,
  TableColumn,
  Breadcrumb,
  BreadcrumbItem,
  Tag,
  Dialog,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  DatePicker,
  table,
  tableColumn,
  MessageBox,
  Message,
  Pagination,

} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

// Vue.use(index)
Vue.use(Row)
Vue.use(Button)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(row)
Vue.use(col)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tag)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(table)
Vue.use(tableColumn)
Vue.use(Pagination)

Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    store.commit('addMenu', router)
  }
}).$mount('#app')
