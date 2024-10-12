<script setup>
import { ref } from 'vue';
import { useReviewStore } from '@/stores/review/reviewStore';

const reviewStore = useReviewStore();

const emit = defineEmits(['close'])

//orderItemId
const props = defineProps({
    orderItemId: Number,
})
//review
const review = ref({
  rating: 0,
});

const message = ref('');
const error = ref('');

const setRating = (value) => {
  review.value.rating = value;
};

const submitReview = async () => {
  try {
    error.value = '';
    message.value = '';
    //send review to API and get response, TODO: use axios
    await reviewStore.createReview({
      rating: review.value.rating,
      orderItem: props.orderItemId
    });

    message.value = 'Review send successfully';
  } catch (err) {
    error.value = 'Error sending review';
  }
};
</script>

<!-- Form -->
<template>
  <div class="flex flex-col items-center justify-center">
    <h2 class="text-lg font-semibold mb-4">Leave a review</h2>
    <form @submit.prevent="submitReview" class="space-y-4 w-full max-w-sm">
      <div class="flex justify-between">
        <label for="rating" class="block font-medium">Rating:</label>
        <div>
          <button
            v-for="value in [1, 2, 3, 4, 5]"
            :key="value"
            type="button"
            @click="setRating(value)"
            :class="{
              'text-yellow-500': value <= review.rating,
              'text-gray-400': value > review.rating
            }"
            class="text-2xl"
          >
            ★
          </button>
        </div>
      </div>

      <button @click="emit('close')" type="submit" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Send 
      </button>
    </form>
    <p v-if="message" class="mt-4 text-green-600">{{ message }}</p>
    <p v-if="error" class="mt-4 text-red-600">{{ error }}</p>
  </div>
</template>
