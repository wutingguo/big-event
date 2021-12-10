import Vue from 'vue'
import {
  Aside,
  Button,
  Container,
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
  Submenu
} from 'element-ui'

Vue.use(Button)
  .use(Form)
  .use(FormItem)
  .use(Input)
  . use(Link)
  .use(Icon)
  .use(Menu)
  .use(MenuItem)
  .use(Container)
  .use(Header)
  .use(Submenu)
  .use(Loading.directive)

  .use(Main)
  .use(Aside)
// Loading.service()
Vue.prototype.$message = Message
Vue.prototype.$loading = Loading.service
