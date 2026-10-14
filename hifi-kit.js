// ===== Hi-fi kit: same API as flow-kit.js, Vision-style markup =====
const ICONS = {
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
  spk: '<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  warn: '<path d="M12 3.5 2.8 19.5h18.4z"/><path d="M12 10v4.2M12 17h.01"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  x: '<path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/>',
  spark: '<path fill="currentColor" stroke="none" d="M12 2.5c.6 4.6 2.9 6.9 7.5 7.5-4.6.6-6.9 2.9-7.5 7.5-.6-4.6-2.9-6.9-7.5-7.5 4.6-.6 6.9-2.9 7.5-7.5zM19 15.5c.3 1.9 1.1 2.7 3 3-1.9.3-2.7 1.1-3 3-.3-1.9-1.1-2.7-3-3 1.9-.3 2.7-1.1 3-3z"/>',
  cam: '<path d="M3.5 8h4l1.6-2.5h5.8L16.5 8h4v11h-17z"/><circle cx="12" cy="13" r="3.5"/>',
  bolt: '<path fill="currentColor" stroke="none" d="M13.5 2 5 13.5h6L10 22l9-12h-6z"/>',
  arrow: '<path d="M4.5 12h15M14 6.5l5.5 5.5-5.5 5.5"/>',
  pen: '<path d="m15 5 4 4L8.5 19.5H4.5v-4z"/>',
  q: '<circle cx="12" cy="12" r="9"/><path d="M9.6 9.3a2.5 2.5 0 1 1 3.4 2.4c-.6.3-1 .8-1 1.5v.6M12 16.8h.01"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2.8v2.6M12 18.6v2.6M2.8 12h2.6M18.6 12h2.6M5.5 5.5l1.9 1.9M16.6 16.6l1.9 1.9M5.5 18.5l1.9-1.9M16.6 7.4l1.9-1.9"/>',
  eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
  play: '<path fill="currentColor" stroke="none" d="M8 5.5v13l10.5-6.5z"/>',
  hand: '<path d="M8 13V6.5a1.5 1.5 0 0 1 3 0V12M11 11V4.5a1.5 1.5 0 0 1 3 0V12M14 11.5V6a1.5 1.5 0 0 1 3 0v8a7 7 0 0 1-7 7c-2.5 0-4-1.2-5.3-3.2L3 15a1.5 1.5 0 0 1 2.5-1.6L8 16"/>',
  lock: '<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/>',
  user: '<circle cx="12" cy="8" r="3.8"/><path d="M4.5 20.5c1-4 4-5.8 7.5-5.8s6.5 1.8 7.5 5.8"/>',
  wave: '<path d="M4 10v4M8 7v10M12 4v16M16 7v10M20 10v4"/>',
  tap: '<circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="7.5" opacity=".5"/>',
  loop: '<path d="M4 12a8 8 0 0 1 13.7-5.6L20 8.5M20 4v4.5h-4.5M20 12a8 8 0 0 1-13.7 5.6L4 15.5M4 20v-4.5h4.5"/>',
  doc: '<path d="M6.5 3h8l4 4v14h-12z"/><path d="M14.5 3v4h4M9 12h6M9 16h6"/>'
};
document.body.insertAdjacentHTML('afterbegin', `<svg style="display:none" xmlns="http://www.w3.org/2000/svg">${Object.entries(ICONS).map(([k, p]) =>
  `<symbol id="i-${k}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${p}</symbol>`).join('')}</svg>`);
const ic = k => `<svg class="i"><use href="#i-${k}"/></svg>`;

const EMO = [['🔊', 'spk'], ['🎙', 'mic'], ['⏱', 'clock'], ['⚠', 'warn'], ['✓', 'check'], ['✕', 'x'], ['💡', 'spark'], ['✦', 'spark'],
  ['📷', 'cam'], ['⚡', 'bolt'], ['➜', 'arrow'], ['✎', 'pen'], ['❓', 'q'], ['⚙', 'gear'], ['👁', 'eye'], ['▶', 'play'], ['🔒', 'lock'], ['🔁', 'loop'], ['🧠', 'spark']];
// Converts emoji shorthand from the shared screen data into the icon set (text nodes only)
const iconize = html => html.replace(/\uFE0F/g, '').split(/(<[^>]*>)/).map(seg => {
  if (seg.startsWith('<')) return seg;
  seg = seg.replace(/👤 ?/g, '<i class="av">W</i>');
  EMO.forEach(([e, k]) => { seg = seg.split(e).join(ic(k)); });
  return seg;
}).join('');

const KEEP = new Set(['LOTO', 'PLC', 'RG', 'WI', 'PM', 'MES', 'ID', 'OEM', 'SME', 'AI', 'OK', 'J4', 'R-07', 'S-J4', 'RG-2', 'P3', 'Q1', 'A-114', 'CMMS', 'PPE', 'STOP']);
// Sentence case for labels written in caps in the lo-fi data
const tc = t => t.split(/(<[^>]*>)/).map(seg => seg.startsWith('<') ? seg :
  seg.replace(/[A-Z][A-Z0-9\-\/]+/g, w => KEEP.has(w) ? w : w.toLowerCase())
    .replace(/\bwei\b/g, 'Wei').replace(/\bmaya\b/g, 'Maya').replace(/\balex\b/g, 'Alex')
).join('').split(' · ').map(s => s.replace(/^((?:<[^>]*>|\s|[^\w<])*)([a-z])/, (m, p, c) => p + c.toUpperCase())).join(' · ');

const sc = id => `<svg class="scene"><use href="#${id}"/></svg>`;
const pill = (cls, t) => `<div class="pill ${cls}">${tc(t)}</div>`;
const timer = t => `<div class="chip timer">${ic('clock')} ${t}</div>`;
const backup = t => `<div class="chip backup">${t.replace(/👤 ?/, '<i class="av">W</i>')}</div>`;
const LV = '<span class="lv"><i></i><i></i><i></i><i></i></span>';
const mic = (t, pos = '') => {
  if (t && t.startsWith('🔊')) {
    const body = t.replace(/^🔊\s*/, '');
    const who = /^\s*(<b>)?Wei/.test(body) ? '<i class="av">W</i>' : `<span class="aiic">${ic('spark')}</span>`;
    return `<div class="mic">${ic('mic')}${LV}</div><div class="cap ${pos}">${who}<span>${body}</span></div>`;
  }
  return t ? `<div class="mic">${t}</div>` : `<div class="mic">${ic('mic')}${LV}</div>`;
};
const say = (t, c = '') => `<span class="say ${c}${t === 'STOP' ? ' stop' : ''}">${tc(t)}</span>`;
const strip = (num, txt, cmds, v = '') => {
  const m = /(\d+)\s*\/\s*(\d+)/.exec(num);
  const prog = m ? `<span class="prog">${Array.from({ length: +m[2] }, (_, i) => `<i class="${i < +m[1] ? 'on' : ''}"></i>`).join('')}</span>` : '';
  return `<div class="glass strip ${v}"><div class="stk"><div class="eb"><span class="num">${num}</span>${prog}</div><span class="txt">${txt}</span></div><div class="cmds">${cmds}</div></div>`;
};
const ring = (x, y, s, c = '') => `<div class="ring ${c}" style="left:${x}%;top:${y}%;width:${s}cqw;height:${s}cqw"></div>`;
const tagw = (x, y, t, c = '') => `<div class="tagw ${c}" style="left:${x}%;top:${y}%">${t}</div>`;
const leader = (x, y, h) => `<div class="leader" style="left:${x}%;top:${y}%;height:${h}%"></div>`;
const co = () => '';
const WEI = '👤 Wei · <b>watching live</b>';
const SCREENS = [];
const EXC = [];
