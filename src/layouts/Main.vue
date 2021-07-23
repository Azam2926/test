<template>
  <div class="min-h-screen bg-indigo-600">
    <Navbar/>
    <div class="mt-[2.5rem] sm:mt-[4rem] md:mt-[5rem]">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar.vue'

export default {
  name: 'Main',
  components: { Navbar }
}
</script>