let row_peliculas = document.getElementById("row_peliculas");
let row_resultados = document.getElementById("row_resultados");
const formBusqueda = document.getElementById("formBusqueda");
const inputBusqueda = document.getElementById("inputBusqueda");

const dibujar = (contenedor, { results = []}) => {
        contenedor.innerHTML = "";

        results.forEach((pelicula) => {
            let column = document.createElement("div");
            column.classList.add("col-xl-3", "col-lg-3", "col-md-4", "col-sm-6", "mb-3");
            column.innerHTML = `
            <div class="card shadow">
                <img src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" alt="" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">
                        ${pelicula.original_title}
                    </h5>
                    <p class="card-text">
                        ${pelicula.overview.substr(0, 100)}...<a href="#">Leer más</a>
                    </p>
                    <small class="text-muted">
                        ${pelicula.release_date}
                    </small>
                </div>
            </div>`;
        
        contenedor.appendChild(column);

        })
}

const getPeliculasBuscadas = (busqueda) => {
        busqueda = encodeURI(busqueda);
        let url = `https://api.themoviedb.org/3/search/movie?api_key=0638f48983a8c83eab79b67647af2ba2&language=es-ES&query=${busqueda}&page=1&include_adult=false
        `;

        fetch(url).then((peticion) => {
            peticion.json().then((data) => {
                dibujar(row_resultados, data);
            })
        })
}

const getPeliculasPopulares = () => {
        const urlTMDB = "https://api.themoviedb.org/3/movie/popular?api_key=0638f48983a8c83eab79b67647af2ba2&language=es-ES";
        fetch(urlTMDB).then((peticion) => {
            peticion.json().then((data) => {
                dibujar(row_peliculas, data);
            })
        })
}

getPeliculasPopulares();

formBusqueda.onsubmit = e => {
        e.preventDefault(); 
        let busqueda = inputBusqueda.value.trim();
        if (busqueda === ""){
            row_resultados.innerHTML = "";
            row_peliculas.innerHTML = "";
            getPeliculasPopulares();
            return;
        }
        /**
         * TODO:
         * Hacer fetch a la url y dibujar el resultado de las peliculas que
         * coincidan con la busqueda en un div que sea exclusivo de los resultados de busqueda
         *
         */
        getPeliculasBuscadas(busqueda);
}
  
inputBusqueda.onkeyup = (e) => {  
    let busqueda = inputBusqueda.value.trim();
    if (busqueda.length < 3) {
        return;
    }
    getPeliculasBuscadas(busqueda);
}