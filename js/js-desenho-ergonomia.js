const track = document.getElementById('deTrack');

const cards = Array.from(track.querySelectorAll('.de-card'));
const totalCards = cards.length;
const visiveis = 3;
const totalPaginas = totalCards - visiveis + 1;

let pagina = 0;

function getCardWidth() {
    return cards[0].getBoundingClientRect().width + 19.2;
}

function irParaCard(p) {
    pagina = Math.max(0, Math.min(p, totalPaginas - 1));

    track.style.transform =
        `translateX(-${pagina * getCardWidth()}px)`;
}

window.addEventListener('load', () => irParaCard(0));

window.addEventListener('resize', () => {
    irParaCard(pagina);
});

function avancar() {
    const proxima =
        pagina + 1 < totalPaginas
            ? pagina + 1
            : 0;

    irParaCard(proxima);
}

let autoplay = setInterval(avancar, 12000);

track.addEventListener('mouseenter', () => {
    clearInterval(autoplay);
});

track.addEventListener('mouseleave', () => {
    clearInterval(autoplay);
    autoplay = setInterval(avancar, 12000);
});