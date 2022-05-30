<template>
  <van-address-list v-model="chosenAddressId" :list="list" default-tag-text="默认" @add="onAdd" @edit="onEdit" />
</template>

<script>
import { Toast } from 'vant';
import { fetchUserArea } from '../api/user.js'
export default {
  data() {
    return {
      chosenAddressId: '1',
      id: this.$store.state.userInfo.id,
      list: [],
    };
  },
  created() {
    this._fetchUserArea()
  },
  methods: {
    onAdd() {
      this.$router.push('/AddAddress');
    },
    onEdit(item, index) {
      this.$router.push('/EditAddress/' + JSON.stringify(item));
    },
    async _fetchUserArea() {
      let result = await fetchUserArea(this.id);
      result.map(item => {
        if (item.isDefault) {
          this.chosenAddressId = item.id;
        }
        let { province, city, country, addressDetail } = item;
        item.address = `${province}${city}${country}${addressDetail}`;
        return item;
      })
      this.list = result;
    }
  },
};
</script>

<style>
</style>