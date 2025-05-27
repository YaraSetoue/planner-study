<template>
  <div class="surface-ground p-6 md:p-8 lg:p-10 container">
    <Toast />
    <div class="surface-card p-4 md:p-6 shadow-2 border-round-2xl w-full max-w-30rem mx-auto flex flex-column gap-4">
      <!-- Cabeçalho -->
      <div class="flex flex-column align-items-center gap-4">
        <div class="text-2xl font-semibold">Bem vindo(a)</div>
        <div>
          <span class="text-color-secondary">Não tem uma conta?</span>
          <router-link to="/signup" class="text-primary font-medium ml-2">Crie hoje!</router-link>
        </div>
      </div>

      <form @submit.prevent="login" class="flex flex-column gap-5">
        <!-- Campo Email -->
        <div class="flex flex-column gap-2">
          <label for="email">E-mail</label>
          <InputText 
            id="email"
            type="email"
            v-model="email"
            placeholder="Email"
            :class="{ 'p-invalid': emailError }"
            autofocus
          />
          <small v-if="emailError" class="p-error">{{ emailError }}</small>
        </div>

        <!-- Campo Senha com toggle -->
        <div class="flex flex-column gap-2">
          <label for="senha">Senha</label>
          <Password 
            id="senha"
            v-model="password"
            :feedback="false"
            toggleMask
            placeholder="Senha"
            :class="{ 'p-invalid': passwordError }"
            inputClass="w-full"
          />
          <small v-if="passwordError" class="p-error">{{ passwordError }}</small>
        </div>

        <!-- Lembrar-me e Esqueci a senha -->
        <div class="flex justify-content-between align-items-center">
          <div class="flex align-items-center gap-2">
            <Checkbox v-model="rememberMe" :binary="true" id="remember" />
            <label for="remember">Lembrar-me</label>
          </div>
          <router-link to="/forgot-password" class="text-primary">Esqueceu a senha?</router-link>
        </div>
        <div class="flex flex-column">
          <!-- Botão de Login -->
          <Button 
            type="submit" 
            label="Entrar" 
            :class="{ 'p-button': !loading, 'p-button-loading': loading }"
            :disabled="loading || failedAttempts >= 3"
          >
            <template #icon>
              <i class="pi pi-user" v-if="!loading" />
            </template>
          </Button>
  
          <!-- Divisor -->
          <Divider align="center">
            <span class="text-color-secondary">ou</span>
          </Divider>
  
          <!-- Login Social -->
          <Button 
            label="Entrar com Google"
            icon="pi pi-google"
            class="p-button-outlined"
            :loading="loadingGoogle"
            @click="loginWithGoogle"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth, signInWithEmailAndPassword, googleProvider, signInWithPopup } from '../firebase';
import Checkbox from 'primevue/checkbox';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import IconField from 'primevue/iconfield';
import Password from 'primevue/password';

const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const loading = ref(false);
const loadingGoogle = ref(false);
const failedAttempts = ref(0);
const emailError = ref('');
const passwordError = ref('');
const toast = useToast();
const router = useRouter();

const firebaseErrorMessages = {
  'auth/user-not-found': 'Usuário não encontrado.',
  'auth/wrong-password': 'Senha incorreta.',
  'auth/invalid-email': 'E-mail inválido.',
  'auth/popup-closed-by-user': 'Login cancelado pelo usuário.',
  'auth/popup-blocked': 'O popup foi bloqueado pelo navegador.',
  'auth/network-request-failed': 'Falha de conexão. Tente novamente.',
  'auth/too-many-requests': 'Muitas tentativas falhas. Tente novamente mais tarde.'
};

const validateForm = () => {
  let valid = true;
  
  emailError.value = '';
  passwordError.value = '';

  if (!email.value) {
    emailError.value = 'E-mail é obrigatório';
    valid = false;
  } else if (!/\S+@\S+\.\S+/.test(email.value)) {
    emailError.value = 'E-mail inválido';
    valid = false;
  }

  if (!password.value) {
    passwordError.value = 'Senha é obrigatória';
    valid = false;
  }

  return valid;
};

const login = async () => {
  if (failedAttempts.value >= 3) {
    toast.add({ 
      severity: 'warn', 
      summary: 'Muitas tentativas', 
      detail: 'Tente novamente mais tarde', 
      life: 5000 
    });
    return;
  }

  if (!validateForm()) return;

  try {
    loading.value = true;
    await auth.setPersistence(
      rememberMe.value 
        ? firebase.auth.Auth.Persistence.LOCAL 
        : firebase.auth.Auth.Persistence.SESSION
    );
    
    await signInWithEmailAndPassword(auth, email.value, password.value);
    toast.add({ 
      severity: 'success', 
      summary: 'Login', 
      detail: 'Login realizado com sucesso!', 
      life: 3000 
    });
    router.push('/dashboard');
  } catch (e) {
    failedAttempts.value++;
    const errorMessage = firebaseErrorMessages[e.code] || 'Email ou senha inválidos.';
    toast.add({ 
      severity: 'error', 
      summary: 'Erro', 
      detail: errorMessage, 
      life: 4000 
    });
  } finally {
    loading.value = false;
  }
};

const loginWithGoogle = async () => {
  try {
    loadingGoogle.value = true;
    await signInWithPopup(auth, googleProvider);
    toast.add({ 
      severity: 'success', 
      summary: 'Login', 
      detail: 'Login com Google realizado com sucesso!', 
      life: 3000 
    });
    router.push('/dashboard');
  } catch (e) {
    const errorMessage = firebaseErrorMessages[e.code] || 'Erro ao autenticar com Google.';
    toast.add({ 
      severity: 'error', 
      summary: 'Erro', 
      detail: errorMessage, 
      life: 4000 
    });
  } finally {
    loadingGoogle.value = false;
  }
};
</script>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.transition-colors {
  transition: color 0.2s ease;
}

.p-button.p-button-success {
  background-color: var(--green-500);
  border-color: var(--green-500);
}

.p-button.p-button-success:hover {
  background-color: var(--green-600);
  border-color: var(--green-600);
}
</style>