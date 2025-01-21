<template>
    <router-link :to="`/movie/${movie.id}`" class="card-link">
      <div class="card">
        <img class="image" :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title" :title="movie.original_title">
        <div class="card-content">
          <h2 class="card-title">{{ movie.original_title }}</h2>
          <p class="card-popularity">Popularity: {{ movie.popularity }}</p>
          <p class="card-vote">Rating: {{ movie.vote_average }}</p>
          <p class="card-language">Language: {{ movie.original_language }}</p>
        </div>
      </div>
    </router-link>
  </template>


<script>
export default {
    props: {
        movie: { type: Object, required: true }
    }
}
</script>

<style scoped>
.card-container {
    display: flex; /* Utilizza Flexbox per il layout */
    flex-wrap: wrap; /* Permette alle card di andare a capo se non c'è spazio */
    justify-content: space-around; /* Spaziatura uniforme tra le card */
    margin: 20px; /* Margine esterno per il contenitore */
}

.card-link {
    text-decoration: none; /* Rimuove la sottolineatura dal link */
}

.card {
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc; /* Bordo per la card */
    border-radius: 8px; /* Angoli arrotondati */
    overflow: hidden; /* Nasconde il contenuto che esce dai bordi */
    transition: transform 0.2s; /* Transizione per l'effetto hover */
    margin: 10px; /* Margine tra le card */
    max-width: 200px; /* Larghezza massima per la card */
}

.card:hover {
    transform: scale(1.05); /* Effetto di ingrandimento al passaggio del mouse */
}

.image {
    width: 100%; /* L'immagine occupa tutta la larghezza della card */
    height: auto; /* Mantiene le proporzioni dell'immagine */
}

.card-content {
    padding: 10px; /* Padding interno per il contenuto della card */
}

.card-title {
    font-size: 1.2em; /* Dimensione del titolo */
    margin: 0; /* Rimuove il margine */
}

.card-popularity,
.card-vote,
.card-language {
    margin: 5px 0; /* Margine verticale per i paragrafi */
    font-size: 0.9em; /* Dimensione del testo per le informazioni */
}
</style>