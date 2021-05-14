// Consumir API
const API = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=00";

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const getData = (api) => {
    return fetch(api)
    .then((response) => response.json())
    .then((json) => {
        fetchImage(json),
        paginacion(json.previous, json.next)
    })
    .catch((error) => {
        console.log("Fetch Data Error: ", error)
    })
};

const fetchImage = (data) => {
    document.getElementById("datosPersonaje").innerHTML = "";
    data.results.forEach((pokemon) => {
        const url = pokemon.url;
        return fetch(url)
        .then((response) => response.json())
        .then((json) => {
            displayName(json)
        })
        .catch((error) => {
            console.log("Fetch Image Error: ", error)
        })
    })

}

// Dibujar cards de personajes
const displayName = (data) => {
    html = `
    <div class="col">
        <div class="card poke-image" id="poke-image" style="width: 18rem;">
        <img src="${data.sprites.other["official-artwork"].front_default}" class="card-img-top" alt=""></img>
            <div class="card-body">
                <h5 class="card-title">${capitalize(data.name)}</h5>
                <p class="card-text"><strong>Peso: </strong>${data.weight} gr</p>
            </div>
        </div>
    </div>
    `
    document.getElementById("datosPersonaje").innerHTML += html;
};

// Paginación
const paginacion = (prev, next) => {
    let html = "";
    html += `<li class="page-item ${prev ? "" : 'disabled'}"><a class="page-link" onclick="(getData('${prev}'))">Prev</a></li>`;
    html += `<li><a class="page-link ${next ? "" : 'disabled'}" onclick="(getData('${next}'))">Next</a></li>`;
    document.getElementById("paginacion").innerHTML = html;
};

// Ejecutar getData
getData(API);