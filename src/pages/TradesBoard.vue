<template>
  <q-page class="q-pa-md bg-grey-2 kanban-page">
    <div class="q-mb-md">
      <q-btn label="➕ Add New Trade" color="primary" @click="showModal = true" />
    </div>

    <!-- Add New Trade Modal -->
    <q-dialog v-model="showModal">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">New Trade Note</div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="newTrade.title" label="Trade title" filled />
          <q-input v-model="newTrade.note" label="Note" type="textarea" class="q-mt-sm" filled />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Add" color="primary" @click="addTrade" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- View Trade Modal -->
    <q-dialog v-model="viewModal">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">{{ selectedTrade.title }}</div>
          <div class="text-subtitle2 text-grey">{{ selectedTrade.date }}</div>
        </q-card-section>
        <q-card-section>
          <div class="text-body1 q-mt-sm">{{ selectedTrade.note }}</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Close" flat v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Kanban Columns -->
    <div class="row q-col-gutter-md">
      <KanbanColumn
        v-for="col in columns"
        :key="col.id"
        :title="col.title"
        :items="trades[col.id]"
        :color="col.color"
        :column="col.id"
        @move="handleMove"
        @view="viewTrade"
      />
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { uid } from 'quasar'
import KanbanColumn from 'components/KanbanColumn.vue'

const columns = [
  { id: 'watchlist', title: '📋 Watchlist', color: 'blue' },
  { id: 'inMotion', title: '🚀 In Motion', color: 'orange' },
  { id: 'exited', title: '🛑 Exited', color: 'grey' }
]

const trades = ref({
  watchlist: [],
  inMotion: [],
  exited: []
})

const showModal = ref(false)
const viewModal = ref(false)
const newTrade = ref({ title: '', note: '' })
const selectedTrade = ref({})

// Load from localStorage on start
onMounted(() => {
  const saved = localStorage.getItem('trades')
  if (saved) trades.value = JSON.parse(saved)
})

// Save to localStorage when changes occur
watch(trades, (newVal) => {
  localStorage.setItem('trades', JSON.stringify(newVal))
}, { deep: true })

const handleMove = (card, from, to) => {
  trades.value[from] = trades.value[from].filter(item => item.id !== card.id)
  trades.value[to].push(card)
}

const addTrade = () => {
  if (!newTrade.value.title.trim()) return

  const tradeCard = {
    id: uid(),
    title: newTrade.value.title,
    note: newTrade.value.note,
    date: new Date().toLocaleString()
  }

  trades.value.watchlist.push(tradeCard)
  newTrade.value.title = ''
  newTrade.value.note = ''
  showModal.value = false
}

const viewTrade = (trade) => {
  selectedTrade.value = trade
  viewModal.value = true
}
</script>

<style scoped>
.kanban-page {
  min-height: 100vh;
}
</style>
