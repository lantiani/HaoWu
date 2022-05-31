<template>
    <div>
        <button @click="btn">按钮</button>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    methods:{
        async btn() {
            let result = await axios.get('/myapi/user');
            console.log(result);
        }
    }
}
</script>

<style>

</style>