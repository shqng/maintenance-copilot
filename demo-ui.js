// ===== Demo UI: director panel, timeline, keys, autoplay =====
const LC = { mic: '#0a84ff', check: '#0a84ff', eye: '#5e5ce6', look: '#5e5ce6', gear: '#30a46c', cam: '#30a46c', warn: '#ff453a', x: '#ff453a', pen: '#38b6e8', user: '#38b6e8',
  spark: 'linear-gradient(135deg,#bf5af2,#5e5ce6,#64d2ff)', loop: '#0a84ff', tap: '#ff9f0a', clock: '#8e8e93', doc: '#1d1d1f', arrow: '#1d1d1f', spk: '#5e5ce6', play: '#1d1d1f', bolt: '#ff9f0a', q: '#ff9f0a' };
function LOG(k, t, ms) { const L = $id('log'); if (!L) return;
  const e = document.createElement('div'); e.className = 'e'; e.innerHTML = `<i style="background:${LC[k] || '#8e8e93'}">${ic(k === 'look' ? 'eye' : k)}</i><span>${t}</span>${ms ? `<span class="ms">${ms}</span>` : ''}`;
  L.prepend(e); e.animate([{ opacity: 0, translate: '0 -8px' }, { opacity: 1, translate: '0 0' }], { duration: 260, easing: EZ.std });
  while (L.children.length > 6) L.lastChild.remove(); }
const LOGCLEAR = () => { $id('log').innerHTML = ''; };

let CUR = 'S01', RESUME = 'S01', BUSY = false, AUTO = false;
const phaseOf = id => PH.findIndex(p => p.ids.includes(id));
function go(id, o = {}) {
  if (id === 'END') renderEnd();
  else { const was = !!(BG && BG.classList.contains('tilt')), tilt = id === 'S11';
    render(id, { ...o, tilt, tiltChanged: tilt !== was }); if (LIVE[id]) LIVE[id](HUD); }
  CUR = id; ui();
}
async function next() {
  if (BUSY) return; BUSY = true; $id('nextb').classList.add('busy'); LOGCLEAR();
  const g = GO[CUR]; await playInput(g);
  const to = CUR === 'END' ? 'S01' : CUR[0] === 'X' ? (g.to || RESUME) : CUR === 'S20' ? 'END' : ORDER[ORDER.indexOf(CUR) + 1];
  go(to); BUSY = false; $id('nextb').classList.remove('busy');
}
function back() { if (BUSY) return; LOGCLEAR();
  const to = CUR[0] === 'X' ? RESUME : CUR === 'END' ? 'S20' : ORDER[Math.max(0, ORDER.indexOf(CUR) - 1)]; go(to); }
function jump(id) { if (BUSY || id === CUR) return; stopAuto(); LOGCLEAR(); go(id); }
function exc(x) { if (BUSY) return; stopAuto(); LOGCLEAR();
  if (CUR === x) return go(RESUME); if (CUR[0] !== 'X' && CUR !== 'END') RESUME = CUR; go(x, { instant: x === 'X1' }); }

// ---- static UI ----
$id('phases').innerHTML = PH.map((p, i) => `<button data-p="${i}"><b>${p.k}</b>${p.n}</button>`).join('');
$id('phases').onclick = e => { const b = e.target.closest('button'); if (b) jump(PH[+b.dataset.p].ids[0]); };
const conn = id => { const t = TY[GO[id].t]; return `<div class="cn" data-c="${id}"><span style="background:${t[2]}" title="${t[1]}">${ic(t[0])}</span></div>`; };
$id('groups').innerHTML = PH.map((p, gi) => `<div class="g" data-g="${gi}" style="flex:${p.ids.length} 1 auto"><div class="gh">${p.k} · ${p.n}</div><div class="row">${
  p.ids.map((id, i) => `<button class="nd" data-id="${id}"><span class="c">${id.slice(1)}</span><span class="t">${SH[id]}</span></button>${i < p.ids.length - 1 || gi < PH.length - 1 ? conn(id) : ''}`).join('')}</div></div>`).join('');
$id('groups').onclick = e => { const b = e.target.closest('.nd'); if (b) jump(b.dataset.id); };
$id('legend').innerHTML = Object.values(TY).map(t => `<span class="it"><i style="background:${t[2]}">${ic(t[0])}</i>${t[1]}</span>`).join('') +
  `<span class="sp"></span><span class="keys"><span><span class="k">→</span> play input</span><span><span class="k">←</span> back</span><span><span class="k">1–5</span> phase</span><span><span class="k">H</span> present</span><span><span class="k">P</span> autoplay</span></span>`;
const EXB = [['X1', 'Unexpected motion', '#ff453a', 'Z'], ['X2', 'Wrong grease', '#ff9f0a', 'X'], ['X3', 'Offline / not heard', '#8e8e93', 'C']];
$id('exc').innerHTML = EXB.map(([x, t, c, k]) => `<button data-x="${x}"><span class="d"><i style="background:${c}"></i><span class="k">${k}</span></span>${t}</button>`).join('');
$id('exc').onclick = e => { const b = e.target.closest('button'); if (b) exc(b.dataset.x); };
$id('nextb').onclick = () => { stopAuto(); next(); };

function ui() {
  const s = BY[CUR], end = CUR === 'END', g = GO[CUR], t = TY[g.t], pi = phaseOf(CUR), oi = ORDER.indexOf(CUR);
  $id('sid').textContent = end ? '' : CUR; $id('stitle').innerHTML = end ? 'Job closed · back to the tablet' : iconize(s.title);
  $id('ph').innerHTML = end ? 'End of job' : CUR[0] === 'X' ? `Exception · can happen on any screen · from ${RESUME}` : `${PH[pi].k} · ${PH[pi].n} · screen ${oi + 1} of ${ORDER.length}`;
  $id('purpose').innerHTML = end ? 'The glasses step aside. The record, the evidence and the tip are already on the tablet for planning and training.' : s.purpose;
  $id('nii').style.background = t[2]; $id('nii').innerHTML = ic(t[0]); $id('nty').textContent = t[1];
  $id('nw').textContent = g.t === 'voice' ? `Say “${g.w}”` : (g.l || g.w);
  $id('nsub').innerHTML = `${ic('arrow')} ${g.t === 'voice' ? t[3] : g.t === 'sensor' || g.t === 'tap' ? t[3] + ' · ' + g.w : t[3]}`;
  const f = typeof FW !== 'undefined' && FW[CUR], last = a => a ? a[a.length - 1].replace(/^<b>[^<]*<\/b>\s*/, '').replace(/^:\s*/, '') : '';
  $id('bg3').innerHTML = f ? `<div class="b"><b>${ic('spark')} Context engine</b>${last(f.b)}</div><div class="s"><b>${ic('eye')} Show</b>${last(f.s)}</div><div class="m"><b>${ic('loop')} Grow</b>${last(f.m)}</div>`
    : `<div class="m"><b>${ic('loop')} Grow</b>Work order, prediction score, reviewed tip and skill step are written back for the next job.</div>`;
  document.querySelectorAll('.phases button').forEach((b, i) => { b.className = i === pi ? 'on' : (end || (pi > -1 && i < pi)) ? 'done' : ''; });
  const ref = CUR[0] === 'X' ? RESUME : CUR, ri = end ? ORDER.length : ORDER.indexOf(ref);
  document.querySelectorAll('.tl .nd').forEach((n, i) => n.className = 'nd' + (i === ri ? ' on' : i < ri ? ' done' : ''));
  document.querySelectorAll('.tl .cn').forEach(c => c.classList.toggle('done', ORDER.indexOf(c.dataset.c) < ri));
  document.querySelectorAll('.tl .g').forEach((g2, i) => g2.classList.toggle('on', i === phaseOf(ref)));
  document.querySelectorAll('#exc button').forEach(b => b.classList.toggle('on', b.dataset.x === CUR));
}

// ---- autoplay ----
const DW = { S04: 3800, S05: 3400, S06: 4000, S08: 3600, S09: 3600, S11: 3800, S12: 4300, S13: 3800, S15: 4000, S16: 3600, S17: 4800, S19: 4800, S20: 4000 };
let apAnim = null;
function stopAuto() { AUTO = false; $id('autob').classList.remove('on'); if (apAnim) apAnim.cancel(); }
async function autoLoop() {
  while (AUTO) { const d = DW[CUR] || 3000;
    apAnim = $id('ap').animate([{ width: '0%' }, { width: '100%' }], { duration: d, easing: 'linear' });
    await wait(d); if (!AUTO) break; if (CUR === 'END') { stopAuto(); break; } await next(); } }
const toggleAuto = () => { if (AUTO) return stopAuto(); AUTO = true; $id('autob').classList.add('on'); autoLoop(); };
$id('autob').onclick = toggleAuto;
$id('backb').onclick = () => { stopAuto(); back(); };
$id('fwdb').onclick = () => { stopAuto(); next(); };
const present = () => { const sl = $id('slide'); sl.classList.toggle('present'); $id('presb').classList.toggle('on', sl.classList.contains('present'));
  const k = $id('hintk'); k.classList.add('show'); clearTimeout(k._t); k._t = setTimeout(() => k.classList.remove('show'), 2600); };
$id('presb').onclick = present;
$id('fullb').onclick = () => document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();

document.addEventListener('keydown', e => {
  const k = e.key;
  if (['ArrowRight', ' ', 'Enter', 'PageDown'].includes(k)) { e.preventDefault(); stopAuto(); next(); }
  else if (['ArrowLeft', 'PageUp', 'Backspace'].includes(k)) { e.preventDefault(); stopAuto(); back(); }
  else if (k === 'Home') jump('S01');
  else if (/^[1-5]$/.test(k)) jump(PH[+k - 1].ids[0]);
  else if (/^[zxc]$/i.test(k)) exc({ z: 'X1', x: 'X2', c: 'X3' }[k.toLowerCase()]);
  else if (k === 'Escape') { if (CUR[0] === 'X') exc(CUR); else if ($id('slide').classList.contains('present')) present(); }
  else if (/^h$/i.test(k)) present();
  else if (/^p$/i.test(k)) toggleAuto();
  else if (/^f$/i.test(k)) $id('fullb').click();
});
const fit = () => { const s = Math.min(innerWidth / 1920, innerHeight / 1080); $id('slide').style.transform = `translate(-50%,-50%) scale(${s})`; };
addEventListener('resize', fit); fit();
const start = (location.hash || '').slice(1).toUpperCase();
go(BY[start] ? start : 'S01');
if (/[?&]present/.test(location.search)) present();
