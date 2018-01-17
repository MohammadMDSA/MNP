<template>
  <v-ons-page>
    <v-ons-toolbar>
			<div class="center">Musics</div>
      <div class="left">
        <transition name="fade" mode="out-in" tag="p">
          <v-ons-toolbar-button v-if="isEditing" @click="isEditing=!isEditing" key="doneEditing">Done</v-ons-toolbar-button>
          <v-ons-toolbar-button v-if="!isEditing" @click="isEditing=!isEditing" key="editing">Edit</v-ons-toolbar-button>
        </transition>
      </div>
		</v-ons-toolbar>
    <pullhook :pullhook-function="refresh"></pullhook>
    <v-ons-list>
      <v-ons-list-header>Musics</v-ons-list-header>
      <v-ons-list-item v-for="item in items" :key="item._id">
        <div class="left">
          <span>{{item.name}}</span>
        </div>
        <div class="right">
          <transition name="slide-fade">
            <v-ons-icon v-if="isEditing" class="removeIcon" icon="ion-close-circled"></v-ons-icon>
          </transition> 
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
import pullhook from "../components/pullHook.vue";
// import Velocity from 'velocity-animate'

// import ons from 'vue-onsenui'

export default {
  data() {
    return {
      inputMusicName: "",
      items: [],
      pullHookState: "initial",
      isEditing: false
    };
  },
  async mounted() {
    this.refresh();
  },
  methods: {
    async refresh(done) {
      this.items = await this.$axios.$get("music");
      if (done) done();
    },
    async newMusic() {
      if (this.inputMusicName && this.inputMusicName !== "") {
        await this.$axios.$post("music", { name: this.inputMusicName });
        this.$ons.notification.toast("Your new music is added!", {
          timeout: 2000,
          animation: "fall"
        });
      }
      this.inputMusicName = "";
      this.refresh();
    }
  },
  components: {
    pullhook
  }
};
</script>

<style>
.removeIcon {
  color: red;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.1s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.1s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(10px)
}


</style>
