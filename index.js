// 3422ea5c
const searchInput = document.getElementById("search-input")
const form = document.getElementById("form")
const movieList = document.getElementById("movie-list")

let moviesArray = []
let watchListArray = []
let movieObj = {}

const moviesFromLocalStorage = JSON.parse(localStorage.getItem("Watchlist"))
const searchedMoviesFromSessionStorage = JSON.parse(sessionStorage.getItem("SearchedMovies"))

if(moviesFromLocalStorage){
    watchListArray = moviesFromLocalStorage 
}

if(searchedMoviesFromSessionStorage) {
    moviesArray = searchedMoviesFromSessionStorage
    renderMovies()
}

document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        handleAddBtn(e.target.dataset.add)
    }
})

function handleAddBtn(movieId) {
    const watchlistText = document.getElementById(movieId)
    const watchlistBtn = document.getElementById(movieId+"s")
    
    movieObj = moviesArray.filter(function(movie){
        return movieId === movie.imdbID
    })[0]
    if(!watchListArray.find(obj => obj.imdbID === movieObj.imdbID)){
        watchListArray.push(movieObj)
        localStorage.setItem("Watchlist", JSON.stringify(watchListArray))        
    }
}

// ////////////////////////////////////////////////////////////////////

form.addEventListener("submit", function(e) {
    e.preventDefault()
    moviesArray = []
    fetch(`https://www.omdbapi.com/?s=${searchInput.value}&apikey=3422ea5c`)
        .then(res => res.json())
        .then(data => getEeachMovie(data.Search))
})

function getEeachMovie(movies) {
    movieList.innerHTML = ""
    if(movies){    
        movies.forEach(function(movie) {
        fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=8eeeb0ec`)
            .then(res => res.json())
            .then(data => {
                moviesArray.push(data)
                sessionStorage.setItem("SearchedMovies", JSON.stringify(moviesArray))
                renderMovies()
            })
        })
    }
    else {
        renderNotFound()
    }
}

function renderMovies() {
    movieList.classList.remove("movie-list")
    movieList.classList.add("movie-flex")
    let html = ""
    moviesArray.forEach(function(movie){        
        html += `
        <div class="movie-specs">

            <div>
                <img class="movie-poster" src="${movie.Poster}"> 
            </div>
        
            <div class="the-movie">
                <div class="first-section">
                    <h3 class="movie-name">${movie.Title}</h3>
                    <img class="rate-icon" src="images/Icon.png">
                    <p class="rate-number">${movie.Ratings[0].Value}</p>
                </div>
            
                <div class="second-section">
                    <p>${movie.Runtime}</p>
                    <p>${movie.Genre}</p>
                    <div class="watchlist-items">
                        <button id="${movie.imdbID+"s"}" class="watchlist-btn" data-add="${movie.imdbID}"></button>
                        <p id="${movie.imdbID}" class="watchlist-text">watchlist</p>
                    </div>
                </div>
            
                <div class="Third-section">
                    <p>${movie.Plot}</p>
                </div>
            </div>
        </div>`  
    })
    movieList.innerHTML = html
}

function renderNotFound() {
        movieList.classList.add("movie-list")
        movieList.innerHTML = `
            <h3 class ="not-found">Unable to find what you’re looking for. Please try another search.</h3>
        `
}



