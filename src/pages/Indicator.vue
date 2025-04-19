<template>
  <div class="container">
    <!-- Pair Selector -->
    <div class="row">
      <label for="pairSelect">Select Pair:</label>
      <select id="pairSelect" v-model="selectedPair" @change="fetchFX">
        <option disabled value="">-- Choose Pair --</option>
        <option v-for="pair in pairs" :key="pair">{{ pair }}</option>
      </select>
    </div>

    <!-- Spot Rate -->
    <div class="row">
      <label for="spotRate">Spot Rate:</label>
      <input id="spotRate" v-model="spotRate" readonly />
    </div>

    <!-- Strategy Note -->
    <div class="row full">
      <label for="note">Strategy Note:</label>
      <textarea id="note" v-model="note" placeholder="Add your strategy note here..."></textarea>
    </div>

    <!-- Run Strategy -->
    <div class="row">
      <button @click="runStrategy">Run Strategy</button>
    </div>

    <!-- Results + Chart -->
    <div class="results">
      <div id="results">{{ resultText }}</div>
      <div id="chart" class="chart"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const pairs = ['USD/JPY', 'EUR/USD', 'GBP/USD'];
const selectedPair = ref('');
const spotRate = ref('');
const note = ref('');
const resultText = ref('');

// Load notes from localStorage when pair changes
watch(selectedPair, () => {
  const savedNotes = JSON.parse(localStorage.getItem('strategyNotes') || '{}');
  note.value = savedNotes[selectedPair.value] || '';
});

// Save notes to localStorage when they change
watch(note, (newNote) => {
  const savedNotes = JSON.parse(localStorage.getItem('strategyNotes') || '{}');
  savedNotes[selectedPair.value] = newNote;
  localStorage.setItem('strategyNotes', JSON.stringify(savedNotes));
});


const fetchFX = async () => {
  const [base, quote] = selectedPair.value.split('/');
  const url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${base}&to_currency=${quote}&apikey=H5C4BHJSC3IGB0LX`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const rate = data?.['Realtime Currency Exchange Rate']?.['5. Exchange Rate'];
    spotRate.value = rate || '';
  } catch (err) {
    console.error('Error fetching FX rate:', err);
  }
};

const runStrategy = () => {
  const wallclock = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const H = new Date().getHours();
  const fibH = wallclock[H % 12] + wallclock[(H - 1 + 12) % 12];
  const spot = parseFloat(spotRate.value);
  const spotx = (24 / H) * fibH * spot;
  const x = spotx.toFixed(0);
  const direction = Math.sin(x);

  resultText.value = direction >= 0
    ? "Prepare for a Buy Entry Market Movement ↑↑↑"
    : "Prepare for a Sell Entry Market Movement ↓↓↓";

  const chart = document.getElementById("chart");
  if (!chart) return;

  const ranges = [
    { min: -1.0, max: -0.9, color: "red", height: 275, text: "900 MPIP Catch" },
    { min: -0.9, max: -0.8, color: "red", height: 250, text: "800 MPIP Catch" },
    { min: 0.9, max: 1.0, color: "green", height: 300, text: "1000 MPIP Catch" },
    { min: 0.8, max: 0.9, color: "green", height: 250, text: "800 MPIP Catch" },
    { min: 0.5, max: 0.8, color: "green", height: 150, text: "500 MPIP Catch" },
    { min: 0.1, max: 0.5, color: "green", height: 100, text: "300 MPIP Catch" },
    { min: -0.5, max: -0.1, color: "red", height: 100, text: "300 MPIP Catch" },
    { min: -0.8, max: -0.5, color: "red", height: 150, text: "500 MPIP Catch" },
  ];

  const match = ranges.find(r => direction >= r.min && direction < r.max);

  const candle = document.createElement("div");
  candle.className = "candle";
  candle.style.background = match?.color || "gray";
  candle.style.height = `${match?.height || 100}px`;
  candle.textContent = match?.text || "Neutral";

  chart.appendChild(candle);
};
</script>

<style scoped>
.container {
  width: 90%;
  max-width: 800px;
  margin: 20px auto;
  font-family: Arial, sans-serif;
}
.row {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  gap: 12px;
}
.row.full {
  flex-direction: column;
  align-items: flex-start;
}
label {
  min-width: 100px;
  font-weight: bold;
}
select, input, textarea {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
textarea {
  width: 100%;
  min-height: 80px;
}
button {
  padding: 8px 16px;
  background: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background: #0056b3;
}
.results {
  margin-top: 20px;
}
#results {
  font-size: 1.2em;
  margin-bottom: 10px;
}
.chart {
  display: flex;
  align-items: flex-end;
  gap: 10px;
  border: 1px solid #ddd;
  padding: 10px;
  height: 300px;
  overflow-x: auto;
}
.candle {
  width: 30px;
  text-align: center;
  color: white;
  font-size: 10px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 5px;
}

</style>
