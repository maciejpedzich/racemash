<template>
  <section
    class="w-100 h-100 px-6 text-center d-flex flex-column justify-center align-center"
  >
    <h1 class="mb-md-6 mb-3 text-md-h1 text-h2">RaceMash</h1>
    <p class="mb-md-9 mb-5 text-md-h4 text-h5 font-weight-regular">
      It's like FaceMash, but with photos of F1 cars
    </p>
    <div id="hero-btns" class="d-flex justify-center flex-wrap mb-12">
      <v-btn color="primary" size="large" to="/vote">Vote</v-btn>
      <v-btn size="large" to="/about">Tell me more</v-btn>
    </div>
  </section>
</template>

<style scoped>
#hero-btns {
  gap: 1.25rem;
}
</style>
