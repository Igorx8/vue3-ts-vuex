<template>
<section class="hero is-primary is-fullheight">
  <div class="hero-body">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-5-tablet is-4-desktop is-3-widescreen">
          <form action="" class="box">
            <div class="field">
              <label for="" class="label">Email</label>
              <div class="control has-icons-left">
                <input type="email" placeholder="Digite seu e-mail" class="input" v-model="user.email" required>
                <span class="icon is-small is-left">
                  <i class="fa fa-envelope"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <label for="" class="label">Password</label>
              <div class="control has-icons-left">
                <input type="password" placeholder="*******" class="input" v-model="user.password" required>
                <span class="icon is-small is-left">
                  <i class="fa fa-lock"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <label for="" class="checkbox">
                <input type="checkbox">
               Remember me
              </label>
            </div>
            <div class="field">
              <button class="button is-success" @click="login">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script lang="ts">
import { IUsuario } from '@/interfaces/IUsuario';
import { EFETUAR_LOGIN } from '@/store/tipo-acoes';
import { defineComponent, ref } from 'vue';
import { useStore } from '@/store';

export default defineComponent({
    name: 'LoginView',
    setup() {
        let user = ref<IUsuario>({
            email: '',
            password: '',
        });

        const store = useStore();

        const login = () => {
            store.dispatch(EFETUAR_LOGIN, user.value);
        }

        return {
            user,
            login
        }
    },
})
</script>

<style>
.login {
    background: #111827;
    color: #fff;
}
</style>
