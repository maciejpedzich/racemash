import { computed, reactive, ref, toRefs, watchEffect } from 'vue';
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

const photosForFirstPick = computed(() =>
  db.photos.filter(({ fileName }) => {
    const appearanceCount = db.votes.filter((vote) =>
      vote.photos.includes(fileName)
    ).length;

    return appearanceCount !== db.photos.length - 1;
  })
);

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
      firstPick.fileName,
      ...new Set(votesWithFirstPick.flatMap(({ photos }) => photos))
    ];

    return !fileNamesToExclude.includes(fileName);
  });

  const secondPick =
    photosForSecondPick[randomNumber(0, photosForSecondPick.length - 1)];

  photosInCurrentVote.value = [firstPick, secondPick];
};

const submitVote = (result: 0 | 0.5 | 1) => {
  const fileNames = ([...photosInCurrentVote.value] as Photo[]).map(
    ({ fileName }) => fileName
  ) as [string, string];

  db.votes.unshift({ photos: fileNames, result });

  if (db.votes.length % 12 === 0) {
    updateRatings();
  }

  pickPhotosForNewVote();
};

const updateRatings = () => {
  const twelveMostRecentVotes = db.votes.slice(0, 12).reverse();

  const votesGrouppedByPhotos = twelveMostRecentVotes.reduce((obj, vote) => {
    const [firstFileName, secondFileName] = vote.photos;

    const secondPhoto = db.photos.find(
      ({ fileName }) => fileName === secondFileName
    )!;

    const paramsVersusSecondPhoto = [
      secondPhoto.rating,
      secondPhoto.rd,
      vote.result
    ] as [number, number, number];

    if (obj[firstFileName]) {
      obj[firstFileName].push(paramsVersusSecondPhoto);
    } else {
      obj[firstFileName] = [paramsVersusSecondPhoto];
    }

    const firstPhoto = db.photos.find(
      ({ fileName }) => fileName === firstFileName
    )!;

    const paramsVersusFirstPhoto = [
      firstPhoto.rating,
      firstPhoto.rd,
      1 - vote.result
    ] as [number, number, number];

    if (obj[secondFileName]) {
      obj[secondFileName].push(paramsVersusFirstPhoto);
    } else {
      obj[secondFileName] = [paramsVersusFirstPhoto];
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
    photosForFirstPick,
    pickPhotosForNewVote,
    submitVote,
    updateRatings,
    ...toRefs(db)
  };
}
