<template>
  <q-page class="q-pa-md flex flex-center column">
    <q-card style="width: 350px">
      <q-card-section>
        <div class="text-h6">Sign Up</div>
        <q-input v-model="email" label="Email" filled class="q-mb-md" />
        <q-input v-model="password" label="Password" type="password" filled class="q-mb-md" />
        <q-btn @click="handleSignup" label="Register" color="secondary" :loading="loading" />
        <q-btn flat to="/login" label="Already have an account?" class="q-mt-sm" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/auth';

const email = ref('');
const password = ref('');
const auth = useAuthStore();
const router = useRouter();
const loading = ref(false);

const handleSignup = async () => {
  loading.value = true;
  try {
    await auth.register(email.value, password.value);
    router.push('/dashboard');
  } catch (err) {
    console.error(err.message);
  } finally {
    loading.value = false;
  }
};
</script>
