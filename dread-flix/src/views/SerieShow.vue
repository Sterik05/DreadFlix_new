<template>
  <router-link to="/series" class="back">
      <img src="../../public/freccia.svg" alt="Home" class="home-icon" />
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

              <!-- Elemento per il rating -->
              <div class="star-rating">
                  <span 
                      v-for="star in 5" 
                      :key="star" 
                      @click="setRating(star)" 
                      @mouseover="hoverRating(star)"
                      @mouseleave="resetRating" 
                      class="star" 
                      :class="{'filled': star <= (userRating || tempRating)}">
                      ★
                  </span>
              </div>
              <p><strong>Your Rating:</strong> {{ userRating }}</p>

              <!-- Modulo di recensione -->
              <div class="review-form">
                  <h2>Leave a Review</h2>
                  <input type="email" v-model="email" placeholder="Enter your email" required />
                  <textarea v-model="reviewText" placeholder="Write your review here..." rows="4"></textarea>
                  <button @click="submitReview">Submit Review</button>
                  <div v-if="submitted" class="review-message">Thank you for your review!</div>
              </div>
          </div>
      </div>

      <!-- Sezione per visualizzare le recensioni -->
      <div class="reviews">
          <h2>Reviews</h2>
          <ul>
              <li v-for="(review, index) in reviews" :key="index">
                  <p><strong>Email:</strong> {{ review.email }}</p>
                  <p><strong>Rating:</strong> {{ review.rating }}</p>
                  <p>{{ review.text }}</p>
              </li>
          </ul>
      </div>
  </section>
</template>

<script>
export default {
  data() {
      return {
          serie: null,
          reviewText: '', // Per memorizzare il testo della recensione
          email: '', // Per memorizzare l'email dell'utente
          submitted: false, // Per gestire il messaggio di conferma
          userRating: 0, // Per memorizzare il rating dell'utente
          tempRating: 0, // Per gestire il rating temporaneo
          reviews: [] // Array per memorizzare le recensioni
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

          fetch(`https://api.themoviedb.org/3/tv/${this.id}?language=en-US`, options)
              .then(response => {
                  if (!response.ok) {
                      throw new Error('Network response was not ok');
                  }
                  return response.json();
              })
              .then(data => {
                  this.serie = data; // Imp osta la serie con i dettagli
              })
              .catch(error => {
                  console.error('There was a problem with the fetch operation:', error);
              });
      },
      setRating(star) {
          this.userRating = star; // Imposta il rating dell'utente
          this.tempRating = 0; // Resetta il rating temporaneo
      },
      resetRating() {
          this.tempRating = 0; // Ripristina il rating temporaneo quando il cursore esce
      },
      hoverRating(star) {
            this.tempRating = star; // Imposta il rating temporaneo durante il passaggio del mouse
      },
      submitReview() {
          if (this.reviewText.trim() !== '' && this.email.trim() !== '') {
              const newReview = {
                  email: this.email,
                  text: this.reviewText,
                  rating: this.userRating
              };
              this.reviews.push(newReview); // Aggiungi la nuova recensione all'array
              console.log('Review submitted:', newReview);
              this.submitted = true; // Mostra il messaggio di conferma
              this.reviewText = ''; // Resetta il campo di input
              this.email = ''; // Resetta il campo email
              this.userRating = 0; // Resetta il rating dopo l'invio
          }
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

.star-rating {
  display: flex;
  margin-top: 10px; /* Spazio sopra il rating */
}

.star {
  font-size: 2em; /* Dimensione delle stelle */
  cursor: pointer;
  color: #ccc; /* Colore delle stelle vuote */
  transition: color 0.2s;
}

.star.filled {
  color: #d67e36; /* Colore delle stelle piene */
}

.review-form {
  margin-top: 30px; /* Maggiore spazio sopra il modulo */
  background-color: rgba(133, 131, 131, 0.349); /* Sfondo bianco con trasparenza */
  padding: 15px;
  border-radius: 8px;
  color: #000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); /* Ombra per dare profondità */
  width: 100%; /* Larghezza del modulo */
  max-width: 600px; /* Larghezza massima per il modulo */
}

.review-form h2 {
  margin-bottom: 10px;
  font-size: 1.6em; /* Dimensione del titolo */
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.review-form input[type="email"] {
    width: 90%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    resize: none;
    font-size: 1em; /* Dimensione del testo */
    margin-bottom: 10px; /* Spazio sotto il textarea */
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.review-form textarea {
  width: 90%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  resize: none;
  font-size: 1em; /* Dimensione del testo */
  margin-bottom: 10px; /* Spazio sotto il textarea */
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.review-form button {
  margin-top: 10px;
  background-color: #800000;
  color: antiquewhite;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
  font-size: 1em; /* Dimensione del testo */
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

.reviews {
  margin-top: 20px; /* Spazio sopra la sezione delle recensioni */
}

.reviews h2 {
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  padding-top: 5%;
}

.reviews ul {
    list-style-type: none; /* Rimuove i punti elenco */
    padding: 0; /* Rimuove il padding */
}

.reviews li {
    background-color: rgba(255, 255, 255, 0.1); /* Sfondo leggero per le recensioni */
    margin: 10px 0; /* Margine tra le recensioni */
    padding: 10px; /* Padding interno */
    border-radius: 5px; /* Angoli arrotondati */
}
</style>