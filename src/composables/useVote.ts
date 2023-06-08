import { computed, reactive, ref, toRefs } from 'vue';
import glicko2 from 'glicko2-lite';

import photos from '@/photos.json';
import { Database, Photo } from '@/models';
import { randomNumber } from '@/utils/randomNumber';

const db = reactive<Database>(
  JSON.parse(localStorage.getItem('db') as string) || {
    photos,
    votes: []
  }
);

const photosInCurrentVote = ref<Photo[]>([]);

const photosForFirstPick = computed(() =>
  db.photos.filter(({ fileName }) => {
    const appearanceCount = db.votes.filter((vote) =>
      vote.photos.includes(fileName)
    ).length;

    return appearanceCount !== db.photos.length - 1;
  })
);

export function useVote() {
  const pickPhotosForNewVote = () => {
    const firstPick =
      photosForFirstPick.value[
        randomNumber(0, photosForFirstPick.value.length - 1)
      ];

    const photosForSecondPick = db.photos.filter(({ fileName }) => {
      const votesWithFirstPick = db.votes.filter(({ photos }) =>
        photos.includes(firstPick.fileName)
      );

      const fileNamesToExclude = [
        ...new Set(votesWithFirstPick.flatMap(({ photos }) => photos))
      ];

      return !fileNamesToExclude.includes(fileName);
    });

    const secondPick =
      photosForSecondPick[randomNumber(0, photosForSecondPick.length - 1)];

    photosInCurrentVote.value.push(firstPick, secondPick);
  };

  const submitVote = (result: 0 | 0.5 | 1) => {
    const fileNames = [...photosInCurrentVote.value].map(
      ({ fileName }) => fileName
    ) as [string, string];

    db.votes.unshift({ photos: fileNames, result });
    photosInCurrentVote.value = [];
    pickPhotosForNewVote();
  };

  const updateRatings = () => {
    const twelveMostRecentVotes = db.votes.slice(0, 12).reverse();

    const votesGrouppedByPhotos = twelveMostRecentVotes.reduce((obj, vote) => {
      const [firstPick, secondPick] = vote.photos;

      const firstPhoto = db.photos.find(
        ({ fileName }) => fileName === firstPick
      )!;
      const secondPhoto = db.photos.find(
        ({ fileName }) => fileName === secondPick
      )!;

      const firstPhotoOpponentParams = [
        secondPhoto.rating,
        secondPhoto.rd,
        vote.result
      ] as [number, number, number];

      const secondPhotoOpponentParams = [
        firstPhoto.rating,
        firstPhoto.rd,
        1 - vote.result
      ] as [number, number, number];

      if (obj[firstPick]) {
        obj[firstPick].push(firstPhotoOpponentParams);
      } else {
        obj[firstPick] = [firstPhotoOpponentParams];
      }

      if (obj[secondPick]) {
        obj[secondPick].push(secondPhotoOpponentParams);
      } else {
        obj[secondPick] = [secondPhotoOpponentParams];
      }

      return obj;
    }, {} as Record<string, [number, number, number][]>);

    for (const [photoFileName, votes] of Object.entries(
      votesGrouppedByPhotos
    )) {
      const photo = db.photos.find(
        ({ fileName }) => fileName === photoFileName
      )!;
      const newRatingParams = glicko2(photo.rating, photo.rd, photo.vol, votes);

      Object.assign(photo, newRatingParams);
    }
  };

  return {
    photosInCurrentVote,
    photosForFirstPick,
    createVote: pickPhotosForNewVote,
    submitVote,
    updateRatings,
    ...toRefs(db)
  };
}
