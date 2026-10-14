// ===== Demo scenes: inputs, live data, exceptions =====
const BY = Object.fromEntries([...SCREENS, ...EXC].map(s => [s.id, s]));
const ORDER = SCREENS.map(s => s.id);
const PH = [['A', 'Start', 'S01', 'S05'], ['B', 'Make safe', 'S06', 'S08'], ['C', 'Perform', 'S09', 'S15'], ['D', 'Verify', 'S16', 'S18'], ['E', 'Close & learn', 'S19', 'S20']]
  .map(([k, n, a, b]) => ({ k, n, ids: ORDER.slice(ORDER.indexOf(a), ORDER.indexOf(b) + 1) }));
const SH = { S01: 'Job card', S02: 'Walk + kit', S03: 'Confirm', S04: 'Go / no-go', S05: 'Top risks', S06: 'Park J4', S07: 'Lock out', S08: 'Zero energy',
  S09: 'Safe', S10: 'Guided step', S11: 'Show me', S12: 'Hint', S13: 'Wei draws', S14: 'Finding', S15: 'Inject', S16: 'Restore', S17: 'Test run', S18: 'Hand back', S19: 'Debrief', S20: 'Done' };
const TY = { voice: ['mic', 'Voice', '#0a84ff', 'Every visible label is a command'], look: ['eye', 'Head / gaze', '#5e5ce6', 'Gaze highlights, never confirms'],
  sensor: ['gear', 'Machine signal', '#30a46c', 'The machine confirms, not a tap'], auto: ['clock', 'Automatic', '#8e8e93', 'No input needed'],
  tap: ['tap', 'Temple tap', '#ff9f0a', 'Fallback when voice fails'] };
const q = (h, s) => h.querySelector(s), qa = (h, s) => [...h.querySelectorAll(s)];
const toast = (h, t) => { const d = document.createElement('div'); d.className = 'toast'; d.innerHTML = `<span class="ti">${ic('check')}</span>${t}`; h.appendChild(d); M.pin(d, 0); return d; };
const flash = h => { const f = document.createElement('div'); f.className = 'flash'; h.appendChild(f); A(f, [{ opacity: .95 }, { opacity: 0 }], 360, 0, EZ.out).onfinish = () => f.remove(); };
const rowsIn = (h, start = 420, step = 220) => { qa(h, '.panel .row, .panel .sm').forEach((r, i) => { hold(r); reveal(r, 'pin', start + i * step); });
  LOG('check', 'Evidence arrives row by row, then the recommendation', step + ' ms apart'); };
let S17n = 0;

const GO = {
  S01: { t: 'voice', w: 'Start job' },
  S02: { t: 'sensor', w: 'R-07 asset tag read · Cell 4', l: 'Arrive at the cell' },
  S03: { t: 'voice', w: 'Continue' }, S04: { t: 'voice', w: 'Go' }, S05: { t: 'voice', w: 'Got it' },
  S06: { t: 'sensor', w: 'J4 held at 0.0° for 2 s', l: 'J4 reaches 0°', pre: async h => { const r = q(h, '.ring'); r.classList.add('done'); M.bump(r);
    const w = q(h, '.say.wait'); if (w) { w.className = 'say heard'; w.innerHTML = ic('check') + ' Gate 1 passed'; M.pop(w, 0); } await wait(350); } },
  S07: { t: 'voice', w: 'Take photo', post: async h => { flash(h); LOG('cam', 'Photo taken · lock A-114 detected', '');
    const c = q(h, '.chip:not(.timer):not(.backup) .warnc'); if (c) c.outerHTML = `<span class="okc">detected ${ic('check')}</span>`;
    const r = q(h, '.ring'); r.classList.add('done'); M.bump(r); await wait(250); toast(h, 'Gate 2 passed · lock on the e-permit'); await wait(950); } },
  S08: { t: 'voice', w: 'No motion' },
  S09: { t: 'auto', w: 'Overview closes after 3 s', l: 'Wait 3 s' },
  S10: { t: 'look', w: 'Look down' }, S11: { t: 'look', w: 'Look up' },
  S12: { t: 'voice', w: 'Ask Wei' }, S13: { t: 'voice', w: 'Done' }, S14: { t: 'voice', w: 'Dark' },
  S15: { t: 'voice', w: 'Grease out', pre: async h => { count(q(h, '.gv .v'), 42, 48, 900, x => Math.round(x) + '');
    A(q(h, '.gbar i'), [{ width: '70%' }, { width: '80%' }], 900); LOG('eye', 'Fresh grease at the outlet · 48 ml', ''); await wait(1100); } },
  S16: { t: 'voice', w: 'Cell clear' },
  S17: { t: 'sensor', w: '10 / 10 cycles in range', pre: async h => { const c = q(h, '.chip:not(.timer):not(.backup) b');
    for (let i = Math.max(S17n, 8) + 1; i <= 10; i++) { c.textContent = i + ' / 10'; M.bump(c); await wait(380); } } },
  S18: { t: 'voice', w: 'Hand back' }, S19: { t: 'voice', w: 'Next', l: 'Say “Next” × 3' }, S20: { t: 'voice', w: 'Finish' },
  X1: { t: 'sensor', w: 'No motion for 10 s · all clear', l: 'All clear → re-prove zero energy', to: 'S08' },
  X2: { t: 'voice', w: 'Swap', to: 'S15' },
  X3: { t: 'tap', w: 'Done', l: 'Tap the temple' },
  END: { t: 'auto', w: 'Restart demo', l: 'Restart demo' }
};

async function playInput(g) {
  const h = HUD;
  if (g.pre) await g.pre(h);
  if (g.t === 'voice' || g.t === 'tap') {
    const tgt = qa(h, '.say').find(s => s.textContent.trim().toLowerCase() === g.w.toLowerCase());
    if (g.t === 'voice') {
      const mic = q(h, '.mic'); if (mic) mic.classList.add('listening'); if (tgt) tgt.classList.add('focus');
      await wait(420);
      const b = document.createElement('div'); b.className = 'heard'; b.innerHTML = `<span class="me">A</span>“${g.w}”`; h.appendChild(b); M.rise(b, 0);
      LOG('mic', `Heard “${g.w}” · no wake word needed`, ''); await wait(240); if (mic) mic.classList.remove('listening');
    } else {
      const r = document.createElement('div'); r.className = 'tapfx'; h.appendChild(r);
      A(r, [{ opacity: 1, scale: .3 }, { opacity: 0, scale: 1.4 }], 600, 0, EZ.out, { iterations: 2 });
      const l = document.createElement('div'); l.className = 'taplbl'; l.textContent = 'Temple tap'; h.appendChild(l); M.fade(l, 0);
      LOG('tap', 'Temple tap → primary command (gloves OK)', ''); await wait(520);
    }
    if (tgt) { tgt.classList.remove('focus'); tgt.classList.add('heard', 'press'); tgt.insertAdjacentHTML('afterbegin', ic('check') + ' ');
      LOG('check', 'Capsule confirms · fill + tick + soft click', '< 300 ms'); }
    await wait(480);
  } else if (g.t === 'look') {
    const down = g.w === 'Look down', r = document.createElement('div'); r.className = 'reticle'; h.appendChild(r);
    A(r, [{ left: '50%', top: down ? '42%' : '82%', opacity: 0 }, { opacity: 1, offset: .25 }, { left: '50%', top: down ? '86%' : '40%', opacity: 1 }], 620, 0, EZ.std);
    LOG('eye', down ? 'Head tilts below 20° · detail window rises' : 'Head comes up · window dismisses, cue stays pinned', '');
    await wait(560);
  } else if (g.t === 'sensor') { toast(h, g.w); LOG('gear', 'Machine signal · ' + g.w, ''); await wait(950); }
  else await wait(150);
  if (g.post) await g.post(h);
}

const LIVE = {
  S02: h => { later(() => { BG.classList.add('walk'); HUD.classList.add('dim'); }, 500); LOG('eye', 'Walking · display dims, nothing in the centre', '500 ms'); },
  S03: h => { const t = q(h, '.tagw'), l = q(h, '.leader'); hold(t); hold(l);
    const s = document.createElement('div'); s.className = 'scanline'; h.appendChild(s);
    A(s, [{ left: '-15%', opacity: 1 }, { left: '105%', opacity: .2 }], 950, 250, EZ.std).onfinish = () => s.remove();
    reveal(l, 'fade', 1150); reveal(t, 'pin', 1200); LOG('cam', 'Asset tag scanned → identity label pins to R-07', '950 ms'); },
  S04: h => { rowsIn(h, 420, 230); count(q(h, '.dtag .v'), 4.0, 4.8, 1200, x => x.toFixed(1) + ' A', 500); },
  S05: h => rowsIn(h, 460, 280),
  S06: h => { const v = q(h, '.dtag .v'); v.textContent = '12.4°'; count(v, 12.4, 0, 2600, x => x.toFixed(1) + '°', 700);
    later(() => v.classList.add('okc'), 3350); LOG('gear', 'Live J4 angle streams from the PLC', 'live'); },
  S08: h => rowsIn(h, 420, 300),
  S09: h => { const o = q(h, '.bigok'); hold(o); reveal(o, 'pop', 280); later(() => M.snap(o), 700);
    qa(h, '.phz>div').forEach((d, i) => { hold(d); reveal(d, 'pin', 620 + i * 110); });
    A(q(h, '.fadebar i'), [{ width: '0%' }, { width: '100%' }], 3000, 500, EZ.lin);
    LOG('check', 'All 3 gates passed · earcon + haptic', '0 ms'); },
  S11: h => { const p = q(h, '.panel'); p.getAnimations().forEach(a => a.cancel()); M.riseBig(p, 100);
    A(q(h, '.scrub i'), [{ width: '0%' }, { width: '100%' }], 12000, 700, EZ.lin); LOG('play', 'Clip from Wei\'s last job plays muted with captions', ''); },
  S12: h => { const hint = q(h, '.hint'); hold(hint);
    const s = document.createElement('div'); s.className = 'stall'; s.innerHTML = '<span class="rg"></span><span>No progress · 0 s</span>'; h.appendChild(s); M.fade(s, 300);
    count(s.lastChild, 0, 40, 1900, x => { s.style.setProperty('--p', x / 40 * 100 + '%'); return `No progress · ${Math.round(x)} s`; }, 400);
    later(() => { M.out(s); M.bump(q(h, '.ring')); }, 2500); reveal(hint, 'fromL', 2600);
    LOG('clock', 'Hesitation sensed · 40 s + key slipped (shown 20× faster)', '');
    later(() => LOG('spark', 'Hint slides in at the edge · offered, not forced', '380 ms'), 2600); },
  S13: h => { const r = q(h, '.ring.blue'), t = q(h, '.tagw.blue'); hold(r); hold(t);
    h.insertAdjacentHTML('beforeend', `<svg class="ink" viewBox="0 0 100 56.25"><path pathLength="1" d="M52.8 39C52.6 33.2 64 32.6 64.3 38.6 64.6 44.6 53.4 45.2 52.9 39.8 52.7 37 54.6 34.6 57.5 33.7" fill="none" stroke="#64d2ff" stroke-width=".5" stroke-linecap="round" stroke-dasharray="1" stroke-dashoffset="1"/></svg>`);
    const ink = q(h, '.ink'); A(ink.firstChild, [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], 900, 500, 'ease-in-out');
    later(() => M.out(ink), 1500); reveal(r, 'draw', 1450); reveal(t, 'pin', 1700);
    LOG('pen', 'Wei sketches on Alex\'s live view', '900 ms'); later(() => LOG('eye', 'Sketch snaps to the part and stays pinned', '380 ms'), 1450); },
  S14: h => { const c = q(h, '.chip:not(.timer):not(.backup)'); hold(c); later(() => flash(h), 500); reveal(c, 'fromL', 700);
    LOG('cam', 'Outlet photo auto-saved → linked to prediction #PM-2291', ''); },
  S15: h => { count(q(h, '.gv .v'), 0, 42, 2800, x => Math.round(x) + '', 500);
    A(q(h, '.gbar i'), [{ width: '0%' }, { width: '70%' }], 2800, 500, 'cubic-bezier(.33,1,.68,1)');
    LOG('gear', 'Smart gun streams volume · caution 55 ml, hard stop 60', 'live'); },
  S16: h => { rowsIn(h, 420, 260); LOG('gear', 'Connected tools fill the gate · little to declare', ''); },
  S17: h => { const c = q(h, '.chip:not(.timer):not(.backup) b'), v = q(h, '.dtag .v'); S17n = 0; c.textContent = '0 / 10';
    later(() => every(() => { if (S17n < 8) c.textContent = ++S17n + ' / 10'; }, 420), 400);
    every(() => { v.textContent = (4.08 + Math.random() * .06).toFixed(2) + ' A'; }, 520);
    A(q(h, '.hatch'), [{ opacity: 1 }, { opacity: .5 }, { opacity: 1 }], 1600, 0, 'ease-in-out', { iterations: Infinity, fill: 'none' });
    LOG('gear', 'Test cycles counted live · keep-out zone pulses', ''); },
  S18: h => { rowsIn(h, 420, 240); LOG('user', 'Hand-back target named · Maya gets the proof', ''); },
  S19: h => { const r = q(h, '.mic.rec'), tr = q(h, '.tr'), full = tr.textContent; let s = 0, i = 0; tr.textContent = '';
    every(() => { s++; r.lastChild.textContent = ` 0:${String(s).padStart(2, '0')}`; }, 1000);
    later(() => every(() => { if (i < full.length) tr.textContent = full.slice(0, ++i); }, 36), 700);
    A(q(h, '.orb'), [{ scale: 1 }, { scale: 1.08 }, { scale: 1 }], 1400, 0, 'ease-in-out', { iterations: Infinity, fill: 'none' });
    LOG('mic', 'Voice debrief · transcribed live, nothing typed', ''); },
  S20: h => { qa(h, '.lp').forEach((l, i) => { hold(l); reveal(l, 'spring', 520 + i * 180); });
    LOG('loop', 'Knowledge loop · 4 updates written automatically', '180 ms apart'); },
  X1: h => { A(q(h, '.vignette'), [{ opacity: 1 }, { opacity: .45 }, { opacity: 1 }], 700, 0, 'ease-in-out', { fill: 'none' });
    const w = q(h, '.say.wait'); let k = 10; later(() => every(() => { if (k > 0) w.textContent = --k ? `All clear in ${k} s` : 'No motion · all clear'; }, 420), 600);
    LOG('warn', 'Safety interrupt · edge glow, banner, sound, haptic', '0 ms'); LOG('x', 'No dismiss · all clear only after 10 s still', ''); },
  X2: h => { later(() => M.shake(q(h, '.tagw'), 0), 650); LOG('x', 'Wrong grease caught at the moment of use', ''); },
  X3: h => { later(() => M.shake(q(h, '.mic'), 0), 300); LOG('bolt', 'Offline · procedure and gates run on the device', ''); LOG('q', 'Not understood twice → tap hint shown', ''); }
};

function renderEnd() {
  TOKEN++; clearTimers();
  const old = HUD, h = document.createElement('div'); h.className = 'hud';
  h.innerHTML = `<div class="glass win endcard"><div class="bigok">${ic('check')}</div><div class="h1">Job closed</div>
    <div class="sm t2">39 min · inside the window · nothing typed</div>
    <div class="lps"><span>${ic('doc')} Work order</span><span>${ic('spark')} Prediction</span><span>${ic('user')} Tip in review</span><span>${ic('loop')} Skill passport</span></div>
    <div class="sm t3" style="margin-top:1.6cqw">Picked up next on the tablet: the planner's board and Alex's next lesson.</div></div>`;
  VIEW.appendChild(h); HUD = h; if (old) { [...old.children].forEach(e => M.out(e)); setTimeout(() => old.remove(), 240); }
  M.spring(q(h, '.endcard'), 200); M.pop(q(h, '.bigok'), 420); qa(h, '.lps span').forEach((s, i) => M.pop(s, 620 + i * 120));
  LOG('loop', 'Session ends · everything flows back to Know and Grow', '');
}
