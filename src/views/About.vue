<template>
  <section class="w-100 h-100 px-6 py-6 d-flex flex-column justify-center">
    <h2 class="text-h2 text-center mb-6">About</h2>
    <div id="about">
      <p class="mb-6 text-h5 font-weight-regular">
        In RaceMash, you're presented with two randomly picked photographs of F1
        cars from the 2022 season. Below them you'll find buttons for placing a
        vote for one of the images and an extra one for declaring a draw. Once
        you've placed your vote, another pair of images gets picked and the
        cycle continues.
      </p>
      <p class="mb-6 text-h5 font-weight-regular">
        Every vote you submit gradually fills up a progress bar and if you reach
        25%, 50%, or 75%, you'll be awarded a fun fact about Formula One. If you
        submit all votes, you unlock a ranking page that reveals the photos'
        final ratings, where the images are ordered by said ratings
        descendingly.
      </p>
      <p class="mb-6 text-h5 font-weight-regular">
        But how are these ratings calculated? RaceMash utilises
        <a
          href="http://www.glicko.net/glicko/glicko2.pdf"
          target="_blank"
          rel="noopener noreferrer"
          >the Glicko-2 system</a
        >, where each photo starts with a rating of 1500 points that gets
        updated using the aforementioned system every 12 votes you cast.
      </p>
      <p class="text-h5 font-weight-regular">
        This project was developed by
        <a
          href="https://maciejpedzi.ch"
          target="_blank"
          rel="noopener noreferrer"
          >Maciej Pędzich</a
        >
        and its source code is available under the Apache 2.0 License.
      </p>
    </div>
  </section>
</template>

<style scoped>
#about {
  width: min(65ch, 90%);
  margin: 0 auto;
}
</style>
