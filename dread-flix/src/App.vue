<template>
  <nav>
    <router-link to="/movies"><h1 class="reload">DREAD FLIX</h1></router-link>
    <nav>
    <ul class="navbar">
      
      <!-- Logo -->
      <li class="logo1">
        <router-link to="/">
          <img src="../dreadflix_logo.webp" alt="Dread Flix">
        </router-link>
      </li>

      <!-- Pulsanti per Movies e Tv Series -->
      <li class="nav-buttons">
        <router-link to="/movies" class="nav-button">
          <button>Movies</button>
        </router-link>
        <router-link to="/series" class="nav-button">
          <button>Tv Series</button>
        </router-link>
      </li>
    </ul>
  </nav>
  </nav>
  <div>
    <router-view></router-view>
  </div>
</template>
  <script>
  export default {
    methods: {
      
    },
  };
  </script>
