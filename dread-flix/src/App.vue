<template>
  <nav>
    <nav>
      <ul class="navbar">
        <li class="logo1">
          <router-link to="/">
            <img src="../dreadflix_logo.webp" alt="Dread Flix">
          </router-link>
          <transition name="fade">
            <div>
              <img 
                v-if="currentLanguage === 'en'" 
                key="en" 
                src="../usaFlag.png" 
                alt="usaflag" 
                class="flags flag" 
              />
              <img 
                v-if="currentLanguage === 'it'" 
                key="it" 
                src="../italyFlag.png" 
                alt="italyflag" 
                class="flags flag" 
              />
            </div>
          </transition>

          <select v-model="currentLanguage" @change="changeLanguage" class="language-select language-select-btn">
            <option value="en">English</option>
            <option value="it">Italiano</option>
          </select>
        </li>
        <!-- <router-link class="reload" to="/movies">
      <h1 >DREAD FLIX</h1>
    </router-link> -->
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
    changeLanguage() {
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

