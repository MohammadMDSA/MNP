<template>
  <v-ons-page>
    <pullhook :pullhook-function="refresh"></pullhook>
    <v-ons-list>
      <v-ons-list-header>Musics</v-ons-list-header>
      <v-ons-list-item v-for="item in items">
        <div>
          <span>{{item.name}}</span>
        </div>
      </v-ons-list-item>
      <v-ons-list-header>Add new</v-ons-list-header>
      <v-ons-list-item>
        <v-ons-input placeholder="New music name" @keyup.enter="newMusic" v-model="inputMusicName"/>
        <v-ons-button @click="newMusic" modifier="outline">Add music</v-ons-button>
      </v-ons-list-item>
    </v-ons-list>

  </v-ons-page>

</template>

<script>

import pullhook from '../components/pullHook.vue'
// import ons from 'vue-onsenui'

export default {
  data() {
    return {
      inputMusicName: '',
      items: [],
      pullHookState: 'initial'
    };
  },
  async mounted() {
    // this.refresh();
  },
  methods: {
    async refresh(done) {
      this.items = await this.$axios.$get("music");
      if(done)
        done()
    },
    async newMusic() {
      if(this.inputMusicName && this.inputMusicName !== '') {
        await this.$axios.$post("music", { name: this.inputMusicName })
        this.$ons.notification.toast('Your new music is added!', {timeout: 2000, animation: 'fall'})
      }
      this.inputMusicName = ''
      this.refresh();
    }
  },
  components: {
    pullhook
  }
};
</script>

<style>
  .mainPadding {
    padding: 106px;
  }
</style>
