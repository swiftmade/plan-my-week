<template>
    <div class="block bg-white my-1 rounded border border-gray-200 flex flex-col"
        :style="{minHeight: '40px', height: `${percentOfDay(project)}%`, backgroundColor: project.color}">
            <div class="flex-1 p-3 text-xs text-white flex items-start truncate">
              {{ hours }} hr -
            {{ project.name }}
            </div>

        <drag-handler
          :target="$el"
          @increase="$emit('increase')"
          @decrease="$emit('decrease')" />
    </div>
</template>
<script>
import {mapState} from 'vuex'
import DragHandler from './DragHandler'

export default {
  props: ['project', 'hours'],
  components: {
    DragHandler
  },
  computed: {
    ...mapState(['workingHours'])
  },
  methods: {
    percentOfDay (project) {
      return (this.hours / this.workingHours) * 100
    }
  }
}
</script>
