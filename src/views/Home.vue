<template>
  <div>
    <section class="contain">
        <nav>
          <h3>Movie App</h3>
          <ul class="nav-list">
            <li><router-link to="/bookmarks">Favorites</router-link></li>
            <li>{{user.email}}</li>
            <li @click="clearStorage">Logout</li>
          </ul>
        </nav>
        <div class="movie">
         <div v-for="movie in movieData" :key="movie.id" class="movie-card" ref="movie" :id="movie.id">
            <div><img :src="movie.poster_path" alt="" class="movie-img"></div>
            <div>
              <h2>{{movie.title}}</h2>
              <p>{{movie.overview}}</p>
              <p>Ratings : {{movie.vote_average}}</p>
              <button @click="addFav(movie)">Add to Favorites</button>
            </div> 
         </div>
        </div>
        <div class="pagin-btn">
          <button @click="goToPrevious"><img src="@/assets/left.svg"></button>
          <button @click="goToNext"><img src="@/assets/right.svg"></button>
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
      movieData : {},
      currentPage: 1,
      favourites : []
    }
  },
  computed:{
    ...mapGetters({
      user : 'auth/user'
    })
  },
  methods: {
    ...mapActions({
      logout : 'auth/logout',
      addMovie: 'auth/addMovie'
    }),
    clearStorage(){
      this.logout()
    },
    async movies(){
      const MOVIE_API =`https://api.themoviedb.org/3/discover/movie?api_key=265736ba62602398f8203c161d8b247f&language=en-US&sort_by=popularity.desc&page=${this.currentPage}`
      const IMG_APi = "https://image.tmdb.org/t/p/w500/"

     try{
        const res = await axios.get(MOVIE_API)
        if(res.status == 200){
          npm
          let r = res.data.results
          r.forEach((item) => {
            item.poster_path = IMG_APi + item.poster_path
          })
          this.movieData = r
        }
     } catch (err){
      console.log(err)
     }
    },
    goToNext(){
      this.currentPage = this.currentPage + 1
      this.movies()
    },
    goToPrevious(){
      this.currentPage = this.currentPage - 1
      this.movies()
    }, 
    addFav(movie){
     this.favourites.push(movie)
     console.log(this.favourites)
    }
  },
  created() {
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

.pagin-btn{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px 30px;

  button{
        width: 50px;
    height: 30px;
    margin-left: 5px;
  }
}
  
</style>