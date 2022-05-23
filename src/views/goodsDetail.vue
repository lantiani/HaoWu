<template>
    <div class="app">
        <van-swipe @change="onChange">
            <van-swipe-item v-for="(item, index) in goodsPhoto" :key="index" @change="onChange">
                <van-image lazy-load height="60%" width="100%" :src="item.src" @click="preview(index)" />
            </van-swipe-item>
            <template #indicator>
                <div class="custom-indicator">
                    <span>{{ current + 1 }}</span>/
                    <span>{{ goodsPhoto.length }}</span>
                </div>
            </template>
        </van-swipe>

        <div class="titleWarp">
            <div class="price">
                <span class="originPrice">
                    <span class="rmb">&yen; </span>
                    {{ goodsSuggest.sell_price }}
                </span>
                <span class="oldPrice">
                    <span class="rmb">&yen; </span>
                    {{ goodsSuggest.market_price }}
                </span>
            </div>
            <div class="goodsTag">
                <van-tag type="danger">购遍好物</van-tag>
                <span class="tagText">一站式囤生活好物</span>
            </div>

            <p class="goodsTitle">
                <span class="goodsText">
                    <van-tag type="danger">自营</van-tag>
                    {{ goodsSuggest.title }}
                </span>
            </p>
        </div>

        <!-- 优惠券单元格 -->
        <van-coupon-cell :coupons="coupons" @click="showList = true" />
        <!-- 优惠券列表 -->
        <van-popup v-model="showList" round position="bottom" style="height: 90%; padding-top: 4px;">
            <van-coupon-list :coupons="coupons" :disabled-coupons="disabledCoupons" @change="onChange"
                @exchange="onExchange" />
        </van-popup>

        <div class="goodsSuggest">
            <van-divider class="titleSuggest">详情</van-divider>
            <div class="suggest" v-html="goodsSuggest.content"></div>
        </div>

        <!-- 底部栏 -->
        <van-goods-action>
            <van-goods-action-icon icon="chat-o" text="客服" />
            <van-goods-action-icon icon="cart-o" text="购物车" :badge="$store.state.goodsInfo.length" @click="getCart" />
            <van-goods-action-button color="#be99ff" type="warning" text="加入购物车" @click="showCart" />
            <van-goods-action-button color="#7232dd" type="danger" text="立即购买" @click="showBuyCart" />
        </van-goods-action>

        <!-- sku -->
        <van-sku v-model="show" :sku="sku" :goods="goods" :goods-id="goodsSuggest.id" :showAddCartBtn="showAddCartBtn"
            @add-cart="addGoodsToCart"  @buy-clicked="buyGoods" />
    </div>
</template>

<script>
import { ImagePreview } from 'vant';
import { fetchGoodsSwipe, fetchGoodsDetail } from '../api/goodsDetail.js';
import { Toast } from 'vant';
const coupon = {
    available: 1,
    condition: '无使用门槛\n最多优惠12元',
    reason: '',
    value: 150,
    name: '优惠券名称',
    startAt: 1489104000,
    endAt: 1514592000,
    // valueDesc: '1.5',
    unitDesc: '元',
};

export default {
    data() {
        return {
            current: 0,
            goodsPhoto: [],
            goodsSuggest: [],
            id: this.$route.params.id,
            // 优惠卷数据
            // chosenCoupon: -1,
            coupons: [coupon],
            disabledCoupons: [coupon],
            showList: false,
            // 优惠卷结束

            // sku
            show: false,
            showAddCartBtn: true,
            sku: {
                // 数据结构见下方文档
                tree: [],
                price: 0,
                stock_num: 0,
            },
            goods: {
                // 数据结构见下方文档
                picture: '',
            },
            messageConfig: {
                // 数据结构见下方文档
            },
            // sku结束
        };
    },
    created() {
        this._fetchGoodsSwipe()
        this._fetchGoodsDetail()
    },
    methods: {
        preview(index) {
            let imgs = this.goodsPhoto.map(item => item.src);
            ImagePreview({ images: imgs, startPosition: index });
        },
        onChange(index) {
            this.current = index;
        },
        async _fetchGoodsSwipe() {
            let { message } = await fetchGoodsSwipe(this.id);
            this.goodsPhoto = message;
            // sku获取商品图片
            this.goods.picture = this.goodsPhoto[0].src;
        },
        async _fetchGoodsDetail() {
            let { message } = await fetchGoodsDetail(this.id);
            this.goodsSuggest = message;
            console.log(message);
            // sku赋值
            this.sku.price = message.sell_price;
            this.sku.stock_num = message.stock_quantity;
        },
        // 优惠卷方法
        onChange(index) {
            this.showList = false;
            // this.chosenCoupon = index;
        },
        onExchange(code) {
            this.coupons.push(coupon);
        },
        // 优惠卷结束

        // 购物车
        showCart() {
            this.show = true;
            this.showAddCartBtn = true;
        },
        showBuyCart() {
            this.show = true;
            this.showAddCartBtn = false;
        },
        addGoodsToCart(skuData) {
            let { goodsId, selectedNum } = skuData;
            let price = this.goodsSuggest.sell_price;
            let picture = this.goods.picture;
            let title = this.goodsSuggest.title;
            let zhaiyao = this.goodsSuggest.zhaiyao;
            let obj = { price, picture, title,zhaiyao,id: goodsId, count: selectedNum, checked: true };
            this.$store.commit('addGoodsToCarts', obj);
            this.show = false;
            Toast.success('添加成功');
        },
        buyGoods(skuData) {
            let { goodsId, selectedNum } = skuData;
            let price = this.goodsSuggest.sell_price;
            let picture = this.goods.picture;
            let title = this.goodsSuggest.title;
             let zhaiyao = this.goodsSuggest.zhaiyao;
            let obj = { price, picture,title,zhaiyao, id: goodsId, count: selectedNum, checked: true };
            this.$store.commit('addGoodsToCarts', obj);
            this.show = false;
            this.$router.push('/home/cart');
        },
        getCart() {
            this.$router.push('/home/cart');
        },
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/common.scss';

.app {
    background: #f2f2f2;

    .van-swipe {
        background: #fff;
    }

    .custom-indicator {
        position: absolute;
        right: 10px;
        bottom: 20px;
        padding: 2px 5px;
        font-size: 12px;
        background: rgba(0, 0, 0, 0.1);
    }

    .titleWarp {
        background: #fff;
        margin-top: -4px;
        margin-bottom: 10px;
        padding: 10px 10px;
        // padding-bottom: 4px;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;

        .price {
            padding-left: 10px;

            .originPrice {
                font-size: 20px;
                color: red;
                font-weight: 700;

                .rmb {
                    font-size: 12px;
                }
            }

            .oldPrice {
                color: #666;
                font-size: 13px;
                text-decoration: line-through;
            }
        }

        .goodsTag {
            margin-top: 10px;
            padding-left: 6px;

            .tagText {
                font-size: 12px;
                color: #666;
                margin-left: 6px;
            }
        }

        .goodsTitle {
            margin: 14px 0;
            display: flex;

            .goodsText {
                font-weight: 700;
                color: #000;
                margin-left: 6px;
                line-height: 22px;
                @include ellipsis-line-2;
                font-size: 15px;
            }
        }
    }

    .goodsSuggest {
        padding: 0 10px;
        background: #fff;

        .titleSuggest {
            padding-top: 10px;
        }

        .suggest {
            width: 100%;
            color: #666;

            ::v-deep table {
                width: 100%;
                height: 100%;
            }

            ::v-deep img {
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>