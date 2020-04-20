<template>
  <div>
    <div>
        <div class="flex justify-between -mx-1" style="min-height:400px">
          <day v-for="index in days"
            :key="index"
            :day="index"
            :name="dayNames[index]" />
        </div>
    </div>
  </div>
</template>
<script>
import {mapGetters, mapState} from 'vuex'
import Day from './Day'

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default {
  components: {
    Day
  },
  computed: {
    ...mapGetters(['numWorkHours', 'days']),
    ...mapState(['offtime'])
  },
  data () {
    return {
      dayNames: DAY_NAMES
    }
  }
}
</script>
