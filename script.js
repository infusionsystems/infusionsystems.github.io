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
    // Calculate columns based on current width
    columns = canvas.width / fontSize;
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
}
initializeDrops();

let lastTime = 0;
const fps = 30;
const interval = 1000 / fps;

function draw(currentTime) {
    requestAnimationFrame(draw);

    const deltaTime = currentTime - lastTime;
    if (deltaTime < interval) return;

    lastTime = currentTime - (deltaTime % interval);

    // Fading trail effect
    // Lower opacity = longer trails. 0.05 is good standard.
    context.fillStyle = 'rgba(0, 0, 0, 0.05)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = '#0F0';
    context.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        // Add a little randomness to color brightness for "depth"
        if (Math.random() > 0.95) {
             context.fillStyle = '#FFF'; // Sparkle effect
        } else {
             context.fillStyle = '#0F0';
        }
        
        context.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

// Start the loop
requestAnimationFrame(draw);

// Handle window resize event
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initializeDrops();
});
