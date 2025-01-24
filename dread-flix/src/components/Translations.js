import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    movies: 'Movies',
    tvSeries: 'TV Series',
    languageToggle: 'en',
    popularity: 'Popularity',
    rating: 'Rating',
    originalLanguage: 'Original Language',
    releaseDate: 'Release Date',
    yourRating: 'Your Rating',
    reviewTitle: 'Leave a review',
    submitReview: 'Submit Review',
    thankYou: 'Thank you for your review!',
    reviews: 'Reviews',
    emailArea: 'Enter your email',
    reviewMessage: 'Write your review here...',

  },
  it: {
    movies: 'Film',
    tvSeries: 'Serie TV',
    languageToggle: 'it',
    popularity: 'Popolarità',
    rating: 'Valutazione',
    originalLanguage: 'Lingua Originale',
    releaseDate: 'Data di uscita',
    yourRating: 'La tua valutazione',
    reviewTitle: 'Lascia una recensione',
    submitReview: 'Invia Recensione',
    thankYou: 'Grazie per la tua recensione!',
    reviews: 'Recensioni',
    emailArea: 'Scrivi la tua email qui...',
    reviewMessage: 'Scrivi la tua recensione qui...',

  },
};

const i18n = createI18n({
  locale: 'en', // Lingua predefinita
  messages,
});

export default i18n;