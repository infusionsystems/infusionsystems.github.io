const canvas = document.getElementById('MatrixCanvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const alphabet = katakana + latin + nums;

const fontSize = 16;
let columns = canvas.width / fontSize;
const drops = [];

function initializeDrops() {
    drops.length = 0;
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
}
initializeDrops();

function draw() {
    // Fading trail effect
    context.fillStyle = 'rgba(0, 0, 0, 0.05)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Matrix Rain
    context.fillStyle = '#0F0';
    context.font = fontSize + 'px monospace';
    for (let i = 0; i < drops.length; i++) {
        // Use robust bracket notation for random character access
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        context.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

// Reverting to the simple, reliable setInterval loop at 30 FPS
setInterval(draw, 30);

// Handle window resize event
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = canvas.width / fontSize;
    initializeDrops();
});
