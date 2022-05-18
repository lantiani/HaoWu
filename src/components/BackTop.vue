<template>
    <div class="backtop flex_c_c" v-show="isShow" @click="backTop">
        <slot><img src="../assets/images/backtop.png" alt=""></slot>
    </div>
</template>

<script>
export default {
    props:{
        goTop:{
            top:Number,
            default:800
        }
    },
    data() {
        return {
            isShow: false,
        }
    },
    methods: {
        scrollTop() {
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            scrollTop >= this.goTop ? this.isShow = true : this.isShow = false;
        },
        backTop() {
            document.documentElement.scrollTop = document.body.scrollTop = 0;
        }
    },
    mounted() {
        document.addEventListener('scroll', this.scrollTop)
    },
    destroyed() {
        document.removeEventListener('scroll', this.scrollTop)
    }
}
</script>

<style lang="scss" scoped>
.backtop {
    position: fixed;
    right: 8px;
    bottom: 120px;
    width: 38px;
    height: 38px;

    img {
        width: 100%;
    }
}
</style>