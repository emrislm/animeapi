const titleEl = document.getElementById('animeTitle');
const scoreEl = document.getElementById('animeScore');
const imageEl = document.getElementById('animeImg');
const synopsisEl = document.getElementById('animeSynopsis');
const startedEl = document.getElementById('animeAired');
const stoppedEl = document.getElementById('animeStopped');
const episodesEl = document.getElementById('animeEpisodes');
const ratingEl = document.getElementById('animePG');

async function getAnimeBySearch(term) {
    const resp = await fetch("https://api.jikan.moe/v3/search/anime?q=" + term);
    const animeData = await resp.json();

    const searchedAnime = animeData.results[0];

    fillAnime(searchedAnime);
}

function fillAnime(anime) {
    titleEl.textContent = anime.title;
    scoreEl.textContent = anime.score;
    imageEl.src = anime.image_url;
    synopsisEl.textContent = anime.synopsis;
    startedEl.textContent = convertISOtoNormal(anime.start_date);
    stoppedEl.textContent = convertISOtoNormal(anime.end_date);
    episodesEl.textContent = anime.episodes;
    ratingEl.textContent = anime.rated;
}

function convertISOtoNormal(date) {
    const ISOdate = new Date(date);
    const day = ISOdate.getDate() < 10 ? (`0${ISOdate.getDate()}`) : ISOdate.getDate();
    const month = (ISOdate.getMonth()+1) < 10 ? (`0${ISOdate.getMonth()+1}`) : (ISOdate.getMonth()+1);
    const year = ISOdate.getFullYear();

    return day + "-" + month + "-" + year;
}

function searchAnime() {
    const inputval = document.getElementById('search').value;
    getAnimeBySearch(inputval);
}

getAnimeBySearch("demon lord retry");