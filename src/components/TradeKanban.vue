<!-- src/pages/TradesBoard.vue -->
<template>
  <q-page class="q-pa-md bg-grey-2">
    <div class="row q-col-gutter-md">
      <KanbanColumn
        v-for="col in columns"
        :key="col.id"
        :title="col.title"
        :trades="trades[col.id]"
        :column-id="col.id"
        @move-trade="handleMove"
      />
    </div>
    <q-btn
      color="primary"
      label="+ Add Trade"
      class="q-mt-md"
      @click="addTrade"
      icon="add"
    />
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import KanbanColumn from 'components/KanbanColumn.vue'

const columns = [
  { id: 'watchlist', title: '📋 Watchlist' },
  { id: 'inMotion', title: '🚀 In Motion' },
  { id: 'exited', title: '🛑 Exited' }
]

const trades = ref({
  watchlist: [],
  inMotion: [],
  exited: []
})

function addTrade() {
  trades.value.watchlist.push({
    id: Date.now(),
    pair: 'EUR/USD',
    direction: 'long',
    entry: '1.0800',
    tp: '1.0900',
    sl: '1.0700',
    rrr: 2,
    note: '',
    color: 'blue-1'
  })
}

function handleMove({ trade, from, to }) {
  trades.value[from] = trades.value[from].filter(t => t.id !== trade.id)
  trades.value[to].push(trade)
}
</script>
