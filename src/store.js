import Vue from "vue";
import Vuex from "vuex";
// import VuexPersistence from "vuex-persist";

import { sum } from "lodash";

/*
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});
*/

Vue.use(Vuex);

/**
 * 7 elements represent 7 days of the week
 * 0 represents the number of hours scheduled
 * [1, 0, 3, 0, ...] would mean that the project is scheduled
 * for 1 hour on monday and for 3 hours on wednesday.
 */
const getNewSchedule = () => Array(7).fill(0);

export const getDefaultState = () => ({
  projects: [],
  offtime: {
    saturday: true,
    sunday: true,
  },
  // Number of hours to work each day
  workingHours: 8,
});

export const getters = {
  days(state) {
    const days = [0, 1, 2, 3, 4];

    if (!state.offtime.saturday) {
      days.push(5);
    }

    if (!state.offtime.sunday) {
      days.push(6);
    }

    return days;
  },

  scheduledHoursByDay(state) {
    return Array(7)
      .fill(0)
      .map((_, dayIndex) => {
        return (
          parseInt(state.workingHours) -
          sum(state.projects.map((project) => project.schedule[dayIndex]))
        );
      });
  },

  numAvailableDays(state) {
    return 7 - Object.values(state.offtime).filter((off) => off).length;
  },

  numWorkHours(state, getters) {
    return getters.numAvailableDays * state.workingHours;
  },

  hoursPerProject(state, getters) {
    const fixedProjects = state.projects.filter((project) => project.hours);
    const numFixedHours = sum(fixedProjects.map((project) => project.hours));

    const numFlexHours = getters.numWorkHours - numFixedHours;
    const numFlexibleProjects = state.projects.length - fixedProjects.length;
    const perFlexibleProject = numFlexHours / numFlexibleProjects;

    return state.projects.map((project) => {
      if (project.hours) {
        return project.hours;
      }
      return perFlexibleProject;
    });
  },

  unscheduledHoursPerProject(state, getters) {
    return getters.hoursPerProject
      .map((hours, index) => {
        const scheduled = sum(state.projects[index].schedule);

        return {
          index: index,
          scheduled: scheduled,
          project: state.projects[index],
          hours: hours - scheduled,
        };
      })
      .filter((item) => item.hours > 0);
  },
};

export const mutations = {
  toggleOffDay(state, day) {
    state.offtime[day] = !state.offtime[day];

    // If off-time is turned on, clear schedules of that day
    if (state.offtime[day]) {
      const dayIndex = day === "saturday" ? 5 : 6;
      state.projects = state.projects.map((project) => {
        project.schedule[dayIndex] = 0;
        return project;
      });
    }
  },

  updateWorkingHours(state, value) {
    state.workingHours = value;
  },

  newProject(state) {
    state.projects.push({
      name: "New Project",
      color: "#b4c3a0",
      hours: null,
      schedule: getNewSchedule(),
    });
  },

  updateProject(state, { index, prop, value }) {
    if (prop === "hours") {
      value = !value ? 0 : parseInt(value);
      value = isNaN(value) ? 0 : value;
    }
    state.projects[index][prop] = value;
  },

  scheduleProjectForDay(state, { index, dayIndex, hours }) {
    if (hours > state.workingHours) {
      hours = state.workingHours;
    }

    const project = state.projects[index];
    const schedule = project.schedule.map((h, i) => {
      if (i === dayIndex) {
        h = hours;
      }
      return h;
    });

    Vue.set(state.projects, index, {
      ...project,
      schedule,
    });

    const totalHours = sum(state.projects[index].schedule);

    if (totalHours > state.projects[index].hours) {
      state.projects[index].hours = totalHours;
    }
  },

  deleteProject(state, index) {
    state.projects.splice(index, 1);
  },

  reset(state) {
    Object.assign(state, getDefaultState());
  },
};

const store = new Vuex.Store({
  // plugins: [vuexLocal.plugin],
  state: getDefaultState(),
  getters,
  mutations,
});

export default store;
