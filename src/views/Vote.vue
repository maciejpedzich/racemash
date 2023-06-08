<script lang="ts" setup>
import { useVote } from '@/composables/useVote';

const { photosInCurrentVote } = useVote();
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
        v-for="(photo, index) in photosInCurrentVote"
        :key="photo.fileName"
        class="d-flex flex-column align-center px-5 py-4"
      >
        <v-img
          :src="`/images/${photo.fileName}`"
          :alt="photo.altText"
          :aspect-ratio="16 / 9"
          max-width="480"
        />
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
