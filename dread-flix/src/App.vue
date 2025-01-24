<template>
  <nav>
    <router-link to="/movies">
      <h1 class="reload">DREAD FLIX</h1>
    </router-link>
    <nav>
      <ul class="navbar">
        <!-- Logo -->
        <li class="logo1">
          <router-link to="/">
            <img src="../dreadflix_logo.webp" alt="Dread Flix">
          </router-link>
          <button class="language-btn" @click="toggleLanguage">{{ $t('languageToggle') }}</button>
        </li>

        <!-- Pulsanti per Movies e Tv Series -->
        <li class="nav-buttons">
          <router-link to="/movies" class="nav-button">
            <button>{{ $t('movies') }}</button>
          </router-link>
          <router-link to="/series" class="nav-button">
            <button>{{ $t('tvSeries') }}</button>
          </router-link>
        </li>
      </ul>
    </nav>
  </nav>
  <div>
    <router-view :key="currentLanguage" :current-language="currentLanguage"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentLanguage: 'en', // Lingua predefinita
    };
  },
  methods: {
    toggleLanguage() {
      this.currentLanguage = this.currentLanguage === 'en' ? 'it' : 'en';
      localStorage.setItem('language', this.currentLanguage);
      this.$i18n.locale = this.currentLanguage; // Aggiorna la lingua di Vue I18n
    },
  },
  mounted() {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      this.currentLanguage = savedLanguage;
      this.$i18n.locale = savedLanguage; // Inizializza Vue I18n con la lingua salvata
    }
  },
};
</script>
