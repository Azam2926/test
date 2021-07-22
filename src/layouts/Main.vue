<template>
  <div class="h-screen bg-indigo-600 flex justify-center items-center space-y-2 pr-48 pl-48">
    <navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './Navbar.vue'

export default {
  name: 'Main',
  components: { Navbar },
}
</script>