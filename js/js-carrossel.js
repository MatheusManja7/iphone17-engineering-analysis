const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('dots');
const btnPrev = document.getElementById('prev');
const btnNext = document.getElementById('next');

let atual = 0;
window._carrosselAtual = 0; // expõe para o js-scroll

slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('ativo');
    dot.addEventListener('click', () => irPara(i));
    dotsContainer.appendChild(dot);
});

function irPara(index) {
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

btnNext.addEventListener('click', () => irPara(atual + 1));
btnPrev.addEventListener('click', () => irPara(atual - 1));

// Setas do teclado só quando NÃO está navegando entre sections
document.addEventListener('keydown', (e) => {
    const secoes = document.querySelectorAll('main > section');
    const carrosselSection = document.querySelector('.visao-geral');
    // pega section visível
    const visivel = [...secoes].find(s => {
        const r = s.getBoundingClientRect();
        return r.top >= -10 && r.top <= 10;
    });
    if (visivel !== carrosselSection) return;

    if (e.key === 'ArrowRight') irPara(atual + 1);
    if (e.key === 'ArrowLeft')  irPara(atual - 1);
});