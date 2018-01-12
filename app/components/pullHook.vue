<template>
	<v-ons-pull-hook
	:action="pullhookFunction"
	:threshold-height="maxHeight"
	:on-pull="onPull"
	@changestate="pullHookState = $event.state"
	>
		<v-ons-progress-circular v-show="pullHookState !== 'action'" value="0" :secondary-value="pullValue"></v-ons-progress-circular>
		<v-ons-progress-circular v-show="pullHookState === 'action'" indeterminate></v-ons-progress-circular>
	</v-ons-pull-hook>
</template>

<script>
export default {
  props: {
    pullhookFunction: {
      type: Function
    }
  },
  data() {
    return {
      pullHookState: "initial",
      pullValue: 0,
      maxHeight: -1
    };
  },
  methods: {
    onPull(height) {
      this.pullValue = height * 50 > 100 ? 100 : height * 50;
    }
  }
};
</script>

<style>

</style>
