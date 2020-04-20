<template>
  <div id="app" class="antialiased mt-10 mx-auto" style="max-width:1350px">
    <h1 class="text-4xl mb-6">Plan your week</h1>

    <div class="flex">

      <div class="mr-16" style="width:250px !important;">

        <off-days />

        <working-hours />

        <h3 class="text-xl">Projects</h3>
        <list-projects :projects="projects" @input="projects = arguments[0]" />

        <a href="#" role="button" class="mt-2 text-blue-500 text-xs font-bold" @click="addProject()">+ Add Project</a>
      </div>

      <schedule class="flex-1" />

    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import OffDays from './components/OffDays'
import Schedule from './components/Schedule'
import WorkingHours from './components/WorkingHours'
import ListProjects from './components/ListProjects'

export default {
  name: 'App',
  components: {
    OffDays,
    Schedule,
    WorkingHours,
    ListProjects
  },
  computed: {
    ...mapState({
      offtime: 'offtime',
      projects: 'projects'
    })
  },
  methods: {
    addProject () {
      this.$store.commit('newProject')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
}
</style>
