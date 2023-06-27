import { computed, reactive, ref, toRefs, watchEffect } from 'vue';
import glicko2 from 'glicko2-lite';

import defaultPhotos from '@/photos.json';
import { Database, Photo } from '@/models';
import { randomNumber } from '@/utils/randomNumber';

const db = reactive<Database>(
  JSON.parse(localStorage.getItem('db') as string) || {
    photos: defaultPhotos,
    votes: [],
    shownFactIndexes: []
  }
);

const photosInCurrentVote = ref<Photo[]>([]);

// We need to calculate the number of pairs we can create from a set of n photos.
// // Since the order in which the photos are picked doesn't matter,
// the number of all votes a user can submit equals "n choose 2".
// This can be simplified to: (n * (n - 1)) / 2
const NUM_POSSIBLE_VOTES = (db.photos.length * (db.photos.length - 1)) / 2;

const completionPercentage = computed(
  () => (db.votes.length / NUM_POSSIBLE_VOTES) * 100
);

const userSubmittedAllVotes = computed(
  () => completionPercentage.value === 100
);

const userReachedTriviaMilestone = computed(() =>
  [25, 50, 75].includes(completionPercentage.value)
);

const pickPhotosForNewVote = () => {
  if (userSubmittedAllVotes.value) return;

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

    const fileNamesToExclude = new Set([
      firstPick.fileName,
      ...votesWithFirstPick.flatMap(({ photos }) => photos)
    ]);

    return fileNamesToExclude.has(fileName) === false;
  });

  const secondPick =
    photosForSecondPick[randomNumber(0, photosForSecondPick.length - 1)];

  photosInCurrentVote.value = [firstPick, secondPick];
};

const submitVote = (result: 0 | 0.5 | 1) => {
  const photos = photosInCurrentVote.value.map(({ fileName }) => fileName) as [
    string,
    string
  ];

  db.votes.unshift({ photos, result });

  if (db.votes.length % 12 === 0) {
    updateRatings();
  }

  pickPhotosForNewVote();
};

const updateRatings = () => {
  // The first vote in the array is the most recent one.
  // Therefore calling reverse will order these votes chronologically.
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
    ...toRefs(db),
    photosInCurrentVote,
    completionPercentage,
    userReachedTriviaMilestone,
    userSubmittedAllVotes,
    pickPhotosForNewVote,
    submitVote
  };
}
