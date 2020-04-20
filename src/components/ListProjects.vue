<template>
  <div>
    <ul v-for="(project, i) in projects" :key="i">
      <li class="flex my-2">
        <div class="mr-2">
          <el-color-picker :value="project.color" size="mini" @input="updateProjectAtIndex(i, 'color', arguments[0])" />
        </div>
        <div class="flex-1 mr-2">
          <el-input :value="project.name" size="mini" @input="updateProjectAtIndex(i, 'name', arguments[0])" />
        </div>
        <div>
          <el-input style="width:50px" :placeholder="hoursPerProject[i]" :value="project.hours"  size="mini" @input="updateProjectAtIndex(i, 'hours', arguments[0])" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  props: [
    'projects'
  ],
  computed: {
    ...mapGetters(['hoursPerProject'])
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    updateProjectAtIndex (index, prop, value) {
      this.$store.commit('updateProject', {
        index,
        prop,
        value
      })
    }
  }
}
</script>
