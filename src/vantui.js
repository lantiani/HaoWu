import Vue from 'vue';
import 'vant/lib/index.css';
import { Tabbar, TabbarItem, NavBar, Search, Swipe, SwipeItem, Grid, GridItem, Image, Divider, Lazyload,List,PullRefresh,Image as VanImage,Tag,CouponCell, CouponList,Popup,GoodsAction, GoodsActionIcon, GoodsActionButton,Button,Sku,SwipeCell,Card,Stepper,Checkbox,SubmitBar,Form,Field,Cell,Icon,Uploader,AddressList,AddressEdit,Tab, Tabs,Steps,Step,DropdownMenu, DropdownItem, } from 'vant';

Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Step);
Vue.use(Steps);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(AddressEdit);
Vue.use(AddressList);
Vue.use(Uploader);
Vue.use(Icon);
Vue.use(Cell);
Vue.use(Form);
Vue.use(Field);
Vue.use(SubmitBar);
Vue.use(Checkbox);
Vue.use(Stepper);
Vue.use(Card);
Vue.use(SwipeCell);
Vue.use(Sku);
Vue.use(Button);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(Popup)  
Vue.use(CouponList);
Vue.use(CouponCell);    
Vue.use(Tag)
Vue.use(VanImage);
Vue.use(PullRefresh);
Vue.use(List);
Vue.use(Lazyload, {
    lazyComponent: true,
});
Vue.use(Divider);
Vue.use(Image);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Search);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(NavBar);
