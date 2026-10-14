// ===== Demo engine: scene diffing + motion tokens =====
const $id = id => document.getElementById(id);
const VIEW = $id('view');
const EZ = { std: 'cubic-bezier(.2,.7,.2,1)', spring: 'cubic-bezier(.2,.9,.25,1.18)', out: 'cubic-bezier(.4,0,1,1)', lin: 'linear' };
const A = (el, kf, d, delay = 0, ease = EZ.std, extra = {}) => el && el.animate(kf, { duration: d, delay, easing: ease, fill: 'both', ...extra });
const wait = ms => new Promise(r => setTimeout(r, ms));
let TOKEN = 0, TIMERS = [];
const later = (fn, ms) => { const t = TOKEN; TIMERS.push(setTimeout(() => t === TOKEN && fn(), ms)); };
const every = (fn, ms) => { const t = TOKEN; const h = setInterval(() => t === TOKEN ? fn() : clearInterval(h), ms); TIMERS.push(h); };
const clearTimers = () => { TIMERS.forEach(h => { clearTimeout(h); clearInterval(h); }); TIMERS = []; };
const count = (el, from, to, dur, fmt = v => v.toFixed(1), delay = 0) => { const t = TOKEN;
  later(() => { const t0 = performance.now(); const f = now => { if (t !== TOKEN) return; const p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3);
    el.textContent = fmt(from + (to - from) * e); if (p < 1) requestAnimationFrame(f); }; requestAnimationFrame(f); }, delay); };
const hold = el => { if (!el) return; el.getAnimations().forEach(a => a.cancel()); el.style.opacity = 0; };
const reveal = (el, kind = 'pin', delay = 0) => { if (!el) return; later(() => { el.style.opacity = ''; M[kind](el, 0); }, delay); };

// Motion tokens (match section 04 of the hi-fi board)
const M = {
  spring: (e, d) => A(e, [{ opacity: 0, scale: .94, translate: '0 1.6%' }, { opacity: 1, scale: 1, translate: '0 0' }], 320, d, EZ.spring),
  rise: (e, d) => A(e, [{ opacity: 0, translate: '0 35%' }, { opacity: 1, translate: '0 0' }], 300, d),
  riseBig: (e, d) => A(e, [{ opacity: 0, translate: '0 45%' }, { opacity: 1, translate: '0 0' }], 460, d, EZ.spring),
  fromL: (e, d) => A(e, [{ opacity: 0, translate: '-14% 0' }, { opacity: 1, translate: '0 0' }], 380, d, EZ.spring),
  draw: (e, d) => A(e, [{ opacity: 0, scale: 1.8 }, { opacity: 1, offset: .55 }, { opacity: 1, scale: 1 }], 380, d),
  pin: (e, d) => A(e, [{ opacity: 0, translate: '0 22%' }, { opacity: 1, translate: '0 0' }], 260, d),
  fade: (e, d) => A(e, [{ opacity: 0 }, { opacity: 1 }], 240, d),
  pop: (e, d) => A(e, [{ opacity: 0, scale: .4 }, { opacity: 1, scale: 1 }], 420, d, EZ.spring),
  out: (e, d = 0) => A(e, [{ opacity: 1 }, { opacity: 0 }], 180, d, EZ.out),
  snap: e => { const c = getComputedStyle(e).backgroundColor;
    e.animate([{ outline: `.4cqw solid ${c}`, outlineOffset: '0' }, { outline: '.4cqw solid transparent', outlineOffset: '1.8cqw' }], { duration: 700, easing: 'ease-out' }); },
  bump: (e, d) => A(e, [{ scale: 1 }, { scale: 1.08 }, { scale: 1 }], 380, d, EZ.spring, { fill: 'none' }),
  shake: (e, d) => A(e, [{ translate: '0 0' }, { translate: '-1.2% 0' }, { translate: '1.2% 0' }, { translate: '-.6% 0' }, { translate: '0 0' }], 320, d, EZ.std, { fill: 'none' })
};

// Head-locked roles persist between scenes; everything else re-enters
const ROLE = e => ['pill', 'timer', 'backup', 'mic', 'strip', 'cap', 'vignette', 'banner'].find(r => e.classList.contains(r)) || null;
const WORLD = e => e.matches('.ring,.tagw,.leader,.dtag,.hatch,.edge');

function build(id) {
  const tmp = document.createElement('div');
  tmp.innerHTML = iconize(OV[id] || BY[id].fov);
  const scenes = [...tmp.children].filter(e => e.matches('svg.scene'));
  const bg = document.createElement('div'); bg.className = 'bgl'; scenes.forEach(s => bg.appendChild(s));
  const hud = document.createElement('div'); hud.className = 'hud'; while (tmp.firstChild) hud.appendChild(tmp.firstChild);
  return { bg, hud, sig: scenes.map(s => s.querySelector('use').getAttribute('href')).join('+') };
}
const MOVES = {
  forward: [[{ scale: 1, opacity: 1 }, { scale: 1.28, opacity: 0 }], [{ scale: .9, opacity: 0 }, { scale: 1, opacity: 1 }], 'Walk-in · the world moves, status stays put'],
  back: [[{ scale: 1, opacity: 1 }, { scale: .88, opacity: 0 }], [{ scale: 1.12, opacity: 0 }, { scale: 1, opacity: 1 }], 'Step away · the world moves, status stays put'],
  zoomin: [[{ scale: 1, opacity: 1, transformOrigin: '76% 38%' }, { scale: 2.3, opacity: 0, transformOrigin: '76% 38%' }], [{ scale: .72, opacity: 0, transformOrigin: '64% 55%' }, { scale: 1, opacity: 1, transformOrigin: '64% 55%' }], 'Lean in to J4 · cues re-pin once the head is still'],
  zoomout: [[{ scale: 1, opacity: 1, transformOrigin: '64% 55%' }, { scale: .7, opacity: 0, transformOrigin: '64% 55%' }], [{ scale: 2.1, opacity: 0, transformOrigin: '76% 38%' }, { scale: 1, opacity: 1, transformOrigin: '76% 38%' }], 'Step back from J4 · cues re-pin once still'],
  panR: [[{ translate: '0 0', opacity: 1 }, { translate: '-32% 0', opacity: 0 }], [{ translate: '32% 0', opacity: 0 }, { translate: '0 0', opacity: 1 }], 'Head turn to the isolator · cues re-pin after the turn'],
  panL: [[{ translate: '0 0', opacity: 1 }, { translate: '32% 0', opacity: 0 }], [{ translate: '-32% 0', opacity: 0 }, { translate: '0 0', opacity: 1 }], 'Head turn back to the robot · cues re-pin'],
  swap: [[{ opacity: 1 }, { opacity: 0 }], [{ opacity: 0 }, { opacity: 1 }], 'Tool in hand changes']
};
const moveFor = (a, b) => { const x = a.split('+')[0], y = b.split('+')[0];
  if (x === y) return 'swap'; if (y === '#aisle') return 'back'; if (x === '#aisle') return 'forward';
  if (x === '#cell' && y === '#joint') return 'zoomin'; if (x === '#joint' && y === '#cell') return 'zoomout';
  if (y === '#isolator') return 'panR'; if (x === '#isolator') return 'panL'; return 'swap'; };

let BG = null, HUD = null, SIG = '';
// Renders a scene; returns true if the world moved (used to delay world-locked cues)
function render(id, o = {}) {
  TOKEN++; clearTimers();
  const n = build(id), instant = !!o.instant;
  VIEW.classList.toggle('rec', id !== 'S01');
  let moved = false;
  if (!BG || instant) { if (BG) BG.remove(); VIEW.prepend(n.bg); BG = n.bg; }
  else if (n.sig !== SIG) {
    moved = true; const mv = MOVES[moveFor(SIG, n.sig)], old = BG;
    VIEW.insertBefore(n.bg, old); BG = n.bg;
    old.animate(mv[0], { duration: 620, easing: EZ.std, fill: 'both' }).onfinish = () => old.remove();
    n.bg.animate(mv[1], { duration: 720, easing: EZ.std, fill: 'both' });
    LOG('look', mv[2], '700 ms');
  }
  SIG = n.sig;
  BG.classList.toggle('tilt', !!o.tilt);
  BG.classList.remove('walk');
  const oldHud = HUD; VIEW.appendChild(n.hud); HUD = n.hud;
  const olds = {}; if (oldHud) [...oldHud.children].forEach(e => { const r = ROLE(e); if (r) olds[r] = e; });
  const wd = moved || o.tiltChanged ? 560 : 140;
  let ringN = 0, notes = new Set();
  [...n.hud.children].forEach(e => {
    if (instant) return;
    const r = ROLE(e), p = r && olds[r];
    if (p) { p.style.visibility = 'hidden'; delete olds[r];
      if (p.outerHTML === e.outerHTML) return;
      if (r === 'pill') { M.snap(e); notes.add('pill'); }
      else if (r === 'strip') morphStrip(p, e, notes);
      else if (r === 'backup') { M.bump(e); notes.add('backup'); }
      else if (r === 'timer') M.fade(e, 0);
      else if (r === 'cap') capIn(e, 160);
      else M.fade(e, 60);
      return; }
    if (r === 'pill') { M.fade(e, 0); notes.add('pill'); }
    else if (r === 'cap') capIn(e, wd);
    else if (r === 'strip') M.rise(e, 160);
    else if (e.matches('.hint')) M.fromL(e, 220);
    else if (e.matches('.glass')) M.spring(e, moved ? 380 : 180);
    else if (e.matches('.ring')) { M.draw(e, wd + (e.classList.contains('ghost') ? 300 : ringN++ * 120)); }
    else if (WORLD(e)) M.pin(e, wd + 160);
    else M.fade(e, 120);
  });
  if (oldHud) {
    if (instant) oldHud.remove();
    else { Object.values(olds).forEach(e => M.out(e)); [...oldHud.children].filter(e => !ROLE(e)).forEach(e => M.out(e)); setTimeout(() => oldHud.remove(), 240); }
  }
  if (notes.has('pill')) LOG('warn', 'Safety pill · instant change + one pulse', '0 ms');
  if (notes.has('backup')) LOG('user', 'Backup chip · Wei\'s state updates in place', '380 ms');
  if (notes.has('strip')) LOG('arrow', 'Step strip stays · text crossfades, progress fills', '240 ms');
  if (!instant && n.hud.querySelector('.glass.panel,.glass.win')) LOG('doc', 'Window springs in · scale 94 → 100%', '280 ms');
  if (!instant && n.hud.querySelector('.ring:not(.blue)')) LOG('eye', 'Cue draws on the real part' + (moved ? ' after the head settles' : ''), '300 ms');
  return moved;
}
function morphStrip(p, e, notes) {
  notes.add('strip');
  const pt = p.querySelector('.txt'), et = e.querySelector('.txt');
  if (pt && et && pt.textContent !== et.textContent) A(et, [{ opacity: 0, translate: '0 45%' }, { opacity: 1, translate: '0 0' }], 240, 80);
  A(e.querySelector('.num'), [{ opacity: 0 }, { opacity: 1 }], 240, 80);
  const po = p.querySelectorAll('.prog i.on').length;
  e.querySelectorAll('.prog i.on').forEach((s, i) => { if (i >= po) { s.style.transformOrigin = 'left'; A(s, [{ scale: '0 1' }, { scale: '1 1' }], 360, 200); } });
  e.querySelectorAll('.cmds .say').forEach((s, i) => M.pop(s, 120 + i * 60));
}
function capIn(e, d) {
  const s = e.querySelector('span:last-child'); M.fade(e, d);
  if (!s) return; const words = s.innerHTML.split(/(\s+)/);
  s.innerHTML = words.map(w => /^\s+$/.test(w) || !w ? w : `<span class="wd" style="display:inline-block">${w}</span>`).join('');
  s.querySelectorAll('.wd').forEach((w, i) => A(w, [{ opacity: 0, translate: '0 30%' }, { opacity: 1, translate: '0 0' }], 220, d + 120 + i * 70));
  LOG('spk', 'Spoken line captioned word by word', '70 ms/word');
}
