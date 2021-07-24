<template>
    <Navbar :user="user"/>
    <main class=" pt-[2.5rem] sm:pt-[4rem] md:pt-[5rem] min-h-screen bg-gradient-to-r from-[#21d1ee] to-[#0ea6e9]">
      <router-view/>
    </main>
</template>

<script>
import Navbar from './Navbar.vue'
import authService from "../service/auth.service";

export default {
  name: 'Main',
  components: { Navbar },
  data(){
    return {
      user: {}
    }
  },
  async mounted() {
    this.user = await authService.getUser()
  }
}
</script>