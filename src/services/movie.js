



const imageApi = `https://image.tmdb.org/t/p/w500/`



let getMovies = (page) =>{
    return axios.get(`${MOVIE_API}`, {
        params: {page}
    }).then(response => {
        console.log(response.data)
    })
}


export {getMovies}