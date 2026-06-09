const iframe = document.getElementById('sketchfab');
const client = new Sketchfab(iframe);

client.init('87fc1df741384124a8ce0226d2b2058d', {
    success: function(api) {
        api.start();
        api.addEventListener('viewerready', function() {
            // Afasta a câmera para o modelo aparecer menor
            api.getCameraLookAt(function(err, camera) {
                if (!err) {
                    const eye = camera.position;
                    const target = camera.target;

                    // Controle de Distância
                    const scale = 1.1;
                    const newEye = [
                        target[0] + (eye[0] - target[0]) * scale,
                        target[1] + (eye[1] - target[1]) * scale,
                        target[2] + (eye[2] - target[2]) * scale
                    ];

                    api.setCameraLookAt(newEye, target, 0);
                    api.setUserInteraction(false); // Desativa zoom e pan
                    api.setUserInteraction(true);  // Reativa só rotação
                }
            });
        });
    },
    error: function() {
        console.log('Sketchfab API error');
    },
    autospin: 0.6,
    transparent: 1,
    ui_controls: 0,
    ui_infos: 0,
    ui_watermark: 0,
    ui_ar: 0,
    ui_help: 0,
    ui_settings: 0,
    ui_vr: 0,
    ui_fullscreen: 0,
    ui_annotations: 0,
    preload: 1
});

// Bloqueia zoom
const block = document.getElementById('zoomBlock');

block.addEventListener('wheel', (e) => {
    e.preventDefault();
    e.stopPropagation();
}, { passive: false });

block.addEventListener('mousedown', () => {
    block.style.pointerEvents = 'none';
});

document.addEventListener('mouseup', () => {
    setTimeout(() => block.style.pointerEvents = 'auto', 50);
});

block.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) block.style.pointerEvents = 'none';
});

block.addEventListener('touchend', () => {
    setTimeout(() => block.style.pointerEvents = 'auto', 50);
});

block.addEventListener('touchmove', (e) => {
    if (e.touches.length > 1) e.preventDefault();
}, { passive: false });