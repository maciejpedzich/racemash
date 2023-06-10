import { reactive, ref, toRefs, watchEffect } from 'vue';
import glicko2 from 'glicko2-lite';

import defaultPhotos from '@/photos.json';
import { Database, Photo } from '@/models';
import { randomNumber } from '@/utils/randomNumber';

const db = reactive<Database>(
  JSON.parse(localStorage.getItem('db') as string) || {
    photos: defaultPhotos,
    votes: []
  }
);

const photosInCurrentVote = ref<Photo[]>([]);

const pickPhotosForNewVote = () => {
  const photosForFirstPick = db.photos.filter(({ fileName }) => {
    const appearanceCount = db.votes.filter((vote) =>
      vote.photos.includes(fileName)
    ).length;

    return appearanceCount !== db.photos.length - 1;
  });

  const firstPick =
    photosForFirstPick[randomNumber(0, photosForFirstPick.length - 1)];

  const photosForSecondPick = db.photos.filter(({ fileName }) => {
    const votesWithFirstPick = db.votes.filter(({ photos }) =>
      photos.includes(firstPick.fileName)
    );

    const fileNamesToExclude = [
      firstPick.fileName,
      ...votesWithFirstPick.flatMap(({ photos }) => photos)
    ];

    return !fileNamesToExclude.includes(fileName);
  });

  const secondPick =
    photosForSecondPick[randomNumber(0, photosForSecondPick.length - 1)];

  photosInCurrentVote.value = [firstPick, secondPick];
};

const submitVote = (result: 0 | 0.5 | 1) => {
  const photos = [...photosInCurrentVote.value].map(
    ({ fileName }) => fileName
  ) as [string, string];

  db.votes.unshift({ photos, result });

  if (db.votes.length % 12 === 0) {
    updateRatings();
  }

  pickPhotosForNewVote();
};

const updateRatings = () => {
  const twelveMostRecentVotes = db.votes.slice(0, 12).reverse();

  const votesGrouppedByPhotos = twelveMostRecentVotes.reduce((obj, vote) => {
    for (const [index, fileName] of vote.photos.entries()) {
      const opponentFileName = vote.photos[1 - index];
      const opponent = db.photos.find(
        ({ fileName }) => fileName === opponentFileName
      )!;

      const voteParams = [
        opponent.rating,
        opponent.rd,
        index === 0 ? vote.result : 1 - vote.result
      ] as [number, number, number];

      if (obj[fileName]) {
        obj[fileName].push(voteParams);
      } else {
        obj[fileName] = [voteParams];
      }
    }

    return obj;
  }, {} as Record<string, [number, number, number][]>);

  for (const [photoFileName, voteHistory] of Object.entries(
    votesGrouppedByPhotos
  )) {
    const photo = db.photos.find(({ fileName }) => fileName === photoFileName)!;
    const updatedRatingParams = glicko2(
      photo.rating,
      photo.rd,
      photo.vol,
      voteHistory
    );

    Object.assign(photo, updatedRatingParams);
  }
};

watchEffect(() => localStorage.setItem('db', JSON.stringify(db)));

export function useVote() {
  return {
    photosInCurrentVote,
    pickPhotosForNewVote,
    submitVote,
    updateRatings,
    ...toRefs(db)
  };
}
