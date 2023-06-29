<template>
  <section
    class="w-screen h-screen text-center d-flex flex-column justify-center align-center"
  >
    <h1 class="mb-lg-6 mb-3 text-lg-h1 text-h2">RaceMash</h1>
    <p class="mb-lg-9 mb-5 text-lg-h4 text-h5 font-weight-regular">
      It's like FaceMash, but with photos of F1 cars
    </p>
    <div id="hero-btns" class="d-flex justify-center flex-wrap mb-12">
      <v-btn color="primary" size="large" to="/vote">Play</v-btn>
      <v-btn size="large" to="#about">Tell me more</v-btn>
    </div>
  </section>
  <section
    id="about"
    class="w-100 py-10 d-flex flex-column justify-center bg-grey-darken-4"
  >
    <h2 class="text-h2 text-center mb-10">About</h2>
    <div class="w-50 mx-auto my-0">
      <p class="mb-6 text-h5 font-weight-regular">
        In RaceMash, you're presented with two randomly picked photographs of F1
        cars from the 2022 season. Below them you'll find buttons for placing a
        vote for one of the images and an extra one for declaring a draw. Once
        you've placed your vote, another pair of images gets picked and the
        cycle continues.
      </p>
      <p class="mb-6 text-h5 font-weight-regular">
        Every vote you submit gradually fills up a progress bar and if you reach
        25%, 50%, or 75%, you'll be awarded a fun fact about Formula One. Once
        you've submitted all votes, you unlock a ranking page that reveals the
        photos' final ratings, where the images are ordered by said ratings
        descendingly.
      </p>
      <p class="mb-6 text-h5 font-weight-regular">
        But how are these ratings calculated? Each photograph has a base rating
        of 1500 points (as well as a few other parameters you don't need to
        worry about) that gets updated using
        <a
          href="http://www.glicko.net/glicko/glicko2.pdf"
          target="_blank"
          rel="noopener noreferrer"
          >the Glicko-2 system</a
        >
        every 12 votes you cast.
      </p>
    </div>
  </section>
</template>

<style scoped>
#hero-btns {
  gap: 1.25rem;
}
</style>
