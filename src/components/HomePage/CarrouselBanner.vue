<script>
import { ref, onMounted, onUnmounted } from 'vue';

import FunkoBanner from '../../assets/img/Carrousel/FunkoBanner.jpg';

export default {
    setup() {
        const activeIndex = ref(0);
        const intervalTime = 4000;

        const images = [
            {
                src: FunkoBanner,
            },
            {
                src: FunkoBanner,
            },
            {
                src: FunkoBanner,
            },
        ];

        const setActiveIndex = (index) => {
            activeIndex.value = index;
        };

        const nextSlide = () => {
            activeIndex.value = (activeIndex.value + 1) % images.length;
        };

        let interval;
        onMounted(() => {
            interval = setInterval(() => {
                nextSlide();
            }, intervalTime);
        });

        onUnmounted(() => {
            clearInterval(interval);
        });

        return {
            activeIndex,
            images,
            setActiveIndex,
        };
    },
};
</script>


<template>
    <div class="carousel-container relative overflow-hidden">
        <div class="carousel-wrapper" :style="{ transform: `translateX(-${activeIndex * 100}%)` }">
            <img v-for="(image, index) in images" :key="index" :src="image.src" :alt="`image ${index + 1}`"
                class="carousel-image" />
        </div>

        <div class="absolute bottom-4 left-2/4 z-0 flex -translate-x-2/4 gap-2">
            <span v-for="(image, index) in images" :key="index"
                class="block h-1 cursor-pointer rounded-2xl transition-all"
                :class="activeIndex === index ? 'w-8 bg-white' : 'w-4 bg-white/50'"
                @click="setActiveIndex(index)"></span>
        </div>
    </div>
</template>

<style scoped>
.carousel-container {
    width: 100%;
    overflow: hidden;
    position: relative;
    margin: auto;
}

.carousel-wrapper {
    display: flex;
    transition: transform 0.5s ease;
    width: 100%;
}

.carousel-image {
    min-width: 100%;
    height: 500px;
    object-fit: cover;
}
</style>