<template>
  <router-link to="/movies" class="back">
      <img src="../../public/freccia.svg" alt="Home" class="home-icon" />
  </router-link>
  <section v-if="movie" class="movie">
      <h1 class="title">{{ movie.original_title }}</h1>
      <div class="movie-details">
          <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title">
          <div class="movie-info">
              <p class="movie-description">{{ movie.overview }}</p>
              <p><strong>{{ $t( 'originalLanguage' ) }}:</strong> {{ movie.original_language }}</p>
              <p><strong>{{ $t( 'releaseDate' ) }}:</strong> {{ movie.release_date }}</p>
              <p><strong>{{ $t( 'rating') }}:</strong> {{ movie.vote_average }}</p>
              <!-- Elemento per il rating -->
              <div class="star-rating">
                  <span 
                      v-for="star in 5" 
                      :key="star" 
                      @click="setRating(star)" 
                      @mouseover="hoverRating(star)" 
                      @mouseleave="resetRating" 
                      class="star" 
                      :class="{ 'filled': star <= (userRating || tempRating) }">
                      ★
                  </span>
              </div>
              <p><strong>{{ $t( 'yourRating' ) }}:</strong> {{ userRating }}</p>
              <!-- Modulo di recensione -->
              <div class="review-form">
                  <h2>{{ $t( 'reviewTitle' ) }}</h2>
                  <input 
                      type="email" 
                      v-model="email" 
                      placeholder="Enter your email" 
                      required 
                  />
                  <textarea v-model="reviewText" placeholder="Write your review here..." rows="4"></textarea>
                  <button @click="submitReview">{{ $t( 'submitReview' ) }}</button>
                  <div v-if="submitted" class="review-message">{{ $t( 'thankYou' ) }}</div>
              </div>
              <!-- Sezione per visualizzare le recensioni -->
              <div class="reviews">
                  <h2>{{ $t( 'reviews' ) }}:</h2>
                  <ul>
                      <li v-for="(review, index) in reviews" :key="index">
                          <p><strong>Email:</strong> {{ review.email }}</p>
                          <p><strong>{{ $t( 'rating' ) }}:</strong> {{ review.rating }} ★</p>
                          <p>{{ review.text }}</p>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      movies: [],
      movie: null,
      reviewText: '',
      email: '',
      submitted: false,
      userRating: 0,
      tempRating: 0,
      reviews: []
    };
  },
  props: {
    id_meta: { type: String, required: true },
    currentLanguage: { type: String, default: 'en' }
  },
  methods: {
    getMovies() {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
        }
      };

      fetch(`http://localhost/netflix_php/read/movie?id_meta=${this.id_meta}&language=${this.currentLanguage}`, options)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          this.movies = data.results;
          this.setMovie();
          this.fetchReviews();  // Carica le recensioni quando il film è caricato
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
    },
    setMovie() {
      if (!Array.isArray(this.movies)) {
          console.error("this.movies non è un array");
          return;
      }
      this.movie = this.movies.find(movie => movie.id_meta === Number(this.id_meta));
      if (!this.movie) {
          console.error("Film non trovato con id_meta:", this.id_meta);
      } else {
          this.fetchReviews(); // Chiamata a fetchReviews solo se il film è stato trovato
      }
    },
    setRating(star) {
      this.userRating = star;
      this.tempRating = 0;
    },
    hoverRating(star) {
      this.tempRating = star;
    },
    resetRating() {
      this.tempRating = 0;
    },
    // Codice per inviare la review
    submitReview() {
    console.log("Invio recensione:", {
        id_film: this.movie.id_meta,
        email: this.email,
        text: this.reviewText,
        rating: this.userRating
    });

    fetch(`http://localhost/netflix_php/create/review`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id_film: this.movie.id_meta,
            email: this.email,
            text: this.reviewText,
            rating: this.userRating
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Errore nella risposta del server');
        }
        return response.json();
    })
    .then(data => {
        if (data.error) {
            console.error('Errore dal backend:', data.error);
        } else {
            this.reviews.unshift({
                email: this.email,
                text: this.reviewText,
                rating: this.userRating,
                create_date: new Date().toISOString()
            });
            this.reviewText = '';
            this.userRating = 0;
            this.email = '';
            this.submitted = true;
        }
    })
    .catch(error => {
        console.error('Errore nel recupero delle recensioni o nel submit:', error);
    });
},  
    // Metodo per caricare le recensioni dal backend
    fetchReviews() {
        fetch(`http://localhost/netflix_php/get/reviews?id_film=${this.movie.id_meta}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(text => {
                console.log("Risposta dal backend:", text); // Debugging
                if (!text.trim()) { // Se il testo è vuoto
                    console.warn("Nessuna recensione trovata.");
                    this.reviews = [];
                    return;
                }
                let data;
                try {
                    data = JSON.parse(text);
                } catch (error) {
                    console.error("Errore nel parsing JSON:", error);
                    this.reviews = [];
                    return;
                }
                if (data.message === "No reviews") {
                    this.reviews = [];
                } else {
                    this.reviews = Array.isArray(data) ? data : [];
                }
            })
            .catch(error => {
                console.error('Errore nel recupero delle recensioni:', error);
                this.reviews = [];
            });
    }
},
mounted() {
    if (!this.id_meta) {
        console.error("id_meta non è definito");
        return;
    }
    this.getMovies();
}
};

</script>


<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

  .movie {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #293133;
  font-family: 'Bebas Neue', sans-serif;
  color: #fff;
  min-height: 100vh; 
  }

  .back {
  margin-bottom: 20px; /* Spazio tra il link e il titolo */
  }

  .home-icon {
  width: 60px; /* Dimensione dell'icona */
  height: 60px; /* Dimensione dell'icona */
  }

  .movie-details {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 20px;
  gap: 20px; 
  letter-spacing: 1.2px;

  }

  .movie-info {
  text-align: left;
  }

  .movie img {
  max-width: 280px; 
  border-radius: 8px; 
  margin-right: 20px; 
  transition: transform 0.3s ease;
  }

  .movie-details img:hover {
    transform: scale(1.1); /* Ingrandimento dell'immagine */
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.8); /* Ombra più evidente */
  }



  .title {
  font-size: 5em; 
  margin-bottom: 10px;
  }

  .movie-description {
  max-width: 700px; 
  text-align: justify; 
  line-height: 1.6; 
  margin-top: 10px; 
  font-size: 1.5em;
  }

  .review-form {
    margin-top: 30px; 
    background-color: rgba(90, 89, 89, 0.349); 
    padding: 15px;
    border-radius: 8px;
    color: #000;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); 
    width: 100%; 
    max-width: 600px; 
  }

  .review-form h2 {
    margin-bottom: 10px;
    font-size: 1.6em;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  }

  .review-form input[type="email"] {
    width: 90%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    resize: none;
    font-size: 1em; 
    margin-bottom: 10px; 
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  }

  .review-form textarea {
    width: 90%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    resize: none;
    font-size: 1em; 
    margin-bottom: 10px; 
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  }

  .review-form button {
    margin-top : 10px;
    background-color: #800000;
    color: antiquewhite;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s;
    font-size: 1em; 
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  }

  .review-form button:hover {
    background-color: rgba(173, 51, 51, 0.7);
  }

  .review-message {
    margin-top: 10px;
    color: antiquewhite;
    font-weight: bold;
    letter-spacing: 3px;
  }

  .star-rating {
    display: flex;
    margin-top: 10px; 
  }

  .star {
    font-size: 2em; 
    cursor: pointer;
    color: #ccc; 
    transition: color 0.2s;
  }

  .star.filled {
    color: #d67e36; 
  }

  .reviews {
    margin-top: 20px; 
  }

  .reviews h2 {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    padding-top: 5%;
  }

  .reviews ul {
    list-style-type: none;
    padding: 0; 
  }

  .reviews li {
    background-color: rgba(255, 255, 255, 0.1); 
    margin: 10px 0; 
    padding: 10px; 
    border-radius: 5px; 
  }
</style>
