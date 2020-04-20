<template>
    <div class="mb-6">
        <h3 class="text-xl mb-2">Don't plan</h3>
        <el-checkbox class="saturday" label="Saturday" v-model="saturdayOff" />
        <el-checkbox class="sunday" label="Sunday" v-model="sundayOff" />
    </div>
</template>
<script>
export default {
  computed: {
    saturdayOff: {
      get () {
        return this.$store.state.offtime.saturday
      },
      set () {
        this.$store.commit('toggleOffDay', 'saturday')
      }
    },
    sundayOff: {
      get () {
        return this.$store.state.offtime.sunday
      },
      set () {
        this.$store.commit('toggleOffDay', 'sunday')
      }
    }
  }
}
</script>
