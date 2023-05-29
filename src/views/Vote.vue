<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { storage } from '@/appwrite';

const isLoading = ref(true);
const testImages = ref<string[]>([]);

function randomNum(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

onMounted(async () => {
  try {
    const { files } = await storage.listFiles('photos');
    const urls = files.map(
      ({ $id }) => storage.getFileView('photos', $id).href
    );

    console.log(urls.join('\n\n'));

    for (let i = 0; i < 2; i++) {
      const randomUrlIndex = randomNum(0, urls.length - 1);
      testImages.value.push(urls[randomUrlIndex]);
      urls.splice(randomUrlIndex, 1);
    }
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <section class="w-100 h-100 d-flex flex-column justify-center align-center">
    <div class="text-center">
      <h1 class="mt-4 mb-2 text-h3">Vote</h1>
      <p class="px-4 text-h6 font-weight-regular">
        Which photo do you like more? Click one of three buttons below to
        choose.
      </p>
    </div>
    <div
      class="py-lg-6 py-3 d-flex flex-lg-row flex-lg-row flex-column align-center"
    >
      <div
        v-for="(imgUrl, index) in testImages"
        :key="imgUrl"
        class="d-flex flex-column align-center px-5 py-4"
      >
        <v-img :src="imgUrl" max-width="480" :aspect-ratio="16 / 9" />
        <p class="mt-2 text-h6">Photo {{ index + 1 }}</p>
      </div>
    </div>
    <div id="vote-btns" class="mb-4 d-flex justify-center flex-wrap">
      <v-btn size="large">Photo 1</v-btn>
      <v-btn size="large">Photo 2</v-btn>
      <v-btn size="large">I can't decide</v-btn>
    </div>
  </section>
</template>

<style scoped>
#vote-btns {
  gap: 1.25rem;
}
</style>
