<template>
<nav>
  <router-link to="/movies"><h1 class="reload">DREAD FLIX</h1></router-link>
  <ul class="sidebar">
    <button @click="hideSidebar()">
      <a href="#"><svg xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 -960 960 960" width="50px" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></a>
    </button>
    <li><router-link to='/movies' @click.native="hideSidebar"><h2>Movies</h2></router-link></li>
    <li><router-link to='/series'@click.native="hideSidebar"><h2>Tv Series</h2></router-link></li>
  </ul>
  <ul> 
    <li>
      <router-link to="/" class="logo1">
        <img src="../dreadflix_logo.webp"  alt="Dread Flix">
      </router-link>
    </li>

    <button @click="showSidebar()" id="show">
      <a href="#"><svg xmlns="http://www.w3.org/2000/svg" height="60px" viewBox="0 -960 960 960" width="70px" fill="#e8eaed"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg></a>
    </button>
  </ul>
</nav>  
<div>
  <router-view></router-view>
</div>
</template> 
  <script>
  export default {
    methods: {
      showSidebar() {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
          sidebar.style.display = sidebar.style.display === 'flex' ? 'none' : 'flex';
        }
      },
      hideSidebar() {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
          sidebar.style.display = sidebar.style.display === 'none' ? 'flex' : 'none';
        }
      },
  
    },
  };
  </script>
