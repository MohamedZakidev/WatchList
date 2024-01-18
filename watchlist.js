const savedMovies = JSON.parse(localStorage.getItem("Watchlist"))
const movieList = document.getElementById("movie-list")


document.addEventListener('click', function(e){
    if(e.target.dataset.remove){
        handleRemoveBtn(e.target.dataset.remove)
    }
})

function handleRemoveBtn(removedIndex){
    savedMovies.splice(removedIndex, 1)
    localStorage.setItem('Watchlist', JSON.stringify(savedMovies));
    render() 
}

// ///////////////////////////////////////////////////

function getMoviesHtml() {
    let html = ""
    if(savedMovies && savedMovies.length > 0) {
        movieList.classList.remove("movie-list")
        movieList.classList.add("movie-flex")
        savedMovies.forEach(function(movie){
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
                            <button class="watchlist-remove-btn" data-remove=
                            "${savedMovies.indexOf(movie)}"></button>
                            <p class="watchlist-text">watchlist</p>
                        </div>
                    </div>
                
                    <div class="Third-section">
                        <p>${movie.Plot}</p>
                    </div>
                </div>
            </div>`
        })
    }
    else {
        movieList.classList.remove("movie-flex")
        movieList.classList.add("movie-list")
        html = 
            `<h3>Your watchlist is looking a little empty...</h3>
            <div class="add-movies-container">
                <a href="index.html"><button class="add-some-movies-btn"></button></a>
                <a class ="add-some-movies" href="index.html">Let’s add some movies!</a>
            </div>
        `
    }
    return html
}

 function render() {
     movieList.innerHTML = getMoviesHtml()
 }
render() 