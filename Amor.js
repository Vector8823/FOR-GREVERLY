// Mostrar secciones
function mostrarSeccion(id) {
  const secciones = document.querySelectorAll('.contenido');
  secciones.forEach(sec => sec.classList.add('oculto'));
  document.getElementById(id).classList.remove('oculto');
}

// Frases rotativas
const frases = [
  "No estás sola, siempre estoy contigo 💕",
  "Eres hermosa tal y como eres 🌸",
  "Cada día me enamoro más de ti 💖",
  "Tu sonrisa puede iluminar el mundo ✨",
  "Recuerda que vales muchísimo 💫"
];
let indiceFrase = 0;
const frasesContainer = document.getElementById('frases-rotativas');
function cambiarFrase() {
  if (!frasesContainer) return;
  frasesContainer.innerHTML = `<li>${frases[indiceFrase]}</li>`;
  indiceFrase = (indiceFrase + 1) % frases.length;
}
setInterval(cambiarFrase, 6000);
cambiarFrase();

// Mensajes animados
const formMensaje = document.getElementById('mensaje-form');
const inputMensaje = document.getElementById('mensaje-input');
const mensajesAnimados = document.getElementById('mensajes-animados');

formMensaje?.addEventListener('submit', e => {
  e.preventDefault();
  const texto = inputMensaje.value.trim();
  if (texto.length === 0) return;
  const p = document.createElement('p');
  p.textContent = texto;
  p.classList.add('mensaje-animado');
  mensajesAnimados.appendChild(p);
  setTimeout(() => {
    p.style.opacity = '0';
    setTimeout(() => mensajesAnimados.removeChild(p), 1000);
  }, 4000);
  inputMensaje.value = '';
});

// Corazones animados
const corazonesContainer = document.getElementById('corazones-container');
const coloresCorazon = ['#f48fb1', '#ce93d8', '#f8bbd0', '#e1bee7', '#fce4ec'];
function crearCorazon() {
  const corazon = document.createElement('div');
  corazon.classList.add('corazon-fondo');
  corazon.style.left = Math.random() * 100 + 'vw';
  corazon.style.animationDuration = (3 + Math.random() * 3) + 's';
  corazon.style.fontSize = (12 + Math.random() * 20) + 'px';
  corazon.style.color = coloresCorazon[Math.floor(Math.random() * coloresCorazon.length)];
  corazon.textContent = '💖';
  corazonesContainer.appendChild(corazon);
  setTimeout(() => corazonesContainer.removeChild(corazon), 6000);
}
setInterval(crearCorazon, 400);

// Juego
const juegoArea = document.getElementById('juego-area');
const puntosSpan = document.getElementById('puntos');
const reiniciarBtn = document.getElementById('reiniciar-juego');
let puntos = 0;
let intervalCorazones;
function crearCorazonJuego() {
  if (!juegoArea) return;
  const corazon = document.createElement('div');
  corazon.textContent = '💗';
  corazon.classList.add('corazon-juego');
  corazon.style.top = '0px';
  corazon.style.left = Math.random() * (juegoArea.clientWidth - 40) + 'px';
  juegoArea.appendChild(corazon);
  let pos = 0;
  const velocidad = 1 + Math.random() * 2;
  function bajar() {
    pos += velocidad;
    corazon.style.top = pos + 'px';
    if (pos > juegoArea.clientHeight) {
      juegoArea.removeChild(corazon);
    } else {
      requestAnimationFrame(bajar);
    }
  }
  bajar();
  corazon.addEventListener('click', () => {
    puntos++;
    puntosSpan.textContent = puntos;
    corazon.style.transform = 'scale(1.5)';
    setTimeout(() => {
      if (corazon.parentNode === juegoArea) juegoArea.removeChild(corazon);
    }, 200);
  });
}
function iniciarJuego() {
  if (!juegoArea) return;
  puntos = 0;
  puntosSpan.textContent = puntos;
  juegoArea.innerHTML = '';
  intervalCorazones = setInterval(crearCorazonJuego, 800);
}
function detenerJuego() {
  clearInterval(intervalCorazones);
  if (juegoArea) juegoArea.innerHTML = '';
}
reiniciarBtn?.addEventListener('click', () => {
  detenerJuego();
  iniciarJuego();
});
document.addEventListener('DOMContentLoaded', () => {
  iniciarJuego();
});

// Reloj
const reloj = document.getElementById('reloj');
function actualizarReloj() {
  if (!reloj) return;
  const now = new Date();
  const hora = now.getHours().toString().padStart(2, '0');
  const minutos = now.getMinutes().toString().padStart(2, '0');
  const segundos = now.getSeconds().toString().padStart(2, '0');
  reloj.textContent = `${hora}:${minutos}:${segundos}`;
}
setInterval(actualizarReloj, 1000);
actualizarReloj();

// Popup bienvenida y música
const popup = document.getElementById('popup-bienvenida');
const btnCerrar = document.getElementById('cerrar-popup');
const canciones = [
  'd4vd - Feel it (slowed-reverb).mp3',
  'Audio de WhatsApp 2025-07-18 a las 22.10.51_24b6047b.opus',
  'Audio de WhatsApp 2025-07-18 a las 22.10.51_8783622d.opus'
];
let indice = 0;
const player = document.getElementById('player');

function reproducirCancion(index) {
  if (player) {
    player.src = canciones[index];
    player.play().catch(err => {
      console.warn("El navegador bloqueó la reproducción automática:", err);
    });
  }
}

player?.addEventListener('ended', () => {
  indice = (indice + 1) % canciones.length;
  reproducirCancion(indice);
});

btnCerrar?.addEventListener('click', () => {
  popup.style.display = 'none';
  reproducirCancion(indice); // Inicia música después de interacción
});

// Modo noche
const btnModoNoche = document.getElementById('modo-noche-btn');
btnModoNoche?.addEventListener('click', () => {
  document.body.classList.toggle('modo-noche');
  btnModoNoche.textContent = document.body.classList.contains('modo-noche') ? '☀️ Modo Día' : '🌙 Modo Noche';
});
