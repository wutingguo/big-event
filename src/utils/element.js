import Vue from 'vue'
import {
  Aside,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  Col,
  Container,
  Dialog,
  Form,
  FormItem,
  Header,
  Icon,
  Input,
  Link,
  Loading,
  Main,
  Menu,
  MenuItem,
  Message,
  MessageBox,
  Option,
  Pagination,
  Row,
  Select,
  Submenu,
  Table,
  TableColumn
} from 'element-ui'

Vue.use(Button)
  .use(Form)
  .use(FormItem)
  .use(Input)
  .use(Link)
  .use(Icon)
  .use(Menu)
  .use(MenuItem)
  .use(Container)
  .use(Header)
  .use(Submenu)
  .use(Loading.directive)
  .use(Main)
  .use(Aside)
  .use(Card)
  .use(Breadcrumb)
  .use(BreadcrumbItem)
  .use(Row)
  .use(Col)
  .use(Table)
  .use(TableColumn)
  .use(Dialog)
  .use(Select)
  .use(Option)
  .use(Pagination)
// 这里如果使用MessageBox 页面进入就会弹出提示框 !!!!!
// Loading.service()
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$loading = Loading.service
