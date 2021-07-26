<template>
  <div>
    <ul v-for="(project, i) in projects" :key="i">
      <li class="flex my-2 relative">
        <div class="absolute" style="left: -26px; top: 3px">
          <a href="#" @click="deleteProject(i)"
            ><i class="el-icon-delete text-gray-300"></i
          ></a>
        </div>
        <div class="mr-2">
          <el-color-picker
            :value="project.color"
            size="mini"
            @input="updateProjectAtIndex(i, 'color', arguments[0])"
          />
        </div>
        <div class="flex-1 mr-2">
          <el-input
            :value="project.name"
            size="mini"
            @input="updateProjectAtIndex(i, 'name', arguments[0])"
          />
        </div>
        <div>
          <el-input
            style="width: 50px"
            :placeholder="hoursPerProject[i]"
            :value="project.hours"
            size="mini"
            @input="updateProjectAtIndex(i, 'hours', arguments[0])"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["projects"],
  computed: {
    ...mapGetters(["hoursPerProject"]),
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
  methods: {
    deleteProject(index) {
      this.$store.commit("deleteProject", index);
    },
    updateProjectAtIndex(index, prop, value) {
      this.$store.commit("updateProject", {
        index,
        prop,
        value,
      });
    },
  },
};
</script>
