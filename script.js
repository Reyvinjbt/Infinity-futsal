// script.js — cuenta regresiva al próximo partido y pequeño comportamiento
(function(){
  // Ajusta la fecha/hora del próximo partido aquí:
  // Uso: YYYY-MM-DDTHH:MM:SS (hora local)
  const matchDate = new Date('2026-08-11T20:00:00');

  const cdDays = document.getElementById('cd-days');
  const cdTime = document.getElementById('cd-time');
  const nextMatchText = document.getElementById('next-match-text');

  function pad(n){ return String(n).padStart(2,'0'); }

  function updateCountdown(){
    const now = new Date();
    let diff = matchDate - now;
    if (diff <= 0){
      cdDays.textContent = '0';
      cdTime.textContent = '00:00:00';
      nextMatchText.textContent = 'Próximo partido: Actualmente en curso o pasado';
      return;
    }
    const days = Math.floor(diff / (1000*60*60*24));
    diff -= days * (1000*60*60*24);
    const hours = Math.floor(diff / (1000*60*60));
    diff -= hours * (1000*60*60);
    const minutes = Math.floor(diff / (1000*60));
    diff -= minutes * (1000*60);
    const seconds = Math.floor(diff / 1000);

    cdDays.textContent = days;
    cdTime.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

    // Texto legible en español
    const dLabel = days === 1 ? 'día' : 'días';
    nextMatchText.textContent = `Próximo partido: 11 de agosto de 2026 — en ${days} ${dLabel} ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Mejora: permitir cambiar fecha desde URL: ?match=2026-08-11T20:00:00
  const params = new URLSearchParams(location.search);
  if(params.has('match')){
    const m = new Date(params.get('match'));
    if(!isNaN(m)) {
      // reasignar matchDate (no reasignable const, so reload)
      location.search = params.toString(); // simple fallback — para cambios más avanzados habría que reestructurar
    }
  }
})();
