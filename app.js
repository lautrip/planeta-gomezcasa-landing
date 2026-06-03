/* ==========================================================================
   PLANETA GÓMEZ CASA — MINIMALIST LOGIC
   Features: Parallax Starfield Canvas, Simple Inline Subscription Checkout Flow
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Interactive Canvas Starfield (Drifting Space Particle Background)
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');
    
    let stars = [];
    const starCount = 100;
    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Create Stars
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 1.5 + 0.2,
            speedX: (Math.random() - 0.5) * 0.12,
            speedY: (Math.random() - 0.5) * 0.12,
            opacity: Math.random() * 0.7 + 0.3,
            depth: Math.random() * 0.5 + 0.5
        });
    }
    
    // Track mouse movement to induce organic parallax drifting
    window.addEventListener('mousemove', (e) => {
        mouse.targetX = (e.clientX - window.innerWidth / 2) * 0.04;
        mouse.targetY = (e.clientY - window.innerHeight / 2) * 0.04;
    });
    
    function animateStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Smooth cursor coordinate interpolation
        mouse.x += (mouse.targetX - mouse.x) * 0.08;
        mouse.y += (mouse.targetY - mouse.y) * 0.08;
        
        stars.forEach(star => {
            let x = star.x + (mouse.x * star.depth);
            let y = star.y + (mouse.y * star.depth);
            
            // Boundary wrapping loop
            if (x < 0) star.x += canvas.width;
            if (x > canvas.width) star.x -= canvas.width;
            if (y < 0) star.y += canvas.height;
            if (y > canvas.height) star.y -= canvas.height;
            
            // Slow natural drifting coordinates
            star.x += star.speedX;
            star.y += star.speedY;
            
            // Draw particle
            ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            ctx.beginPath();
            ctx.arc(x, y, star.size, 0, Math.PI * 2);
            ctx.fill();
        });
        
        requestAnimationFrame(animateStars);
    }
    
    animateStars();

    // 3. Compact Inline Checkout Form Handler (Deprecated: Now using embedded iframe widget)

    // 4. Video Lightbox Modal Controller (YouTube Player Integration)
    const openVideoBtn = document.getElementById('open-video');
    const videoModal = document.getElementById('video-modal');
    const btnCloseModal = document.getElementById('btn-close-modal');
    const closeOverlay = document.getElementById('close-modal-overlay');
    const videoIframe = document.getElementById('video-iframe');

    // ID de YouTube oficial para "Fingir Normalidad ft. DILLOM" u otra sesión.
    // Podés cambiar esta cadena de texto por cualquier ID de video de YouTube que prefieras.
    const youtubeVideoId = 'P0T9N8G-q3Q'; 

    if (openVideoBtn && videoModal && videoIframe) {
        openVideoBtn.addEventListener('click', () => {
            // Carga el iframe con reproducción automática y configuraciones limpias
            videoIframe.src = `https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0&modestbranding=1`;
            videoModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Evita scroll de fondo
        });

        const closeModal = () => {
            videoIframe.src = ''; // Limpia el source para detener el audio/video inmediatamente
            videoModal.classList.add('hidden');
            document.body.style.overflow = ''; // Restaura el scroll
        };

        if (btnCloseModal) btnCloseModal.addEventListener('click', closeModal);
        if (closeOverlay) closeOverlay.addEventListener('click', closeModal);

        // Cerrar al presionar la tecla ESC
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !videoModal.classList.contains('hidden')) {
                closeModal();
            }
        });
    }

    // 5. Dynamic Content Preview Random Rotator
    let cardPool = [];
    if (typeof ALL_CONTENTS !== 'undefined') {
        let selectedTitles = [];
        try {
            const saved = localStorage.getItem('gomez_selected_contents');
            if (saved) {
                selectedTitles = JSON.parse(saved);
            }
        } catch (e) {
            console.error(e);
        }

        if (selectedTitles && selectedTitles.length > 0) {
            cardPool = ALL_CONTENTS.filter(item => selectedTitles.includes(item.title));
        }
        
        if (cardPool.length < 2) {
            cardPool = ALL_CONTENTS;
        }
    }

    const previewCards = document.querySelectorAll('.preview-card');
    
    if (previewCards.length > 0 && cardPool.length > 0) {
        // Track which pool items are currently displayed to prevent duplicates
        let activeTitles = Array.from(previewCards).map(card => {
            const h3 = card.querySelector('.card-info h3');
            return h3 ? h3.textContent.trim() : "";
        });

        setInterval(() => {
            // Pick a random card slot to swap (0 to 3)
            const randomSlot = Math.floor(Math.random() * previewCards.length);
            const cardElement = previewCards[randomSlot];

            // Filter the pool to get items not currently active
            const inactivePool = cardPool.filter(item => !activeTitles.includes(item.title));
            if (inactivePool.length === 0) return;

            // Pick a random new item
            const newItem = inactivePool[Math.floor(Math.random() * inactivePool.length)];

            // Transition: fade out -> replace contents -> fade in
            cardElement.style.opacity = '0';
            cardElement.style.transform = 'scale(0.96) translateY(4px)';

            setTimeout(() => {
                // Update background image
                const thumbnail = cardElement.querySelector('.card-thumbnail');
                if (thumbnail) {
                    thumbnail.style.backgroundImage = `url('${newItem.image}')`;
                }

                // Update badge
                const badge = cardElement.querySelector('.card-badge');
                if (badge) {
                    badge.textContent = newItem.tag;
                }

                // Update title
                const h3 = cardElement.querySelector('.card-info h3');
                if (h3) {
                    h3.textContent = newItem.title;
                }

                // Update description
                const p = cardElement.querySelector('.card-info p');
                if (p) {
                    p.textContent = newItem.description;
                }

                // Update the active tracker
                activeTitles[randomSlot] = newItem.title;

                // Fade back in
                cardElement.style.opacity = '1';
                cardElement.style.transform = '';
            }, 550);
        }, 3500); // Swap one random card every 3.5 seconds
    }
});
