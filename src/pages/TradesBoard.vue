<template>
  <q-page class="q-pa-md bg-grey-2">
    <div class="q-mb-md">
      <q-btn label="➕ Add New Trade" color="primary" @click="showModal = true" />
    </div>

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

    <div class="row q-col-gutter-md">
      <KanbanColumn
        v-for="col in columns"
        :key="col.id"
        :title="col.title"
        :items="trades[col.id]"
        :color="col.color"
        :column="col.id"
        @move="handleMove"
      />
    </div>
  </q-page>
</template>



<script setup>
import { ref } from 'vue'
import KanbanColumn from 'components/KanbanColumn.vue'
import { uid } from 'quasar' // for unique ID generation

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
const newTrade = ref({ title: '', note: '' })

const handleMove = (card, from, to) => {
  trades.value[from] = trades.value[from].filter(item => item.id !== card.id)
  trades.value[to].push(card)
}

const addTrade = () => {
  if (!newTrade.value.title.trim()) return

  const tradeCard = {
    id: uid(),
    title: newTrade.value.title,
    note: newTrade.value.note
  }

  trades.value.watchlist.push(tradeCard)
  newTrade.value.title = ''
  newTrade.value.note = ''
  showModal.value = false
}
</script>


<style scoped>
.kanban-page {
  min-height: 100vh;
}
</style>
