<template>
  <PageLoader v-if="isLoading" />
  <div v-if="!isLoading">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import PageLoader from '~/components/PageLoader.vue'
PageLoader

const isLoading = ref(true);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 3000);
});
</script>





