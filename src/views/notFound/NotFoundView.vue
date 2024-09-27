<script setup>

</script>

<template>
    <section class="p-20 w-full h-full bg-white">
        <div class="four_zero_four_bg">
            <div class="text-center ">
                <h1 class="text-6xl font-semibold">404</h1>
                <h2 class="pb-5 text-3xl font-bold tracking-tight text-dark sm:text-4xl text-center">Look like you're lost
                </h2>
                <router-link to="/home"
                    class="rounded-md bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">Go
                    to Home</router-link>
            </div>
        </div>

    </section>
</template>

<style scoped>
.four_zero_four_bg {
    background-image: url(@/assets/img/NotFound/dribbble_1.gif);
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    height: 100vh;
}
</style>