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
            <van-goods-action-icon icon="shop-o" text="店铺" />
            <van-goods-action-button color="#be99ff" type="warning" text="加入购物车" />
            <van-goods-action-button color="#7232dd" type="danger" text="立即购买" />
        </van-goods-action>
    </div>
</template>

<script>
import { ImagePreview } from 'vant';
import { fetchGoodsSwipe, fetchGoodsDetail } from '../api/goodsDetail.js';

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
            console.log(message);
        },
        async _fetchGoodsDetail() {
            let { message } = await fetchGoodsDetail(this.id);
            this.goodsSuggest = message;
            console.log(this.goodsSuggest);
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
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/common.scss';

.app {
    // margin: 0 10px;
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

            ::v-deep img {
                width: 100%;
                height: 100%;
            }

            ::v-deep table {
                width: 100%;
                height: 100%;
            }
        }
    }

}
</style>