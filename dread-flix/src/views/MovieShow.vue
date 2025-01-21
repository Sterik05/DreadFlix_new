<template>
    <section v-if="movie" class="movie">
        <h1 class="title">{{ movie.original_title }}</h1>
        <div class="movie-details">
            <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title">
        <div class="movie-info">
            <p class="movie-description">{{ movie.overview }}</p>
            <p><strong>Language:</strong> {{ movie.original_language }}</p>
            <p><strong>Release Date:</strong> {{ movie.release_date }}</p>
            <p><strong>Rating:</strong> {{ movie.vote_average }}</p>
        </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            movies: [],
            movie: null
        };
    },
    methods: {
        getMovies() {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MzQ2NGZlNjdjYTQ1YWE0MDg1Y2QxMzA0OTk5Yjc5MyIsIm5iZiI6MTY5MDk2MjA5NC40Njg5OTk5LCJzdWIiOiI2NGNhMDhhZWRkODNmYTAwYWRiNGI0ZDAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.FJef0RjOXu5g5Ff7Vi3DpvtxmDxZKpdDVl_z-pliYXY'
                }
            };

            fetch('https://api.themoviedb.org/3/movie/popular?language=en&page=1', options)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    this.movies = data.results;
                    this.setMovie();
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        },
        setMovie() {
            this.movie = this.movies.find(movie => movie.id === Number(this.id));
        }
    },
    props: {
        id: { type: String, required: true }
    },
    mounted() {
        this.getMovies();
    }
}
</script>



<style scoped>
.movie {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.movie-details {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    margin-top: 20px;
}

.movie-info {
    margin-left: 20px;
}

.movie img {
    max-width: 200px; /* Dimensione massima per l'immagine */
    border-radius: 8px; /* Angoli arrotondati per l'immagine */
}

.title {
    font-size: 2em;
    margin-bottom: 10px;
}

.movie-description {
    max-width: 400px; /* Larghezza massima per la descrizione */
    text-align: justify; /* Giustifica il testo */
}
</style>