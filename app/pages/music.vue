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

    <transition name="music-list">

      <v-ons-list>

        <v-ons-list-header>Musics</v-ons-list-header>
        <transition-group name="list-change">


          <v-ons-list-item v-for="(item, index) in items" :key="item._id" class="list-item--longdivider__center">
            <div class="left">
              <span>{{item.name}}</span>
            </div>
            <div class="right">
              <transition name="slide-fade">
                <v-ons-button v-if="isEditing" class="remove-button" modifier="quiet" @click="removeMusic(item, index)">
                  <v-ons-icon class="removeIcon" icon="ion-close-circled"></v-ons-icon>
                </v-ons-button>
              </transition> 
            </div>
          </v-ons-list-item>

          <v-ons-list-header key="addNewHeader">Add new</v-ons-list-header>
          <v-ons-list-item key="AddNewItem">
            <v-ons-input placeholder="New music name" @keyup.enter="newMusic" v-model="inputMusicName"/>
            <v-ons-button @click="newMusic" modifier="outline">Add music</v-ons-button>
          </v-ons-list-item>

        </transition-group>
      </v-ons-list>

    </transition>

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
        let lresult = await this.$axios.$post("music", {
          action: "add",
          name: this.inputMusicName
        });
        this.items.push(lresult);
        this.$ons.notification.toast("Your new music is added!", {
          timeout: 2000,
          animation: "fall"
        });
      }
      this.inputMusicName = "";
    },
    async removeMusic(music, index) {
      console.log("sdfsdfsdfsd");
      let lresult = await this.$axios.$post("music", {
        action: "remove",
        name: music.name
      });
      if (lresult.ok === 1) this.items.splice(index, 1);
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
  transition: all 0.5s ease;
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
  transform: translateX(10px);
}

.remove-button {
  padding: 0px 0px;
  display: flex;
  border: none;
  text-align: center;
  text-decoration: none;
  height: auto;
}

.list {
  transition: all 3s ease-out;

}
/* .list:hover {
  background: green;
  width: 200px;

} */

.music-list {
  transition: all 1s;
  display: inline-block;
  position: absolute;
}

.music-list-enter,
.music-list-leave-to {
  transform: translateY();
}

.music-list-enter-active,
.music-list-leave-active {
  position: absolute;
}

.list-header,
.list-item {
  transition: all 0.5s ease-out;
}

.list-change-item {
  transition: all 0.5s;
  display: inline-block;
}
.list-change-enter,
.list-change-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-change-enter-active {
  position: relative;
}
.list-change-leave-active {
  position: absolute;
}
.list-change-enter-to,
.list-change-leave {
  opacity: 1;
}
</style>
