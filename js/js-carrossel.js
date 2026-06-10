const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('dots');
const carrosselPrev = document.getElementById('prev');
const carrosselNext = document.getElementById('next');

let atual = 0;
window._carrosselAtual = 0;

slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('ativo');
    dot.addEventListener('click', () => irParaSlide(i));
    dotsContainer.appendChild(dot);
});

function irParaSlide(index) {
    const slideAtual = slides[atual];
    slideAtual.classList.add('saindo');
    slideAtual.classList.remove('active');
    setTimeout(() => slideAtual.classList.remove('saindo'), 600);

    atual = (index + slides.length) % slides.length;
    window._carrosselAtual = atual;

    slides[atual].classList.add('active');

    document.querySelectorAll('.dot').forEach((d, i) => {
        d.classList.toggle('ativo', i === atual);
    });
}

carrosselNext.addEventListener('click', () => irParaSlide(atual + 1));
carrosselPrev.addEventListener('click', () => irParaSlide(atual - 1));

document.addEventListener('keydown', (e) => {
    const secoes = document.querySelectorAll('main > section');
    const carrosselSection = document.querySelector('.arquitetura-geral');
    const visivel = [...secoes].find(s => {
        const r = s.getBoundingClientRect();
        return r.top >= -10 && r.top <= 10;
    });
    if (visivel !== carrosselSection) return;

    if (e.key === 'ArrowRight') irParaSlide(atual + 1);
    if (e.key === 'ArrowLeft')  irParaSlide(atual - 1);
});