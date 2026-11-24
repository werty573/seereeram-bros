(() => {
  const U = (id, w) => `https://images.unsplash.com/photo-${id}?w=${w}&q=70&auto=format&fit=crop`;
  const IMG = {
    interchangeGreen: '1764692278983-4d4e6269c3c1',
    interchangeLanes: '1733190232275-be739ca2629d',
    interchangeRiver: '1721592626360-9b63b6a17ae8',
    interchangeDusk: '1774799888476-8ca65b617fa1',
    paver: '1763328044351-98341e9963da',
    rollers: '1786742593319-a97fbeda2ef5',
    ammann: '1783753445252-343ad48ffc3b',
    grader: '1690719465490-db2864ef85c1',
    graderGravel: '1779384338538-4f243b60e227',
    graderField: '1761135192805-c0f3fc4afdf4',
    dumpTruck: '1778066995093-a7f7d1049f8f',
    excavator: '1747004066130-c6531b74d353',
    bridgeLift: '1759849556341-f4767cb26ae0',
    runway: '1765715612037-09ce1621e460',
    landing: '1556388158-158ea5ccacbd',
    culvert: '1758244016375-a669be263c06',
    compactor: '1684431438566-6ff4a0df9190',
    quarry: '1782067170999-9cea25e8ae53'
  };
  const TYPE = {highway:'Highways', interchange:'Interchanges & bridges', air:'Airports & ports', earth:'Earthworks', road:'Road rehab', region:'Outside T&T'};

  // Every project below is named on the company's own site (seereerambros.com). k = client tag as published there.
  const P = [
    {t:'Barataria Flyover', p:'Trinidad', c:['interchange'], i:'interchangeLanes', n:'Longest-spanning flyover in the country'},
    {t:'San Fernando Interchange', p:'Trinidad', c:['interchange'], i:'interchangeRiver', k:'GOTT', n:'Main contractor on a complex, highly technical road project'},
    {t:'Solomon Hochoy Highway extension, Tarouba to Golconda', p:'Trinidad', c:['highway'], i:'interchangeGreen', k:'GOTT'},
    {t:'Land reclamation and runway extension, ANR Robinson International Airport', p:'Tobago', c:['air','earth'], i:'runway', n:'Formerly Crown Point International Airport'},
    {t:'Claude Noel Highway', p:'Tobago', c:['highway'], i:'rollers'},
    {t:'Package A, Churchill Roosevelt / Uriah Butler Interchange', p:'Trinidad', c:['interchange'], i:'interchangeDusk'},
    {t:'Earthworks, Piarco International Airport', p:'Trinidad', c:['air','earth'], i:'landing', k:'AATT'},
    {t:'Foundations and approaches, new Caroni Bridge, Southern Main Road', p:'Trinidad', c:['interchange'], i:'bridgeLift'},
    {t:'Preysal Interchange, East', p:'Trinidad', c:['interchange'], i:'graderField'},
    {t:'Maraval Roundabout', p:'Trinidad', c:['road'], i:'ammann', k:'GOTT'},
    {t:'Paving of the expanded apron, ANR Robinson International Airport', p:'Tobago', c:['air'], i:'paver'},
    {t:'Rehabilitation and paving of the yard, Port of Port of Spain', p:'Trinidad', c:['air'], i:'compactor'},
    {t:'Churchill Roosevelt Highway', p:'Trinidad', c:['highway'], i:'interchangeLanes'},
    {t:'Four-lane highway construction, extension to Providence', p:'Trinidad', c:['highway'], i:'dumpTruck'},
    {t:'Rehabilitation of the Soesdyke / Linden Highway', p:'Guyana', c:['highway','road','region'], i:'graderGravel'},
    {t:'Maintenance of 90+ miles of highway', p:'Guyana', c:['road','region'], i:'rollers'},
    {t:'Lot 1, East Bank Road, Ruimveldt to Demerara Harbour Bridge', p:'Guyana', c:['road','region'], i:'ammann'},
    {t:'Lot 2, West Bank Road, Demerara Harbour Bridge to Vreed-en-Hoop', p:'Guyana', c:['road','region'], i:'paver'},
    {t:'Agricultural feeder roads', p:'Grenada', c:['road','region'], i:'culvert'},
    {t:'Earthworks and infrastructure, Brian Lara Cricket Academy', p:'Trinidad', c:['earth'], i:'grader'},
    {t:'Infrastructure works, Tamana InTech Park Phase 2', p:'Trinidad', c:['earth'], i:'excavator'},
    {t:'Lady Young Road', p:'Trinidad', c:['road'], i:'paver'},
    {t:'Improvement to Maraval Access, Saddle Road', p:'Trinidad', c:['road'], i:'rollers'},
    {t:'Rehabilitation and reconstruction, Couva Main Road', p:'Trinidad', c:['road'], i:'compactor'},
    {t:'Rehabilitation and reconstruction, Cedar Hill Road', p:'Trinidad', c:['road'], i:'graderField'},
    {t:'Rehabilitation and reconstruction, Diego Martin Main Road', p:'Trinidad', c:['road'], i:'ammann'},
    {t:'Rehabilitation and reconstruction, Guaracara Tabaquite Main Road', p:'Trinidad', c:['road'], i:'paver'}
  ];

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* theme */
  const tBtn = $('[data-theme-toggle]');
  const setIcon = () => {
    const dark = document.documentElement.dataset.theme === 'dark';
    tBtn.innerHTML = `<i class="ph-light ${dark ? 'ph-sun' : 'ph-moon'}" aria-hidden="true"></i>`;
    tBtn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    $('meta[name="theme-color"]').content = dark ? '#121514' : '#E9ECEA';
  };
  setIcon();
  tBtn.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('sb-theme', next); } catch (e) {}
    setIcon();
  });

  /* mobile drawer */
  const burger = $('.burger'), drawer = $('#drawer');
  const closeDrawer = () => { burger.setAttribute('aria-expanded', 'false'); drawer.hidden = true; };
  burger.addEventListener('click', () => {
    const open = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!open));
    drawer.hidden = open;
  });
  $$('a', drawer).forEach(a => a.addEventListener('click', closeDrawer));

  /* reveal on scroll */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), {threshold: .15, rootMargin: '0px 0px -6% 0px'});
  $$('.rv').forEach((el, i) => { el.style.transitionDelay = (el.closest('.hero') ? i * 90 : 0) + 'ms'; io.observe(el); });

  /* count-up */
  const fmt = n => n.toLocaleString('en-US');
  const cio = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    cio.unobserve(e.target);
    const el = e.target, end = +el.dataset.count;
    if (reduce) { el.textContent = fmt(end); return; }
    const t0 = performance.now(), d = 1100;
    const tick = t => {
      const k = Math.min(1, (t - t0) / d), v = 1 - Math.pow(1 - k, 4);
      el.textContent = fmt(Math.round(end * v));
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }), {threshold: .6});
  $$('[data-count]').forEach(el => cio.observe(el));

  /* word scrub: each word lights as it crosses 62% of the viewport */
  const scrub = $('[data-scrub]');
  if (scrub) {
    const walk = node => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            const s = document.createElement('span'); s.className = 'w'; s.textContent = part; frag.appendChild(s);
          });
          n.replaceWith(frag);
        }
      });
    };
    walk(scrub);
    if (!reduce) {
      const wio = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle('on', e.isIntersecting || e.boundingClientRect.top < 0)),
        {rootMargin: '0px 0px -38% 0px'});
      $$('.w', scrub).forEach(w => wio.observe(w));
    }
  }

  /* project index */
  const list = $('#indexList');
  const pvImg = $('#pvImg'), pvName = $('#pvName'), pvType = $('#pvType'), pvPlace = $('#pvPlace'), pvNote = $('#pvNote');
  list.innerHTML = P.map((p, k) => `
    <li class="row" tabindex="0" data-k="${k}" data-c="${p.c.join(' ')}">
      <img class="thumb" loading="lazy" src="${U(IMG[p.i], 220)}" alt="">
      <span class="n">${String(k + 1).padStart(2, '0')}</span>
      <span class="t">${p.t}</span>
      <span class="p">${p.p}</span>
    </li>`).join('');
  const rows = $$('.row', list);
  // preload preview images
  const seen = new Set();
  P.forEach(p => { if (!seen.has(p.i)) { seen.add(p.i); const im = new Image(); im.src = U(IMG[p.i], 1100); } });

  let cur = -1, swapT;
  const show = k => {
    if (k === cur) return;
    cur = k;
    rows.forEach(r => r.classList.toggle('is-active', +r.dataset.k === k));
    const p = P[k];
    pvImg.classList.add('swap');
    clearTimeout(swapT);
    swapT = setTimeout(() => {
      pvImg.src = U(IMG[p.i], 1100);
      pvName.textContent = p.t;
      pvType.textContent = TYPE[p.c[0]];
      pvPlace.textContent = p.p;
      pvNote.textContent = [p.k ? 'Client: ' + p.k : '', p.n || ''].filter(Boolean).join('. ');
      requestAnimationFrame(() => pvImg.classList.remove('swap'));
    }, 160);
  };
  rows.forEach(r => {
    r.addEventListener('mouseenter', () => show(+r.dataset.k));
    r.addEventListener('focus', () => show(+r.dataset.k));
  });
  show(0);

  const more = $('#moreBtn');
  more.addEventListener('click', () => list.classList.toggle('clip', false));
  const tabs = $$('.filters button');
  tabs.forEach(b => {
    const f = b.dataset.f;
    b.querySelector('sup').textContent = f === 'all' ? P.length : P.filter(p => p.c.includes(f)).length;
    b.addEventListener('click', () => {
      tabs.forEach(t => t.setAttribute('aria-selected', String(t === b)));
      list.classList.toggle('clip', f === 'all');
      let first = -1, i = 0;
      rows.forEach(r => {
        const on = f === 'all' || r.dataset.c.split(' ').includes(f);
        r.classList.toggle('hide', !on);
        r.classList.remove('enter');
        if (on) {
          if (first < 0) first = +r.dataset.k;
          if (!reduce) { void r.offsetWidth; r.style.animationDelay = (i++ * 35) + 'ms'; r.classList.add('enter'); }
        }
      });
      if (first >= 0) show(first);
    });
  });

  /* fleet rail */
  const rail = $('#rail');
  $$('.rail-btn').forEach(b => b.addEventListener('click', () => {
    const w = rail.querySelector('.unit').getBoundingClientRect().width + 16;
    rail.scrollBy({left: w * +b.dataset.dir, behavior: reduce ? 'auto' : 'smooth'});
  }));

  /* tender form */
  const form = $('#tenderForm');
  const steps = $$('.step', form);
  const track = $$('.steps-track li');
  const next = $('#next'), back = $('#back'), bar = $('#bar'), count = $('#stepCount');
  let s = 1;
  const go = n => {
    s = n;
    steps.forEach(f => f.classList.toggle('is-on', +f.dataset.step === s));
    track.forEach((li, k) => { li.classList.toggle('on', k + 1 === s); li.classList.toggle('ok', k + 1 < s); });
    bar.style.width = (s * 25) + '%';
    count.textContent = `Step ${s} of 4`;
    back.hidden = s === 1;
    next.querySelector('span').textContent = s === 4 ? 'Send request' : 'Continue';
    $$('.err', form).forEach(e => e.hidden = true);
  };
  const valid = () => {
    const err = $(`[data-err="${s}"]`, form);
    let ok = true;
    if (s === 1) ok = !!form.querySelector('input[name="type"]:checked');
    if (s === 2) { const l = $('#loc'); ok = l.value.trim().length > 1; l.classList.toggle('bad', !ok); }
    if (s === 4) {
      const n = $('#name'), t = $('#tel');
      const okN = n.value.trim().length > 1, okT = t.value.replace(/\D/g, '').length >= 7;
      n.classList.toggle('bad', !okN); t.classList.toggle('bad', !okT); ok = okN && okT;
    }
    if (err) err.hidden = ok;
    return ok;
  };
  next.addEventListener('click', () => {
    if (!valid()) return;
    if (s < 4) { go(s + 1); const f = steps[s - 1].querySelector('input,select,textarea'); if (f && matchMedia('(min-width: 861px)').matches) f.focus({preventScroll: true}); return; }
    finish();
  });
  back.addEventListener('click', () => go(Math.max(1, s - 1)));
  form.addEventListener('submit', e => { e.preventDefault(); next.click(); });
  form.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') { e.preventDefault(); next.click(); } });

  const finish = () => {
    const d = new FormData(form);
    const ref = 'SB-' + new Date().getFullYear().toString().slice(2) + '-' + String(Math.floor(1000 + Math.random() * 9000));
    $('#ref').textContent = ref;
    $('#doneTel').textContent = d.get('tel');
    const rowsOut = [
      ['Project', d.get('type')], ['Client', d.get('client')], ['Location', d.get('location')],
      ['Size', d.get('size')], ['Budget', d.get('budget')], ['Stage', d.get('stage')],
      ['Closing', d.get('due')], ['Start', d.get('start')], ['Contact', [d.get('name'), d.get('org')].filter(Boolean).join(', ')]
    ].filter(([, v]) => v);
    const dl = $('#summary'); dl.innerHTML = '';
    rowsOut.forEach(([k, v]) => { const dt = document.createElement('dt'); dt.textContent = k; const dd = document.createElement('dd'); dd.textContent = v; dl.append(dt, dd); });
    steps.forEach(f => f.classList.remove('is-on'));
    $('#navRow').hidden = true; $('.progress', form).hidden = true; count.hidden = true;
    track.forEach(li => { li.classList.remove('on'); li.classList.add('ok'); });
    const done = $('#done'); done.hidden = false; done.focus({preventScroll: true});
    done.scrollIntoView({behavior: reduce ? 'auto' : 'smooth', block: 'center'});
  };
  $('#again').addEventListener('click', () => {
    form.reset(); $('#done').hidden = true; $('#navRow').hidden = false; $('.progress', form).hidden = false; count.hidden = false; go(1);
  });

  $('#yr').textContent = new Date().getFullYear();
})();
