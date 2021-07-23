<template>
  <div class="min-h-screen min-w-max bg-indigo-600">
    <Navbar/>
    <div class="h-screen mt-[80px]">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar.vue'

export default {
  name: 'Main',
  components: {Navbar},
}
</script>