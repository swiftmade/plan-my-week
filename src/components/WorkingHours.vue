<template>
    <div class="mb-6">
        <h3 class="text-xl mb-2">Working hours</h3>
        <el-input-number v-model="workingHours" :min="1" :max="12" size="mini" />
    </div>
</template>
<script>
export default {
  computed: {
    workingHours: {
      get () {
        return this.$store.state.workingHours
      },
      set (value) {
        this.$store.commit('updateWorkingHours', value)
      }
    }
  }
}
</script>
