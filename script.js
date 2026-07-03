(function(){
  // Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Navbar shadow on scroll
  var nav = document.getElementById('navbar');
  window.addEventListener('scroll', function(){
    nav.classList.toggle('scrolled', window.scrollY > 8);
  }, { passive: true });

  // Mobile menu
  var menuBtn = document.getElementById('menuBtn');
  var mobileMenu = document.getElementById('mobileMenu');
  var iconMenu = document.getElementById('iconMenu');
  var iconClose = document.getElementById('iconClose');
  function closeMenu(){
    mobileMenu.classList.add('hidden');
    iconMenu.classList.remove('hidden');
    iconClose.classList.add('hidden');
    menuBtn.setAttribute('aria-expanded','false');
  }
  menuBtn.addEventListener('click', function(){
    var isHidden = mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden');
    iconMenu.classList.toggle('hidden');
    iconClose.classList.toggle('hidden');
    menuBtn.setAttribute('aria-expanded', String(isHidden));
  });
  document.querySelectorAll('.mobile-link').forEach(function(a){
    a.addEventListener('click', closeMenu);
  });

  // Reveal on scroll
  var revealEls = document.querySelectorAll('.reveal');
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(function(el){ io.observe(el); });

  // ---- Componentes data ----
  var componentes = [
    { icon:'💧', name:'Sensor de humedad', short:'Mide qué tan húmeda está la tierra.', tech:'Sensor resistivo o capacitivo que entrega una señal analógica proporcional a la humedad del sustrato.', func:'Es el punto de partida del ciclo: sin su lectura, el Arduino no sabe cuándo regar.' },
    { icon:'🧠', name:'Arduino', short:'El cerebro que toma las decisiones.', tech:'Microcontrolador que lee el valor del sensor, lo compara contra un umbral programado y activa o desactiva la bomba.', func:'Coordina a todos los demás componentes según la lógica del programa.' },
    { icon:'🌀', name:'Bomba de agua', short:'Empuja el agua hacia la planta.', tech:'Micro bomba sumergible de bajo voltaje, activada por una señal digital del Arduino, a veces mediante un relevador.', func:'Ejecuta la acción física de riego cuando el sistema lo indica.' },
    { icon:'🪣', name:'Depósito de agua', short:'Guarda el agua disponible para regar.', tech:'Recipiente casero reutilizado que alimenta a la bomba por gravedad o succión directa.', func:'Es la fuente de agua del sistema; su nivel limita la autonomía del riego.' },
    { icon:'💡', name:'LED indicador', short:'Muestra el estado del sistema de un vistazo.', tech:'LED conectado a una salida digital del Arduino, controlado por software según el estado de humedad o riego.', func:'Da retroalimentación visual inmediata sin necesidad de revisar el código o una pantalla.' },
    { icon:'🔌', name:'Fuente de alimentación', short:'Le da energía a todo el sistema.', tech:'Fuente USB o batería que alimenta al Arduino y, según el diseño, a la bomba de agua.', func:'Sin energía constante, el ciclo automático se detiene por completo.' },
    { icon:'🪴', name:'Maceta', short:'El hogar físico de la planta.', tech:'Contenedor casero adaptado con orificios para el sensor y la manguera de riego.', func:'Contiene el sustrato donde se mide la humedad y se deposita el agua.' },
    { icon:'🌱', name:'Planta', short:'La razón de ser de todo el sistema.', tech:'Cualquier planta de interior de riego moderado, usada como caso de prueba del sistema.', func:'Su bienestar es la métrica final de que el sistema funciona correctamente.' }
  ];

  var grid = document.getElementById('componentGrid');
  componentes.forEach(function(c, i){
    var card = document.createElement('article');
    card.className = 'component-card card p-6 reveal reveal-delay-' + ((i % 4) + 1);
    card.innerHTML =
      '<button class="w-full flex items-start gap-4 text-left" aria-expanded="false">' +
        '<span class="w-11 h-11 rounded-xl bg-verde/10 flex items-center justify-center text-xl shrink-0" aria-hidden="true">' + c.icon + '</span>' +
        '<span class="flex-1">' +
          '<span class="flex items-start justify-between gap-2">' +
            '<h3 class="font-display font-semibold text-gris-darker leading-snug">' + c.name + '</h3>' +
            '<svg class="chevron shrink-0 mt-1" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="#5E6773" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
          '</span>' +
          '<span class="block text-[15px] text-gris-dark mt-1">' + c.short + '</span>' +
        '</span>' +
      '</button>' +
      '<div class="component-details mt-4 pt-4 border-t border-gris-light space-y-3">' +
        '<p class="text-[13px] text-gris-dark leading-relaxed"><span class="badge text-verde-dark block mb-1">DESCRIPCIÓN TÉCNICA</span>' + c.tech + '</p>' +
        '<p class="text-[13px] text-gris-dark leading-relaxed"><span class="badge text-verde-dark block mb-1">FUNCIÓN EN EL SISTEMA</span>' + c.func + '</p>' +
      '</div>';
    var btn = card.querySelector('button');
    btn.addEventListener('click', function(){
      var open = card.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
    });
    grid.appendChild(card);
  });

  // ---- Timeline steps ----
  var pasos = [
    { icon:'🏜️', text:'La tierra comienza a secarse.', tech:'La conductividad del sustrato disminuye a medida que pierde agua.' },
    { icon:'📡', text:'El sensor mide la humedad.', tech:'Convierte la condición física del suelo en una señal eléctrica analógica.' },
    { icon:'🧠', text:'El Arduino recibe el valor.', tech:'Lee la señal mediante una entrada analógica y la traduce a un número.' },
    { icon:'⚖️', text:'El Arduino compara con un umbral programado.', tech:'Contrasta la lectura actual contra un valor mínimo definido en el código.' },
    { icon:'🔻', text:'Si la humedad es baja...', tech:'La condición del programa se cumple y se dispara la acción de riego.' },
    { icon:'⚡', text:'Activa un relevador o directamente la bomba.', tech:'Envía una señal digital que enciende la bomba, con o sin relevador intermedio.' },
    { icon:'🌀', text:'La bomba extrae agua del depósito.', tech:'El motor genera succión y desplaza el agua hacia la manguera de salida.' },
    { icon:'💧', text:'El agua llega a la maceta.', tech:'El agua recorre la manguera hasta la superficie del sustrato.' },
    { icon:'🌿', text:'La tierra recupera humedad.', tech:'El sustrato absorbe el agua y su conductividad vuelve a subir.' },
    { icon:'📡', text:'El sensor vuelve a medir.', tech:'El ciclo de lectura se repite de forma continua.' },
    { icon:'✅', text:'Si ya existe suficiente humedad...', tech:'La nueva lectura supera el umbral mínimo programado.' },
    { icon:'🛑', text:'El Arduino apaga la bomba.', tech:'La salida digital vuelve a su estado inactivo.' },
    { icon:'💡', text:'El LED indica el estado del sistema.', tech:'Cambia de color o parpadeo según si el sistema está regando o en reposo.' }
  ];

  var stepsWrap = document.getElementById('timelineSteps');
  pasos.forEach(function(p, i){
    var el = document.createElement('div');
    el.className = 'timeline-step reveal relative pb-10 last:pb-0';
    el.innerHTML =
      '<span class="timeline-dot absolute -left-16 sm:-left-20 top-0 w-12 h-12 rounded-full bg-white border-2 border-verde flex items-center justify-center text-lg">' + p.icon + '</span>' +
      '<div class="card p-5 sm:p-6">' +
        '<p class="badge text-verde-dark mb-1.5">PASO ' + String(i+1).padStart(2,'0') + '</p>' +
        '<p class="font-display font-semibold text-gris-darker text-[17px] leading-snug">' + p.text + '</p>' +
        '<p class="text-[14px] text-gris-dark mt-2 leading-relaxed">' + p.tech + '</p>' +
      '</div>';
    stepsWrap.appendChild(el);
  });
  // re-observe newly injected reveal elements
  document.querySelectorAll('.timeline-step.reveal, .component-card.reveal').forEach(function(el){ io.observe(el); });

  // Timeline scroll progress fill
  var wrap = document.getElementById('timelineWrap');
  var fill = document.getElementById('timelineFill');
  function updateFill(){
    var rect = wrap.getBoundingClientRect();
    var vh = window.innerHeight;
    var total = rect.height;
    var progressed = Math.min(Math.max(vh * 0.7 - rect.top, 0), total);
    var pct = total > 0 ? (progressed / total) * 100 : 0;
    fill.style.height = pct + '%';
  }
  window.addEventListener('scroll', updateFill, { passive: true });
  window.addEventListener('resize', updateFill);
  updateFill();
})();
