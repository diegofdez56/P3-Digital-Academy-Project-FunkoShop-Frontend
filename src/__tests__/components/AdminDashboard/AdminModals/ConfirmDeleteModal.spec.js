import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import ConfirmDeleteModal from '@/components/AdminDashboard/AdminModals/ConfirmDeleteModal.vue'
import BaseButton from '@/components/BaseComponents/BaseButton.vue'

describe('ConfirmDeleteModal.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(ConfirmDeleteModal, {
      global: {
        components: { BaseButton }
      }
    });
  });

  it('renders correctly', () => {
    expect(wrapper.text()).toContain('Confirm Delete');
    expect(wrapper.text()).toContain('Are you sure you want to delete this product?');
  });

  it('emits "cancel" event when cancel button is clicked', async () => {
    const cancelButton = wrapper.findAll('button')[0];
    await cancelButton.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('cancel');
  });

  it('emits "confirm" event when delete button is clicked', async () => {
    const confirmButton = wrapper.findAll('button')[1];
    await confirmButton.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('confirm');
  });
});
