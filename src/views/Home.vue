<template>
  <div>
    <section class="contain">
        <nav>
          <h3>Movie App</h3>
          <ul class="nav-list">
            <li><router-link to="/bookmarks">Favorites</router-link></li>
            <li>{{user.email}}</li>
            <li @click="clearStorage()">Logout</li>
          </ul>
        </nav>
        <div class="movie">
         <div v-for="movie in movieData" :key="movie.id" class="movie-card">
            <div><img :src="movie.poster_path" alt="" class="movie-img"></div>
            <div>
              <h2>{{movie.title}}</h2>
              <p>{{movie.overview}}</p>
              <p>Ratings : {{movie.vote_average}}</p>
              <button>Add to Favorites</button>
            </div> 
         </div>
        </div>
        <div>
          <button @click="goToPrevious()"><img src="/../assets/left.svg"></button>
          <button @click="goToNext()"><img src="/../assets/right.svg"></button>
        </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios' 
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Home',
  data : () => {
    return {
      movieData : {}
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
    },
    async movies(){
      const MOVIE_API ="https://api.themoviedb.org/3/discover/movie?api_key=265736ba62602398f8203c161d8b247f&language=en-US&sort_by=popularity.desc&page=1"
      const IMG_APi = "https://image.tmdb.org/t/p/w500/"
     try{
        const res = await axios.get(MOVIE_API)
        if(res.status == 200){
          
          let r = res.data.results
          r.forEach((item) => {
            item.poster_path = IMG_APi + item.poster_path
          })
          this.movieData = r
          console.log(this.movieData)
        }
     } catch (err){
      console.log(err)
     }
    }
  },
  mounted() {
    this.movies()
  }
  
}
</script>

<style lang="scss">
  .contain{
    padding: 2% 5%;
  }
  nav{
    display: flex;
    align-items: center;
    justify-content: space-between;
    h3{
      text-transform: uppercase;
    }
  }
  .nav-list{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    list-style: none;

   li{
    padding-left: 20px;
    cursor: pointer;

    a{
      text-decoration: none;
      color: #53FF6E;
    }
   } 
  }

.movie{
  display: flex;
  flex-direction: column;
}

.movie-card{
  border: 1px solid #53FF6E;
  margin: 10px 0;
  padding: 10px 0;
}

.movie-img{
  width: 250px;
  height: 250px;
  object-fit: contain;
  float: left;
}
  
</style>