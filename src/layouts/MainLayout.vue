<template>
  <q-layout view="hHh lpR fFf">
    <!-- HEADER -->
    <q-header elevated class="bg-primary text-white">
  <q-toolbar>

    <!-- ✅ Hamburger menu button for mobile -->
    <q-btn
      flat
      dense
      round
      icon="menu"
      @click="leftDrawerOpen = !leftDrawerOpen"
      class="q-mr-sm"
    />

    <q-toolbar-title>AltosQuant</q-toolbar-title>

    <!-- ✅ User dropdown menu (as added before) -->
    <q-btn dense flat round icon="account_circle">
      <q-menu anchor="bottom right" self="top right" transition-show="jump-down" transition-hide="jump-up">
        <q-list style="min-width: 150px">
          <q-item clickable v-ripple>
            <q-item-section>Profile</q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>Settings</q-item-section>
          </q-item>
          <q-separator />
          <q-item clickable v-ripple @click="logout">
            <q-item-section>Logout</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>

    

  </q-toolbar>
</q-header>


    <!-- SIDEBAR -->
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item clickable v-ripple to="/dashboard">
          <q-item-section avatar><q-icon name="dashboard" /></q-item-section>
          <q-item-section>Dashboard</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/chat">
          <q-item-section avatar><q-icon name="chat" /></q-item-section>
          <q-item-section>Team Chat</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/calculator">
          <q-item-section avatar><q-icon name="calculate" /></q-item-section>
          <q-item-section>Compound Calculator</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/indicator">
          <q-item-section avatar><q-icon name="query_stats" /></q-item-section>
          <q-item-section>Hourly Trade Indicator</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/trades">
          <q-item-section avatar><q-icon name="timeline" /></q-item-section>
          <q-item-section>Trades Board</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- MAIN CONTENT -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signOut } from 'firebase/auth'
import { auth } from 'src/firebase/init'

const leftDrawerOpen = ref(true)
const router = useRouter()

const logout = async () => {
  await signOut(auth)
  router.push('/login')
}
</script>
