// --- 1. TYPING EFFECT FOR HEADER ---
const textToType = "4 Friends. 8 Semesters. One Unforgettable Journey.";
const typingElement = document.getElementById('typing-text');
let typeIndex = 0;

function typeWriter() {
    if (typeIndex < textToType.length) {
        typingElement.innerHTML += textToType.charAt(typeIndex);
        typeIndex++;
        setTimeout(typeWriter, 80); 
    }
}
window.onload = typeWriter;

// --- 2. 3D TILT EFFECT (Desktop Only) ---
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

document.querySelectorAll('.card').forEach(card => {
    if (!isTouchDevice) {
        card.addEventListener('mousemove', (e) => {
            const content = card.querySelector('.card-content');
            const cardRect = card.getBoundingClientRect();
            const x = e.clientX - cardRect.left - cardRect.width / 2;
            const y = e.clientY - cardRect.top - cardRect.height / 2;
            
            const rotateY = x / 15; 
            const rotateX = -y / 15;
            
            content.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            const content = card.querySelector('.card-content');
            content.style.transition = 'transform 0.5s ease';
            content.style.transform = `rotateY(0deg) rotateX(0deg)`;
            setTimeout(() => { content.style.transition = 'transform 0.1s ease'; }, 500);
        });
    }
});

// --- 3. SCROLL ANIMATION ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.row').forEach(row => observer.observe(row));

// --- 4. CONFETTI ---
function confettiEffect() {
    var duration = 3 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    var interval = setInterval(function() {
        var timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
        var particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: Math.random() - 0.2, y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: Math.random() + 0.2, y: Math.random() - 0.2 } }));
    }, 250);
}