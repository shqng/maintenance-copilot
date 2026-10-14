// ===== C · PERFORM =====
const OKP = pill('ok glow', '✓ SAFE · LOTO ON · A-114');
const OKS = pill('ok', '✓ SAFE · LOTO ON');
SCREENS.push({
  ph: 'C · Perform: guided steps, help on demand, record findings', id: 'S09', title: 'Safe to work · job overview (3 s)',
  trig: '⚙ all 3 gates passed',
  fov: sc('cell') + OKP + timer('33 min left') + backup(WEI) + mic('🔊 "Machine is safe. 8 steps, about 22 minutes."') +
    `<div class="glass" style="left:50%;top:50%;transform:translate(-50%,-50%);text-align:center;padding:1.6cqw 3cqw">
      <div class="lbl">Your job · 8 steps · ~22 min</div>
      <div style="display:flex;gap:2.4cqw;font-size:2.1cqw;margin-top:.6cqw"><span><b>1</b> Access<br><span style="opacity:.6">3 steps</span></span><span><b>2</b> Purge<br><span style="opacity:.6">1 step</span></span><span><b>3</b> Inject<br><span style="opacity:.6">1 step</span></span><span><b>4</b> Restore<br><span style="opacity:.6">3 steps</span></span></div>
    </div>` +
    `<div class="chip" style="left:50%;top:66%;transform:translateX(-50%);opacity:.75">fades in 3 s · say "Where am I" to see it again</div>` +
    co(97, 3, 1) + co(30, 38, 2) + co(28, 68, 3),
  purpose: 'A clear moment of relief and orientation: safe, then the big picture, then out of the way. This is the only time anything sits in the middle of the view during the job.',
  layers: ['Safety pill', 'Panel (short)', 'Audio'],
  els: ['<b>Pill turns green</b> with a soft glow and a chime. It stays green until the restore gate.',
    '<b>Phase overview</b>: 4 phases. Gives a mental model of the job, not a list of steps.',
    '<b>Fades by itself</b>: no command needed. "Where am I" brings it back at any time.'],
  ix: ['⏱ Fades after 3 s.', 'In Checklist mode it is skipped; a phase name appears in the strip instead.'],
  next: 'S10 · step 1 (cover) is shown the same way; we jump to step 2'
});
SCREENS.push({
  ph: '', id: 'S10', title: 'Guided step · step 2/8 remove outlet plug',
  trig: '🎙 "Done" on step 1 (remove J4 cover)',
  fov: sc('joint') + sc('hand') + OKS + timer('29 min left') + backup(WEI) +
    mic('🔊 "Outlet first, so the old grease has somewhere to go."') +
    ring(64, 62, 8) + tagw(69, 50, 'Outlet · M6 · 5 mm hex') +
    ring(52.5, 24.4, 6, 'ghost') + tagw(56, 20, 'inlet, not yet', 'ghost') +
    `<div class="glass strip"><span class="num">ACCESS · 2/8</span><span class="txt">Remove outlet plug</span>${say('DONE', 'pri')}<span class="dots"><i class="on"></i><i class="on"></i><i></i><i></i><i></i><i></i><i></i><i></i></span></div>` +
    co(61, 54, 1) + co(48, 18, 2) + co(16, 84, 3) + co(28, 79, 4),
  purpose: 'The main working screen. The real part is the content; the glasses only point to it and give one short instruction.',
  layers: ['Safety pill', 'Object cue', 'Strip', 'Audio'],
  els: ['<b>Amber ring + spec label</b> on the exact plug: what and where, with tool size.',
    '<b>Ghost ring on the look-alike</b> (the inlet plug): designed to prevent the most common mistake.',
    '<b>Step strip</b>: phase, step n/N, 3–8 words, one command, and progress dots.',
    '<b>Coach audio</b> adds the reason ("so the grease has an exit"). In Prompt mode, no reason is given; in Checklist mode, no audio.'],
  ix: ['🎙 "Done" = L1 (routine step).', '👁 Look down → S11 detail. ⏱ No progress for 40 s → S12 hint.', 'Temple tap = Done (gloves, noisy area).'],
  next: 'S11 if Alex looks down; S12 if he stalls'
});
SCREENS.push({
  ph: '', id: 'S11', title: 'Look down → detail panel (Show me)',
  trig: '👁 head tilts down below 20° / 🎙 "Show me"',
  fov: sc('joint') + sc('hand') + OKS + timer('28 min left') + backup(WEI) + mic() +
    ring(61, 32, 7) + `<div class="chip" style="left:66%;top:28%;opacity:.8">cue stays pinned to the plug ↑</div>` +
    `<div class="glass panel" style="width:72%"><div class="col" style="flex:1.1">
      <div style="display:flex;gap:1cqw;margin-bottom:.6cqw">${say('CLIP', 'pri')}${say('3D')}${say('SPECS')}${say('HISTORY')}</div>
      <div class="ph" style="height:14cqw">clip 0:12 · outlet plug · from Wei's job, Mar</div>
    </div><div class="col">
      <div class="lbl">Step 2/8 · outlet plug</div>
      <div class="row"><span>Size</span><span>M6 · 5 mm hex</span></div>
      <div class="row"><span>Direction</span><span>anticlockwise</span></div>
      <div class="row"><span>Seal washer</span><span>keep · check for cracks</span></div>
      <div class="sm" style="opacity:.65;font-size:1.6cqw">WI-J4-LUB v3.2 · approved by Reliability</div>
    </div><div class="cmdcol">${say('PLAY')}${say('HIDE')}</div></div>` +
    co(57, 28, 1) + co(11, 50, 2) + co(11, 72, 3) + co(50, 95, 4) + co(89, 78, 5),
  purpose: '"Look up to work, look down to read." Detail is available but never forced on Alex, and it\'s all from approved sources.',
  layers: ['Safety pill', 'Object cue', 'Panel', 'Audio'],
  els: ['<b>The cue stays pinned to the world</b>: when Alex looks down, the ring moves up with the real plug.',
    '<b>Tabs</b> spoken by name: Clip (real repair footage), 3D (exploded view from the twin), Specs, History (past jobs on R-07 J4).',
    '<b>Clip</b> is 8–15 s, cut to this step only. It is captured from past repairs (the knowledge loop) and approved before use.',
    '<b>Source + version line</b>: every instruction can be traced.',
    '<b>Hide</b> / looking up / 8 s with no input closes the panel.'],
  ix: ['👁 Looking down only opens the panel; it never confirms a step.', '🎙 "Play", "3D", "Specs", "History", "Hide".', 'The clip plays muted with captions while Wei is talking.'],
  next: 'Back to S10 on look-up'
});
SCREENS.push({
  ph: '', id: 'S12', title: 'Stuck → hint offered (stays in the corner of the eye)',
  trig: '⏱ step 2 open for 40 s + the hex key slipped (no plug rotation detected)',
  fov: sc('joint') + sc('hand') + OKS + timer('26 min left') + backup(WEI) + mic() +
    ring(64, 62, 8) + ring(58.5, 69.4, 11, 'ghost') +
    `<div class="glass hint" style="bottom:17%"><span class="aic">💡</span> Plug hard to reach? On R-07, the <b>cable guide</b> often blocks the key <span class="src">· 3 of 5 past jobs</span><br><span style="display:inline-flex;gap:1cqw;margin-top:.5cqw">${say('HINT')}${say('ASK WEI')}${say('NOT NOW')}</span></div>` +
    strip('ACCESS · 2/8', 'Remove outlet plug', say('DONE', 'pri')) +
    co(52, 78, 1) + co(3, 35, 2) + co(3, 58, 3),
  purpose: 'Help when Alex hesitates, without him having to ask. It is offered quietly and is easy to ignore.',
  layers: ['Object cue', 'Strip', 'Hint (AI)', 'Audio'],
  els: ['<b>Ghost ring</b> on the likely blocker. A suggestion only, not an instruction.',
    '<b>Hint card</b> (blue = AI) sits just above the strip: a short cause, with the evidence ("3 of 5 past jobs").',
    '<b>3 ways out</b>: Hint (more detail), Ask Wei (person), Not now (dismiss).'],
  ix: ['Shown with a soft tone only. Never interrupts with speech while Alex\'s hands are working.', 'Timing depends on mode: Coach 40 s · Prompt 90 s · Checklist only if asked.', 'Recorded as a "hint used" learning signal, never as a performance mark.'],
  next: 'S13 on "Ask Wei"'
});
SCREENS.push({
  ph: '', id: 'S13', title: 'Wei draws on Alex\'s view',
  trig: '🎙 "Ask Wei"',
  fov: sc('joint') + sc('hand') + OKS + timer('24 min left') + backup('👤 Wei · <b>drawing</b>') +
    mic('🔊 Wei: "Lift the guide, there\'s a clip on the left."') +
    ring(58.5, 69.4, 11, 'blue') + tagw(14, 52, '✎ Wei: lift this guide first, then the key fits', 'blue') +
    
    strip('ACCESS · 2/8', 'Lift guide, then remove plug', say('DONE', 'pri') + say('SAVE TIP')) +
    co(3, 11, 1) + co(68, 64, 2) + co(12, 49, 3) + co(93, 82, 4),
  purpose: 'Remote expert help that stays pinned to the real part. Wei sees what Alex sees and marks the part directly, with no video tile blocking the view.',
  layers: ['Safety pill', 'Expert mark', 'Strip', 'Audio'],
  els: ['<b>Backup chip</b> shows that Wei is drawing, so Alex knows where the mark came from.',
    '<b>Blue ring</b> = from a person, pinned to the real part (it stays in place when Alex moves).',
    '<b>Blue label</b> with Wei\'s words. The strip updates to the revised instruction.',
    '<b>SAVE TIP</b>: sends the tip into the knowledge loop. Reliability reviews it before it appears for other technicians.'],
  ix: ['Audio is voice-only; Wei\'s video stays on his own screen.', '🎙 "Save tip" = one tap to capture knowledge, with no typing.', 'Wei can draw and talk but cannot confirm steps or gates.'],
  next: 'S14 after steps 2–3 are done'
});
SCREENS.push({
  ph: '', id: 'S14', title: 'Purge + record a finding (feeds the prediction)',
  trig: '🎙 "Done" on step 3 (inlet plug)',
  fov: sc('joint') + sc('gun') + OKS + timer('19 min left') + backup(WEI) + mic() +
    ring(64, 62, 8) + tagw(69, 50, 'Old grease comes out here') +
    `<div class="chip" style="left:3%;top:40%">📷 photo saved · outlet<br><span class="aic">→ prediction check #PM-2291</span></div>` +
    strip('PURGE · 4/8', 'Old grease colour?', say('NORMAL') + say('DARK') + say('METAL')) +
    co(61, 54, 1) + co(2, 38, 2) + co(88, 89, 3),
  purpose: 'Turn what Alex sees into data. One spoken word becomes a labelled finding that checks whether the prediction was right.',
  layers: ['Safety pill', 'Object cue', 'Strip', 'Audio'],
  els: ['<b>Ring on the outlet</b>: where to look.',
    '<b>Automatic photo + link</b>: evidence attached to the prediction for the reliability engineers.',
    '<b>Finding choices in the strip</b> = L2 confirmation ("Done" + a value). "Metal" → asks for a close-up and flags the gearbox for inspection.'],
  ix: ['🎙 One word: "Normal" / "Dark" / "Metal".', 'Choices are shown only when asked for, never as free text.'],
  next: 'S15 on the answer ("Dark")'
});
SCREENS.push({
  ph: '', id: 'S15', title: 'Inject grease · live gauge with a hard limit',
  trig: '🎙 "Dark" · grease cartridge scanned (RG-2 ✓)',
  fov: sc('joint') + sc('gun') + OKS + timer('16 min left') + backup(WEI) + mic() +
    ring(64, 62, 8) + tagw(69, 50, 'Stop when fresh grease appears') +
    `<div class="dtag" style="left:20%;top:14%;width:27%"><div class="lbl">RG-2 injected · smart gun</div><div class="v">42 <span style="font-size:2cqw">/ 60 ml</span></div>
      <div class="bar" style="background:linear-gradient(90deg,rgba(255,255,255,.25) 0 91%,rgba(245,184,61,.6) 91% 99%,var(--danger) 99%)"><i style="width:70%"></i></div>
      <div style="display:flex;justify-content:space-between;font-size:1.5cqw;opacity:.8"><span>0</span><span>55 ⚠</span><span>60 STOP</span></div></div>` +
    strip('INJECT · 5/8', 'Pump slowly, watch the outlet', say('GREASE OUT', 'pri')) +
    co(19, 14, 1) + co(61, 54, 2) + co(88, 89, 3),
  purpose: 'Live data in place of guesswork. A gauge on the part shows the limit, which prevents the overfill risk named in S05.',
  layers: ['Safety pill', 'Live data tag', 'Object cue', 'Strip', 'Audio'],
  els: ['<b>Live gauge</b> pinned near the inlet. Green to 55, amber 55–60 (beeps), at 60 a red STOP covers the strip and the gun vibrates.',
    '<b>Outlet ring</b>: the real-world sign that he has finished ("fresh grease appears").',
    '<b>GREASE OUT</b> = L2: the system records the actual volume (e.g. 48 ml).'],
  ix: ['⚙ Volume comes from the smart grease gun\'s flow meter (Bluetooth).', 'Wrong cartridge scanned → X2 mismatch before the gauge appears.'],
  next: 'S16 · restore'
});
