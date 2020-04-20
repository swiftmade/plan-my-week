<template>
    <div class="bg-gray-300" style="height:2px;cursor:ns-resize;"
      @mousedown="startDrag()">

    </div>
</template>
<script>
import Vue from 'vue'
import throttle from 'lodash.throttle'

export default {
  props: ['target'],
  data () {
    return {
      dragging: false,
      lastY: null
    }
  },
  mounted () {
    this.handleMove = throttle(this.handleMove.bind(this), 150)
  },
  methods: {
    startDrag () {
      this.dragging = true
      window.addEventListener('mouseup', this.stopDrag)
      window.addEventListener('mousemove', this.handleMove)

      document.getElementsByTagName('body')[0].style = 'user-select: none;'
    },
    stopDrag () {
      Vue.set(this, 'dragging', false)
      Vue.set(this, 'lastY', null)
      window.removeEventListener('mouseup', this.stopDrag)
      window.removeEventListener('mousemove', this.handleMove)
      document.getElementsByTagName('body')[0].style = 'user-select: inherit;'
    },
    handleMove ($event) {
      if (!this.dragging) {
        return
      }

      const {bottom} = this.$el.getBoundingClientRect()

      if (this.lastY === null) {
        this.lastY = $event.clientY
      }

      if ($event.clientY > bottom && $event.clientY > this.lastY) {
        this.$emit('increase')
      } else if ($event.clientY < bottom && $event.clientY < this.lastY) {
        this.$emit('decrease')
      }

      this.lastY = $event.clientY

      // this.lastY = $event.clientY
    }
  }
}
</script>
