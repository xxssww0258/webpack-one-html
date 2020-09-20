<template>
    <div>
        <svg width="100" height="100" viewBox="0 0 100 100">
            <use xlink:href="#icon-close2" />
        </svg>
        <img src="./img/Android@2x.png" alt="" />
        {{ msg }}
    </div>
</template>

<script>
import './b.scss'
export default {
    data() {
        return {
            msg: 'hello world',
        }
    },
}
</script>
<style>
body {
    font-size: 50px;
}
</style>
