<template>
    <div class="homeSerie">
        <input
            type="text"
            v-model="searchQuery"
            placeholder="Cerca una serie..."
            class="search-input"
        />
        <div class="series">
            <SerieCard
                v-for="serie in filteredSeries"
                :key="serie.id"
                :serie="serie">
            </SerieCard>
        </div>
    </div>
</template>

<script>
import SerieCard from './SerieCard.vue';

export default {
    components: { SerieCard },
    data() {
        return {
            series: [],
            searchQuery: '' // Aggiungi una proprietà per la query di ricerca
        };
    },
    computed: {
        filteredSeries() {
            // Filtra le serie in base alla query di ricerca
            return this.series.filter(serie => {
                return serie.name.toLowerCase().includes(this.searchQuery.toLowerCase());
            });
        }
    },
    methods: {
        getSeries() {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MzQ2NGZlNjdjYTQ1YWE0MDg1Y2QxMzA0OTk5Yjc5MyIsIm5iZiI6MTY5MDk2MjA5NC40Njg5OTk5LCJzdWIiOiI2NGNhMDhhZWRkODNmYTAwYWRiNGI0ZDAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.FJef0RjOXu5g5Ff7Vi3DpvtxmDxZKpdDVl_z-pliYXY'
                }
            };

            fetch('https://api.themoviedb.org/3/trending/tv/day?language=en-US', options)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    this.series = data.results;
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        }
    },
    mounted() {
        this.getSeries();
    }
}
</script>

<style>
.homeSerie {
    padding: 16px; /* Padding per il contenitore principale */
}

.search-input {
    width: 98%; /* Larghezza del campo di ricerca */
    padding: 8px; /* Padding interno */
    margin-bottom: 16px; /* Margine inferiore */
    border: 1px solid #ccc; /* Bordo del campo di ricerca */
    border-radius: 4px; /* Angoli arrotondati */
}

.series {
    display: grid; /* Imposta il contenitore delle card come griglia */
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* Colonne automatiche con larghezza minima */
    gap: 16px; /* Spazio tra le card */
}
</style>