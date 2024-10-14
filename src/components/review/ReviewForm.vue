<script setup>
import { useAuthStore } from '@/stores/auth';
import { ReviewStore } from '@/stores/review/reviewStore';
import { onMounted, ref } from 'vue';


const reviewStore = ReviewStore()
const auth = useAuthStore()


const props = defineProps({
  orderItemId: Number,
})

const review = ref({
  id: 0,
  rating: 0,
  orderItem: 0
});

const message = ref('');
const error = ref('');
const forUpdated = ref(false);

async function getReviewUser() {
  try {
    error.value = '';
    message.value = '';
    const response = await reviewStore.getReviewByIdAndUser(props.orderItemId, auth.user.access_token);
    if (response) {
      review.value.id = response.id;
      review.value.rating = response.rating;
      review.value.orderItem = response.orderItem;
      forUpdated.value = true;
    }
  } catch (err) {
    error.value = 'Error getting review' + err;
  }
}

onMounted(() => {
  getReviewUser();
});


const setRating = (value) => {
  review.value.rating = value;
};

const submitReview = async () => {
  if (review.value.rating != 0) {
    if (!forUpdated.value)
      try {
        error.value = '';
        message.value = '';
        await reviewStore.addReview({
          rating: review.value.rating,
          orderItem: props.orderItemId
        }, auth.user.access_token);
        message.value = 'Review send successfully';
      } catch (err) {
        error.value = 'Error sending review';
      }
    else
      try {
        error.value = '';
        message.value = '';
        await reviewStore.updateReview(review.value, auth.user.access_token);
        message.value = 'Review updated successfully';
      } catch (err) {
        error.value = 'Error sending review';
      }
  }
  else
    error.value = 'Please select a rating';
};

</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <h2 class="text-lg font-semibold mb-4">Leave a review</h2>
    <form @submit.prevent="submitReview" class="space-y-4 w-full max-w-sm">
      <div class="flex justify-between">
        <label for="rating" class="block font-medium">Rating:</label>
        <div>
          <button v-for="value in [1, 2, 3, 4, 5]" :key="value" type="button" @click="setRating(value)" :class="{
            'text-yellow-500': value <= review.rating,
            'text-gray-400': value > review.rating
          }" class="text-2xl">
            ★
          </button>
        </div>
      </div>

      <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Send
      </button>
    </form>
    <p v-if="message" class="mt-4 text-green-600">{{ message }}</p>
    <p v-if="error" class="mt-4 text-red-600">{{ error }}</p>
  </div>
</template>
