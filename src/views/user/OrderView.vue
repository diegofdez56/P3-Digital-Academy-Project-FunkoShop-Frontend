<script setup>
import UserHeading from '@/components/UserManagement/UserHeading.vue'
import OrderTable from '@/components/UserManagement/UserTables/OrderTable.vue'
</script>
<template>
  <div class="w-full max-w-4xl px-4 py-8 mx-auto">
    <UserHeading title="My Orders" />
    <OrderTable />
  </div>
</template>