<script setup>
import AdminHeading from '@/components/AdminDashboard/AdminHeading.vue';
import OrdersTable from '@/components/AdminDashboard/AdminTables/OrdersTable.vue';

</script>

<template>
    <div>
        <AdminHeading title="Orders Management" />

        <OrdersTable ref="productTableRef" />
    </div>
</template>
  
  
  
<style scoped>
</style>