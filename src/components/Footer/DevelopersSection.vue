<script setup>
import Icon from './DeveloperIcon.vue'

const developers = [
  {
    name: 'Aitor',
    icon: new URL('@/assets/img/DevevlopersIcons/aitor.jpeg', import.meta.url).href,
    link: 'https://github.com/aitorgarciafernandez'
  },
  {
    name: 'Bego',
    icon: new URL('@/assets/img/DevevlopersIcons/bego.jpeg', import.meta.url).href,
    link: 'https://github.com/begoblanco'
  },
  {
    name: 'Diego',
    icon: new URL('@/assets/img/DevevlopersIcons/diego.jpeg', import.meta.url).href,
    link: 'https://github.com/diegofdez56'
  },
  {
    name: 'Javier',
    icon: new URL('@/assets/img/DevevlopersIcons/javier.jpeg', import.meta.url).href,
    link: 'https://github.com/devjmv'
  },
  {
    name: 'Olena',
    icon: new URL('@/assets/img/DevevlopersIcons/olena.jpeg', import.meta.url).href,
    link: 'https://github.com/OlenaAndrushchenko'
  },
  {
    name: 'Vero',
    icon: new URL('@/assets/img/DevevlopersIcons/vero.jpeg', import.meta.url).href,
    link: 'https://github.com/Miharu669'
  }
]
</script>

<template>
  <div class="md:col-span-5 flex flex-col justify-center gap-5">
    <div class="mb-2">
      <a href="#">
        <img class="h-[104px] w-auto" src="@/assets/img/logos/WhiteLogo.svg" alt="" />
      </a>
    </div>

    <h3 class="text-blueFunko-50 text-base font-semibold">DEVELOPED BY:</h3>
    <div class="flex flex-wrap gap-4">
      <Icon
        v-for="(dev, index) in developers"
        :key="index"
        :icon="dev.icon"
        :link="dev.link"
        :alt="dev.name"
      />
    </div>
  </div>
</template>
