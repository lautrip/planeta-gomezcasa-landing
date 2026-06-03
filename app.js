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
    const cardPool = [
        {
            tag: "GIRAS",
            title: "GIRA EUROPEA - Capítulo 3 ESPAÑA",
            image: "https://videodelivery.net/ee7394e4128b1c4d7dcd00fe3e2d6f92/thumbnails/thumbnail.gif?time=38s&height=600&duration=4s",
            description: "Hoy les contamos todos los detalles de nuestra gira por España."
        },
        {
            tag: "GIRAS",
            title: "GIRA EUROPEA - Capítulo 2 BERLÍN",
            image: "https://videodelivery.net/7a5df4f2bff04564af576da21f65374c/thumbnails/thumbnail.gif?time=38s&height=600&duration=4s",
            description: "Casi como un álbum familiar les compartimos todo lo que filmó Gomez con su celu."
        },
        {
            tag: "GIRAS",
            title: "GIRA EUROPEA - Capítulo 1 BERLIN",
            image: "https://videodelivery.net/5a035cb4cc31e702329e6197332c5850/thumbnails/thumbnail.gif?time=38s&height=600&duration=4s",
            description: "Hoy les contamos cómo fue llegar a Berlin."
        },
        {
            tag: "EXCLUSIVO",
            title: "Modelos de Negocio Artísticos",
            image: "https://videodelivery.net/7645e2c3426c9d298d2e3ac4427f4f8f/thumbnails/thumbnail.gif?time=38s&height=600&duration=4s",
            description: "Hoy comenzamos una nueva saga. ¿Cómo hacer que mi proyecto sea sustentable?"
        },
        {
            tag: "PODCAST",
            title: "MÚSICA PARA FLASHEAR vol. 12",
            image: "https://static.alternativa.ar/contenidos/%23124%20M%C3%9ASICA%20PARA%20FLASHEAR%20vol%2012%20-%20El%20podcast%20de%20recomendaciones%20del%20club.jpg",
            description: "Volumen 12 de MÚSICA PARA FLASHEAR, el Podcast de recomendaciones del Club"
        },
        {
            tag: "PODCAST",
            title: "MÚSICA PARA FLASHEAR vol. 11",
            image: "https://static.alternativa.ar/contenidos/%23114%20M%C3%9ASICA%20PARA%20FLASHEAR%20vol%2010%20-%20El%20podcast%20de%20recomendaciones%20del%20club.jpg",
            description: "Volumen 11 de MÚSICA PARA FLASHEAR, el podcast de recomendaciones del Club"
        },
        {
            tag: "GASTRONOMÍA",
            title: "BODEGOMEZ - Capítulo 3",
            image: "https://videodelivery.net/df054165462f3780372ece481ad11c58/thumbnails/thumbnail.gif?time=38s&height=600&duration=4s",
            description: "En este último capítulo de esta saga Gómez nos muestra desde adentro BODEGOMEZ."
        },
        {
            tag: "GASTRONOMÍA",
            title: "BODEGOMEZ - Capítulo 2",
            image: "https://videodelivery.net/f5bc7d2b4b1e710761d38b0ea9e38b47/thumbnails/thumbnail.gif?time=38s&height=600&duration=4s",
            description: "Hoy, Gómez nos cuenta el minuto a minuto del BODEGOMEZ."
        },
        {
            tag: "GASTRONOMÍA",
            title: "BODEGOMEZ - Capítulo 1",
            image: "https://videodelivery.net/a9a135c721e47145893c08ea02c94375/thumbnails/thumbnail.gif?time=38s&height=600&duration=4s",
            description: "Nace el BODEGOMEZ. ¿De qué se trata?"
        },
        {
            tag: "GIRAS",
            title: "Organizar Gira - Logística",
            image: "https://videodelivery.net/3e1b0ce7eddd1eed6c7aa28440304883/thumbnails/thumbnail.gif?time=38s&height=600&duration=4s",
            description: "Hoy, profundizamos sobre la logística de una gira."
        },
        {
            tag: "GIRAS",
            title: "Organizar Gira - Autogestión",
            image: "https://videodelivery.net/c9a666a063fc30908870ca74499a8fa3/thumbnails/thumbnail.gif?time=38s&height=600&duration=4s",
            description: "Gomez nos cuenta cómo se creó el grupo autogestivo más grande de Sudamérica"
        },
        {
            tag: "GIRAS",
            title: "Organizar Gira - Charla",
            image: "https://videodelivery.net/73d1c36a4cf8775bce53b5eac629fd3e/thumbnails/thumbnail.gif?time=38s&height=600&duration=4s",
            description: "Hoy, el tercer capítulo de esta saga dedicada a ¿Cómo organizar tu propia gira?"
        },
        {
            tag: "GIRAS",
            title: "Organizar Gira - Introducción",
            image: "https://customer-2ix6ggxhvzermary.cloudflarestream.com/98e2f56dd8716d83625898dd28ac21f8/thumbnails/thumbnail.gif?time=40s&height=600&duration=4s",
            description: "Hoy empezamos una nueva saga de capítulos dedicados a cómo organizar tu propia gira."
        },
        {
            tag: "PODCAST",
            title: "MÚSICA PARA FLASHEAR vol. 10",
            image: "https://static.alternativa.ar/contenidos/%23114%20M%C3%9ASICA%20PARA%20FLASHEAR%20vol%2010%20-%20El%20podcast%20de%20recomendaciones%20del%20club.jpg",
            description: "Hoy, el volumen 10 de MÚSICA PARA FLASHEAR, el podcast de recomendaciones del Club."
        },
        {
            tag: "PROCESO",
            title: "PROCESO CREATIVO - Diferentes Formatos",
            image: "https://customer-2ix6ggxhvzermary.cloudflarestream.com/ca781a155fd2b78a70daa81b6d2245d3/thumbnails/thumbnail.gif?time=40s&height=600&duration=4s",
            description: "Hoy, el último capítulo de esta saga dedicada al proceso creativo de Futuro."
        },
        {
            tag: "PROCESO",
            title: "PROCESO CREATIVO - Diseño Gráfico",
            image: "https://customer-2ix6ggxhvzermary.cloudflarestream.com/09fe0399e62c52d36027cc59b6ddb188/thumbnails/thumbnail.gif?time=40s&height=600&duration=4s",
            description: "Hoy charlamos con Emo, el diseñador gráfico de todo el proceso estético de FUTURO."
        },
        {
            tag: "PROCESO",
            title: "PROCESO CREATIVO - Fingir Normalidad ft. DILLOM",
            image: "https://customer-2ix6ggxhvzermary.cloudflarestream.com/9fe5334c87e8e8507f6e84b0966338f5/thumbnails/thumbnail.gif?time=40s&height=600&duration=4s",
            description: "El proceso creativo de Fingir Normalidad feat. Dillom"
        },
        {
            tag: "PROCESO",
            title: "PROCESO CREATIVO - Ya Ni Me Miras ft. Juana Rozas",
            image: "https://customer-2ix6ggxhvzermary.cloudflarestream.com/39ff1aeaf700439241451459e3b01f99/thumbnails/thumbnail.gif?time=40s&height=600&duration=4s",
            description: "Gomez nos muestra cómo fue el proceso creativo de Ya ni me mirás feat. Juana Rozas."
        },
        {
            tag: "PROCESO",
            title: "PROCESO CREATIVO - Los descartes",
            image: "https://customer-2ix6ggxhvzermary.cloudflarestream.com/c1e48786b16e82e5990921d7903ac278/thumbnails/thumbnail.gif?time=40s&height=600&duration=4s",
            description: "Hoy Gomez nos abre su compu y nos muestra las primeras maquetas del nuevo álbum FUTURO"
        },
        {
            tag: "VISUALES",
            title: "VISUALES - Shows en vivo",
            image: "https://customer-2ix6ggxhvzermary.cloudflarestream.com/6d8ce9ecde4a5cb68160e8bb14cef950/thumbnails/thumbnail.gif?time=40s&height=600&duration=4s",
            description: "Tercer capítulo de esta saga dedicada a VISUALES."
        }
    ];

    const previewCards = document.querySelectorAll('.preview-card');
    
    if (previewCards.length > 0) {
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
