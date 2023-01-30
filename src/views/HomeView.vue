<template>
   <div class="login">
        <form>
  <!-- Email input -->
  <div class="form-outline mb-5">
    <input v-model="login" type="login" id="form2Example1" class="form-control" />
    <label class="form-label" for="form2Example1">Login</label>
  </div>

  <!-- Password input -->
  <div class="form-outline mb-5">
    <input v-model="password" type="password" id="form2Example2" class="form-control" />
    <label class="form-label" for="form2Example2">Password</label>
  </div>

  <!-- Submit button -->
  <button @click="checkAuth" type="button" class="btn btn-primary btn-block mb-4">Sign in</button>
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
      if(this.login && this.password==="admin"){
        this.$router.push({path:'/logged'})
      }else{
        this.errorMsg="Invalid credentials";
        this.setError=true;
      }
    }
    }
    

}
</script>
<style lang="scss" scoped>
form{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.error{
  height: 10vh;
  color: red;
}
</style>
