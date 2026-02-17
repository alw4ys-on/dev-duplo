const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789アカサタナハマヤラワ";
const fontSize = 18;

let columns = canvas.width / fontSize;
let drops = [];

function initDrops() {
  columns = canvas.width / fontSize;
  drops = [];

  for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * canvas.height;
  }
}

initDrops();

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00ff00";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];

    ctx.fillText(text, i * fontSize, drops[i]);

    drops[i] += fontSize;

    if (drops[i] > canvas.height && Math.random() > 0.97) {
      drops[i] = 0;
    }
  }
}

setInterval(drawMatrix, 33);

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initDrops();
});
