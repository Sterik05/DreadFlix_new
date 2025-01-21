<template>
<nav>
  <router-link to="/movies"><h1 class="reload">DREAD FLIX</h1></router-link>
  <ul class="sidebar">
    <button @click="hideSidebar()">
      <a href="#"><svg xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 -960 960 960" width="50px" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></a>
    </button>
    <li><router-link to='/movies'>Movies</router-link></li>
    <li><router-link to='/series'>Tv Series</router-link></li>
  </ul>
  <ul> 
    <li>
      <router-link to="/">
        <img src="../dreadflix_logo.webp"  alt="Dread Flix">
      </router-link>
    </li>

    <button>
      <router-link to="/search"><svg xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 -960 960 960" width="50px" fill="#e8eaed"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg></router-link>
    </button>

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
