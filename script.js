// Countdown robusto con D HH:MM:SS, manejo de fecha pasada y respeto a prefers-reduced-motion.
(function () {
  const contadorEl = document.getElementById('contador');
  const fechaPartidoEl = document.getElementById('fecha-partido');

  const fechaStr = fechaPartidoEl ? fechaPartidoEl.getAttribute('datetime') : '2026-07-07';
  const target = new Date(fechaStr.length === 10 ? fechaStr + 'T00:00:00' : fechaStr).getTime();

  if (isNaN(target)) {
    contadorEl && (contadorEl.textContent = 'Fecha del partido no válida');
    return;
  }

  function formatPad(n) {
    return String(n).padStart(2, '0');
  }

  function update() {
    const now = Date.now();
    let diff = target - now;

    if (diff <= 0) {
      const startOfTarget = new Date(target);
      const startOfNow = new Date(now);
      if (startOfTarget.toDateString() === startOfNow.toDateString()) {
        contadorEl && (contadorEl.textContent = '¡Hoy es el partido! 🏆');
      } else {
        contadorEl && (contadorEl.textContent = 'El partido ya pasó.');
      }
      clearInterval(timer);
      return;
    }

    const seconds = Math.floor(diff / 1000) % 60;
    const minutes = Math.floor(diff / (1000 * 60)) % 60;
    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    contadorEl && (contadorEl.textContent = `⏳ ${days} días ${formatPad(hours)}:${formatPad(minutes)}:${formatPad(seconds)} para el primer partido`);
  }

  update();
  const timer = setInterval(update, 1000);

  const rmq = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (rmq.matches) {
    clearInterval(timer);
  }
})();
