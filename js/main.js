const search = document.querySelector('.places');

search.addEventListener('click', searchMovie);

console.log(search);
function searchMovie (e){
    if (e.keyCode === 13){
        movieName = search.value;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.meteo.lt/v1/places' + place );
        xhr.onreadystatechange = function () {
            if(xhr.readyState === 4) {
                let miestai = JSON.parse(xhr.responseText);
                console.log(miestai);
                if (movie.Response === "True"){
                    document.getElementById('infoIsvedimas').innerHTML = "";
                    document.getElementById('pavadinimas').innerHTML = movie.Title;
                    document.getElementById('director').innerHTML = "Director: " + movie.Director;
                    document.getElementById('imdb').innerHTML = "Imdb: " + movie.imdbRating;
                    document.getElementById('type').innerHTML = "Type: " + movie.Type;
                    document.getElementById('dvd').innerHTML = "dvd: " + movie.Dvd;
                    document.getElementById('poster').innerHTML = "<img src=\"" + movie.Poster + "\">";
                }else {
                    alert("Su siuo pavadinimu filmas nerastas");
                }
            }
        }
        xhr.send();
    }

}