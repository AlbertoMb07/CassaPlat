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
    { icon:'📡', name:'Sensor de humedad del suelo', short:'Lee la señal que la planta no puede decirte con palabras.', tech:'Sensor expuesto a la tierra y al agua; con el tiempo puede sufrir corrosión galvánica.', func:'Es el punto de partida de la traducción: convierte una condición física en una señal eléctrica.' },
    { icon:'🧠', name:'Microcontrolador (Arduino)', short:'Interpreta la lectura y decide qué color mostrar.', tech:'Recibe el valor del sensor y lo traduce en la señal que enciende el color correspondiente del semáforo.', func:'Es el traductor del sistema: convierte un dato técnico en una respuesta simple de leer.' },
    { icon:'🚦', name:'LED semáforo (rojo, azul, amarillo, verde)', short:'La respuesta visual que cualquiera puede leer.', tech:'Cuatro colores controlados por el microcontrolador, cada uno asociado a un estado distinto de humedad.', func:'Convierte la jardinería en algo tan simple como leer el tablero de un auto.' },
    { icon:'☀️', name:'Panel solar', short:'Da autonomía energética al sistema.', tech:'Capta energía solar para cargar las pilas recargables del sistema.', func:'Evita que la maceta dependa de estar conectada a la corriente eléctrica.' },
    { icon:'🔋', name:'Pilas recargables', short:'Guardan la energía que junta el panel solar.', tech:'Se cargan con el panel solar y alimentan al microcontrolador y al semáforo LED; pierden vida útil con el tiempo.', func:'Mantienen el sistema encendido de forma continua y sostenible.' },
    { icon:'🪴', name:'Maceta impresa en 3D', short:'El cuerpo del producto, fácil de iterar.', tech:'Fabricada por impresión 3D, lo que permite prototipar rápido y personalizar el diseño sin moldes costosos.', func:'Aloja a la planta y a todos los componentes electrónicos del sistema.' },
    { icon:'🛡️', name:'Sellado impermeable de los circuitos', short:'Protege la electrónica del riego manual.', tech:'Encapsulado que aísla circuitos, microcontrolador y soldaduras del agua, incluido el riego en exceso.', func:'Evita cortocircuitos, ya que es la persona quien riega la planta directamente.' }
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
    { icon:'🏜️', text:'La tierra comienza a secarse.', tech:'La condición física del sustrato cambia a medida que pierde humedad.' },
    { icon:'📡', text:'El sensor mide la humedad del suelo.', tech:'Convierte esa condición en una señal eléctrica legible por el microcontrolador.' },
    { icon:'🧠', text:'El microcontrolador interpreta la señal.', tech:'Traduce el dato del sensor en un estado: muy seco, bajo, óptimo o exceso de agua.' },
    { icon:'🔴', text:'LED rojo: tierra muy seca, necesita agua urgente.', tech:'El microcontrolador enciende el color asociado a humedad crítica.' },
    { icon:'🟡', text:'LED amarillo: humedad baja, pronto necesitará riego.', tech:'Aviso preventivo antes de que la planta llegue al punto crítico.' },
    { icon:'🟢', text:'LED verde: humedad óptima, no es necesario regar.', tech:'El sistema confirma que no se requiere ninguna acción por ahora.' },
    { icon:'🔵', text:'LED azul: exceso de agua, se regó de más.', tech:'Señal de que el riego manual superó lo que la planta necesitaba.' },
    { icon:'👤', text:'El usuario riega la planta según el color.', tech:'La acción final siempre es manual: el sistema informa, la persona decide.' },
    { icon:'📡', text:'El sensor vuelve a medir tras el riego.', tech:'El ciclo de lectura se repite de forma continua.' },
    { icon:'☀️', text:'En paralelo, el panel solar carga las pilas.', tech:'La energía recargable mantiene encendido al sensor, el microcontrolador y el semáforo LED sin depender de un contacto eléctrico.' }
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
  // --- LÓGICA DEL MODO OSCURO ---
  var themeToggle = document.getElementById('themeToggle');
  var themeIcon = document.getElementById('themeIcon');
  var htmlElement = document.documentElement; 

  // Revisar si ya hay un tema guardado en la memoria (localStorage)
  var savedTheme = localStorage.getItem('cassa_theme');
  if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme);
  }

  // Evento al hacer clic en el botón
  if(themeToggle) {
    themeToggle.addEventListener('click', function() {
      var currentTheme = htmlElement.getAttribute('data-theme');
      var newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('cassa_theme', newTheme); // Guarda la preferencia
      updateIcon(newTheme);
    });
  }

  // Función para cambiar el icono (Sol / Luna)
  function updateIcon(theme) {
    if (theme === 'dark') {
      // Icono de Sol
      themeIcon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
    } else {
      // Icono de Luna
      themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
    }
  }
})();
