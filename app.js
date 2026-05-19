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

    // 3. Compact Inline Checkout Form Handler
    const subscribeForm = document.getElementById('subscribe-form');
    const subscribeSuccess = document.getElementById('subscribe-success');
    const subscriberEmail = document.getElementById('subscriber-email');
    const btnSubmit = document.getElementById('btn-submit');
    const btnReset = document.getElementById('btn-reset');
    const successDisplayEmail = document.getElementById('success-display-email');
    
    if (subscribeForm && subscribeSuccess) {
        subscribeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailVal = subscriberEmail.value;
            
            // Loading button state
            btnSubmit.disabled = true;
            const originalBtnContent = btnSubmit.innerHTML;
            btnSubmit.innerHTML = `
                <span>Procesando...</span>
                <i data-lucide="loader-2" class="icon-spin"></i>
            `;
            lucide.createIcons({ nameAttr: 'data-lucide' });
            
            // Simulating API registration delay
            setTimeout(() => {
                // Populate display email
                if (successDisplayEmail) successDisplayEmail.textContent = emailVal;
                
                // Hide input layout, transition to success block
                subscribeForm.classList.add('hidden');
                subscribeSuccess.classList.remove('hidden');
                
                // Reset loading state
                btnSubmit.disabled = false;
                btnSubmit.innerHTML = originalBtnContent;
                lucide.createIcons({ nameAttr: 'data-lucide' });
            }, 1200);
        });
        
        // Reset Form to accept new subscribers
        if (btnReset) {
            btnReset.addEventListener('click', () => {
                subscribeForm.reset();
                subscribeSuccess.classList.add('hidden');
                subscribeForm.classList.remove('hidden');
            });
        }
    }
});
