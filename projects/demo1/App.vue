<template>
    <div>
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
