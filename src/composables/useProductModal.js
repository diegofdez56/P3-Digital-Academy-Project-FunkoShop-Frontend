import { ref } from 'vue';

export function useProductModal() {
  const isModalOpen = ref(false);

  const openModal = () => {
    isModalOpen.value = true;
  };

  const closeModal = () => {
    isModalOpen.value = false;
  };

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
}
