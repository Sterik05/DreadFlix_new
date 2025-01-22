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

<style>
.card-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px; /* Spazio tra le card */
    padding: 16px; /* Padding del contenitore */
}

.card-link {
    text-decoration: none; /* Rimuove la sottolineatura */
}

.card {
    background-color: #2c2c2c; /* Colore di sfondo della card */
}

.card:hover{
    border-radius: 12px; /* Angoli arrotondati */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); /* Ombra della card */
    overflow: hidden; /* Nasconde il contenuto che esce dai bordi */
    transition: transform 0.2s, box-shadow 0.2s; /* Transizione per l'effetto hover */
}

.card:hover {
    transform: scale(1.02); /* Effetto di ingrandimento al passaggio del mouse */
    box-shadow: 0 6px 20px rgb(255, 0, 0); /* Ombra più intensa al passaggio del mouse */
}

.image {
    width: 100%; /* Immagine a larghezza piena */
    height: auto; /* Altezza automatica per mantenere le proporzioni */
    border-bottom: 4px solid #ba2323; /* Bordo inferiore per l'immagine */
}

.card-content {
    padding: 16px; /* Padding interno della card */
    color: #ffffff; /* Colore del testo */
    font-family: 'Roboto', sans-serif; /* Font importato */
}

.card-title {
    font-size: 1.4em; /* Dimensione del titolo */
    margin: 0; /* Rimuove il margine */
    font-weight: bold; /* Grassetto per il titolo */
}

.card-popularity,
.card-vote,
.card-language {
    margin: 4px 0; /* Margine verticale per i paragrafi */
    font-size: 0.9em; /* Dimensione del testo per le informazioni */
    color: #cccccc; /* Colore del testo per le informazioni */
    font-family: 'Roboto', sans-serif; /* Font per le informazioni */
}
</style>