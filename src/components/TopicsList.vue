<template>
  <b-container>
    <div class="topics-wrapper">
      <b-button
        v-for="topic in topics"
        :key="topic.id"
        class="topic-button"
        :class="[isActive && selectedTopicId == topic.id ? 'active' : '']"
        :id="topic.id"
        @click="filterQuotesByTopic"
        >{{ topic.name }}</b-button
      >
    </div>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      isActive: false
    }
  },
  computed: {
    topics() {
      let topicsNumber = 25
      return this.$store.getters['topics'].slice(0, topicsNumber)
    },
    selectedTopicId() {
      return this.$store.getters['selectedTopicId']
    }
  },
  methods: {
    setTopicButtonState: function(status) {
      return (this.isActive = status)
    },
    filterQuotesByTopic: function(event) {
      let selectedTopicId = event.target.id
      if (this.selectedTopicId && this.selectedTopicId == selectedTopicId) {
        this.setTopicButtonState(false)
        this.$store.commit('setSelectedTopicId', '')
        this.$store.dispatch('fetchQuotes', { vm: this })
      } else {
        this.setTopicButtonState(true)
        this.$store.commit('setSelectedTopicId', selectedTopicId)
        this.$store.dispatch('fetchQuotes', { vm: this })
      }
    }
  },
  mounted() {
    this.$store.dispatch('fetchTopics')
  }
}
</script>

<style scoped>
.topic-button {
  box-shadow: 0px 2px 4px rgba(64, 192, 241, 0.2);
  color: #757270;
  border-color: #f8f9fa;
  background-color: #f8f9fa;
  border-radius: 20px;
  font-size: 0.88em;
  margin: 1.2em 0.3em;
  flex: 0 0 auto;
}

.topics-wrapper {
  display: flex;
  overflow-x: auto;
}

.selected {
  color: #fff;
  background-color: #5a6268;
  border-color: #545b62;
}
</style>
