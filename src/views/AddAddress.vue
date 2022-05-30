<template>
    <div>
        <van-address-edit :area-list="areaList" show-postal show-set-default
            :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" @change-area="changeArea" />
    </div>
</template>

<script>
import { Toast } from 'vant';
import { areaList } from '@vant/area-data';
import { fetchAddress } from '../api/user'
export default {
    data() {
        return {
            areaList,
            areaCode: "",
        };
    },
    methods: {
        async onSave(areaData) {
            let user_id = this.$store.state.userInfo.id;
            areaData.isDefault = areaData.isDefault ? 1 : 0;
            areaData.country = areaData.county;
            let data = {
                ...areaData,
                areaCode: this.areaCode
            };

            let { status, message } = await fetchAddress(user_id, data);
            Toast(message);
            if (status === 0) {
                this.$router.back()
            }
        },
        changeArea(area) {
            this.areaCode = area.map(item => item.code).join('-');
        }
    },
};
</script>

<style>
</style>