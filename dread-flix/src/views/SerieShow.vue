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
              <p><strong>{{ $t( 'originalLanguage' ) }}:</strong> {{ serie.original_language }}</p>
              <p><strong>{{ $t( 'Data di uscita' ) }}:</strong> {{ serie.first_air_date }}</p>
              <p><strong>{{ $t( 'rating' ) }}:</strong> {{ serie.vote_average }}</p>
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
              <p><strong>{{ $t( 'yourRating' ) }}:</strong> {{ userRating }}</p>
              <!-- Modulo di recensione -->
              <div class="review-form">
                  <h2>{{ $t( 'reviewMessage' ) }}</h2>
                  <input type="email" v-model="email" placeholder="Enter your email" required />
                  <textarea v-model="reviewText" placeholder="Write your review here..." rows="4"></textarea>
                  <button @click="submitReview">{{ $t( 'submitReview' ) }}</button>
                  <div v-if="submitted" class="review-message">{{ $t( 'revieMessage' ) }}</div>
              </div>
          </div>
      </div>
      <!-- Sezione per visualizzare le recensioni -->
      <div class="reviews">
          <h2>Reviews</h2>
          <ul>
              <li v-for="(review, index) in reviews" :key="index">
                  <p><strong>Email:</strong> {{ review.email }}</p>
                  <p><strong>{{ $t( 'rating' ) }}:</strong> {{ review.rating }}</p>
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
          reviewText: '',
          email: '',
          submitted: false,
          userRating: 0,
          tempRating: 0,
          reviews: []
      };
  },
  props: {
      id: { type: String, required: true },
      currentLanguage: { type: String, default: 'en' } // Aggiungi la prop per la lingua
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

          fetch(`https://api.themoviedb.org/3/tv/${this.id}?language=${this.currentLanguage}`, options)
              .then(response => {
                  if (!response.ok) {
                      throw new Error('Network response was not ok');
                  }
                  return response.json();
              })
              .then(data => {
                  this.serie = data;
              })
              .catch(error => {
                  console.error('There was a problem with the fetch operation:', error);
              });
      },
      setRating(star) {
          this.userRating = star;
          this.tempRating = 0;
      },
      resetRating() {
          this.tempRating = 0;
      },
      hoverRating(star) {
          this.tempRating = star;
      },
      submitReview() {
          if (this.reviewText.trim() !== '' && this.email.trim() !== '') {
              const newReview = {
                  email: this.email,
                  text: this.reviewText,
                  rating: this.userRating
              };
              this.reviews.push(newReview);
              console.log('Review submitted:', newReview);
              this.submitted = true;
              this.reviewText = '';
              this.email = '';
              this.userRating = 0;
          }
      },
  },
  mounted() {
      this.getSerie();
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
  background-color: #293133;
  font-family: 'Bebas Neue', sans-serif; 
  color: #fff;
  min-height: 100vh; 
}

.serie-details {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 20px;
  gap: 20px; 
}

.serie-info {
  text-align: left;
}

.serie img {
  max-width: 250px; 
  border-radius: 8px; 
  margin-right: 20px; 
}

.title {
  font-size: 5em; 
  margin-bottom: 10px;
}

.serie-description {
  max-width: 700px; 
  text-align: justify; 
  line-height: 1.6;
  margin-top: 10px; 
  font-size: 1.5em;
}


.serie img {
  max-width: 280px; 
  border-radius: 8px; 
  margin-right: 20px; 
  transition: transform 0.3s ease;
}

.serie-details img:hover {
    transform: scale(1.1); /* Ingrandimento dell'immagine */
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.8); /* Ombra più evidente */
}



.back {
  margin-bottom: 20px; 
}

.home-icon {
  width: 60px; 
  height: 60px; 
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

.review-form {
  margin-top: 30px; 
  background-color: rgba(133, 131, 131, 0.349); 
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