<!-- src/pages/Calculator.vue -->
<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class="q-pa-md">
      <div class="text-h6 q-mb-md">Compound Growth Calculator</div>

      <q-form @submit="calculateGrowth">
        <q-input v-model.number="balance" label="Starting Balance ($)" type="number" outlined />
        <q-input v-model.number="dailyReturn" label="Daily % Win (e.g., 2)" type="number" outlined class="q-mt-sm" />
        <q-input v-model.number="days" label="Number of Days" type="number" outlined class="q-mt-sm" />
        <q-select
          v-model="interval"
          :options="['Daily', 'Weekly']"
          label="Compound Interval"
          outlined
          class="q-mt-sm"
        />


        <q-btn label="Calculate" type="submit" color="primary" class="q-mt-md" />
      </q-form>

      <q-separator class="q-my-md" />

      <div v-if="results.length">
        <q-markup-table flat bordered>
          <thead>
            <tr>
              <th>{{ interval === 'Weekly' ? 'Week' : 'Day' }}</th>
              <th>Balance ($)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(val, index) in results" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ val.toFixed(2) }}</td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';

const balance = ref(1000);
const dailyReturn = ref(2); // % return
const days = ref(30);
const interval = ref('Daily');
const results = ref([]);

const calculateGrowth = () => {
  let current = balance.value;
  results.value = [];

  let period = interval.value === 'Weekly' ? Math.floor(days.value / 7) : days.value;
  let rate = interval.value === 'Weekly' ? dailyReturn.value * 7 : dailyReturn.value;

  for (let i = 0; i < period; i++) {
    current += (current * rate) / 100;
    results.value.push(current);
  }
};
</script>
