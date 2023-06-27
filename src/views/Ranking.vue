<script setup lang="ts">
import { computed } from 'vue';
import { useDisplay } from 'vuetify';
import { useVote } from '@/composables/useVote';

const display = useDisplay();
const { photos } = useVote();

const photosSortedByRatingDesc = photos.value.sort(
  (a, b) => b.rating - a.rating
);
const cols = computed(() =>
  display.xl.value ? 3 : display.lg.value ? 4 : display.md.value ? 6 : 12
);
</script>

<template>
  <section class="w-100 h-100 d-flex flex-column justify-center align-center">
    <h1 class="mt-10 mb-5 text-h3">Ranking</h1>
    <p class="px-4 mb-5 text-h6 font-weight-regular">
      Here's the final ranking of photos based on the votes you've submitted:
    </p>
    <v-container>
      <v-row dense no-gutters>
        <v-col
          v-for="(photo, index) in photosSortedByRatingDesc"
          class="px-4 py-4 d-flex justify-center"
          :key="photo.fileName"
          :cols="cols"
        >
          <v-card max-width="480" max-height="270">
            <v-img
              :src="`/images/${photo.fileName}`"
              :alt="photo.altText"
              class="align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              :aspect-ratio="16 / 9"
            >
              <v-card-title class="text-white">
                {{ `#${index + 1} (Rating: ${photo.rating.toFixed(2)})` }}
              </v-card-title>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
