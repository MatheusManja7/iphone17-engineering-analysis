const main = document.querySelector('main');
const sections = Array.from(document.querySelectorAll('main > section'));
let atual = 0;
let bloqueado = false;

function irParaSection(index) {
    if (index < 0 || index >= sections.length || bloqueado) return;
    atual = index;
    bloqueado = true;

    const alvo = sections[atual].offsetTop;
    main.scrollTo({ top: alvo, behavior: 'smooth' });

    setTimeout(() => bloqueado = false, 900);
}

// Wheel
window.addEventListener('wheel', (e) => {
    if (bloqueado) return;

    const carrosselSection = document.querySelector('.visao-geral');
    if (sections[atual] === carrosselSection) {
        const total     = document.querySelectorAll('.slide').length;
        const slideAtivo = window._carrosselAtual ?? 0;
        if (e.deltaY > 0 && slideAtivo < total - 1) return;
        if (e.deltaY < 0 && slideAtivo > 0)         return;
    }

    if (e.deltaY > 0) irParaSection(atual + 1);
    else              irParaSection(atual - 1);
}, { passive: true });

// Teclado
window.addEventListener('keydown', (e) => {
    if (bloqueado) return;
    if (e.key === 'ArrowDown' || e.key === 'PageDown') irParaSection(atual + 1);
    if (e.key === 'ArrowUp'   || e.key === 'PageUp')   irParaSection(atual - 1);
});

// Touch
let touchStartY = 0;
window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
}, { passive: true });

window.addEventListener('touchend', (e) => {
    if (bloqueado) return;
    const diff = touchStartY - e.changedTouches[0].clientY;
    if (Math.abs(diff) < 40) return;
    if (diff > 0) irParaSection(atual + 1);
    else          irParaSection(atual - 1);
});