<script>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="navbar-brand ms-4">Poke APP</div>
        <div>
          <ul class="navbar-nav">
            <li class="nav-item nav-link"><router-link to="/" class="RL">Home</router-link></li>
          </ul>
        </div>
      </nav>
      <router-view :key="$route.path" />
    </div>
</template>

<style>

#app{
  background-color: rgb(0,22,37);
  color: white;
  min-width: 100vw;
  min-height: 100vh;
}

.RL{
  text-decoration: none;
  color: gray;
}

.RL:hover{
  color: rgb(0, 68, 114);
}
</style>
