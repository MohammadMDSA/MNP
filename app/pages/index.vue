<template>
<div>
    <pre>
        {{ JSON.stringify(items, null, 2) }}
    </pre>
    <v-ons-button @click="newMusic">Click Me</v-ons-button>
</div>  
</template>

<script>
export default {
    data() {
        return {
            items: []
        }
    },
    async mounted () {
        this.refresh()
    },
    methods: {
        async refresh() {
            this.items = await this.$axios.$get('music')
        },
        async newMusic() { 
            await this.$axios.$post('music')
            this.refresh()
        }
    }
}
</script>
