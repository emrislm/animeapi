const titleEl = document.getElementById('animeTitle');
const scoreEl = document.getElementById('animeScore');
const imageEl = document.getElementById('animeImg');
const synopsisEl = document.getElementById('animeSynopsis');
const startedEl = document.getElementById('animeAired');
const stoppedEl = document.getElementById('animeStopped');
const episodesEl = document.getElementById('animeEpisodes');
const ratingEl = document.getElementById('animePG');
const formEl = document.getElementById('form');

sessionStorage.setItem("init", "false");
document.getElementById('left').classList.add('hid');
document.getElementById('content').classList.add('hid');
document.getElementById('search').value = "";

formEl.addEventListener('submit', (e) => {
    e.preventDefault();

    getInput();    
});

function getInput() {
    const search = document.getElementById('search');

    if (search.value != "") {
        sessionStorage.setItem("init", "true");
    }

    if (sessionStorage.getItem("init") == "true") {
        console.log(search.value);
        getAnimeBySearch(search.value);

        document.getElementById('left').classList.remove('hid');
        document.getElementById('content').classList.remove('hid');
        document.getElementById('init-text').classList.add('hid');
    }
}

async function getAnimeBySearch(term) {
    const resp = await fetch("https://api.jikan.moe/v4/anime?q=" + term);
    const animeData = await resp.json();

    const searchedAnime = animeData.data[0];

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
