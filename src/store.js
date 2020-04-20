import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

const getNewSchedule = () => ([
  0,
  0,
  0,
  0,
  0,
  0,
  0
])

const store = new Vuex.Store({
  plugins: [vuexLocal.plugin],
  state: {
    projects: [],
    offtime: {
      saturday: true,
      sunday: true
    },
    workingHours: 8
  },
  getters: {

    days (state) {
      const days = [0, 1, 2, 3, 4]

      if (!state.offtime.saturday) {
        days.push(5)
      }

      if (!state.offtime.sunday) {
        days.push(6)
      }

      return days
    },

    scheduledHoursByDay (state, getters) {
      return getters.days.map(dayIndex => {
        return state.workingHours - state.projects.reduce((hours, project) => {
          hours += project.schedule[dayIndex]
          return hours
        }, 0)
      })
    },

    numAvailableDays (state) {
      return 7 - Object.values(state.offtime)
        .filter(off => off)
        .length
    },

    numWorkHours (state, getters) {
      return getters.numAvailableDays * state.workingHours
    },

    hoursPerProject (state, getters) {
      const fixedProjects = state.projects.filter(project => project.hours)
      const numFixedHours = fixedProjects.reduce((total, project) => {
        total += parseInt(project.hours)
        return total
      }, 0)

      const numFlexHours = (getters.numWorkHours - numFixedHours)
      const numFlexibleProjects = (state.projects.length - fixedProjects.length)
      const perFlexibleProject = numFlexHours / numFlexibleProjects

      return state.projects.map((project) => {
        if (project.hours) {
          return project.hours
        }
        return perFlexibleProject
      })
    },

    unscheduledHoursPerProject (state, getters) {
      return getters.hoursPerProject.map((hours, index) => {
        const scheduled = state.projects[index].schedule.reduce((total, hours) => {
          total += hours
          return total
        }, 0)

        return {
          index: index,
          scheduled: scheduled,
          project: state.projects[index],
          hours: hours - scheduled
        }
      }).filter(item => item.hours > 0)
    }
  },
  mutations: {
    toggleOffDay (state, day) {
      state.offtime[day] = !state.offtime[day]
    },

    updateWorkingHours (state, value) {
      state.workingHours = value
    },

    newProject (state) {
      state.projects.push({
        name: 'New Project',
        color: '#b4c3a0',
        hours: null,
        schedule: getNewSchedule()
      })
    },

    updateProject (state, {index, prop, value}) {
      state.projects[index][prop] = value
    },

    scheduleProjectForDay (state, {index, dayIndex, hours}) {
      if (hours > state.workingHours) {
        hours = state.workingHours
      }

      const project = state.projects[index]
      const schedule = project.schedule.map((h, i) => {
        if (i === dayIndex) {
          h = hours
        }
        return h
      })

      Vue.set(state.projects, index, {
        ...project,
        schedule
      })
    }
  }
})

export default store
