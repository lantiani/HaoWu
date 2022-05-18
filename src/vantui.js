import Vue from 'vue';
import 'vant/lib/index.css';
import { Tabbar, TabbarItem, NavBar, Search, Swipe, SwipeItem, Grid, GridItem, Image, Divider, Lazyload } from 'vant';

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
