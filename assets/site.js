(function () {
  // Barra de vagas: começa em 85% ao abrir a página, +1% a cada 4 s, para em 99% (igual à versão original).
  var card = document.querySelector('.vacancy-card');
  var bar = card && card.querySelector('.vacancy-track span');
  if (card && bar) {
    var pct = 85;
    var paint = function () {
      bar.style.width = pct + '%';
      bar.textContent = pct + '% preenchido';
      card.setAttribute('aria-label', pct + '% das vagas preenchidas');
    };
    paint();
    var vt = setInterval(function () {
      if (pct >= 99) { clearInterval(vt); return; }
      pct += 1;
      paint();
      if (pct >= 99) clearInterval(vt);
    }, 4000);
  }

  // Letreiro: alterna 3 mensagens a cada 2 s e reinicia a animação de entrada.
  var slot = document.querySelector('.ticker-message-slot');
  if (slot) {
    var icon = slot.querySelector('.whatsapp-icon');
    var iconHtml = icon ? icon.outerHTML : '';
    var msgs = [
      '<span class="ticker-message ticker-free">' + iconHtml + '<span class="ticker-label">GRUPO 100% GRATUITO</span></span>',
      '<span class="ticker-message ticker-coupon"><span class="ticker-symbol" aria-hidden="true">🏷️</span><span class="ticker-label">CUPONS DE 30% A 70% OFF</span></span>',
      '<span class="ticker-message ticker-limited"><span class="ticker-symbol" aria-hidden="true">🔥</span><span class="ticker-label">VAGAS LIMITADAS</span></span>'
    ];
    var idx = 0;
    setInterval(function () {
      idx = (idx + 1) % msgs.length;
      slot.innerHTML = '<div class="ticker-message-enter">' + msgs[idx] + '</div>';
    }, 2000);
  }

  // Pausar e retomar a rolagem das ofertas no celular (clique, Enter ou espaço).
  var stage = document.querySelector('.mockup-scroll-stage');
  if (stage) {
    var toggle = function () {
      var paused = stage.classList.toggle('is-paused');
      stage.setAttribute('aria-pressed', paused ? 'true' : 'false');
      stage.setAttribute('aria-label', paused ? 'Retomar rolagem das ofertas no celular' : 'Pausar rolagem das ofertas no celular');
    };
    stage.addEventListener('click', toggle);
    stage.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
  }
})();
