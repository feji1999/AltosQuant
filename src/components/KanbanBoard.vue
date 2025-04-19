<template>
  <div class="kanban-container">
    <h2>Strategy Notes Board</h2>
    <div v-if="notes.length === 0" class="no-notes">No strategy notes found.</div>

    <div class="kanban-board">
      <div v-for="note in notes" :key="note.pair" class="kanban-card">
        <h3>{{ note.pair }}</h3>
        <p>{{ note.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Kanban",
  data() {
    return {
      notes: []
    };
  },
  mounted() {
    // Retrieve saved notes from localStorage
    const savedNotes = localStorage.getItem("strategyNotes");
    if (savedNotes) {
      try {
        // Convert the object to an array to match your Kanban display format
        const notesObj = JSON.parse(savedNotes);
        this.notes = Object.keys(notesObj).map(pair => ({
          pair: pair,
          text: notesObj[pair]
        }));
      } catch (e) {
        console.error("Failed to parse strategy notes:", e);
      }
    }
  }
};
</script>

<style scoped>
.kanban-container {
  padding: 2rem;
  font-family: sans-serif;
  background: #f4f4f4;
  min-height: 100vh;
}

h2 {
  margin-bottom: 1rem;
  font-size: 1.8rem;
}

.no-notes {
  color: #777;
  font-style: italic;
}

.kanban-board {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.kanban-card {
  background: white;
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  width: 240px;
}

.kanban-card h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  color: #333;
}

.kanban-card p {
  color: #555;
  font-size: 0.95rem;
}
</style>
