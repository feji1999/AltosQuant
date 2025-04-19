<template>
  <q-card :class="colorClass" class="q-ma-sm">
    <q-card-section class="row items-center justify-between">
      <div class="text-subtitle1">
        {{ pair }} <span v-if="direction">{{ directionIcon }}</span>
      </div>
      <q-btn flat dense round icon="delete" color="negative" @click="$emit('delete')" />
    </q-card-section>

    <q-card-section>
      <div class="text-caption">RRR: {{ rrr }}</div>
      <div class="text-caption">Entry: {{ entry }}</div>
      <div class="text-caption">TP: {{ tp }}</div>
      <div class="text-caption">SL: {{ sl }}</div>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <q-input
        v-model="editableNote"
        type="textarea"
        label="Notes"
        dense
        autogrow
        @blur="$emit('update:note', editableNote)"
      />
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'TradeCard',
  props: {
    pair: String,
    direction: String, // 'Buy' or 'Sell'
    rrr: String,
    entry: String,
    tp: String,
    sl: String,
    note: String,
    color: String // 'blue', 'green', 'yellow' etc.
  },
  data() {
    return {
      editableNote: this.note
    };
  },
  computed: {
    directionIcon() {
      return this.direction === 'Buy' ? '📈' : '📉';
    },
    colorClass() {
      return `bg-${this.color}-2 text-${this.color}-10`;
    }
  }
};
</script>

<style scoped>
.q-card {
  max-width: 300px;
}
</style>