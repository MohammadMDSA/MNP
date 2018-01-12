<template>
  <v-ons-page class="mainPadding">
        <!-- {{ JSON.stringify(items, null, 2) }} -->

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


    <v-ons-toolbar>
      <div class="center">Title</div>
    </v-ons-toolbar>
  </v-ons-page>
</template>

<script>
export default {
  data() {
    return {
      inputMusicName: '',
      items: []
    };
  },
  async mounted() {
    this.refresh();
  },
  methods: {
    async refresh() {
      this.items = await this.$axios.$get("music");
    },
    async newMusic() {
      await this.$axios.$post("music", { name: this.inputMusicName })
      inputMusicName = ''
      this.refresh();
    }
  }
};
</script>

<style>
  .mainPadding {
    padding: 106px;
  }
</style>
