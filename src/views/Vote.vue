<script lang="ts" setup>
import { computed, onMounted, ref, reactive } from 'vue';
import { Query } from 'appwrite';

import { databases } from '@/appwrite';
import { useAuth } from '@/composables/useAuth';
import { useSnackbar } from '@/composables/useSnackbar';
import { useRandomNumber } from '@/composables/useRandomNumber';

import { Vote } from '@/models/vote';
import { Photo } from '@/models/photo';
import { PhotoAppearanceCount } from '@/models/photoAppearanceCount';

const { user } = useAuth();
const { showSnackbar } = useSnackbar();
const randomNumber = useRandomNumber();

const isLoading = ref(true);
const photoAppearanceCount = reactive<Record<string, number>>({});
const photosInCurrentVote = ref<Photo[]>([]);

// Get IDs of photos that have appeared in votes between all the other photos
const idsOfPhotosPairedWithAll = computed(() =>
  Object.entries(JSON.parse(JSON.stringify(photoAppearanceCount)))
    // You shouldn't be able to vote between two identical photos.
    // That's why we need to subtract one from the number of photos.
    .filter(([, count]) => count === import.meta.env.VITE_NUMBER_OF_PHOTOS - 1)
    .map(([photoId]) => photoId)
);

const loadPhotosAppearanceCount = async () => {
  const { documents: photoAppearanceCountEntries } =
    await databases.listDocuments<PhotoAppearanceCount>(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_PHOTO_APPEARANCE_COUNT_COLLECTION_ID,
      [Query.equal('voterId', user.value?.$id as string)]
    );

  const appearanceCountRecord = photoAppearanceCountEntries.reduce(
    (record, { photoId, count }) => {
      record[photoId] = count;
      return record;
    },
    {} as Record<string, number>
  );

  Object.assign(photoAppearanceCount, appearanceCountRecord);
};

const pickRandomPhotosAndCreateVote = async () => {
  // Pick a random photo that hasn't been paired with every other photo in the user's votes

  const { documents: allPhotos } = await databases.listDocuments<Photo>(
    import.meta.env.VITE_DATABASE_ID,
    import.meta.env.VITE_PHOTOS_COLLECTION_ID
    // [
    //   Query.select(['photoId', 'url', 'altText']) -> Unsupported in Appwrite v1.1.2,
    //   Query.notEqual('photoId', idsOfPhotosPairedWithAll.value) -> Throws ambiguous Server Error
    // ]
  );

  const photo1Candidates = allPhotos.filter(
    ({ $id }) => !idsOfPhotosPairedWithAll.value.includes($id)
  );

  const maxPhoto1Index =
    import.meta.env.VITE_NUMBER_OF_PHOTOS -
    idsOfPhotosPairedWithAll.value.length -
    1;

  const photo1 = photo1Candidates[randomNumber(0, maxPhoto1Index)];

  // Get IDs of photos that have already been paired with photo1 in user's votes

  const idsOfPhotosPairedWithPhoto1 =
    // Select votes where photo1Id is equal to photo1's ID
    (
      await databases.listDocuments<Vote>(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_VOTES_COLLECTION_ID,
        [
          // Query.select(['photo2Id']),
          Query.equal('voterId', [user.value?.$id as string]),
          Query.search('photos', photo1.$id)
        ]
      )
    ).documents.flatMap((doc) =>
      Object.entries(doc)
        .filter(([key]) => key === 'photos')
        .map(([, arrayOfPhotoIds]) =>
          arrayOfPhotoIds.filter((id: string) => id !== photo1.$id)
        )
    );

  // Pick a random photo that isn't photo1 and that hasn't been paired with it in any of the user's votes

  const photo2IdsToExclude = [
    photo1.$id,
    ...idsOfPhotosPairedWithPhoto1,
    ...idsOfPhotosPairedWithAll.value
  ];

  const { documents: photo2Candidates } = await databases.listDocuments<Photo>(
    import.meta.env.VITE_DATABASE_ID,
    import.meta.env.VITE_PHOTOS_COLLECTION_ID,
    [Query.notEqual('$id', photo2IdsToExclude)]
  );

  const maxPhoto2Index =
    import.meta.env.VITE_NUMBER_OF_PHOTOS - photo2IdsToExclude.length - 1;

  const photo2 = photo2Candidates[randomNumber(0, maxPhoto2Index)];

  photosInCurrentVote.value.push(photo1, photo2);
};

onMounted(async () => {
  try {
    await loadPhotosAppearanceCount();
    await pickRandomPhotosAndCreateVote();
  } catch (error) {
    console.error(error);
    showSnackbar({
      status: 'error',
      message: 'Failed to load photos'
    });
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
        v-for="(photo, index) in photosInCurrentVote"
        :key="photo.$id"
        class="d-flex flex-column align-center px-5 py-4"
      >
        <v-img
          :src="photo.url"
          :alt="photo.altText"
          max-width="480"
          :aspect-ratio="16 / 9"
        />
        <p class="mt-2 text-h6">Photo {{ index + 1 }}</p>
      </div>
    </div>
    <div id="vote-btns" class="mb-4 d-flex justify-center flex-wrap">
      <v-btn :disabled="isLoading" size="large">Photo 1</v-btn>
      <v-btn :disabled="isLoading" size="large">Photo 2</v-btn>
      <v-btn :disabled="isLoading" size="large">I can't decide</v-btn>
    </div>
  </section>
</template>

<style scoped>
#vote-btns {
  gap: 1.25rem;
}
</style>
