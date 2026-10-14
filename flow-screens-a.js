// ===== A · START =====
SCREENS.push({
  ph: 'A · Start: brief, find the machine, decide go / no-go', id: 'S01', title: 'Job ready (job card)',
  trig: 'Glasses put on in the workshop at 13:56 · job pushed by the planner',
  fov: sc('aisle') + timer('Window opens in 4 min') + mic() +
    `<div class="glass panel"><div class="col">
      <div><span class="tag p3">P3 · PLANNED</span><span class="tag learn">LEARNING JOB</span></div>
      <div class="h1">R-07 · J4 grease change</div>
      <div class="sm" style="opacity:.8">Line 2 · Cell 4 · window Thu 14:00–14:45</div>
      <div class="row"><span>Why now</span><span>J4 current +18% · fails in ~9–14 d</span></div>
      <div class="row"><span>Your mode</span><span><b>Coach</b> · first time on this task</span></div>
      <div class="row"><span>Backup</span><span class="aic">Wei · watching live</span></div>
      <div class="row"><span>Prep</span><span class="okc">Rehearsed 2/2 in twin ✓</span></div>
      <div class="row" style="border:0"><span>Kit</span><span>RG-2 grease · seal kit S-J4 · Bin 14</span></div>
    </div><div class="cmdcol">${say('START JOB', 'pri')}${say('DETAILS')}</div></div>` +
    co(14, 34, 1) + co(14, 52, 2) + co(14, 66, 3) + co(14, 80, 4) + co(84, 80, 5) + co(90, 11, 6),
  purpose: 'One card that answers "what, why, how am I supported" before Alex walks out. It connects the prediction, the planning and his training into one job.',
  layers: ['Panel', 'Audio'],
  els: ['<b>Job type tags</b>: urgency (P3) plus the LEARNING JOB flag set by the planner.',
    '<b>Why now</b>: the prediction in plain words, a trend and a time range. No raw probability.',
    '<b>Your mode</b>: comes from the skill passport. First time on this task, so Coach mode (most guidance).',
    '<b>Prep + kit</b>: twin rehearsal done, parts reserved with their bin location.',
    '<b>Commands</b>: one main command (filled) and one secondary.',
    '<b>Window timer</b>: the job is planned around the changeover window.'],
  ix: ['🎙 "Start job" / "Details" (opens the full brief: history, 3D, previous fixes).', 'Fallback: temple tap = START JOB.', 'Off the shop floor, the panel can sit in the middle of the view. This is the only full card shown before Alex reaches the machine.'],
  next: 'S02 on "Start job"'
});
SCREENS.push({
  ph: '', id: 'S02', title: 'Walk to the cell (pick up kit on the way)',
  trig: '🎙 "Start job"',
  fov: sc('aisle') + timer('Window opens in 2 min') + mic() +
    ring(86, 36, 7) + tagw(63, 47, 'Bin 14 · RG-2 · S-J4') + leader(86, 41, 6) +
    `<div class="edge" style="right:2%;top:60%">Cell 4 · 40 m ➜</div>` +
    strip('ON THE WAY', 'Pick up kit at Bin 14', say('GOT KIT', 'pri')) +
    co(92, 28, 1) + co(97, 70, 2) + co(24, 81, 3),
  purpose: 'Keep Alex looking where he walks. Show only where to go and what to pick up.',
  layers: ['Object cue', 'Strip', 'Audio'],
  els: ['<b>Pick-up ring</b> on the real bin, only when it is in view. It confirms the reserved parts are there.',
    '<b>Direction chip at the edge of view</b>: never an arrow in the middle of the walkway.',
    '<b>One-line strip</b>: just the current errand.'],
  ix: ['⚙ Automatically scans the part labels when he picks them up. "Got kit" confirms by voice.', 'While walking: no panels, nothing in the centre of view, and the display dims (safety around forklifts).'],
  next: 'S03 when the asset label for R-07 is detected'
});
SCREENS.push({
  ph: '', id: 'S03', title: 'Confirm the machine',
  trig: '⚙ R-07 asset label / position detected at the cell',
  fov: sc('cell') + pill('warn', '⚠ ENERGISED') + timer('41 min left') + backup('👤 Wei · on call') + mic() +
    tagw(56, 58, '<span class="okc">✓</span> R-07 · Line 2 · Cell 4 · matched') + leader(66, 63, 7) +
    strip('START', 'Correct machine confirmed', say('CONTINUE', 'pri')) +
    co(97, 3, 1) + co(54, 56, 2) + co(76, 15, 3),
  purpose: 'Wrong machine = the most serious mistake. Confirm the machine is a real check, then the safety pill appears for the first time.',
  layers: ['Safety pill', 'Object cue', 'Strip'],
  els: ['<b>Safety pill appears</b>: ENERGISED (amber). From now on it is always visible while Alex is at this machine.',
    '<b>Label pinned to the asset</b>: ID match from the tag plus location. On a mismatch → X2 pattern.',
    '<b>Window timer</b> now counts the real window time left.'],
  ix: ['🎙 "Continue".', 'If the label can\'t be read: "Scan tag" or read out the asset number.'],
  next: 'S04'
});
SCREENS.push({
  ph: '', id: 'S04', title: 'Re-check condition → go / no-go',
  trig: '🎙 "Continue"',
  fov: sc('cell') + pill('warn', '⚠ ENERGISED') + timer('40 min left') + backup('👤 Wei · on call') + mic() +
    `<div class="dtag" style="left:80%;top:20%"><div class="lbl">J4 current</div><div class="v warnc">4.8 A</div>+21% vs 4.0</div>` +
    `<div class="glass panel"><div class="col">
      <div class="lbl">Live re-check · before you start</div>
      <div class="row"><span>J4 current +21%</span><span class="okc">✓ within forecast (+18–24%)</span></div>
      <div class="row"><span>Production</span><span class="okc">✓ stopped for changeover</span></div>
      <div class="row"><span>Job ≈ 32 min · window 40 min</span><span class="okc">✓ fits</span></div>
      <div class="row"><span>Other R-07 alarms</span><span class="okc">✓ none</span></div>
      <div class="sm" style="margin-top:.6cqw">Recommended: <b class="okc">GO</b> <span class="src">· matches prediction #PM-2291</span></div>
    </div><div class="cmdcol">${say('GO', 'pri')}${say('NO-GO')}${say('WHY')}</div></div>` +
    co(78, 18, 1) + co(14, 63, 2) + co(14, 88, 3) + co(85, 74, 4),
  purpose: 'Predictions can be out of date. Before committing, check that the live condition still matches the forecast and the time window. This is a human decision point.',
  layers: ['Safety pill', 'Object cue', 'Panel', 'Audio'],
  els: ['<b>Live data tag on J4</b>: the evidence sits on the part itself, high in the view.',
    '<b>4 checks</b>, each with a ✓ or ⚠ and the reason. Any ⚠ changes the recommendation.',
    '<b>Recommendation + source</b>: the AI explains, Alex decides.',
    '<b>GO / NO-GO / WHY</b>. NO-GO asks for a reason and sends it to the planner (the job is rescheduled, not lost).'],
  ix: ['The panel opens automatically because this is a decision point (the only time it opens without a look-down).', '"Why" reads out the trend and the cases it is based on.'],
  next: 'S05 on "Go"'
});
SCREENS.push({
  ph: '', id: 'S05', title: 'Top 3 risks · Wei joins live',
  trig: '🎙 "Go" · backup automatically connects Wei',
  fov: sc('cell') + pill('warn', '⚠ ENERGISED') + timer('39 min left') + backup('👤 Wei · <b>joined · watching live</b>') + mic('🔊 Wei: "Hi Alex, I\'m with you"', 'top') +
    `<div class="glass panel"><div class="col">
      <div class="lbl">3 things that hurt people or machines on this job</div>
      <div class="row"><span><b>1 · Arm can drop</b></span><span>park J4 at 0° before isolating</span></div>
      <div class="row"><span><b>2 · Pressure build-up</b></span><span>outlet open before injecting</span></div>
      <div class="row" style="border:0"><span><b>3 · Overfill &gt; 60 ml</b></span><span>blows the seal · stop at the gauge</span></div>
    </div><div class="cmdcol">${say('GOT IT', 'pri')}${say('REPEAT')}</div></div>` +
    co(4, 4, 1) + co(14, 72, 2) + co(85, 80, 3) + co(30, 13, 4),
  purpose: 'A 20-second safety brief limited to the 3 risks that matter for this task. Wei joins without Alex having to ask.',
  layers: ['Safety pill', 'Panel', 'Audio'],
  els: ['<b>Backup chip</b> changes from "on call" to "watching live" (blue). Wei sees Alex\'s view but cannot control anything.',
    '<b>3 risks max</b>, each written as "hazard → what you do about it". Each one comes back as a step later on.',
    '<b>GOT IT</b> = an L1 confirmation, logged as "briefing seen".',
    '<b>Audio</b>: Wei\'s greeting; the risks are also read aloud in Coach mode.'],
  ix: ['🎙 "Got it" / "Repeat".', 'In Checklist mode (certified technicians) this screen shrinks to a one-line strip.'],
  next: 'S06 · start of the make-safe gates'
});

// ===== B · MAKE SAFE =====
SCREENS.push({
  ph: 'B · Make safe: three evidence gates (no skip)', id: 'S06', title: 'Gate 1/3 · park J4 at 0°',
  trig: '🎙 "Got it"',
  fov: sc('cell') + pill('warn', '⚠ ENERGISED · GATE 1/3') + timer('38 min left') + backup(WEI) + mic() +
    ring(76, 37, 8) + `<div class="dtag" style="left:82%;top:46%"><div class="lbl">J4 angle · live</div><div class="v">12.4° → 0.0°</div></div>` +
    strip('GATE 1/3', 'Jog J4 to 0° with the pendant', say('checking automatically…', 'wait'), 'gate') +
    co(97, 3, 1) + co(70, 28, 2) + co(97, 50, 3) + co(80, 87, 4),
  purpose: 'The first gate is checked by the machine itself. Alex doesn\'t say "done"; the system sees that J4 has reached 0°.',
  layers: ['Safety pill', 'Object cue', 'Strip', 'Audio'],
  els: ['<b>Pill</b> now shows gate progress (still amber, the machine is still live).',
    '<b>Amber ring on J4</b>: the only cue in the middle of the view. Alex looks at the part, not the screen.',
    '<b>Live data tag</b>: the angle counts down while he jogs. It turns green at 0.0 ± 0.5°.',
    '<b>Gate strip</b>: amber border, no SKIP, a dashed "checking automatically" in place of a command.'],
  ix: ['⚙ Moves on automatically once 0° has held steady for 2 s (sound plus a green tick).', 'No voice confirmation is needed or possible.'],
  next: 'S07 automatically'
});
SCREENS.push({
  ph: '', id: 'S07', title: 'Gate 2/3 · isolate Q1 + fit personal lock',
  trig: '⚙ J4 = 0.0° confirmed',
  fov: sc('isolator') + pill('warn', '⚠ ENERGISED · GATE 2/3') + timer('36 min left') + backup(WEI) + mic() +
    ring(50, 50, 13) + tagw(62, 30, 'Q1 · main isolator R-07') + leader(62, 36, 6) +
    `<div class="chip" style="left:3%;top:40%">Q1 handle: <span class="okc">OFF ✓</span><br>Lock A-114: <span class="warnc">looking…</span></div>` +
    strip('GATE 2/3', 'Turn Q1 OFF, fit lock A-114', say('TAKE PHOTO', 'pri'), 'gate') +
    co(56, 38, 1) + co(60, 27, 2) + co(2, 37, 3) + co(80, 87, 4),
  purpose: 'Lockout with evidence. A photo plus detection replaces "trust me", and Alex\'s named lock is recorded on the permit.',
  layers: ['Safety pill', 'Object cue', 'Strip', 'Audio'],
  els: ['<b>Ring on the isolator handle</b>: the right isolator is identified by tag, so it can\'t be mixed up with the one next to it.',
    '<b>Asset label</b> names the isolator in plain words.',
    '<b>Detection chip</b> (side of view) shows what the camera has confirmed so far, item by item.',
    '<b>TAKE PHOTO</b> captures the evidence. The gate only passes when both items are ✓.'],
  ix: ['🎙 "Take photo". If the lock isn\'t detected: "Can\'t see lock A-114, move closer" and it retakes.', 'Wei can see the photo but cannot pass the gate for Alex.'],
  next: 'S08 automatically when both items are confirmed'
});
SCREENS.push({
  ph: '', id: 'S08', title: 'Gate 3/3 · prove zero energy',
  trig: '⚙ lock A-114 detected in the photo',
  fov: sc('cell') + pill('warn', '⚠ VERIFYING · GATE 3/3') + timer('34 min left') + backup(WEI) + mic() +
    `<div class="glass panel gate" style="border:2px solid var(--warn)"><div class="col">
      <div class="lbl">Zero-energy check</div>
      <div class="row"><span>Drive bus</span><span class="okc">0 V ✓ <span class="src">PLC</span></span></div>
      <div class="row"><span>Air supply</span><span class="okc">0 bar ✓ <span class="src">sensor</span></span></div>
      <div class="row"><span>J4 brake</span><span class="okc">engaged ✓ <span class="src">PLC</span></span></div>
      <div class="row" style="border:0"><span><b>You:</b> press START on the pendant</span><span class="warnc">robot must NOT move</span></div>
    </div><div class="cmdcol">${say('NO MOTION', 'pri')}${say('IT MOVED')}</div></div>` +
    co(97, 3, 1) + co(14, 52, 2) + co(14, 84, 3) + co(86, 74, 4),
  purpose: 'The machine data and a human "try-start" check each other. Only when both agree can the pill turn green.',
  layers: ['Safety pill', 'Panel', 'Audio'],
  els: ['<b>Pill = VERIFYING</b>: the last state before it turns green.',
    '<b>Automatic checks</b> with their data source shown (PLC / sensor), so Alex can trust them.',
    '<b>Manual try-start</b>: still required. "Trust but verify" is a habit worth teaching.',
    '<b>NO MOTION / IT MOVED</b>. "It moved" → X1 safety interrupt, and the job stops.'],
  ix: ['🎙 "No motion" plus ⚙ the system cross-checks that no encoder movement was recorded = an L3 gate.', 'The panel stays open (it doesn\'t auto-hide) during a gate.'],
  next: 'S09 · pill turns green'
});
