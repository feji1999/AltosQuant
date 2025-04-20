<template>
  <div class="col-12 col-sm-4">
    <q-card :class="`bg-${color}-1`" class="q-pa-md" :data-column="column">
      <div class="text-subtitle1 text-bold q-mb-sm">
        {{ title }} ({{ items.length }})
      </div>

      <draggable
        :list="items"
        group="trades"
        item-key="id"
        class="draggable q-gutter-sm"
        :data-column="column"
        @end="onDragEnd"
      >
        <template #item="{ element }">
          <q-card class="q-pa-sm bg-white" @click="emit('view', element)" style="cursor: pointer">
            <div class="text-caption text-bold">{{ element.title }}</div>
            <div class="text-caption">{{ element.pair || 'N/A' }} ({{ element.direction || '?' }})</div>
            <div class="text-caption">Entry: {{ element.entry || '—' }}</div>
            <div class="text-caption">TP: {{ element.tp || '—' }} | SL: {{ element.sl || '—' }}</div>
            <div class="text-caption text-italic">RRR: {{ element.rrr || '—' }}</div>
            <div class="text-caption text-grey ellipsis">{{ element.note || 'No note yet.' }}</div>
            <!-- Inline note editing if needed -->
            <q-input
              v-model="element.note"
              dense
              filled
              label="Note"
              class="q-mt-sm"
              @click.stop
            />
          </q-card>
        </template>
      </draggable>
    </q-card>
  </div>
</template>

<script setup>
import draggable from 'vuedraggable'

defineProps({
  title: String,
  items: Array,
  color: String,
  column: String
})

const emit = defineEmits(['move', 'view'])

const onDragEnd = (evt) => {
  if (evt.from !== evt.to) {
    const card = evt.item.__vueParentComponent.props.element
    emit('move', card, evt.from.dataset.column, evt.to.dataset.column)
  }
}
</script>

<style scoped>
.draggable {
  min-height: 200px;
}
</style>
