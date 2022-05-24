<template>
    <div>
        <van-address-edit :area-list="areaList" show-postal show-set-default
            :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" @change-area="changeArea"
            :address-info="areaData" />
    </div>
</template>

<script>
import { Toast } from 'vant';
import { areaList } from '@vant/area-data';
import { fetchUpdateArea } from '../api/user'
export default {
    data() {
        return {
            areaList,
            areaCode: "", // 记录当前地区
            isDefault: "", // 默认地址
            editAddressInfo: {}
        };
    },
    created() {
        // console.log(JSON.parse(this.$route.params.userAddress));
        this.editAddressInfo = JSON.parse(this.$route.params.userAddress);
        this.isDefault = this.editAddressInfo.isDefault ? 1 : 0;
        // console.log(this.isDefault);
        this.areaCode = this.editAddressInfo.areaCode
        // this.areaStr()
    },
    methods: {
        async onSave(areaData) {
            // areaData.isDefault = areaData.isDefault ? 1 : 0;
            let data = {
                ...areaData,
                isDefault: areaData.isDefault ? 1 : 0
            };
            data.country = data.county;
            data.fullAreaCode = this.areaCode;
            data.areaCode = this.areaCode;
            let {status,message} = await fetchUpdateArea(areaData.id, data);
            Toast.success(message);
            if(status === 0) {
                this.$router.back();
            }
        },
        changeArea(area) {
            this.areaCode = area.map(item => item.code).join('-');
        }
    },
    computed: {
        areaData() {
            let areaDatas = JSON.parse(this.$route.params.userAddress);
            areaDatas.isDefault = !!areaDatas.isDefault;
            areaDatas.areaCode = areaDatas.areaCode.split('-')[2]
            return areaDatas
        }
    }
};
</script>

<style>
</style>