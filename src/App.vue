<template>
  <nav>
    <router-link v-if="authCred" to="/">Logout</router-link> 
  </nav>
  <router-view/>
  
</template>
<script>
export default{
  data(){
    return{
      authCred:false
    }
  },
  methods:{
    onC(){

    }
  }
}
</script>
<style lang="scss">
*,*::after,*::before{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

