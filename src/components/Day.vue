<template>
  <div class="flex-1 mx-1s p-4" style="min-width: 208px">
    <div class="mb-1">
      {{ name }}
      <span class="text-xs text-gray-600 mb-4"
        >🕒 {{ workingHours - remaining }} / {{ workingHours }}</span
      >
    </div>
    <day-item
      v-for="(project, i) in projects"
      v-show="project.schedule[day]"
      :key="i"
      :project="project"
      :hours="project.schedule[day]"
      @dblclick.native="scheduleProject(i, 0)"
      @increase="scheduleProject(i, project.schedule[day] + 1)"
      @decrease="
        project.schedule[day] > 1
          ? scheduleProject(i, project.schedule[day] - 1)
          : null
      "
    />

    <ul>
      <li v-for="(item, i) in unscheduledHoursPerProject" :key="i">
        <a
          href="#"
          class="text-xs text-gray-500"
          @click="appendProject(item.index, item.hours)"
          >+ {{ item.project.name }} ({{ parseInt(item.hours) }})</a
        >
      </li>
    </ul>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";

import DayItem from "./DayItem";

export default {
  props: ["day", "name"],
  components: {
    DayItem,
  },
  computed: {
    ...mapState(["workingHours", "projects"]),
    ...mapGetters(["unscheduledHoursPerProject", "scheduledHoursByDay"]),
    remaining() {
      return this.scheduledHoursByDay[this.day];
    },
  },
  methods: {
    scheduleProject(index, hours) {
      this.$store.commit("scheduleProjectForDay", {
        index,
        hours,
        dayIndex: this.day,
      });
    },

    appendProject(index, hours) {
      const currentHours = this.projects[index].schedule[this.day];
      this.scheduleProject(index, currentHours + hours);
    },
  },
};
</script>
