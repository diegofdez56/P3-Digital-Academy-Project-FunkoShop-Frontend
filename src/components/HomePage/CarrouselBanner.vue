<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import anime from '../../assets/img/Carrousel/anime.jpg';
import marvel from '../../assets/img/Carrousel/marvel.jpg';
import axios from 'axios';

// Estado reactivo
const activeIndex = ref(0);
const intervalTime = 4000;

const categories = ref(null);

async function getCategories() {
    const res = await axios.get('http://localhost:8080/api/v1/categories')
    categories.value = res
}

onMounted(async () => {
    await getCategories();
});

console.log(categories.value)

const images = [
    {
        src: anime,
    },
    {
        src: marvel,
    },
];

// Función para actualizar el índice activo
const setActiveIndex = (index) => {
    activeIndex.value = index;
};

// Función para cambiar al siguiente slide
const nextSlide = () => {
    activeIndex.value = (activeIndex.value + 1) % images.length;
};

// Manejadores del ciclo de vida
let interval;
onMounted(() => {
    interval = setInterval(() => {
        nextSlide();
    }, intervalTime);
});

onUnmounted(() => {
    clearInterval(interval);
});
</script>



<template>
    aki
    <div v-for="item in categories" v-bind:key="item.contentDetails.videoId" class="video-container">
        {{ item.name }}
    </div>
    termina
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