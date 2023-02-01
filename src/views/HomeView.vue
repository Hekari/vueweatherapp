<template>
   <div class="login">
    <div class="logo"><span><i class="fa-solid fa-tornado"></i>Weather</span><b>Forecast</b></div>
      <form>
  <!-- Email input -->
  <div class="form-outline mb-5">
    <input v-model="login" type="login" id="form2Example1" class="form-control" />
    <label class="form-label" for="form2Example1">Login</label>
  </div>

  <!-- Password input -->
  <div class="form-outline mb-5">
    <input v-model="password" type="password" id="form2Example2" class="form-control" />
    <label class="form-label" for="form2Example2">Hasło</label>
  </div>

  <!-- Submit button -->
  <button  @click="checkAuth" type="button" class="btn btn-primary btn-block mb-4">Zaloguj się</button>
  <div  v-if="setError" class="error">
    {{ errorMsg }}
  </div>
</form>
    </div>
</template>

<script>
export default {
  name:"HomeView",
    data(){
      return{
        login:"",
        password:"",
        errorMsg:"",
        setError:false,
      }
    },
    methods:{
    checkAuth(){
        if(this.login && this.password==='admin'){
          this.$router.push('/logged')
        }else{
          this.errorMsg='Wprowadzono niepoprawne dane'
          this.setError=true
        }
    }
    }
}
</script>
<style lang="scss">
$bg-color:linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%);
form{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

nav{
  padding: 0;
  margin: 0;
}
.login{
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  background-color: #FFDEE9;
background-image:$bg-color;

}
.logo span{
  color:#eea8c0;
  font-size: 5em;
  font-weight: 700;
}
.error{
  height: 10vh;
  color: red;
}
</style>
