<!-- src/pages/Dashboard.vue -->
<template>
  <q-page class="q-pa-md">
    <q-banner class="bg-primary text-white q-mb-md">
      <div class="text-h6">Welcome back to AltosQuant</div>
      <div class="text-subtitle2">Let’s trade smarter today.</div>
    </q-banner>

    <q-card flat bordered class="q-pa-md">
      <div class="row q-col-gutter-md">
        <q-card-section class="col-6 col-md-3">
          <q-card flat bordered>
            <q-card-section>
              <div class="text-subtitle1">Total Trades</div>
              <div class="text-h6">132</div>
            </q-card-section>
          </q-card>
        </q-card-section>

        <q-card-section class="col-6 col-md-3">
          <q-card flat bordered>
            <q-card-section>
              <div class="text-subtitle1">Win Rate</div>
              <div class="text-h6">84%</div>
            </q-card-section>
          </q-card>
        </q-card-section>

        <q-card-section class="col-6 col-md-3">
          <q-card flat bordered>
            <q-card-section>
              <div class="text-subtitle1">Balance</div>
              <div class="text-h6">$12,890</div>
            </q-card-section>
          </q-card>
        </q-card-section>
      </div>
    </q-card>

    <q-separator class="q-my-md" />

    <div class="row q-gutter-md">
      <q-btn to="/chat" label="Go to Team Chat" color="secondary" />
      <q-btn to="/calculator" label="Compound Calculator" color="secondary" />
      <q-btn to="/indicator" label="Hourly Indicator" color="secondary" />
      <q-btn to="/trades" label="Trades Board" color="secondary" />
    </div>
  </q-page>
</template>

<script setup>
// You can inject user from auth store later here if needed
</script>
