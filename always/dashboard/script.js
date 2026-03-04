const start = document.getElementById("start");
const logo = document.getElementById("logo");
const mainSect = document.getElementById("main-sec");
const menuBar = document.getElementById("menu-bar")
const boot1 = new Audio("files/boot1.mp3");
const boot2 = new Audio("files/boot2.mp3");
const hover = new Audio("files/hover.mp3");
const bootscreen = document.getElementsByClassName("boot-screen");

const lines = [
    "GNU GRUB version 2.06",
    "Loading Linux 6.6.0...",
    "Loading initial ramdisk...",
    "Linux version 6.6.0",
    "Command line: BOOT_IMAGE=/vmlinuz root=/dev/sda1 ro quiet",
    "BIOS-provided physical RAM map: 512MB OK",
    "usb 1-1: new high-speed USB device",
    "EXT4-fs (sda1): mounted filesystem with ordered data mode",
    "[  OK  ] Started Journal Service.",
    "[  OK  ] Reached target Local File Systems.",
    "[FAILED] Failed to start Network Manager.",
    "Starting Network Manager...",
    "Started Network Manager.",
    "Starting OpenSSH Server...",
    "Started OpenSSH Server.",
    "FSOCIETY 1.2 LTS myserver tty1"
];


async function bootAnim() {

    for (let line of lines) {
        let text = document.createElement("div");
        text.className = "line";
        text.innerHTML = line;
        start.appendChild(text);

        await new Promise(resolve => setTimeout(resolve, Math.random() * 150 + 10));
    }
    setTimeout(() => {
        start.style.display = "none";
        logo.classList.add("show");
        boot1.play();
        setTimeout(() => {
            logo.classList.remove("show");
            setTimeout(() => {
                bootscreen[0].classList.add("remove");
                boot2.play();
            }, 4500);
        }, 7000);
    }, 200);
}


document.addEventListener("mousemove", function iniciar() {
    document.removeEventListener("mousemove", iniciar);
    bootAnim();
});

document.querySelectorAll('.icon').forEach(el => {
    el.addEventListener('mouseenter', () => hover.play());
});



// a partir daqui o codigo é gerado por IA, dps vou fazer o meu proprio, ta tarde

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

menuBar.addEventListener('mousedown', (e) => {
  isDragging = true;
  offsetX = e.clientX - mainSect.offsetLeft;
  offsetY = e.clientY - mainSect.offsetTop;
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});

document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    mainSect.style.left = (e.clientX - offsetX) + 'px';
    mainSect.style.top = (e.clientY - offsetY) + 'px';

  }
});

// mover a janela ultrapassa os limites do documento, criando espaço extra -- CORRIGIR
      