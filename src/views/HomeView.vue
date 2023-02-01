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
  <button  @click="checkAuth" type="button" class="logged_btn mb-4">Zaloguj się</button>
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
$fontcolor:#eea8c0;
$fontcolor2:#B5FFFC;
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
  background-color: $fontcolor;
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
.logged_btn{
  background:none;
        position: relative;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        border: none;
        top: 1vh;
        width: 200px;
        height: 50px;
        z-index: 1;
        padding: 10px 25px;
        color: black;
}
.logged_btn::after{
  content: '';
        left: 0;
        top: 0;
        position: absolute;
        height: 100%;
        border: 1px solid $fontcolor;
        width: 100%;
        opacity: 1;
        transition: transform 0.15s ease-out 0
}
.logged_btn::before{
  content: '';
        top: 5px;
        right: 5px;
        z-index: -1;
        position: absolute;
        height: 100%;
        background-color: white;
        width: 100%;
        transition: transform 0.15s ease-out 0s;
}

</style>
