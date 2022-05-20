<template>
    <!-- 商品列表 -->
        <div class="goodsItem" @click="getGoodsId">
            <div class="goodsImgWrap">
                <slot name="goodsImg">
                    <img class="goodsImg" v-lazy="data.img_url" alt="">
                </slot>
            </div>
            <div class="goodsPadding">
                <slot name="goodsText">
                    <p class="goodsText">{{ data.zhaiyao }}</p>
                </slot>
                <slot name="goodsPrice">
                    <div class="goodsPrice">
                        <span style="font-size:14px">￥</span>
                        <span>{{ data.sell_price }}</span>
                        <span style="font-size:14px">.00</span>
                    </div>
                </slot>
                <div class="goodsComments">
                    <slot name="goodsComments">
                        {{ data.buy }}条评论
                    </slot>
                </div>

            </div>
        </div>
</template>

<script>
// import { fetchGoods } from '../api/home.js'
export default {
    name: 'GoodsList',
    props:['data'],
    methods:{
        getGoodsId(event) {
            this.$emit('goodsDetail',this.data.id,event)
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/common.scss';

// 商品列表css

    .goodsItem {
        width: 48%;
        padding-bottom: 5px;
        font-size: 14px;
        color: #333;
        background-color: #fff;
        border-radius: 10px;
        overflow: hidden;
        margin: 5px 0;

        .goodsImgWrap {
            height: 180px;
            padding: 0 10px;

            .goodsImg {
                width: 100%;
                height: 100%;
            }
        }

        .goodsPadding {
            padding: 0 10px;

            .goodsText {
                @include ellipsis-line-2;
                margin: 5px 0 10px;
                line-height: 1.5;
            }

            .goodsPrice {
                color: red;
                font-size: 20px;
            }

            .goodsComments {
                margin-top: 5px;
                color: #999;
                font-size: 12px;
            }
        }


    }
</style>