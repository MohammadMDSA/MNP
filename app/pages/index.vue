<template>
	<v-ons-page class="mainPadding">
		<v-ons-tabbar position="auto" :tabs="tabs" :visible="true" :index.sync="activeIndex" swipeable>

		</v-ons-tabbar>
	</v-ons-page>
</template>

<script>
import musicPage from "./music.vue";
import settingPage from "./settings";

export default {
  data() {
    return {
      tabs: [
        {
          icon: this.getIcon("ion-music-note"),
          label: "Musics",
          page: musicPage,
          key: "musicPage"
        },
        {
          icon: this.getIcon("ion-settings"),
          label: "Settings",
          page: settingPage,
          key: "settingPage"
        }
      ],
      pageStack: [musicPage],
      activeIndex: 0
    };
  },
  components: {
    musicPage,
    settingPage
  },
  methods: {
    md() {
      return this.$ons.platform.isAndroid();
    },
    getIcon(name) {
      return this.md() ? null : name;
    }
  },
  computed: {
    title() {
      return this.tabs[this.activeIndex].label;
    }
  }
};
</script>

<style>

</style>
