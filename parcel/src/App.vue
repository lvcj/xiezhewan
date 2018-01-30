<template>
    <div class="app">
        <h1>{{message}}</h1>
        <div>666</div>
    </div>
</template>

<script>
export default {
    name: 'app',
    data() {
        return {
            message: 'hello world'
        }
    }
}
</script>
<style>
    .app {
        color: #56b983;
        display: flex;
    }
</style>
