<template>
  <MovieCard v-for="movie in available_movies" :movie_id="movie" :key="movie" />
</template>

<script setup lang="ts">
import { available_movies } from './assets/movies';
import MovieCard from './components/MovieCard.vue';
</script>
