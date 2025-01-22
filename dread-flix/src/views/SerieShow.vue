<template>
        <router-link to="/series" class="back">
            <img src="C:\Users\ricca\OneDrive\Desktop\PCTO\progetti finali\DreadFlix\dread-flix\public\freccia.svg" alt="Home" class="home-icon" ></img>
        </router-link>
    <section v-if="serie" class="serie">
        <h1 class="title">{{ serie.name }}</h1>
        <div class="serie-details">
            <img :src="`https://image.tmdb.org/t/p/w500${serie.poster_path}`" :alt="serie.title">
            <div class="serie-info">
                <p class="serie-description">{{ serie.overview }}</p>
                <p><strong>Language:</strong> {{ serie.original_language }}</p>
                <p><strong>First Air Date:</strong> {{ serie.first_air_date }}</p>
                <p><strong>Rating:</strong> {{ serie.vote_average }}</p>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            serie: null,
        };
    },
    props: {
        id: { type: String, required: true },
    },
    methods: {
        getSerie() {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MzQ2NGZlNjdjYTQ1YWE0MDg1Y2QxMzA0OTk5Yjc5MyIsIm5iZiI6MTY5MDk2MjA5NC40Njg5OTk5LCJzdWIiOiI2NGNhMDhhZWRkODNmYTAwYWRiNGI0ZDAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.FJef0RjOXu5g5Ff7Vi3DpvtxmDxZKpdDVl_z-pliYXY',
                },
            };

            // Cambia l'URL per ottenere i dettagli della serie
            fetch(`https://api.themoviedb.org/3/tv/${this.id}?language=en-US`, options)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    this.serie = data; // Imposta la serie con i dettagli
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        },
    },
    mounted() {
        this.getSerie(); // Chiama il metodo per ottenere i dettagli della serie
    },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

.serie {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #293133; /* Colore di sfondo originale */
  font-family: 'Bebas Neue', sans-serif; /* Font simile a quello di Netflix */
  color: #fff;
  min-height: 100vh; 
}

.serie-details {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 20px;
  gap: 20px; /* Spaziatura tra i dettagli */
  
}

.serie-info {
  text-align: left;
  
}

.serie img {
  max-width: 250px; /* Dimensione massima per l'immagine */
  border-radius: 8px; /* Angoli arrotondati per l'immagine */
  margin-right: 20px; /* Margine a destra per separare l'immagine dal testo */
}

.title {
  font-size: 5em; /* Dimensione del titolo più grande */
  margin-bottom: 10px;
}

.serie-description {
  max-width: 700px; /* Larghezza massima per la descrizione */
  text-align: justify; /* Giustifica il testo */
  line-height: 1.6; /* Maggiore spaziatura tra le righe */
  margin-top: 10px; /* Margine superiore per la descrizione */
  font-size: 1.5em;
}

.back {
  margin-bottom: 20px; /* Spazio tra il link e il titolo */
}

.home-icon {
  width: 60px; /* Dimensione dell'icona */
  height: 60px; /* Dimensione dell'icona */
}
</style>