<template>
  <div>
    <section>
        <nav>
          <ul>
            <li><router-link to="/bookmarks">Favorites</router-link></li>
            <li>{{user.email}}</li>
            <li @click="clearStorage()">Logout</li>
          </ul>
        </nav>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Home',
  data : () => {
    return {

    }
  },
  computed:{
    ...mapGetters({
      user : 'auth/user'
    })
  },
  methods: {
    ...mapActions({
      logout : 'auth/logout'
    }),
    clearStorage(){
      this.logout()
    }
  }
  
}
</script>

<style lang="scss">

</style>