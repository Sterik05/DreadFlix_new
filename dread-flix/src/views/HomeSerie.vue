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
                :key="serie.id_meta"
                :serie="serie"
                :language="currentLanguage"> <!-- Passa la lingua corrente -->
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
            searchQuery: '', 
            currentPage: 1, 
            totalPages: 0, 
            maxSeriesPerLoad: 5,
            thresholdOffset: 200,
            currentLanguage: this.$root.currentLanguage // Aggiungi la lingua corrente
        };
    },
    computed: {
        filteredSeries() {
            return this.series.filter(serie => {
                return serie.name.toLowerCase().includes(this.searchQuery.toLowerCase());
            });
        }
    },
    methods: {
        getSeries(page = 1) {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    //Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MzQ2NGZlNjdjYTQ1YWE0MDg1Y2QxMzA0OTk5Yjc5MyIsIm5iZiI6MTY5MDk2MjA5NC40Njg5OTk5LCJzdWIiOiI2NGNhMDhhZWRkODNmYTAwYWRiNGI0ZDAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.FJef0RjOXu5g5Ff7Vi3DpvtxmDxZKpdDVl_z-pliYXY'
                }
            };

            fetch(`http://localhost/netflix_php/read/tv?language=${this.currentLanguage}&page=${page}`, options)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    if (page === 1) {
                        this.series = data.results;
                    } else {
                        this.series = [...this.series, ...data.results.slice(0, this.maxSeriesPerLoad)];
                    }
                    this.totalPages = data.total_pages;
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
                this.getSeries(this.currentPage);
            }
        }
    },
    mounted() {
        this.getSeries();
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
};
</script>

<style>
.homeSerie {
    padding: 16px; 
}

.search-input {
    width: 98%; 
    padding: 8px; 
    margin-bottom: 16px; 
    border: 1px solid #ccc; 
    border-radius: 4px; 
}

.series {
    display: grid; 
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); 
    gap: 60px; 
}
</style>