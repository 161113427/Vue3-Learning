<template>
  <Suspense>
    <template #default v-if="!user">
      <div class="login">
        <div class="left-side">
          <span class="or">Or</span>
          <img src="../assets/logo.png" />
          <ul class="login-options">
            <li v-for="(login, idx) in state.loginOptions" :key="idx">
              <button class="btn-login">Login With {{ login }}</button>
            </li>
          </ul>
        </div>
        <div class="right-side">
          <form @submit.prevent="login()" class="form-login">
            <h2>L O G I N</h2>
            <div class="input-group">
              <input
                v-model="email"
                type="email"
                autofocus
                placeholder="Email"
              />
              <div class="garis-em"></div>
            </div>
            <div class="input-group">
              <input
                v-model="password"
                type="password"
                placeholder="Password"
              />
              <div class="garis-pw"></div>
            </div>
            <div>
              <a href="/" class="sm-link">forgot password?</a>
            </div>
            <input type="submit" value="Login" class="btn-login" />
            <div>
              <span class="sm-link">Don't have an account? </span>
              <a href="/" class="sm-link">click here</a>
            </div>
          </form>
        </div>
      </div>
    </template>
    <template #fallback>
      <div></div>
    </template>
  </Suspense>
</template>

<script>
import { reactive, ref, onBeforeMount } from "vue";
import firebase from "../js/utilities/firebase.js";

export default {
  name: "Login",

  setup() {
    let email = ref("");
    let password = ref("");
    let user = ref(true);

    const state = reactive({
      loginOptions: ["Google", "Facebook"],
    });

    onBeforeMount(() => {
      firebase.auth().onAuthStateChanged((_user) => {
        if (_user) {
          user.value = true;
          return window.location.assign("/chat");
        } else return (user.value = false);
      });
    });
    const login = () => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email.value, password.value)
        .then((_) => window.location.assign("/chat"))
        .catch((err) => console.log(err));
    };
    return {
      state,
      email,
      user,
      password,
      login,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-items: center;
  background: rgb(255, 255, 255);
  width: 60vw;
  height: 45vh;
  border-radius: 4px;
  padding: 3rem 1rem;
  box-shadow: 2px 5px 5px rgba(0, 0, 0, 0.1), -2px 0px 5px rgba(0, 0, 0, 0.05);
  border-right: 2rem solid #007ac1;
}

.right-side,
.left-side {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 3rem 1rem;
  width: 50%;
}

.left-side img {
  max-width: 8em;
}

.or {
  display: none;
}

.form-login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.input-group {
  margin-top: 1.5rem;
  width: 100%;
}

.form-login .input-group input {
  margin: 0;
  padding: 0.7rem 1rem;
  width: 100%;
  color: rgb(13, 14, 12);
  background: rgba(0, 0, 0, 0.02);
  border: none;
}

.form-login .input-group input::placeholder {
  color: rgb(32, 32, 34);
}

.form-login .input-group input:focus {
  outline-style: none;
}

.garis-pw,
.garis-em {
  height: 2px;
}

.form-login .input-group input[type="email"]:focus ~ .garis-em,
.form-login .input-group input[type="password"]:focus ~ .garis-pw {
  height: 2px;
  margin: 0 auto;
  width:100%;
  background-color: #03a9f4;
  animation: inputUser 0.7s ease-out forwards;
}

.form-login input[type="submit"] {
  background: #03a9f4;
  border: none;
}

.form-login input[type="submit"]:hover,
.form-login input[type="submit"]:focus {
  background: #007ac1;
  color: rgb(248, 244, 244);
}

a.sm-link:hover {
  color: #007ac1;
  transition: 0.1s all linear;
}

.btn-login {
  /* border: 1px solid rgba(0,0,0,0.2); */
  border: none;
  box-shadow: 1px 2px 7px rgba(0, 0, 0, 0.15);
  padding: 0.6rem 1rem;
  margin-top: 1rem;
  width: 100%;
  transition: all linear 0.2s;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  background-color: white;
}

.btn-login:hover {
  background: rgba(0, 0, 0, 0.05);
  transition: all linear 0.2s;
}

.login-options {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 80%;
}

.login-options li {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

@media (max-width: 900px) {
  .left-side img {
    display: none;
  }

  .left-side,
  .right-side {
    margin: 0;
    padding: 0;
    width: 85%;
  }

  .login {
    flex-direction: column-reverse;
    height: 70vh;
    padding: 3rem;
    border-right: 1rem solid #007ac1;
    padding-bottom: 5rem;
  }

  .or {
    display: flex;
    margin-bottom: 1rem;
  }

  .or::before{
    content: '';
    width: 22vw;
    height: 1px;
    background: rgba(29, 29, 29,0.4);
    position: relative;
    top:0.7rem;
    right: 0.7rem;
  }

  .or::after{
    content: '';
    width: 22vw;
    height: 1px;
    background: rgba(29, 29, 29,0.4);
    position: relative;
    top:0.7rem;
    left: 0.7rem;
  }

  .form-login {
    width: 100%;
  }
  .right-side {
    margin-bottom: 3rem;
  }

  .login-options {
    width: 100%;
  }
}

@keyframes inputUser {
  0% {
    width: 0%;
  }
  100% {
    width: calc(100% + 2rem);
  }
}
</style>
