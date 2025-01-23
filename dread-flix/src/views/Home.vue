<template>
    <div class="home">
        <input
            type="text"
            v-model="searchQuery"
            placeholder="Cerca un film..."
            class="search-input"
        />
        <div class="movies">
            <MovieCard
                v-for="movie in displayedMovies"
                :key="movie.id"
                :movie="movie">
            </MovieCard>
        </div>
    </div>
</template>

<script>
import MovieCard from './MovieCard.vue';

export default {
    components: { MovieCard },
    data() {
        return {
            movies: [],
            searchQuery: '', // Aggiungi una proprietà per la query di ricerca
            currentPage: 1,
            totalPages: 0,
            maxMovies: 5,
            thresholdOffset: 200
        };
    },
    computed: {
        filteredMovies() {
            // Filtra i film in base alla query di ricerca
            return this.movies.filter(movie => {
                return movie.title.toLowerCase().includes(this.searchQuery.toLowerCase());
            });
        },
        displayedMovies() {
            return this.filteredMovies;
        }
    },
    methods: {
        getMovies(page = 1) {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MzQ2NGZlNjdjYTQ1YWE0MDg1Y2QxMzA0OTk5Yjc5MyIsIm5iZiI6MTY5MDk2MjA5NC40Njg5OTk5LCJzdWIiOiI2NGNhMDhhZWRkODNmYTAwYWRiNGI0ZDAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.FJef0RjOXu5g5Ff7Vi3DpvtxmDxZKpdDVl_z-pliYXY'
                }
            };

            fetch(`https://api.themoviedb.org/3/movie/popular?language=en&page=${page}`, options)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.results) {
                        if (page === 1)
                        {
                            this.movies = data.results;
                        } else {
                            const limitedResults = data.results.slice(0, this.maxMovies);
                            this.movies = [...this.movies, ...limitedResults];
                        }
                        this.totalPages = data.total_pages;
                    } else {
                        console.warn('No results found for page:', page );
                    }
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        },
        handleScroll() {
            const scrollPosition = window.innerHeight + window.scrollY;
            const threshold = document.body.offsetHeight - this.thresholdOffset;

            if (scrollPosition >= threshold && this.currentPage < this.totalPages) {
                this.currentPage++;
                this.getMovies(this.currentPage); // Carica la pagina successiva
            }
        }
    },
    mounted() {
        this.getMovies(); // Carica i film della prima pagina
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
}
</script>

<style>
.home {
    padding: 16px; /* Padding per il contenitore principale */
}

.search-input {
    width: 98%; /* Larghezza del campo di ricerca */
    padding: 8px; /* Padding interno */
    margin-bottom: 16px; /* Margine inferiore */
    border: 1px solid #ccc; /* Bordo del campo di ricerca */
    border-radius: 4px; /* Angoli arrotondati */
}

.movies {
    display: grid; /* Imposta il contenitore delle card come griglia */
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* Colonne automatiche con larghezza minima */
    gap: 16px; /* Spazio tra le card */
}
</style>