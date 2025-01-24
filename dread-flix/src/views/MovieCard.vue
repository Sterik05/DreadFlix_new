<template>
    <router-link :to="`/movie/${movie.id}`" class="card-link">
      <div class="card">
        <img class="image" :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title" :title="movie.original_title">
        <div class="card-content">
          <h2 class="card-title">{{ movie.title }}</h2>
          <p class="card-popularity">{{ $t( 'popularity' )}}: {{ movie.popularity }}</p>
          <p class="card-vote">{{ $t( 'rating' )}}: {{ movie.vote_average }}</p>
          <p class="card-language">{{ $t( 'originalLanguage' )}}: {{ movie.original_language }}</p>
        </div>
      </div>
    </router-link>
</template>

<script>
export default {
    props: {
        movie: { type: Object, required: true },
        language: { type: String, default: 'en' }
    },
    computed: {
        movieTitle() {
            return this.language === 'it' ? this.movie.title_it : this.movie.title;
        }
    }
}
</script>

<style>
.card-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px; 
    padding: 16px; 
}

.card-link {
    text-decoration: none; 
}

.card {
    background-color: #2c2c2c; 
}

.card:hover {
    border-radius: 12px; 
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); 
    overflow: hidden; 
    transition: transform 0.2s, box-shadow 0.2s; 
}

.card:hover {
    transform: scale(1.02); 
    box-shadow: 0 6px 20px rgb(255, 0, 0); 
}

.image {
    width: 100%; 
    height: auto; 
    border-bottom: 4px solid #ba2323; 
}

.card-content {
    padding: 16px; 
    color: #ffffff; 
    font-family: 'Roboto', sans-serif; 
}

.card-title {
    font-size: 1.4em;
    margin: 0; 
    font-weight: bold; 
 }

.card-popularity,
.card-vote,
.card-language {
    margin: 4px 0; 
    font-size: 0.9em; 
    color: #cccccc; 
    font-family: 'Roboto', sans-serif; 
}
</style>